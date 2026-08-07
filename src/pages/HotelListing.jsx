import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { SlidersHorizontal } from 'lucide-react'
import HotelCard from '../components/hotels/HotelCard'
import SearchBar from '../components/hotels/SearchBar'
import Filters from '../components/hotels/Filters'
import EmptyState from '../components/ui/EmptyState'
import { HotelCardSkeleton } from '../components/ui/Skeleton'
import { searchHotels } from '../store/slices/hotelsSlice'

export default function HotelListing() {
  const [searchParams] = useSearchParams()
  const dispatch = useDispatch()
  const { results, total, searchStatus, searchError } = useSelector((state) => state.hotels)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const [filters, setFilters] = useState({
    city: searchParams.get('city') || '',
    guests: searchParams.get('guests') ? Number(searchParams.get('guests')) : undefined,
    maxPrice: undefined,
    minRating: undefined,
  })

  useEffect(() => {
    setFilters((f) => ({ ...f, city: searchParams.get('city') || '' }))
  }, [searchParams])

  useEffect(() => {
    dispatch(searchHotels(filters))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, filters.city, filters.guests, filters.maxPrice, filters.minRating])

  return (
    <div className="container-app py-8">
      <div className="mb-6">
        <SearchBar initial={{ city: filters.city }} compact />
      </div>

      <div className="mb-4 flex items-center justify-between md:hidden">
        <p className="text-sm text-slate-500">{total} hotels found</p>
        <button onClick={() => setMobileFiltersOpen((o) => !o)} className="btn-outline text-xs">
          <SlidersHorizontal size={14} /> Filters
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[260px_1fr]">
        <div className={`${mobileFiltersOpen ? 'block' : 'hidden'} md:block`}>
          <Filters filters={filters} onChange={(patch) => setFilters((f) => ({ ...f, ...patch }))} onClear={() => setFilters({ city: filters.city })} />
        </div>

        <div>
          <div className="mb-4 hidden items-center justify-between md:flex">
            <p className="text-sm text-slate-500">
              {searchStatus === 'loading' ? 'Searching…' : `${total} hotels found${filters.city ? ` in ${filters.city}` : ''}`}
            </p>
          </div>

          {searchStatus === 'loading' && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <HotelCardSkeleton key={i} />
              ))}
            </div>
          )}

          {searchStatus === 'failed' && (
            <EmptyState title="Something went wrong" description={searchError} />
          )}

          {searchStatus === 'succeeded' && results.length === 0 && (
            <EmptyState
              title="No hotels match your search"
              description="Try adjusting your filters or searching a different city."
            />
          )}

          {searchStatus === 'succeeded' && results.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((h) => (
                <HotelCard key={h.id} hotel={h} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
