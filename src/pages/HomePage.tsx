import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { products, categories, reviews } from '../data/products'
import ProductCard from '../components/ProductCard'
import { useAppStore } from '../store/appStore'

const HERO_IMG = 'https://images.unsplash.com/photo-1760278042149-bbed9b84ba81?w=900&h=900&fit=crop&auto=format'
const CARE_GUIDE_IMG = 'https://images.unsplash.com/photo-1736844867059-fc66466c67f9?w=1400&h=600&fit=crop&auto=format'

const benefits = [
  {
    icon: '🧠',
    title: 'Boosts Focus',
    desc: 'Studies show plants reduce mental fatigue by up to 38% in workspace settings.',
  },
  {
    icon: '💨',
    title: 'Purifies Air',
    desc: 'Certain species filter VOCs like benzene and formaldehyde from indoor air.',
  },
  {
    icon: '😌',
    title: 'Reduces Stress',
    desc: 'Caring for a plant lowers cortisol and creates moments of mindful calm.',
  },
  {
    icon: '🎨',
    title: 'Elevates Space',
    desc: 'A single plant transforms a bare desk into a considered, personal space.',
  },
]

function CountUp({ end, suffix = '' }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  if (inView && count === 0 && end > 0) {
    let start = 0
    const increment = end / 40
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 30)
  }

  return <span ref={ref}>{inView ? (count || end) : 0}{suffix}</span>
}

