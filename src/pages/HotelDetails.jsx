import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { MapPin, Star, Heart, Users, ChevronLeft, ChevronRight } from 'lucide-react'
import AmenityIcon from '../components/hotels/AmenityIcon'
import StarRating from '../components/ui/StarRating'
import Button from '../components/ui/Button'
import { TextSkeleton } from '../components/ui/Skeleton'
import { fetchHotelById, clearCurrentHotel, submitReview } from '../store/slices/hotelsSlice'
import { setDraft } from '../store/slices/bookingSlice'
import { useWishlist } from '../hooks/useWishlist'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'
import { formatCurrency, formatDate } from '../utils/formatters'

export default function HotelDetails() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const toast = useToast()
  const { isAuthenticated, user } = useAuth()
  const { isWishlisted, toggle } = useWishlist()
  const { current: hotel, currentStatus } = useSelector((state) => state.hotels)
  const [activeImage, setActiveImage] = useState(0)
  const [reviewText, setReviewText] = useState('')
  const [reviewRating, setReviewRating] = useState(5)

  useEffect(() => {
    dispatch(fetchHotelById(id))
    return () => dispatch(clearCurrentHotel())
  }, [dispatch, id])

  if (currentStatus === 'loading' || !hotel) {
    return (
      <div className="container-app space-y-4 py-8">
        <TextSkeleton className="h-80 w-full" />
        <TextSkeleton className="h-6 w-1/3" />
        <TextSkeleton className="h-4 w-2/3" />
      </div>
    )
  }

  function selectRoom(room) {
    if (!isAuthenticated) {
      toast.info('Log in to continue with your booking')
      navigate('/login')
      return
    }
    dispatch(setDraft({ hotelId: hotel.id, hotelName: hotel.name, hotelImage: hotel.images[0], room, checkIn: '', checkOut: '', guests: 2 }))
    navigate(`/booking/${hotel.id}`)
  }

  function handleReviewSubmit(e) {
    e.preventDefault()
    if (!isAuthenticated) {
      toast.info('Log in to leave a review')
      return
    }
    if (!reviewText.trim()) return
    dispatch(submitReview({ hotelId: hotel.id, review: { author: user.name, rating: reviewRating, comment: reviewText } }))
    setReviewText('')
    toast.success('Thanks for your review!')
  }

  return (
    <div className="container-app py-8">
      {/* Gallery */}
      <div className="relative mb-6 overflow-hidden rounded-2xl">
        <img src={hotel.images[activeImage]} alt={hotel.name} className="h-64 w-full object-cover sm:h-96" />
        <button
          onClick={() => setActiveImage((i) => (i - 1 + hotel.images.length) % hotel.images.length)}
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow hover:scale-105"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => setActiveImage((i) => (i + 1) % hotel.images.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow hover:scale-105"
        >
          <ChevronRight size={18} />
        </button>
        <button
          onClick={() => (isAuthenticated ? toggle(hotel.id) : toast.info('Log in to save hotels'))}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-500 shadow hover:text-red-500"
        >
          <Heart size={18} className={isWishlisted(hotel.id) ? 'fill-red-500 text-red-500' : ''} />
        </button>
      </div>
      <div className="mb-8 flex gap-2 overflow-x-auto">
        {hotel.images.map((img, i) => (
          <button key={i} onClick={() => setActiveImage(i)} className={`h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 ${activeImage === i ? 'border-primary-600' : 'border-transparent'}`}>
            <img src={img} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{hotel.name}</h1>
                <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                  <MapPin size={14} /> {hotel.address}
                </p>
              </div>
              <span className="flex items-center gap-1 rounded-lg bg-primary-50 px-2.5 py-1.5 text-sm font-bold text-primary-700 dark:bg-slate-800">
                <Star size={14} className="fill-primary-600 text-primary-600" /> {hotel.rating}
                <span className="ml-1 font-normal text-slate-400">({hotel.reviewsCount})</span>
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">About this hotel</h2>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{hotel.description}</p>
          </div>

          {/* Amenities */}
          <div>
            <h2 className="mb-3 text-lg font-semibold text-slate-900 dark:text-white">Amenities</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {hotel.amenities.map((a) => (
                <div key={a} className="flex items-center gap-2 rounded-xl border border-slate-100 px-3 py-2 dark:border-slate-800">
                  <AmenityIcon id={a} showLabel size={16} />
                </div>
              ))}
            </div>
          </div>

          {/* Room types */}
          <div>
            <h2 className="mb-3 text-lg font-semibold text-slate-900 dark:text-white">Room types</h2>
            <div className="space-y-3">
              {hotel.rooms.map((room) => (
                <div key={room.id} className="card flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-100">{room.name}</p>
                    <p className="text-xs text-slate-500">
                      {room.beds} · <Users size={12} className="inline" /> Up to {room.capacity} guests
                    </p>
                    <p className="mt-1 text-xs text-slate-400">{room.perks.join(' · ')}</p>
                  </div>
                  <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                    <p className="font-bold text-slate-900 dark:text-white">{formatCurrency(room.price)}<span className="text-xs font-normal text-slate-400">/night</span></p>
                    <Button onClick={() => selectRoom(room)} disabled={!hotel.available}>Select</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Location map (static, no external API key required) */}
          <div>
            <h2 className="mb-3 text-lg font-semibold text-slate-900 dark:text-white">Location</h2>
            <div className="flex h-56 items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 text-sm text-slate-400 dark:border-slate-800 dark:bg-slate-900">
              <MapPin className="mr-2" size={18} /> Map preview — {hotel.address}
            </div>
          </div>

          {/* Reviews */}
          <div>
            <h2 className="mb-3 text-lg font-semibold text-slate-900 dark:text-white">Reviews ({hotel.reviews.length})</h2>
            <form onSubmit={handleReviewSubmit} className="card mb-4 space-y-3 p-4">
              <StarRating rating={reviewRating} interactive onChange={setReviewRating} size={20} />
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your experience…"
                rows={3}
                className="input"
              />
              <Button type="submit" className="text-xs">Add review</Button>
            </form>
            <div className="space-y-4">
              {hotel.reviews.map((r) => (
                <div key={r.id} className="card p-4">
                  <div className="mb-1 flex items-center justify-between">
                    <p className="font-semibold text-slate-800 dark:text-slate-100">{r.author}</p>
                    <span className="text-xs text-slate-400">{formatDate(r.date)}</span>
                  </div>
                  <StarRating rating={r.rating} size={14} />
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky booking card */}
        <aside className="card sticky top-24 h-fit space-y-4 p-5">
          <p className="text-sm text-slate-500">Starting from</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {formatCurrency(hotel.price)} <span className="text-sm font-normal text-slate-400">/ night</span>
          </p>
          <Button className="w-full" onClick={() => selectRoom(hotel.rooms[0])} disabled={!hotel.available}>
            {hotel.available ? 'Book Now' : 'Sold Out'}
          </Button>
          <p className="text-center text-xs text-slate-400">Free cancellation up to 24 hours before check-in</p>
        </aside>
      </div>
    </div>
  )
}
