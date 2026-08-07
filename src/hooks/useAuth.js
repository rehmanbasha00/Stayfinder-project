import { useSelector } from 'react-redux'

export function useAuth() {
  const { user, token, status, error } = useSelector((state) => state.auth)
  return { user, token, isAuthenticated: !!token, status, error }
}
