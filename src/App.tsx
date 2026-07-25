import { useEffect } from 'react'
import { useAppStore } from './store/appStore'
import Navbar from './components/Navbar'
import CartDrawer from './components/CartDrawer'
import Footer from './components/Footer'
import Toast from './components/Toast'
import ProductCard from './components/ProductCard'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CheckoutPage from './pages/CheckoutPage'
import LoginPage from './pages/LoginPage'
import AccountPage from './pages/AccountPage'
import CareGuidePage from './pages/CareGuidePage'
import AdminDashboard from './pages/AdminDashboard'
import { products } from './data/products'
import { AnimatePresence, motion } from 'framer-motion'

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const { page, theme } = useAppStore()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const isAdmin = page === 'admin'

  if (isAdmin) {
    return (
      <>
        <AdminDashboard />
        <Toast />
      </>
    )
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--brand-cream)' }}>
      <Navbar />
      <CartDrawer />
      <Toast />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          {page === 'home' && (
            <PageTransition key="home">
              <HomePage />
            </PageTransition>
          )}

          {page === 'shop' && (
            <PageTransition key="shop">
              <ShopPage />
            </PageTransition>
          )}

          {page === 'product' && (
            <PageTransition key="product">
              <ProductDetailPage />
            </PageTransition>
          )}

          {page === 'checkout' && (
            <PageTransition key="checkout">
              <CheckoutPage />
            </PageTransition>
          )}

          {page === 'order-success' && (
            <PageTransition key="order-success">
              <CheckoutPage />
            </PageTransition>
          )}

          {page === 'login' && (
            <PageTransition key="login">
              <LoginPage />
            </PageTransition>
          )}

          {page === 'register' && (
            <PageTransition key="register">
              <LoginPage />
            </PageTransition>
          )}

          {page === 'account' && (
            <PageTransition key="account">
              <AccountPage />
            </PageTransition>
          )}

          {page === 'care-guide' && (
            <PageTransition key="care-guide">
              <CareGuidePage />
            </PageTransition>
          )}

          {page === 'about' && (
            <PageTransition key="about">
              <AboutPage />
            </PageTransition>
          )}

          {page === 'wishlist' && (
            <PageTransition key="wishlist">
              <WishlistPage />
            </PageTransition>
          )}
        </AnimatePresence>
      </main>

      {page !== 'admin' && <Footer />}
    </div>
  )
}

