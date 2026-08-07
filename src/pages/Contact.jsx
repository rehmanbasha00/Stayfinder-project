import { useState } from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { useToast } from '../hooks/useToast'

export default function Contact() {
  const toast = useToast()
  const [submitting, setSubmitting] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      toast.success('Message sent! We will get back to you shortly.')
      e.target.reset()
    }, 900)
  }

  return (
    <div className="container-app py-14">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="section-title">Get in touch</h1>
        <p className="mt-2 text-sm text-slate-500">Have a question about a booking or partnership? We'd love to hear from you.</p>
      </div>

      <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-[1fr_1.2fr]">
        <div className="space-y-5">
          {[
            { icon: Mail, label: 'Email', value: 'support@stayfinder.app' },
            { icon: Phone, label: 'Phone', value: '+91 98765 43210' },
            { icon: MapPin, label: 'Office', value: 'Bengaluru, Karnataka, India' },
          ].map((c) => (
            <div key={c.label} className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-slate-800">
                <c.icon size={18} />
              </span>
              <div>
                <p className="text-xs text-slate-400">{c.label}</p>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{c.value}</p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="card space-y-4 p-6">
          <Input label="Full name" required placeholder="Your name" />
          <Input label="Email" type="email" required placeholder="you@example.com" />
          <div>
            <label className="label">Message</label>
            <textarea required rows={4} className="input" placeholder="How can we help?" />
          </div>
          <Button type="submit" loading={submitting} className="w-full">Send message</Button>
        </form>
      </div>
    </div>
  )
}
