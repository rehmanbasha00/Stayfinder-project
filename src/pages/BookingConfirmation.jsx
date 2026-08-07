import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CheckCircle2, Calendar, Users, Hotel } from 'lucide-react'
import Button from '../components/ui/Button'
import { TextSkeleton } from '../components/ui/Skeleton'
import { fetchBookingById } from '../store/slices/bookingSlice'
import { formatCurrency, formatDate } from '../utils/formatters'
import { ROUTES } from '../utils/constants'

export default function BookingConfirmation() {
  const { bookingId } = useParams()
  const dispatch = useDispatch()
  const { confirmation, confirmationStatus } = useSelector((state) => state.booking)

  useEffect(() => {
    dispatch(fetchBookingById(bookingId))
  }, [dispatch, bookingId])

  if (confirmationStatus === 'loading' || !confirmation) {
    return (
      <div className="container-app space-y-4 py-16">
        <TextSkeleton className="mx-auto h-16 w-16 rounded-full" />
        <TextSkeleton className="mx-auto h-6 w-1/3" />
      </div>
    )
  }

  return (
    <div className="container-app flex flex-col items-center py-16 text-center">
      <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 animate-scaleIn">
        <CheckCircle2 size={34} />
      </span>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Booking confirmed!</h1>
      <p className="mt-1 max-w-md text-sm text-slate-500">
        A confirmation email has been sent. Your booking ID is <strong>{confirmation.id}</strong>.
      </p>

      <div className="card mt-8 w-full max-w-lg space-y-4 p-6 text-left">
        <div className="flex gap-3">
          <img src={confirmation.hotelImage} alt="" className="h-16 w-20 rounded-lg object-cover" />
          <div>
            <p className="font-semibold text-slate-800 dark:text-slate-100">{confirmation.hotelName}</p>
            <p className="text-xs text-slate-500">{confirmation.room.name}</p>
          </div>
        </div>
        <hr className="border-slate-100 dark:border-slate-800" />
        <div className="grid grid-cols-2 gap-4 text-sm text-slate-600 dark:text-slate-300">
          <p className="flex items-center gap-2"><Calendar size={14} /> {formatDate(confirmation.checkIn)}</p>
          <p className="flex items-center gap-2"><Calendar size={14} /> {formatDate(confirmation.checkOut)}</p>
          <p className="flex items-center gap-2"><Users size={14} /> {confirmation.guests} guests</p>
          <p className="flex items-center gap-2"><Hotel size={14} /> {confirmation.nights} nights</p>
        </div>
        <hr className="border-slate-100 dark:border-slate-800" />
        <div className="flex justify-between font-bold text-slate-900 dark:text-white">
          <span>Total paid</span><span>{formatCurrency(confirmation.total)}</span>
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <Link to={ROUTES.MY_BOOKINGS}><Button variant="outline">View my bookings</Button></Link>
        <Link to={ROUTES.HOME}><Button>Back to home</Button></Link>
      </div>
    </div>
  )
}
