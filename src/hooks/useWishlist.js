import { useDispatch, useSelector } from 'react-redux'
import { toggleWishlist } from '../store/slices/wishlistSlice'

export function useWishlist() {
  const ids = useSelector((state) => state.wishlist.ids)
  const dispatch = useDispatch()
  return {
    wishlistIds: ids,
    isWishlisted: (id) => ids.includes(id),
    toggle: (id) => dispatch(toggleWishlist(id)),
  }
}
