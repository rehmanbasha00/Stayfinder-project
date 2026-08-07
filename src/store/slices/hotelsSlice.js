import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { hotelsApi } from '../../api/hotelsApi'

export const searchHotels = createAsyncThunk('hotels/search', async (filters, { rejectWithValue }) => {
  try {
    return await hotelsApi.search(filters)
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

export const fetchHotelById = createAsyncThunk('hotels/fetchById', async (id, { rejectWithValue }) => {
  try {
    return await hotelsApi.getById(id)
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

export const fetchFeatured = createAsyncThunk('hotels/fetchFeatured', async (_, { rejectWithValue }) => {
  try {
    return await hotelsApi.getFeatured()
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

export const fetchOffers = createAsyncThunk('hotels/fetchOffers', async (_, { rejectWithValue }) => {
  try {
    return await hotelsApi.getOffers()
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

export const fetchDestinations = createAsyncThunk('hotels/fetchDestinations', async (_, { rejectWithValue }) => {
  try {
    return await hotelsApi.getDestinations()
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

export const submitReview = createAsyncThunk(
  'hotels/submitReview',
  async ({ hotelId, review }, { rejectWithValue }) => {
    try {
      const newReview = await hotelsApi.addReview(hotelId, review)
      return { hotelId, review: newReview }
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

const initialState = {
  results: [],
  total: 0,
  searchStatus: 'idle',
  searchError: null,
  filters: { city: '', checkIn: '', checkOut: '', guests: 2, minPrice: undefined, maxPrice: undefined, minRating: undefined },
  current: null,
  currentStatus: 'idle',
  currentError: null,
  featured: [],
  featuredStatus: 'idle',
  offers: [],
  offersStatus: 'idle',
  destinations: [],
  destinationsStatus: 'idle',
}

const hotelsSlice = createSlice({
  name: 'hotels',
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearCurrentHotel(state) {
      state.current = null
      state.currentStatus = 'idle'
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchHotels.pending, (state) => {
        state.searchStatus = 'loading'
        state.searchError = null
      })
      .addCase(searchHotels.fulfilled, (state, action) => {
        state.searchStatus = 'succeeded'
        state.results = action.payload.results
        state.total = action.payload.total
      })
      .addCase(searchHotels.rejected, (state, action) => {
        state.searchStatus = 'failed'
        state.searchError = action.payload
      })
      .addCase(fetchHotelById.pending, (state) => {
        state.currentStatus = 'loading'
        state.currentError = null
      })
      .addCase(fetchHotelById.fulfilled, (state, action) => {
        state.currentStatus = 'succeeded'
        state.current = action.payload
      })
      .addCase(fetchHotelById.rejected, (state, action) => {
        state.currentStatus = 'failed'
        state.currentError = action.payload
      })
      .addCase(fetchFeatured.pending, (state) => {
        state.featuredStatus = 'loading'
      })
      .addCase(fetchFeatured.fulfilled, (state, action) => {
        state.featuredStatus = 'succeeded'
        state.featured = action.payload
      })
      .addCase(fetchOffers.pending, (state) => {
        state.offersStatus = 'loading'
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offersStatus = 'succeeded'
        state.offers = action.payload
      })
      .addCase(fetchDestinations.pending, (state) => {
        state.destinationsStatus = 'loading'
      })
      .addCase(fetchDestinations.fulfilled, (state, action) => {
        state.destinationsStatus = 'succeeded'
        state.destinations = action.payload
      })
      .addCase(submitReview.fulfilled, (state, action) => {
        if (state.current && state.current.id === action.payload.hotelId) {
          state.current.reviews.unshift(action.payload.review)
        }
      })
  },
})

export const { setFilters, clearCurrentHotel } = hotelsSlice.actions
export default hotelsSlice.reducer
