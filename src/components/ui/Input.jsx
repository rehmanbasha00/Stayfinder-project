import { forwardRef } from 'react'

const Input = forwardRef(function Input({ label, error, className = '', ...props }, ref) {
  return (
    <div className={className}>
      {label && <label className="label">{label}</label>}
      <input ref={ref} className={`input ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : ''}`} {...props} />
      {error && <p className="mt-1 text-xs font-medium text-red-500">{error}</p>}
    </div>
  )
})

export default Input
