import { useEffect, useState } from 'react'
import HotelCard from '../components/hotels/HotelCard'
import EmptyState from '../components/ui/EmptyState'
import { HotelCardSkeleton } from '../components/ui/Skeleton'
import { useWishlist } from '../hooks/useWishlist'
import { hotelsApi } from '../api/hotelsApi'

export default function Wishlist() {
  const { wishlistIds } = useWishlist()
  const [allHotels, setAllHotels] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    hotelsApi
      .search({})
      .then((res) => setAllHotels(res.results))
      .finally(() => setStatus('succeeded'))
  }, [])

  const saved = allHotels.filter((h) => wishlistIds.includes(h.id))

  return (
    <div className="container-app py-10">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">My wishlist</h1>
      <p className="mt-1 text-sm text-slate-500">Hotels you've saved for later</p>

      <div className="mt-6">
        {status === 'loading' && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => <HotelCardSkeleton key={i} />)}
          </div>
        )}
        {status === 'succeeded' && saved.length === 0 && (
          <EmptyState title="Your wishlist is empty" description="Tap the heart icon on any hotel to save it here." />
        )}
        {status === 'succeeded' && saved.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {saved.map((h) => <HotelCard key={h.id} hotel={h} />)}
          </div>
        )}
      </div>
    </div>
  )
}
