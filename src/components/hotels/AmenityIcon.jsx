import { Wifi, Waves, ParkingCircle, Coffee, Dumbbell, Sparkles, Snowflake, Martini, PawPrint, UtensilsCrossed } from 'lucide-react'

const ICONS = {
  wifi: { icon: Wifi, label: 'Free Wi-Fi' },
  pool: { icon: Waves, label: 'Pool' },
  parking: { icon: ParkingCircle, label: 'Parking' },
  breakfast: { icon: Coffee, label: 'Breakfast' },
  gym: { icon: Dumbbell, label: 'Gym' },
  spa: { icon: Sparkles, label: 'Spa' },
  ac: { icon: Snowflake, label: 'AC' },
  bar: { icon: Martini, label: 'Bar' },
  petFriendly: { icon: PawPrint, label: 'Pet Friendly' },
  restaurant: { icon: UtensilsCrossed, label: 'Restaurant' },
}

export default function AmenityIcon({ id, showLabel = false, size = 14 }) {
  const entry = ICONS[id]
  if (!entry) return null
  const Icon = entry.icon
  return (
    <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
      <Icon size={size} />
      {showLabel && entry.label}
    </span>
  )
}
