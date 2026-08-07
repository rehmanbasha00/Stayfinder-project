import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'
import Button from '../components/ui/Button'
import { ROUTES } from '../utils/constants'

export default function NotFound() {
  return (
    <div className="container-app flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center text-center">
      <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary-600 dark:bg-slate-800">
        <Compass size={30} />
      </span>
      <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white">404</h1>
      <p className="mt-2 text-slate-500">Looks like this page wandered off the map.</p>
      <Link to={ROUTES.HOME} className="mt-6">
        <Button>Back to home</Button>
      </Link>
    </div>
  )
}
