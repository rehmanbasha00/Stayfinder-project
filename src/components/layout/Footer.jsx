import { Link } from 'react-router-dom'
import { Hotel, Facebook, Twitter, Instagram } from 'lucide-react'
import { ROUTES } from '../../utils/constants'

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
      <div className="container-app grid gap-10 py-14 md:grid-cols-4">
        <div>
          <div className="mb-3 flex items-center gap-2 font-extrabold text-slate-900 dark:text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-white">
              <Hotel size={18} />
            </span>
            Stayfinder
          </div>
          <p className="text-sm text-slate-500">
            Premium stays, honest prices. Discover and book handpicked hotels across India in minutes.
          </p>
          <div className="mt-4 flex gap-3 text-slate-400">
            <Facebook size={18} className="cursor-pointer hover:text-primary-600" />
            <Twitter size={18} className="cursor-pointer hover:text-primary-600" />
            <Instagram size={18} className="cursor-pointer hover:text-primary-600" />
          </div>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">Company</h4>
          <ul className="space-y-2 text-sm text-slate-500">
            <li><Link to={ROUTES.ABOUT} className="hover:text-primary-600">About us</Link></li>
            <li><Link to={ROUTES.CONTACT} className="hover:text-primary-600">Contact</Link></li>
            <li><Link to={ROUTES.SEARCH} className="hover:text-primary-600">Careers</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">Support</h4>
          <ul className="space-y-2 text-sm text-slate-500">
            <li><Link to={ROUTES.CONTACT} className="hover:text-primary-600">Help center</Link></li>
            <li><Link to={ROUTES.CONTACT} className="hover:text-primary-600">Cancellation policy</Link></li>
            <li><Link to={ROUTES.CONTACT} className="hover:text-primary-600">Safety</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">Legal</h4>
          <ul className="space-y-2 text-sm text-slate-500">
            <li><span className="cursor-default">Terms of service</span></li>
            <li><span className="cursor-default">Privacy policy</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-100 py-5 text-center text-xs text-slate-400 dark:border-slate-800">
        © {new Date().getFullYear()} Stayfinder. All rights reserved.
      </div>
    </footer>
  )
}
