import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { updateUserProfile } from '../store/slices/authSlice'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'
import { emailPattern } from '../utils/validators'

export default function Profile() {
  const { user } = useAuth()
  const dispatch = useDispatch()
  const toast = useToast()
  const status = useSelector((state) => state.auth.status)

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { name: user?.name || '', email: user?.email || '', phone: user?.phone || '' },
  })

  useEffect(() => {
    reset({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '' })
  }, [user, reset])

  async function onSubmit(data) {
    const result = await dispatch(updateUserProfile({ userId: user.id, updates: data }))
    if (updateUserProfile.fulfilled.match(result)) {
      toast.success('Profile updated')
    } else {
      toast.error(result.payload || 'Could not update profile')
    }
  }

  return (
    <div className="container-app py-10">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Profile settings</h1>
      <p className="mt-1 text-sm text-slate-500">Update your personal information</p>

      <form onSubmit={handleSubmit(onSubmit)} className="card mt-6 max-w-lg space-y-4 p-6">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-xl font-bold text-primary-700">
            {user?.name?.[0]?.toUpperCase()}
          </span>
          <div>
            <p className="font-semibold text-slate-800 dark:text-slate-100">{user?.name}</p>
            <p className="text-xs text-slate-500">{user?.email}</p>
          </div>
        </div>
        <Input label="Full name" {...register('name', { required: true })} />
        <Input label="Email" type="email" {...register('email', { required: true, pattern: emailPattern })} />
        <Input label="Phone number" {...register('phone')} />
        <Button type="submit" loading={status === 'loading'}>Save changes</Button>
      </form>
    </div>
  )
}
