import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Calendar, Users, Search } from 'lucide-react'

export default function SearchBar({ initial = {}, compact = false }) {
  const navigate = useNavigate()
  const [city, setCity] = useState(initial.city || '')
  const [checkIn, setCheckIn] = useState(initial.checkIn || '')
  const [checkOut, setCheckOut] = useState(initial.checkOut || '')
  const [guests, setGuests] = useState(initial.guests || 2)

  function handleSubmit(e) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (city) params.set('city', city)
    if (checkIn) params.set('checkIn', checkIn)
    if (checkOut) params.set('checkOut', checkOut)
    if (guests) params.set('guests', guests)
    navigate(`/hotels?${params.toString()}`)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`grid w-full grid-cols-1 gap-3 rounded-2xl bg-white p-4 shadow-card sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_0.8fr_auto] dark:bg-slate-900 ${compact ? '' : 'animate-slideUp'}`}
    >
      <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 focus-within:border-primary-500 dark:border-slate-700">
        <MapPin size={16} className="text-slate-400" />
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Where are you going?"
          className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
        />
      </label>

      <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 focus-within:border-primary-500 dark:border-slate-700">
        <Calendar size={16} className="text-slate-400" />
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="w-full bg-transparent text-sm outline-none text-slate-600 dark:text-slate-300"
        />
      </label>

      <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 focus-within:border-primary-500 dark:border-slate-700">
        <Calendar size={16} className="text-slate-400" />
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className="w-full bg-transparent text-sm outline-none text-slate-600 dark:text-slate-300"
        />
      </label>

      <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 focus-within:border-primary-500 dark:border-slate-700">
        <Users size={16} className="text-slate-400" />
        <input
          type="number"
          min={1}
          max={12}
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className="w-full bg-transparent text-sm outline-none text-slate-600 dark:text-slate-300"
        />
      </label>

      <button type="submit" className="btn-primary w-full lg:w-auto">
        <Search size={16} /> Search
      </button>
    </form>
  )
}
