import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { authApi } from '../../api/authApi'
import { TOKEN_KEY, USER_KEY } from '../../utils/constants'

const storedUser = localStorage.getItem(USER_KEY)

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  token: localStorage.getItem(TOKEN_KEY) || null,
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
}

export const loginUser = createAsyncThunk('auth/login', async (payload, { rejectWithValue }) => {
  try {
    return await authApi.login(payload)
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

export const registerUser = createAsyncThunk('auth/register', async (payload, { rejectWithValue }) => {
  try {
    return await authApi.register(payload)
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

export const updateUserProfile = createAsyncThunk(
  'auth/updateProfile',
  async ({ userId, updates }, { rejectWithValue }) => {
    try {
      return await authApi.updateProfile(userId, updates)
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null
      state.token = null
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_KEY)
    },
    clearAuthError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload.user
        state.token = action.payload.token
        localStorage.setItem(TOKEN_KEY, action.payload.token)
        localStorage.setItem(USER_KEY, JSON.stringify(action.payload.user))
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.user = action.payload.user
        state.token = action.payload.token
        localStorage.setItem(TOKEN_KEY, action.payload.token)
        localStorage.setItem(USER_KEY, JSON.stringify(action.payload.user))
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload }
        localStorage.setItem(USER_KEY, JSON.stringify(state.user))
      })
  },
})

export const { logout, clearAuthError } = authSlice.actions
export default authSlice.reducer
