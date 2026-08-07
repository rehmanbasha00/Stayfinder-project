import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Menu, X, Hotel, User, Heart, LogOut, Moon, Sun, LayoutDashboard } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../hooks/useToast'
import { logout } from '../../store/slices/authSlice'
import { toggleDarkMode } from '../../store/slices/uiSlice'
import { useSelector } from 'react-redux'
import { ROUTES } from '../../utils/constants'

const NAV_LINKS = [
  { to: ROUTES.HOME, label: 'Home' },
  { to: ROUTES.SEARCH, label: 'Hotels' },
  { to: ROUTES.ABOUT, label: 'About' },
  { to: ROUTES.CONTACT, label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { isAuthenticated, user } = useAuth()
  const darkMode = useSelector((state) => state.ui.darkMode)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const toast = useToast()

  function handleLogout() {
    dispatch(logout())
    setMenuOpen(false)
    toast.success('Logged out successfully')
    navigate(ROUTES.HOME)
  }

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${isActive ? 'text-primary-600' : 'text-slate-600 hover:text-primary-600 dark:text-slate-300'}`

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
      <div className="container-app flex h-16 items-center justify-between">
        <Link to={ROUTES.HOME} className="flex items-center gap-2 font-extrabold text-slate-900 dark:text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-white">
            <Hotel size={18} />
          </span>
          Stayfinder
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass} end={l.to === ROUTES.HOME}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <button
            onClick={() => dispatch(toggleDarkMode())}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((o) => !o)}
                className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-primary-300 dark:border-slate-700 dark:text-slate-200"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">
                  {user?.name?.[0]?.toUpperCase() || 'U'}
                </span>
                {user?.name?.split(' ')[0]}
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-52 animate-scaleIn rounded-xl border border-slate-100 bg-white p-1.5 shadow-card dark:border-slate-800 dark:bg-slate-900">
                  <Link to={ROUTES.DASHBOARD} onClick={() => setMenuOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800">
                    <LayoutDashboard size={16} /> Dashboard
                  </Link>
                  <Link to={ROUTES.MY_BOOKINGS} onClick={() => setMenuOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800">
                    <Hotel size={16} /> My Bookings
                  </Link>
                  <Link to={ROUTES.WISHLIST} onClick={() => setMenuOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800">
                    <Heart size={16} /> Wishlist
                  </Link>
                  <Link to={ROUTES.PROFILE} onClick={() => setMenuOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800">
                    <User size={16} /> Profile
                  </Link>
                  <hr className="my-1 border-slate-100 dark:border-slate-800" />
                  <button onClick={handleLogout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50">
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to={ROUTES.LOGIN} className="btn-ghost">Log in</Link>
              <Link to={ROUTES.REGISTER} className="btn-primary">Sign up</Link>
            </>
          )}
        </div>

        <button className="p-2 md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-100 px-4 py-3 md:hidden dark:border-slate-800 animate-slideUp">
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)} className={linkClass} end={l.to === ROUTES.HOME}>
                {l.label}
              </NavLink>
            ))}
            <hr className="border-slate-100 dark:border-slate-800" />
            {isAuthenticated ? (
              <>
                <Link to={ROUTES.DASHBOARD} onClick={() => setOpen(false)} className="text-sm font-medium text-slate-600 dark:text-slate-300">Dashboard</Link>
                <Link to={ROUTES.MY_BOOKINGS} onClick={() => setOpen(false)} className="text-sm font-medium text-slate-600 dark:text-slate-300">My Bookings</Link>
                <Link to={ROUTES.WISHLIST} onClick={() => setOpen(false)} className="text-sm font-medium text-slate-600 dark:text-slate-300">Wishlist</Link>
                <button onClick={handleLogout} className="text-left text-sm font-medium text-red-600">Logout</button>
              </>
            ) : (
              <div className="flex gap-2">
                <Link to={ROUTES.LOGIN} onClick={() => setOpen(false)} className="btn-outline flex-1">Log in</Link>
                <Link to={ROUTES.REGISTER} onClick={() => setOpen(false)} className="btn-primary flex-1">Sign up</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
