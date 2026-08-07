import { Star } from 'lucide-react'

export default function StarRating({ rating = 0, size = 16, interactive = false, onChange }) {
  const stars = [1, 2, 3, 4, 5]
  return (
    <div className="flex items-center gap-0.5">
      {stars.map((s) => (
        <Star
          key={s}
          size={size}
          onClick={() => interactive && onChange?.(s)}
          className={`${s <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200 dark:fill-slate-700 dark:text-slate-700'} ${interactive ? 'cursor-pointer transition hover:scale-110' : ''}`}
        />
      ))}
    </div>
  )
}