export default function HomePage() {
  const { navigate } = useAppStore()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const bestSellers = products.filter((p) => p.isBestSeller)

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (email) setSubscribed(true)
  }

  return (
    <div>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 md:order-1"
          >
            <span
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6"
              style={{ background: 'var(--brand-surface)', color: 'var(--brand-green)' }}
            >
              🌱 Small plants, big difference
            </span>
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6"
              style={{ fontFamily: 'Fraunces, serif', color: 'var(--brand-charcoal)' }}
            >
              Bring your
              <br />
              <em className="not-italic" style={{ color: 'var(--brand-green)' }}>desk to life</em>
            </h1>
            <p className="text-lg leading-relaxed mb-8 max-w-md" style={{ color: 'var(--brand-warm-gray)' }}>
              Thoughtfully curated, low-maintenance indoor plants that thrive on office desks. Expertly packed and delivered to your door.
            </p>
            <div className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('shop')}
                className="px-7 py-3.5 rounded-full font-semibold text-sm shadow-lg transition-all"
                style={{ background: 'var(--brand-green)', color: 'var(--brand-cream)', boxShadow: '0 8px 24px rgba(15,76,54,0.25)' }}
              >
                Shop Plants →
              </motion.button>
              <button
                onClick={() => navigate('care-guide')}
                className="px-7 py-3.5 rounded-full font-semibold text-sm border-2 transition-all hover:bg-[var(--brand-green)] hover:text-[var(--brand-cream)]"
                style={{ borderColor: 'var(--brand-green)', color: 'var(--brand-green)' }}
              >
                Care Guide
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-10 pt-8 border-t" style={{ borderColor: 'var(--brand-border)' }}>
              {[
                { val: 2000, suffix: '+', label: 'Happy Customers' },
                { val: 98, suffix: '%', label: 'Arrive Healthy' },
                { val: 40, suffix: '+', label: 'Plant Varieties' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold" style={{ fontFamily: 'Fraunces, serif', color: 'var(--brand-green)' }}>
                    <CountUp end={s.val} suffix={s.suffix} />
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--brand-warm-gray)' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="order-1 md:order-2 relative"
          >
            <div className="relative rounded-3xl overflow-hidden" style={{ aspectRatio: '1/1', background: 'var(--brand-surface)' }}>
              <img
                src={HERO_IMG}
                alt="Modern workspace with desk plant"
                className="w-full h-full object-cover"
              />
              {/* floating badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-6 left-6 flex items-center gap-3 px-4 py-3 rounded-2xl"
                style={{ background: 'var(--brand-cream)', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}
              >
                <span className="text-2xl">⭐</span>
                <div>
                  <p className="font-bold text-sm" style={{ color: 'var(--brand-charcoal)' }}>4.9 / 5.0</p>
                  <p className="text-xs" style={{ color: 'var(--brand-warm-gray)' }}>2,000+ reviews</p>
                </div>
              </motion.div>
              {/* Free shipping badge */}
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.65 }}
                className="absolute top-6 right-6 px-3 py-2 rounded-xl text-xs font-semibold"
                style={{ background: 'var(--brand-green)', color: 'var(--brand-cream)' }}
              >
                🚚 Free over $60
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── CATEGORY GRID ────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--brand-terracotta)' }}>Browse by Type</p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'Fraunces, serif' }}>
              Find your match
            </h2>
          </div>
          <button onClick={() => navigate('shop')} className="text-sm font-medium hidden sm:block hover:underline" style={{ color: 'var(--brand-green)' }}>
            View all →
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              whileHover={{ y: -4 }}
              onClick={() => navigate('shop')}
              className="relative overflow-hidden rounded-2xl text-left group"
              style={{ aspectRatio: '4/5', background: 'var(--brand-surface)' }}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-semibold" style={{ fontFamily: 'Fraunces, serif' }}>{cat.name}</p>
                <p className="text-white/70 text-xs mt-0.5">{cat.count} plants</p>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* ─── BEST SELLERS CAROUSEL ───────────────────────────── */}
      <section className="py-16" style={{ background: 'var(--brand-surface)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--brand-terracotta)' }}>Most Loved</p>
              <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'Fraunces, serif' }}>Best Sellers</h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => { const el = scrollRef.current; if (el) el.scrollBy({ left: -280, behavior: 'smooth' }) }}
                className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-[var(--brand-green)] hover:text-[var(--brand-cream)] hover:border-[var(--brand-green)] transition-all"
                style={{ borderColor: 'var(--brand-border)' }}
              >
                ←
              </button>
              <button
                onClick={() => { const el = scrollRef.current; if (el) el.scrollBy({ left: 280, behavior: 'smooth' }) }}
                className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-[var(--brand-green)] hover:text-[var(--brand-cream)] hover:border-[var(--brand-green)] transition-all"
                style={{ borderColor: 'var(--brand-border)' }}
              >
                →
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4 snap-x"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {bestSellers.map((p) => (
              <div key={p.id} className="snap-start flex-shrink-0 w-[240px] sm:w-[280px]">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY DESK PLANTS ──────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--brand-terracotta)' }}>The Science</p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'Fraunces, serif' }}>
            Why every desk needs a plant
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.45 }}
              className="p-6 rounded-2xl border"
              style={{ borderColor: 'var(--brand-border)', background: 'var(--card)' }}
            >
              <span className="text-4xl block mb-4">{b.icon}</span>
              <h3 className="font-semibold text-lg mb-2" style={{ fontFamily: 'Fraunces, serif', color: 'var(--brand-charcoal)' }}>{b.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--brand-warm-gray)' }}>{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--brand-terracotta)' }}>Staff Picks</p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'Fraunces, serif' }}>
              Our favourites
            </h2>
          </div>
          <button onClick={() => navigate('shop')} className="text-sm font-medium hidden sm:block hover:underline" style={{ color: 'var(--brand-green)' }}>
            See all plants →
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
          {products.filter((p) => p.isFeatured).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ─── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="py-20" style={{ background: 'var(--brand-surface)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--brand-terracotta)' }}>Kind Words</p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'Fraunces, serif' }}>
              Plants that speak for themselves
            </h2>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {reviews.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="break-inside-avoid p-6 rounded-2xl"
                style={{ background: 'var(--card)', border: '1px solid var(--brand-border)' }}
              >
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map((s) => (
                    <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill={s <= r.rating ? 'var(--brand-terracotta)' : 'var(--brand-border)'}>
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--brand-charcoal)' }}>"{r.comment}"</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: 'var(--brand-green)', color: 'var(--brand-cream)' }}
                  >
                    {r.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{r.name}</p>
                    <p className="text-xs" style={{ color: 'var(--brand-warm-gray)' }}>{r.product} · {r.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CARE GUIDE BANNER ────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl"
          style={{ background: 'var(--brand-green)' }}
        >
          <img
            src={CARE_GUIDE_IMG}
            alt="Person watering an indoor plant"
            className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity"
          />
          <div className="relative px-8 md:px-16 py-14 md:py-20 flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1 text-center md:text-left">
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--brand-terracotta)' }}>
                Free Resource
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Fraunces, serif', color: 'var(--brand-cream)' }}>
                Your complete plant care guide
              </h2>
              <p className="text-base leading-relaxed max-w-lg" style={{ color: 'rgba(250,247,242,0.75)' }}>
                From watering schedules to light requirements, pest prevention, and propagation — everything you need to keep your plants thriving.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('care-guide')}
              className="flex-shrink-0 px-8 py-4 rounded-full font-semibold text-sm"
              style={{ background: 'var(--brand-cream)', color: 'var(--brand-green)' }}
            >
              Read the Guide →
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* ─── NEWSLETTER ───────────────────────────────────────── */}
      <section className="py-20" style={{ background: 'var(--brand-surface)' }}>
        <div className="max-w-xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-5xl block mb-4">🌿</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: 'Fraunces, serif' }}>
            Grow with us
          </h2>
          <p className="mb-8" style={{ color: 'var(--brand-warm-gray)' }}>
            Weekly plant care tips, new arrivals first look, and exclusive subscriber-only offers.
          </p>

          {subscribed ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center gap-3"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="text-6xl"
              >
                ✅
              </motion.span>
              <p className="font-semibold" style={{ fontFamily: 'Fraunces, serif', color: 'var(--brand-green)' }}>
                You're in! Check your inbox.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-5 py-3 rounded-full border text-sm outline-none focus:ring-2"
                style={{ borderColor: 'var(--brand-border)', background: 'var(--card)', '--tw-ring-color': 'var(--brand-green)' } as React.CSSProperties}
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full font-semibold text-sm whitespace-nowrap transition-all hover:opacity-90"
                style={{ background: 'var(--brand-green)', color: 'var(--brand-cream)' }}
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
