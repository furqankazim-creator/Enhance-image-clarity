import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { products, reviews } from '../data/products'
import ProductCard from '../components/ProductCard'
import { useAppStore } from '../store/appStore'

export default function ProductDetailPage() {
  const { selectedProduct, addToCart, navigate, toggleWishlist, wishlist } = useAppStore()
  const product = selectedProduct ?? products[0]

  const [activeImage, setActiveImage] = useState(0)
  const [qty, setQty] = useState(1)
  const [withPot, setWithPot] = useState(false)
  const [openAccordion, setOpenAccordion] = useState<string | null>('description')
  const isWishlisted = wishlist.includes(product.id)

  const price = withPot
    ? ((product.salePrice ?? product.price) + 15)
    : (product.salePrice ?? product.price)

  const related = products.filter((p) => p.id !== product.id && p.category.some((c) => product.category.includes(c))).slice(0, 4)

  const accordionSections = [
    {
      id: 'description',
      label: 'Description',
      content: product.description,
    },
    {
      id: 'care',
      label: 'Care Instructions',
      content: `Water: ${product.careLevel === 'Easy' ? 'Every 2–3 weeks, allow soil to dry out completely between waterings.' : 'Every 1–2 weeks, keep soil lightly moist but never waterlogged.'}\n\nLight: ${product.lightRequirement === 'Low' ? 'Thrives in low light — perfect for spaces away from direct sun.' : product.lightRequirement === 'Medium' ? 'Prefers bright indirect light near a window but away from direct sun.' : 'Needs bright indirect light — a south or east-facing windowsill is ideal.'}\n\nTemperature: Keep between 15–30°C. Avoid cold draughts and heating vents.\n\nFeeding: A balanced liquid fertiliser once a month during spring and summer.\n\nPotting: Re-pot every 1–2 years in spring when roots fill the current pot.`,
    },
    {
      id: 'shipping',
      label: 'Shipping & Returns',
      content: 'We ship Monday–Thursday to ensure plants don\'t sit in delivery depots over the weekend. Orders placed by 2pm dispatch same day.\n\nStandard delivery: 2–4 working days. Free on orders over £60.\n\nAll plants are guaranteed to arrive healthy. If your plant arrives damaged, photograph it and contact us within 48 hours — we\'ll send a replacement or refund, no questions asked.',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-14">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-8" style={{ color: 'var(--brand-warm-gray)' }}>
        <button onClick={() => navigate('home')} className="hover:underline">Home</button>
        <span>/</span>
        <button onClick={() => navigate('shop')} className="hover:underline">Shop</button>
        <span>/</span>
        <span style={{ color: 'var(--brand-charcoal)' }}>{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-10 lg:gap-16 mb-20">
        {/* ── Gallery ── */}
        <div>
          {/* Main image */}
          <div
            className="relative rounded-3xl overflow-hidden mb-3"
            style={{ aspectRatio: '5/6', background: 'var(--brand-surface)' }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                src={product.images[activeImage]}
                alt={product.name}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            {product.salePrice && (
              <span
                className="absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full"
                style={{ background: 'var(--brand-terracotta)', color: '#fff' }}
              >
                SALE
              </span>
            )}
            <motion.button
              whileTap={{ scale: 0.88 }}
              onClick={() => toggleWishlist(product.id)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill={isWishlisted ? 'var(--brand-terracotta)' : 'none'} stroke={isWishlisted ? 'var(--brand-terracotta)' : 'var(--brand-charcoal)'} strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </motion.button>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className="relative rounded-xl overflow-hidden flex-shrink-0 transition-all"
                style={{
                  width: 72,
                  height: 88,
                  background: 'var(--brand-surface)',
                  outline: activeImage === i ? '2px solid var(--brand-green)' : '2px solid transparent',
                  outlineOffset: '2px',
                }}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* ── Product info ── */}
        <div>
          {/* Category tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {product.category.map((c) => (
              <span
                key={c}
                className="text-xs font-medium px-2.5 py-1 rounded-full"
                style={{ background: 'var(--brand-surface)', color: 'var(--brand-green)' }}
              >
                {c}
              </span>
            ))}
            {product.petSafe && (
              <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: 'var(--brand-sage)', color: '#fff' }}>
                🐾 Pet-Safe
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-3" style={{ fontFamily: 'Fraunces, serif' }}>
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex">
              {[1,2,3,4,5].map((s) => (
                <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill={s <= Math.round(product.rating) ? 'var(--brand-terracotta)' : 'var(--brand-border)'}>
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm" style={{ color: 'var(--brand-warm-gray)' }}>({product.reviewCount} reviews)</span>
          </div>

          <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--brand-warm-gray)' }}>
            {product.shortDescription}
          </p>

          {/* Care indicators */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="p-3 rounded-xl text-center" style={{ background: 'var(--brand-surface)' }}>
              <p className="text-lg mb-0.5">🌱</p>
              <p className="text-xs font-medium">{product.careLevel} Care</p>
            </div>
            <div className="p-3 rounded-xl text-center" style={{ background: 'var(--brand-surface)' }}>
              <p className="text-lg mb-0.5">☀️</p>
              <p className="text-xs font-medium">{product.lightRequirement}</p>
            </div>
            <div className="p-3 rounded-xl text-center" style={{ background: 'var(--brand-surface)' }}>
              <p className="text-lg mb-0.5">{product.petSafe ? '🐾' : '⚠️'}</p>
              <p className="text-xs font-medium">{product.petSafe ? 'Pet-Safe' : 'Keep Away'}</p>
            </div>
          </div>

          {/* Care level meter */}
          <div className="mb-6">
            <p className="text-xs font-medium mb-2" style={{ color: 'var(--brand-warm-gray)' }}>Care Difficulty</p>
            <div className="flex gap-1.5">
              {['Easy', 'Medium', 'Advanced'].map((level) => {
                const active =
                  level === 'Easy'
                    ? true
                    : level === 'Medium'
                    ? product.careLevel !== 'Easy'
                    : product.careLevel === 'Advanced'
                return (
                  <div
                    key={level}
                    className="flex-1 h-2 rounded-full transition-colors"
                    style={{ background: active ? 'var(--brand-green)' : 'var(--brand-border)' }}
                  />
                )
              })}
            </div>
            <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--brand-warm-gray)' }}>
              <span>Easy</span><span>Advanced</span>
            </div>
          </div>

          {/* Pot option */}
          <div className="mb-6">
            <p className="text-sm font-semibold mb-2">Options</p>
            <div className="flex gap-3">
              {[
                { label: 'Plant Only', val: false },
                { label: 'Plant + Pot (+$15)', val: true },
              ].map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => setWithPot(opt.val)}
                  className="flex-1 py-2.5 rounded-xl border text-sm font-medium transition-all"
                  style={{
                    borderColor: withPot === opt.val ? 'var(--brand-green)' : 'var(--brand-border)',
                    background: withPot === opt.val ? 'var(--brand-green)' : 'transparent',
                    color: withPot === opt.val ? 'var(--brand-cream)' : 'var(--brand-charcoal)',
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Price + Qty + CTA */}
          <div className="flex items-center gap-4 mb-4">
            <div>
              <p className="text-3xl font-bold" style={{ fontFamily: 'Fraunces, serif', color: product.salePrice ? 'var(--brand-terracotta)' : 'var(--brand-charcoal)' }}>
                ${price}
              </p>
              {product.salePrice && (
                <p className="text-sm line-through" style={{ color: 'var(--brand-warm-gray)' }}>${product.price + (withPot ? 15 : 0)}</p>
              )}
            </div>

            {/* Qty stepper */}
            <div className="flex items-center gap-2 border rounded-xl px-2 py-1.5" style={{ borderColor: 'var(--brand-border)' }}>
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-[var(--brand-surface)]"
              >
                −
              </button>
              <span className="w-8 text-center font-medium">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-[var(--brand-surface)]"
              >
                +
              </button>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => product.inStock && addToCart(product, qty, withPot)}
            disabled={!product.inStock}
            className="w-full py-4 rounded-2xl font-semibold text-base transition-all"
            style={{
              background: product.inStock ? 'var(--brand-green)' : 'var(--brand-border)',
              color: product.inStock ? 'var(--brand-cream)' : 'var(--brand-warm-gray)',
              cursor: product.inStock ? 'pointer' : 'not-allowed',
              boxShadow: product.inStock ? '0 8px 24px rgba(15,76,54,0.2)' : 'none',
            }}
          >
            {product.inStock ? `Add to Cart — $${(price * qty).toFixed(2)}` : 'Out of Stock'}
          </motion.button>

          {/* Perks */}
          <div className="flex flex-col gap-2 mt-4">
            {['🚚 Free shipping over $60', '🌱 Guaranteed to arrive healthy', '↩️ Easy 30-day returns'].map((perk) => (
              <p key={perk} className="text-sm" style={{ color: 'var(--brand-warm-gray)' }}>{perk}</p>
            ))}
          </div>

          {/* Accordion */}
          <div className="mt-8 border-t" style={{ borderColor: 'var(--brand-border)' }}>
            {accordionSections.map((s) => (
              <div key={s.id} className="border-b" style={{ borderColor: 'var(--brand-border)' }}>
                <button
                  onClick={() => setOpenAccordion(openAccordion === s.id ? null : s.id)}
                  className="w-full flex items-center justify-between py-4 text-sm font-semibold text-left"
                >
                  {s.label}
                  <span className="text-lg transition-transform" style={{ transform: openAccordion === s.id ? 'rotate(45deg)' : 'none' }}>
                    +
                  </span>
                </button>
                <AnimatePresence>
                  {openAccordion === s.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-4 text-sm leading-relaxed whitespace-pre-line" style={{ color: 'var(--brand-warm-gray)' }}>
                        {s.content}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews section */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Fraunces, serif' }}>Customer Reviews</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {reviews.slice(0, 4).map((r) => (
            <div
              key={r.id}
              className="p-5 rounded-2xl border"
              style={{ borderColor: 'var(--brand-border)', background: 'var(--card)' }}
            >
              <div className="flex gap-1 mb-2">
                {[1,2,3,4,5].map((s) => (
                  <svg key={s} width="13" height="13" viewBox="0 0 24 24" fill={s <= r.rating ? 'var(--brand-terracotta)' : 'var(--brand-border)'}>
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <p className="text-sm leading-relaxed mb-3">"{r.comment}"</p>
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: 'var(--brand-green)', color: 'var(--brand-cream)' }}
                >
                  {r.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium">{r.name}</p>
                  <p className="text-xs" style={{ color: 'var(--brand-warm-gray)' }}>{r.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Fraunces, serif' }}>You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  )
}
