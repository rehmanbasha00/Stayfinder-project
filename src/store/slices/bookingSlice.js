import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { bookingApi } from '../../api/bookingApi'

export const createBooking = createAsyncThunk('booking/create', async (payload, { rejectWithValue }) => {
  try {
    return await bookingApi.create(payload)
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

export const fetchUserBookings = createAsyncThunk('booking/fetchForUser', async (userId, { rejectWithValue }) => {
  try {
    return await bookingApi.listForUser(userId)
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

export const fetchBookingById = createAsyncThunk('booking/fetchById', async (id, { rejectWithValue }) => {
  try {
    return await bookingApi.getById(id)
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

export const cancelBooking = createAsyncThunk('booking/cancel', async (id, { rejectWithValue }) => {
  try {
    return await bookingApi.cancel(id)
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

const initialState = {
  draft: null, // in-progress booking selections (room, dates, guests)
  bookings: [],
  bookingsStatus: 'idle',
  createStatus: 'idle',
  createError: null,
  confirmation: null,
  confirmationStatus: 'idle',
}

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setDraft(state, action) {
      state.draft = { ...state.draft, ...action.payload }
    },
    clearDraft(state) {
      state.draft = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.createStatus = 'loading'
        state.createError = null
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.createStatus = 'succeeded'
        state.bookings.unshift(action.payload)
        state.draft = null
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.createStatus = 'failed'
        state.createError = action.payload
      })
      .addCase(fetchUserBookings.pending, (state) => {
        state.bookingsStatus = 'loading'
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.bookingsStatus = 'succeeded'
        state.bookings = action.payload
      })
      .addCase(fetchBookingById.pending, (state) => {
        state.confirmationStatus = 'loading'
      })
      .addCase(fetchBookingById.fulfilled, (state, action) => {
        state.confirmationStatus = 'succeeded'
        state.confirmation = action.payload
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        const idx = state.bookings.findIndex((b) => b.id === action.payload.id)
        if (idx !== -1) state.bookings[idx] = action.payload
      })
  },
})

export const { setDraft, clearDraft } = bookingSlice.actions
export default bookingSlice.reducer
