import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import hotelsReducer from './slices/hotelsSlice'
import bookingReducer from './slices/bookingSlice'
import wishlistReducer from './slices/wishlistSlice'
import uiReducer from './slices/uiSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    hotels: hotelsReducer,
    booking: bookingReducer,
    wishlist: wishlistReducer,
    ui: uiReducer,
  },
})
