import { createSlice } from '@reduxjs/toolkit'

let nextId = 1
const prefersDark =
  typeof window !== 'undefined' && localStorage.getItem('stayfinder_theme')
    ? localStorage.getItem('stayfinder_theme') === 'dark'
    : typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    toasts: [],
    darkMode: !!prefersDark,
  },
  reducers: {
    addToast: {
      reducer(state, action) {
        state.toasts.push(action.payload)
      },
      prepare({ message, type = 'success' }) {
        return { payload: { id: nextId++, message, type } }
      },
    },
    removeToast(state, action) {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload)
    },
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode
      localStorage.setItem('stayfinder_theme', state.darkMode ? 'dark' : 'light')
    },
  },
})

export const { addToast, removeToast, toggleDarkMode } = uiSlice.actions
export default uiSlice.reducer
