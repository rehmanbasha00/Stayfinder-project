import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import ProtectedRoute from './components/layout/ProtectedRoute'
import { TextSkeleton } from './components/ui/Skeleton'
import { ROUTES } from './utils/constants'

// Route-level code splitting: each page is fetched only when visited.
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const HotelListing = lazy(() => import('./pages/HotelListing'))
const HotelDetails = lazy(() => import('./pages/HotelDetails'))
const Booking = lazy(() => import('./pages/Booking'))
const BookingConfirmation = lazy(() => import('./pages/BookingConfirmation'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const MyBookings = lazy(() => import('./pages/MyBookings'))
const Wishlist = lazy(() => import('./pages/Wishlist'))
const Profile = lazy(() => import('./pages/Profile'))
const Contact = lazy(() => import('./pages/Contact'))
const About = lazy(() => import('./pages/About'))
const NotFound = lazy(() => import('./pages/NotFound'))

function PageFallback() {
  return (
    <div className="container-app py-16">
      <TextSkeleton className="mx-auto h-8 w-1/3" />
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />
          <Route path={ROUTES.SEARCH} element={<HotelListing />} />
          <Route path={ROUTES.HOTEL_DETAILS} element={<HotelDetails />} />
          <Route path={ROUTES.CONTACT} element={<Contact />} />
          <Route path={ROUTES.ABOUT} element={<About />} />

          <Route element={<ProtectedRoute />}>
            <Route path={ROUTES.BOOKING} element={<Booking />} />
            <Route path={ROUTES.BOOKING_CONFIRMATION} element={<BookingConfirmation />} />
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            <Route path={ROUTES.MY_BOOKINGS} element={<MyBookings />} />
            <Route path={ROUTES.WISHLIST} element={<Wishlist />} />
            <Route path={ROUTES.PROFILE} element={<Profile />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
