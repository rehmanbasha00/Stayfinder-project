import axios from 'axios'
import { TOKEN_KEY } from '../utils/constants'

// Base URL is read from env so the same code works against a real backend.
// Falls back to a placeholder since this project ships with a mock API layer
// (see mockServer.js) that intercepts calls when VITE_USE_MOCK is enabled.
const baseURL = import.meta.env.VITE_API_BASE_URL || '/api'

const axiosClient = axios.create({
  baseURL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY)
    }
    const message =
      error.response?.data?.message || error.message || 'Something went wrong. Please try again.'
    return Promise.reject(new Error(message))
  }
)

export default axiosClient
