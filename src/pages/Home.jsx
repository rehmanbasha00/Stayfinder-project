import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ArrowRight, ShieldCheck, BadgePercent, Headset } from 'lucide-react'
import SearchBar from '../components/hotels/SearchBar'
import HotelCard from '../components/hotels/HotelCard'
import { HotelCardSkeleton, DestinationSkeleton } from '../components/ui/Skeleton'
import { fetchFeatured, fetchOffers, fetchDestinations } from '../store/slices/hotelsSlice'
import { formatCurrency } from '../utils/formatters'
import { ROUTES } from '../utils/constants'

export default function Home() {
  const dispatch = useDispatch()
  const { featured, featuredStatus, offers, offersStatus, destinations, destinationsStatus } = useSelector(
    (state) => state.hotels
  )

  useEffect(() => {
    dispatch(fetchFeatured())
    dispatch(fetchOffers())
    dispatch(fetchDestinations())
  }, [dispatch])

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="container-app py-16 md:py-24">
          <div className="mx-auto max-w-2xl text-center animate-slideUp">
            <span className="mb-4 inline-block rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700 dark:bg-slate-800 dark:text-primary-300">
              Trusted by 50,000+ travelers
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
              Find your next stay, <span className="text-primary-600">effortlessly.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-slate-500">
              Handpicked hotels, transparent pricing, and instant confirmation — everything you need for a stress-free trip.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-5xl">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-slate-100 bg-white py-8 dark:border-slate-800 dark:bg-slate-950">
        <div className="container-app grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { icon: ShieldCheck, title: 'Verified hotels', desc: 'Every listing is quality-checked' },
            { icon: BadgePercent, title: 'Best price guarantee', desc: 'No hidden fees, ever' },
            { icon: Headset, title: '24/7 support', desc: 'Real humans, real fast' },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-slate-800">
                <item.icon size={20} />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{item.title}</p>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular destinations */}
      <section className="container-app py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="section-title">Popular destinations</h2>
            <p className="mt-1 text-sm text-slate-500">Explore top-rated cities loved by our travelers</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {destinationsStatus === 'loading'
            ? Array.from({ length: 8 }).map((_, i) => <DestinationSkeleton key={i} />)
            : destinations.map((d) => (
                <Link
                  key={d.city}
                  to={`/hotels?city=${encodeURIComponent(d.city)}`}
                  className="group relative h-40 overflow-hidden rounded-2xl shadow-soft transition-transform duration-300 hover:-translate-y-1 sm:h-64"
                >
                  <img src={d.image} alt={d.city} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <p className="font-semibold">{d.city}</p>
                    <p className="text-xs opacity-90">{d.hotelsCount} hotels</p>
                  </div>
                </Link>
              ))}
        </div>
      </section>

      {/* Featured hotels */}
      <section className="bg-slate-50 py-16 dark:bg-slate-900">
        <div className="container-app">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="section-title">Featured hotels</h2>
              <p className="mt-1 text-sm text-slate-500">Our top picks for an unforgettable stay</p>
            </div>
            <Link to={ROUTES.SEARCH} className="hidden items-center gap-1 text-sm font-semibold text-primary-600 sm:flex">
              View all <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredStatus === 'loading'
              ? Array.from({ length: 4 }).map((_, i) => <HotelCardSkeleton key={i} />)
              : featured.slice(0, 4).map((h) => <HotelCard key={h.id} hotel={h} />)}
          </div>
        </div>
      </section>

      {/* Special offers */}
      <section className="container-app py-16">
        <div className="mb-8">
          <h2 className="section-title">Special offers</h2>
          <p className="mt-1 text-sm text-slate-500">Limited-time deals on select stays</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {offersStatus === 'loading'
            ? Array.from({ length: 3 }).map((_, i) => <HotelCardSkeleton key={i} />)
            : offers.slice(0, 3).map((h) => (
                <Link key={h.id} to={`/hotels/${h.id}`} className="group relative overflow-hidden rounded-2xl shadow-card">
                  <img src={h.images[0]} alt={h.name} loading="lazy" className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 text-xs font-bold text-primary-700">
                    {h.discountPercent}% OFF
                  </span>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="font-semibold">{h.name}</p>
                    <p className="text-sm opacity-90">
                      {formatCurrency(Math.round(h.price * (1 - h.discountPercent / 100)))}{' '}
                      <span className="text-xs line-through opacity-60">{formatCurrency(h.price)}</span> / night
                    </p>
                  </div>
                </Link>
              ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-600">
        <div className="container-app flex flex-col items-center gap-4 py-14 text-center text-white">
          <h2 className="text-2xl font-bold sm:text-3xl">Ready for your next getaway?</h2>
          <p className="max-w-md text-primary-100">Join thousands of travelers booking their perfect stay with Stayfinder.</p>
          <Link to={ROUTES.SEARCH} className="btn bg-white text-primary-700 hover:bg-primary-50">
            Start exploring <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}
