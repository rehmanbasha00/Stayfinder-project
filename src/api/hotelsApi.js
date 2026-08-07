import { mockHotels } from './mockServer'
// import axiosClient from './axiosClient'

export const hotelsApi = {
  search: (filters) => mockHotels.search(filters),
  // search: (filters) => axiosClient.get('/hotels', { params: filters }).then((r) => r.data),

  getById: (id) => mockHotels.getById(id),
  // getById: (id) => axiosClient.get(`/hotels/${id}`).then((r) => r.data),

  getFeatured: () => mockHotels.getFeatured(),
  getOffers: () => mockHotels.getOffers(),
  getDestinations: () => mockHotels.getDestinations(),
  addReview: (hotelId, review) => mockHotels.addReview(hotelId, review),
}
