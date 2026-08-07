export function HotelCardSkeleton() {
  return (
    <div className="card overflow-hidden">
      <div className="skeleton h-48 w-full rounded-none" />
      <div className="space-y-3 p-4">
        <div className="skeleton h-4 w-3/4" />
        <div className="skeleton h-3 w-1/2" />
        <div className="flex gap-2">
          <div className="skeleton h-3 w-10" />
          <div className="skeleton h-3 w-10" />
          <div className="skeleton h-3 w-10" />
        </div>
        <div className="skeleton h-8 w-full" />
      </div>
    </div>
  )
}

export function TextSkeleton({ className = 'h-4 w-full' }) {
  return <div className={`skeleton ${className}`} />
}

export function DestinationSkeleton() {
  return <div className="skeleton h-64 w-full" />
}
