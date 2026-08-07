import { mockBookings } from './mockServer'
// import axiosClient from './axiosClient'

export const bookingApi = {
  create: (payload) => mockBookings.create(payload),
  // create: (payload) => axiosClient.post('/bookings', payload).then((r) => r.data),

  listForUser: (userId) => mockBookings.listForUser(userId),
  getById: (id) => mockBookings.getById(id),
  cancel: (id) => mockBookings.cancel(id),
}
