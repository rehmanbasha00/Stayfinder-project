import { useEffect, useState } from 'react'
import { useNavigate, useParams, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Check } from 'lucide-react'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { setDraft, createBooking } from '../store/slices/bookingSlice'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'
import { formatCurrency, nightsBetween } from '../utils/formatters'
import { isFutureDate } from '../utils/validators'

const STEPS = ['Dates', 'Guest details', 'Summary']

export default function Booking() {
  const { hotelId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const toast = useToast()
  const { user } = useAuth()
  const { draft, createStatus } = useSelector((state) => state.booking)
  const [step, setStep] = useState(0)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      checkIn: draft?.checkIn || '',
      checkOut: draft?.checkOut || '',
      guests: draft?.guests || 2,
      fullName: user?.name || '',
      email: user?.email || '',
      phone: '',
      requests: '',
    },
  })

  const values = watch()

  useEffect(() => {
    if (draft?.hotelId !== hotelId) return
  }, [draft, hotelId])

  if (!draft || draft.hotelId !== hotelId) {
    return <Navigate to={`/hotels/${hotelId}`} replace />
  }

  const nights = nightsBetween(values.checkIn, values.checkOut)
  const subtotal = nights * draft.room.price
  const taxes = Math.round(subtotal * 0.12)
  const total = subtotal + taxes

  function nextFromDates() {
    if (!values.checkIn || !values.checkOut) {
      toast.error('Please select check-in and check-out dates')
      return
    }
    if (!isFutureDate(values.checkIn)) {
      toast.error('Check-in date must be today or later')
      return
    }
    if (new Date(values.checkOut) <= new Date(values.checkIn)) {
      toast.error('Check-out must be after check-in')
      return
    }
    dispatch(setDraft({ checkIn: values.checkIn, checkOut: values.checkOut, guests: values.guests }))
    setStep(1)
  }

  async function confirmBooking() {
    const result = await dispatch(
      createBooking({
        userId: user.id,
        hotelId: draft.hotelId,
        hotelName: draft.hotelName,
        hotelImage: draft.hotelImage,
        room: draft.room,
        checkIn: values.checkIn,
        checkOut: values.checkOut,
        guests: values.guests,
        guestDetails: { fullName: values.fullName, email: values.email, phone: values.phone, requests: values.requests },
        nights,
        subtotal,
        taxes,
        total,
      })
    )
    if (createBooking.fulfilled.match(result)) {
      toast.success('Booking confirmed!')
      navigate(`/booking/confirmation/${result.payload.id}`)
    } else {
      toast.error(result.payload || 'Could not complete booking')
    }
  }

  return (
    <div className="container-app py-8">
      {/* Stepper */}
      <div className="mb-8 flex items-center justify-center gap-4">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition ${
                i < step ? 'bg-primary-600 text-white' : i === step ? 'bg-primary-100 text-primary-700 ring-2 ring-primary-500' : 'bg-slate-100 text-slate-400'
              }`}
            >
              {i < step ? <Check size={14} /> : i + 1}
            </div>
            <span className={`hidden text-sm sm:block ${i === step ? 'font-semibold text-slate-800 dark:text-slate-100' : 'text-slate-400'}`}>{label}</span>
            {i < STEPS.length - 1 && <div className="h-px w-8 bg-slate-200 dark:bg-slate-700" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
        <div className="card p-6">
          {step === 0 && (
            <div className="space-y-4 animate-fadeIn">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Select your dates</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input label="Check-in" type="date" {...register('checkIn')} />
                <Input label="Check-out" type="date" {...register('checkOut')} />
              </div>
              <Input label="Guests" type="number" min={1} max={draft.room.capacity} {...register('guests')} />
              <Button onClick={nextFromDates} className="w-full sm:w-auto">Continue</Button>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Guest details</h2>
              <Input label="Full name" error={errors.fullName?.message} {...register('fullName', { required: 'Required' })} />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input label="Email" type="email" error={errors.email?.message} {...register('email', { required: 'Required' })} />
                <Input label="Phone number" error={errors.phone?.message} {...register('phone', { required: 'Required' })} />
              </div>
              <div>
                <label className="label">Special requests (optional)</label>
                <textarea rows={3} className="input" {...register('requests')} />
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(0)}>Back</Button>
                <Button
                  onClick={handleSubmit(() => setStep(2))}
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Review &amp; confirm</h2>
              <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <p><strong>Guest:</strong> {values.fullName} · {values.email} · {values.phone}</p>
                <p><strong>Dates:</strong> {values.checkIn} → {values.checkOut} ({nights} night{nights > 1 ? 's' : ''})</p>
                <p><strong>Room:</strong> {draft.room.name}</p>
                <p><strong>Guests:</strong> {values.guests}</p>
                {values.requests && <p><strong>Requests:</strong> {values.requests}</p>}
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                <Button onClick={confirmBooking} loading={createStatus === 'loading'}>Confirm booking</Button>
              </div>
            </div>
          )}
        </div>

        {/* Summary */}
        <aside className="card h-fit space-y-4 p-5">
          <div className="flex gap-3">
            <img src={draft.hotelImage} alt="" className="h-16 w-20 rounded-lg object-cover" />
            <div>
              <p className="font-semibold text-slate-800 dark:text-slate-100">{draft.hotelName}</p>
              <p className="text-xs text-slate-500">{draft.room.name}</p>
            </div>
          </div>
          <hr className="border-slate-100 dark:border-slate-800" />
          <div className="space-y-1.5 text-sm text-slate-600 dark:text-slate-300">
            <div className="flex justify-between"><span>{formatCurrency(draft.room.price)} × {nights || 0} nights</span><span>{formatCurrency(subtotal)}</span></div>
            <div className="flex justify-between"><span>Taxes &amp; fees</span><span>{formatCurrency(taxes)}</span></div>
          </div>
          <hr className="border-slate-100 dark:border-slate-800" />
          <div className="flex justify-between font-bold text-slate-900 dark:text-white">
            <span>Total</span><span>{formatCurrency(total)}</span>
          </div>
        </aside>
      </div>
    </div>
  )
}