function AboutPage() {
  const { navigate } = useAppStore()

  const timeline = [
    { year: '2021', title: 'A spare bedroom, 12 pots', body: 'Founder Mara Lindqvist started propagating cuttings for coworkers tired of dead desk succulents. Word spread across three floors in a month.' },
    { year: '2022', title: 'First warehouse, first care guides', body: 'Demand outgrew the apartment. We leased a 2,000 sq ft grow space and wrote our first plant-care handbook so every order shipped with instructions that actually worked.' },
    { year: '2023', title: 'Healthy-arrival guarantee launches', body: 'After too many plants arriving cold-shocked, we redesigned packaging from scratch — and backed it with a no-questions-asked replacement promise.' },
    { year: '2024', title: '40+ varieties, nationwide shipping', body: 'We expanded curation to cover every light condition and care level, from beginner pothos to advanced fiddle-leaf figs.' },
    { year: '2025', title: '2,000+ desks and counting', body: "Today we're a small, plant-obsessed team shipping to home offices and startups across the country." },
  ]

  const values = [
    { icon: '🎯', title: 'Our Mission', body: 'To make it easy for anyone — whether they have a green thumb or not — to bring the calm, focus, and beauty of plants into their working life.' },
    { icon: '📦', title: 'Our Promise', body: 'Every plant ships Monday–Thursday to avoid weekend depot delays. Arrives healthy, or we replace it. No questions asked.' },
    { icon: '🔬', title: 'Expert Curation', body: "We test every variety in real office conditions before listing it. If it doesn't thrive on a desk, it doesn't make the cut." },
    { icon: '🌎', title: 'Sustainable Packing', body: 'All packaging is 100% plastic-free, compostable, and made from recycled materials. Our boxes are printed with soy-based inks.' },
  ]

  const team = [
    { name: 'Mara Lindqvist', role: 'Founder & Head Grower', avatar: '🌿' },
    { name: 'Devon Osei', role: 'Plant Care Lead', avatar: '🪴' },
    { name: 'Priya Nair', role: 'Packing & Logistics', avatar: '📦' },
    { name: 'Sam Torres', role: 'Customer Happiness', avatar: '💬' },
  ]

  return (
    <div className="px-4 sm:px-6">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto text-center pt-16 pb-12"
      >
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--brand-terracotta)' }}>Our Story</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Fraunces, serif' }}>
          Rooted in passion
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--brand-warm-gray)' }}>
          Desk Plant started in 2021 from a spare bedroom and a deep belief that every workspace deserves a living thing.
          Four years later, we're still run by people who'd rather talk about soil drainage than spreadsheets.
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto rounded-3xl overflow-hidden mb-16" style={{ aspectRatio: '16/7', background: 'var(--brand-surface)' }}>
        <img
          src="https://images.unsplash.com/photo-1760278042149-bbed9b84ba81?w=1200&h=525&fit=crop&auto=format"
          alt="Desk with plant setup"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Stats */}
      <div className="max-w-3xl mx-auto grid grid-cols-3 gap-4 mb-16">
        {[
          { value: '2,000+', label: 'Desks Reached' },
          { value: '98%', label: 'Arrive Healthy' },
          { value: '40+', label: 'Plant Varieties' },
        ].map((s) => (
          <motion.div
            key={s.label}
            whileHover={{ y: -4 }}
            className="text-center p-5 rounded-2xl border"
            style={{ borderColor: 'var(--brand-border)' }}
          >
            <p className="text-2xl md:text-3xl font-bold mb-1" style={{ fontFamily: 'Fraunces, serif', color: 'var(--brand-green)' }}>{s.value}</p>
            <p className="text-xs uppercase tracking-wide" style={{ color: 'var(--brand-warm-gray)' }}>{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Values grid */}
      <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6 mb-20">
        {values.map((c) => (
          <motion.div
            key={c.title}
            whileHover={{ y: -4, borderColor: 'var(--brand-green)' }}
            className="p-5 rounded-2xl border"
            style={{ borderColor: 'var(--brand-border)' }}
          >
            <span className="text-2xl block mb-2">{c.icon}</span>
            <h3 className="font-semibold mb-2" style={{ fontFamily: 'Fraunces, serif' }}>{c.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--brand-warm-gray)' }}>{c.body}</p>
          </motion.div>
        ))}
      </div>

      {/* Timeline */}
      <div className="max-w-3xl mx-auto mb-20">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--brand-terracotta)' }}>How We Got Here</p>
          <h2 className="text-3xl font-bold" style={{ fontFamily: 'Fraunces, serif' }}>Five years, one root system</h2>
        </div>
        <div className="relative pl-8" style={{ borderLeft: '2px solid var(--brand-border)' }}>
          {timeline.map((t, i) => (
            <motion.div
              key={t.year}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="relative pb-10 last:pb-0"
            >
              <span
                className="absolute -left-[calc(2rem+5px)] top-1 w-3 h-3 rounded-full"
                style={{ background: 'var(--brand-green)' }}
              />
              <p className="text-sm font-bold mb-1" style={{ color: 'var(--brand-terracotta)' }}>{t.year}</p>
              <h3 className="font-semibold mb-1.5" style={{ fontFamily: 'Fraunces, serif' }}>{t.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--brand-warm-gray)' }}>{t.body}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="max-w-3xl mx-auto mb-20">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--brand-terracotta)' }}>Meet The Team</p>
          <h2 className="text-3xl font-bold" style={{ fontFamily: 'Fraunces, serif' }}>Small team, big roots</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {team.map((m) => (
            <motion.div key={m.name} whileHover={{ y: -4 }} className="text-center">
              <div
                className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center text-2xl"
                style={{ background: 'var(--brand-surface)' }}
              >
                {m.avatar}
              </div>
              <p className="font-semibold text-sm" style={{ fontFamily: 'Fraunces, serif' }}>{m.name}</p>
              <p className="text-xs" style={{ color: 'var(--brand-warm-gray)' }}>{m.role}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="text-center pb-20">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('shop')}
          className="px-8 py-3.5 rounded-full font-semibold text-sm"
          style={{ background: 'var(--brand-green)', color: 'var(--brand-cream)' }}
        >
          Shop Our Plants →
        </motion.button>
      </div>
    </div>
  )
}

function WishlistPage() {
  const { wishlist, navigate } = useAppStore()
  const wishlisted = products.filter((p) => wishlist.includes(p.id))

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold mb-8" style={{ fontFamily: 'Fraunces, serif' }}>My Wishlist</h1>
      {wishlisted.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-6xl block mb-4">🤍</span>
          <h2 className="text-xl font-semibold mb-3" style={{ fontFamily: 'Fraunces, serif' }}>Your wishlist is empty</h2>
          <button onClick={() => navigate('shop')} className="px-6 py-3 rounded-full text-sm font-semibold" style={{ background: 'var(--brand-green)', color: 'var(--brand-cream)' }}>
            Discover Plants
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {wishlisted.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}
