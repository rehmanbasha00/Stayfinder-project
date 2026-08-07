import { Link } from 'react-router-dom'
import { MapPin, Star, Heart } from 'lucide-react'
import AmenityIcon from './AmenityIcon'
import { formatCurrency } from '../../utils/formatters'
import { useWishlist } from '../../hooks/useWishlist'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../hooks/useToast'

export default function HotelCard({ hotel }) {
  const { isWishlisted, toggle } = useWishlist()
  const { isAuthenticated } = useAuth()
  const toast = useToast()
  const wishlisted = isWishlisted(hotel.id)

  function handleWishlist(e) {
    e.preventDefault()
    if (!isAuthenticated) {
      toast.info('Log in to save hotels to your wishlist')
      return
    }
    toggle(hotel.id)
  }

  return (
    <Link
      to={`/hotels/${hotel.id}`}
      className="card group block overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={hotel.images[0]}
          alt={hotel.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {hotel.onOffer && (
          <span className="absolute left-3 top-3 rounded-full bg-primary-600 px-2.5 py-1 text-xs font-semibold text-white shadow">
            {hotel.discountPercent}% OFF
          </span>
        )}
        <button
          onClick={handleWishlist}
          aria-label="Toggle wishlist"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-500 shadow transition hover:scale-110 hover:text-red-500"
        >
          <Heart size={16} className={wishlisted ? 'fill-red-500 text-red-500' : ''} />
        </button>
        {!hotel.available && (
          <span className="absolute bottom-3 left-3 rounded-full bg-slate-900/80 px-2.5 py-1 text-xs font-medium text-white">
            Sold out
          </span>
        )}
      </div>

      <div className="space-y-2.5 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-slate-900 line-clamp-2 dark:text-white">{hotel.name}</h3>
          <span className="flex shrink-0 items-center gap-1 rounded-lg bg-primary-50 px-1.5 py-0.5 text-xs font-bold text-primary-700 dark:bg-slate-800">
            <Star size={12} className="fill-primary-600 text-primary-600" />
            {hotel.rating}
          </span>
        </div>

        <p className="flex items-center gap-1 text-xs text-slate-500">
          <MapPin size={12} /> {hotel.city}
        </p>

        <div className="flex flex-wrap gap-2.5">
          {hotel.amenities.slice(0, 4).map((a) => (
            <AmenityIcon key={a} id={a} />
          ))}
        </div>

        <div className="flex items-end justify-between pt-1">
          <div>
            <p className="text-lg font-bold text-slate-900 dark:text-white">{formatCurrency(hotel.price)}</p>
            <p className="text-xs text-slate-400">per night</p>
          </div>
          <span className="btn-primary py-2 text-xs">Book Now</span>
        </div>
      </div>
    </Link>
  )
}
