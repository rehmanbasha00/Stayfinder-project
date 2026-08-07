import { useDispatch } from 'react-redux'
import { addToast } from '../store/slices/uiSlice'

export function useToast() {
  const dispatch = useDispatch()
  return {
    success: (message) => dispatch(addToast({ message, type: 'success' })),
    error: (message) => dispatch(addToast({ message, type: 'error' })),
    info: (message) => dispatch(addToast({ message, type: 'info' })),
  }
}
