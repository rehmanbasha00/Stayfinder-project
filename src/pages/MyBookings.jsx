import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Calendar, Users, X } from 'lucide-react'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import EmptyState from '../components/ui/EmptyState'
import { TextSkeleton } from '../components/ui/Skeleton'
import { fetchUserBookings, cancelBooking } from '../store/slices/bookingSlice'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'
import { formatCurrency, formatDate } from '../utils/formatters'

export default function MyBookings() {
  const { user } = useAuth()
  const dispatch = useDispatch()
  const toast = useToast()
  const { bookings, bookingsStatus } = useSelector((state) => state.booking)
  const [toCancel, setToCancel] = useState(null)

  useEffect(() => {
    if (user) dispatch(fetchUserBookings(user.id))
  }, [dispatch, user])

  async function confirmCancel() {
    const result = await dispatch(cancelBooking(toCancel.id))
    if (cancelBooking.fulfilled.match(result)) {
      toast.success('Booking cancelled')
    } else {
      toast.error(result.payload || 'Could not cancel booking')
    }
    setToCancel(null)
  }

  return (
    <div className="container-app py-10">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">My bookings</h1>
      <p className="mt-1 text-sm text-slate-500">Your booking history and upcoming stays</p>

      <div className="mt-6 space-y-4">
        {bookingsStatus === 'loading' &&
          Array.from({ length: 3 }).map((_, i) => <TextSkeleton key={i} className="h-24 w-full" />)}

        {bookingsStatus === 'succeeded' && bookings.length === 0 && (
          <EmptyState title="No bookings yet" description="Once you book a hotel, it will show up here." />
        )}

        {bookings.map((b) => (
          <div key={b.id} className="card flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
            <img src={b.hotelImage} alt="" className="h-24 w-full rounded-xl object-cover sm:h-20 sm:w-28" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-slate-800 dark:text-slate-100">{b.hotelName}</p>
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${b.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
                  {b.status}
                </span>
              </div>
              <p className="text-xs text-slate-500">{b.room?.name}</p>
              <div className="mt-1.5 flex flex-wrap gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1"><Calendar size={12} /> {formatDate(b.checkIn)} → {formatDate(b.checkOut)}</span>
                <span className="flex items-center gap-1"><Users size={12} /> {b.guests} guests</span>
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
              <p className="font-bold text-slate-900 dark:text-white">{formatCurrency(b.total)}</p>
              {b.status === 'confirmed' && (
                <Button variant="outline" className="text-xs text-red-600" onClick={() => setToCancel(b)}>
                  <X size={14} /> Cancel
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      <Modal open={!!toCancel} onClose={() => setToCancel(null)} title="Cancel booking?">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Are you sure you want to cancel your booking at <strong>{toCancel?.hotelName}</strong>? This cannot be undone.
        </p>
        <div className="mt-5 flex justify-end gap-3">
          <Button variant="outline" onClick={() => setToCancel(null)}>Keep booking</Button>
          <Button onClick={confirmCancel} className="bg-red-600 hover:bg-red-700">Yes, cancel</Button>
        </div>
      </Modal>
    </div>
  )
}
