import { PRICE_MAX } from '../../utils/constants'
import StarRating from '../ui/StarRating'
import { formatCurrency } from '../../utils/formatters'

export default function Filters({ filters, onChange, onClear }) {
  return (
    <aside className="card h-fit space-y-6 p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-slate-900 dark:text-white">Filters</h3>
        <button onClick={onClear} className="text-xs font-medium text-primary-600 hover:underline">
          Clear all
        </button>
      </div>

      <div>
        <p className="label">Max price / night</p>
        <input
          type="range"
          min={1000}
          max={PRICE_MAX}
          step={500}
          value={filters.maxPrice ?? PRICE_MAX}
          onChange={(e) => onChange({ maxPrice: Number(e.target.value) })}
          className="w-full accent-primary-600"
        />
        <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-300">
          Up to {formatCurrency(filters.maxPrice ?? PRICE_MAX)}
        </p>
      </div>

      <div>
        <p className="label">Minimum rating</p>
        <div className="flex flex-wrap gap-2">
          {[3, 3.5, 4, 4.5].map((r) => (
            <button
              key={r}
              onClick={() => onChange({ minRating: filters.minRating === r ? undefined : r })}
              className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium transition ${
                filters.minRating === r
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-slate-200 text-slate-500 hover:border-primary-300 dark:border-slate-700'
              }`}
            >
              {r}+ <StarRating rating={1} size={10} />
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="label">Guests</p>
        <select
          value={filters.guests || ''}
          onChange={(e) => onChange({ guests: e.target.value ? Number(e.target.value) : undefined })}
          className="input"
        >
          <option value="">Any</option>
          {[1, 2, 3, 4].map((g) => (
            <option key={g} value={g}>
              {g}+ guests
            </option>
          ))}
        </select>
      </div>
    </aside>
  )
}
