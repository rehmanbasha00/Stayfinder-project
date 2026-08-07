// Lightweight in-browser mock backend so the app is fully functional
// without a live API. Every function simulates network latency and
// realistic success/error responses via Promises, matching the shape
// a real Axios-based service layer would return. Swap these for real
// axiosClient calls once a backend is available (see authApi/hotelsApi).
import { HOTELS, DESTINATIONS, MOCK_USERS_KEY } from './mockData'
import { TOKEN_KEY, USER_KEY } from '../utils/constants'

const delay = (ms = 600) => new Promise((res) => setTimeout(res, ms))

function readUsers() {
  return JSON.parse(localStorage.getItem(MOCK_USERS_KEY) || '[]')
}
function writeUsers(users) {
  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users))
}
function fakeToken(email) {
  return btoa(`${email}.${Date.now()}`)
}

export const mockAuth = {
  async register({ name, email, password }) {
    await delay()
    const users = readUsers()
    if (users.some((u) => u.email === email)) {
      throw new Error('An account with this email already exists.')
    }
    const user = { id: `u-${Date.now()}`, name, email, password, phone: '', avatar: '' }
    users.push(user)
    writeUsers(users)
    const token = fakeToken(email)
    return { token, user: { id: user.id, name, email } }
  },
  async login({ email, password }) {
    await delay()
    const users = readUsers()
    const user = users.find((u) => u.email === email && u.password === password)
    if (!user) throw new Error('Invalid email or password.')
    const token = fakeToken(email)
    return { token, user: { id: user.id, name: user.name, email: user.email, phone: user.phone } }
  },
  async updateProfile(userId, updates) {
    await delay(400)
    const users = readUsers()
    const idx = users.findIndex((u) => u.id === userId)
    if (idx === -1) throw new Error('User not found.')
    users[idx] = { ...users[idx], ...updates }
    writeUsers(users)
    const { password, ...safe } = users[idx]
    return safe
  },
}

export const mockHotels = {
  async search(filters = {}) {
    await delay(700)
    let results = [...HOTELS]
    if (filters.city) {
      results = results.filter((h) => h.city.toLowerCase().includes(filters.city.toLowerCase()))
    }
    if (filters.minPrice != null) results = results.filter((h) => h.price >= filters.minPrice)
    if (filters.maxPrice != null) results = results.filter((h) => h.price <= filters.maxPrice)
    if (filters.minRating) results = results.filter((h) => h.rating >= filters.minRating)
    if (filters.guests) results = results.filter((h) => h.rooms.some((r) => r.capacity >= filters.guests))
    return { results, total: results.length }
  },
  async getById(id) {
    await delay(500)
    const hotel = HOTELS.find((h) => h.id === id)
    if (!hotel) throw new Error('Hotel not found.')
    return hotel
  },
  async getFeatured() {
    await delay(500)
    return HOTELS.filter((h) => h.featured)
  },
  async getOffers() {
    await delay(500)
    return HOTELS.filter((h) => h.onOffer)
  },
  async getDestinations() {
    await delay(400)
    return DESTINATIONS
  },
  async addReview(hotelId, review) {
    await delay(500)
    const hotel = HOTELS.find((h) => h.id === hotelId)
    if (!hotel) throw new Error('Hotel not found.')
    const newReview = { id: `${hotelId}-rev-${Date.now()}`, date: new Date().toISOString(), ...review }
    hotel.reviews.unshift(newReview)
    return newReview
  },
}

const BOOKINGS_KEY = 'stayfinder_bookings'
function readBookings() {
  return JSON.parse(localStorage.getItem(BOOKINGS_KEY) || '[]')
}
function writeBookings(bookings) {
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings))
}

export const mockBookings = {
  async create(booking) {
    await delay(800)
    const bookings = readBookings()
    const newBooking = {
      id: `bk-${Date.now()}`,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      ...booking,
    }
    bookings.unshift(newBooking)
    writeBookings(bookings)
    return newBooking
  },
  async listForUser(userId) {
    await delay(500)
    return readBookings().filter((b) => b.userId === userId)
  },
  async getById(id) {
    await delay(300)
    const booking = readBookings().find((b) => b.id === id)
    if (!booking) throw new Error('Booking not found.')
    return booking
  },
  async cancel(id) {
    await delay(500)
    const bookings = readBookings()
    const idx = bookings.findIndex((b) => b.id === id)
    if (idx === -1) throw new Error('Booking not found.')
    bookings[idx].status = 'cancelled'
    writeBookings(bookings)
    return bookings[idx]
  },
}
