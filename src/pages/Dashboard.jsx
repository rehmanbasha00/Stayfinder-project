import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CalendarCheck, Heart, User, ArrowRight } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { fetchUserBookings } from '../store/slices/bookingSlice'
import { ROUTES } from '../utils/constants'

export default function Dashboard() {
  const { user } = useAuth()
  const dispatch = useDispatch()
  const { bookings } = useSelector((state) => state.booking)
  const wishlistCount = useSelector((state) => state.wishlist.ids.length)

  useEffect(() => {
    if (user) dispatch(fetchUserBookings(user.id))
  }, [dispatch, user])

  const upcoming = bookings.filter((b) => b.status === 'confirmed').length

  const cards = [
    { to: ROUTES.MY_BOOKINGS, icon: CalendarCheck, label: 'Upcoming bookings', value: upcoming },
    { to: ROUTES.WISHLIST, icon: Heart, label: 'Saved hotels', value: wishlistCount },
    { to: ROUTES.PROFILE, icon: User, label: 'Profile', value: 'Manage' },
  ]

  return (
    <div className="container-app py-10">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome back, {user?.name?.split(' ')[0]} 👋</h1>
      <p className="mt-1 text-sm text-slate-500">Here's a quick look at your account.</p>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.label} to={c.to} className="card group flex items-center justify-between p-5 transition hover:-translate-y-1 hover:shadow-card-hover">
            <div>
              <p className="text-sm text-slate-500">{c.label}</p>
              <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{c.value}</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-slate-800">
              <c.icon size={20} />
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Recent bookings</h2>
          <Link to={ROUTES.MY_BOOKINGS} className="flex items-center gap-1 text-sm font-semibold text-primary-600">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        {bookings.length === 0 ? (
          <p className="text-sm text-slate-500">No bookings yet. Start exploring hotels to plan your next stay.</p>
        ) : (
          <div className="space-y-3">
            {bookings.slice(0, 3).map((b) => (
              <div key={b.id} className="card flex items-center gap-4 p-4">
                <img src={b.hotelImage} alt="" className="h-14 w-16 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="font-medium text-slate-800 dark:text-slate-100">{b.hotelName}</p>
                  <p className="text-xs text-slate-500">{b.checkIn} → {b.checkOut}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${b.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
