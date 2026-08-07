import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { CheckCircle2, XCircle, Info, X } from 'lucide-react'
import { removeToast } from '../../store/slices/uiSlice'

const STYLES = {
  success: { icon: CheckCircle2, classes: 'border-emerald-200 bg-emerald-50 text-emerald-800' },
  error: { icon: XCircle, classes: 'border-red-200 bg-red-50 text-red-800' },
  info: { icon: Info, classes: 'border-primary-200 bg-primary-50 text-primary-800' },
}

function ToastItem({ toast }) {
  const dispatch = useDispatch()
  const { icon: Icon, classes } = STYLES[toast.type] || STYLES.info

  useEffect(() => {
    const t = setTimeout(() => dispatch(removeToast(toast.id)), 3500)
    return () => clearTimeout(t)
  }, [toast.id, dispatch])

  return (
    <div className={`flex items-start gap-2.5 rounded-xl border px-4 py-3 shadow-card animate-slideUp ${classes}`}>
      <Icon size={18} className="mt-0.5 shrink-0" />
      <p className="text-sm font-medium">{toast.message}</p>
      <button onClick={() => dispatch(removeToast(toast.id))} className="ml-auto shrink-0 opacity-60 hover:opacity-100">
        <X size={14} />
      </button>
    </div>
  )
}

export default function ToastContainer() {
  const toasts = useSelector((state) => state.ui.toasts)
  if (!toasts.length) return null
  return (
    <div className="fixed bottom-4 right-4 z-[100] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} />
      ))}
    </div>
  )
}
