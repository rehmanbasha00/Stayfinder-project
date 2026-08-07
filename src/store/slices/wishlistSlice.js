import { createSlice } from '@reduxjs/toolkit'

const STORAGE_KEY = 'stayfinder_wishlist'

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}
function persist(ids) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: { ids: load() },
  reducers: {
    toggleWishlist(state, action) {
      const id = action.payload
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter((x) => x !== id)
      } else {
        state.ids.push(id)
      }
      persist(state.ids)
    },
  },
})

export const { toggleWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer
