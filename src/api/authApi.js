// Thin service layer. Currently delegates to the in-browser mock backend
// (mockServer.js) so the app runs without a real API. To connect a real
// backend: delete the mock imports below and uncomment the axiosClient
// calls — the function signatures already match a typical REST API.
import { mockAuth } from './mockServer'
// import axiosClient from './axiosClient'

export const authApi = {
  login: (payload) => mockAuth.login(payload),
  // login: (payload) => axiosClient.post('/auth/login', payload).then((r) => r.data),

  register: (payload) => mockAuth.register(payload),
  // register: (payload) => axiosClient.post('/auth/register', payload).then((r) => r.data),

  updateProfile: (userId, payload) => mockAuth.updateProfile(userId, payload),
  // updateProfile: (userId, payload) => axiosClient.patch(`/users/${userId}`, payload).then((r) => r.data),
}
