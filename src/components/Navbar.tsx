import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../store/appStore'
import logo from '../assets/logo.png'
import logoDark from '../assets/logo-dark.png'

export default function Navbar() {
  const { navigate, page, cartItems, setCartOpen, isLoggedIn, theme, toggleTheme } = useAppStore()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: 'Shop', page: 'shop' as const },
    { label: 'Care Guide', page: 'care-guide' as const },
    { label: 'About', page: 'about' as const },
  ]

  return (
    <>
      {/* Announcement bar */}
      <div
        className="text-center text-xs py-2 px-4 font-medium tracking-wide"
        style={{ background: 'var(--brand-green)', color: 'var(--brand-cream)' }}
      >
        🌿 Free shipping on orders over $60 &nbsp;·&nbsp; Expertly packed, guaranteed to arrive healthy
      </div>

      {/* Navbar */}
      <nav
        className="sticky top-0 z-[100] transition-all duration-300"
        style={{
          background: scrolled ? 'color-mix(in srgb, var(--brand-cream) 96%, transparent)' : 'var(--brand-cream)',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--brand-border)' : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => navigate('home')}
            className="flex items-center gap-2"
          >
            <img src={theme === 'dark' ? logoDark : logo} alt="Nabat Green" className="h-16 w-auto object-contain" />
          </button>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <button
                key={l.page}
                onClick={() => navigate(l.page)}
                className="text-sm font-medium transition-colors hover:opacity-70"
                style={{ color: page === l.page ? 'var(--brand-green)' : 'var(--brand-charcoal)' }}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.88, rotate: 15 }}
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[var(--brand-surface)] transition-colors overflow-hidden"
              aria-label="Toggle dark mode"
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === 'dark' ? (
                  <motion.svg
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[var(--brand-surface)] transition-colors"
              aria-label="Search"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
            </button>

            {/* Account */}
            <button
              onClick={() => navigate(isLoggedIn ? 'account' : 'login')}
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[var(--brand-surface)] transition-colors"
              aria-label="Account"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
            </button>

            {/* Cart */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setCartOpen(true)}
              className="relative w-9 h-9 rounded-full flex items-center justify-center hover:bg-[var(--brand-surface)] transition-colors"
              aria-label="Cart"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartCount > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 text-[10px] font-bold flex items-center justify-center rounded-full"
                  style={{ background: 'var(--brand-terracotta)', color: '#fff', minWidth: '18px', height: '18px' }}
                >
                  {cartCount}
                </span>
              )}
            </motion.button>

            {/* Mobile menu */}
            <button
              className="md:hidden w-9 h-9 rounded-full flex items-center justify-center hover:bg-[var(--brand-surface)]"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileOpen
                  ? <><path d="M18 6 6 18"/><path d="m6 6 12 12"/></>
                  : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t"
              style={{ borderColor: 'var(--brand-border)' }}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      navigate('shop')
                      setSearchOpen(false)
                    }
                  }}
                  placeholder="Search for plants..."
                  className="w-full bg-[var(--brand-surface)] rounded-xl px-4 py-2.5 text-sm outline-none"
                  style={{ color: 'var(--brand-charcoal)' }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden md:hidden border-t"
              style={{ borderColor: 'var(--brand-border)', background: 'var(--brand-cream)' }}
            >
              <div className="flex flex-col py-4 px-4 gap-1">
                {navLinks.map((l) => (
                  <button
                    key={l.page}
                    onClick={() => { navigate(l.page); setMobileOpen(false) }}
                    className="text-left py-3 text-base font-medium border-b"
                    style={{ borderColor: 'var(--brand-border)', color: 'var(--brand-charcoal)' }}
                  >
                    {l.label}
                  </button>
                ))}
                <button
                  onClick={() => { navigate(isLoggedIn ? 'account' : 'login'); setMobileOpen(false) }}
                  className="text-left py-3 text-base font-medium"
                  style={{ color: 'var(--brand-charcoal)' }}
                >
                  {isLoggedIn ? 'My Account' : 'Login / Register'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  )
}
