import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../store/appStore'

type Step = 'shipping' | 'payment' | 'review'

export default function CheckoutPage() {
  const { cartItems, navigate, placeOrder, orderNumber } = useAppStore()
  const [step, setStep] = useState<Step>('shipping')
  const [coupon, setCoupon] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'cod'>('card')

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', zip: '', country: 'United States',
    cardNumber: '', cardExpiry: '', cardCvc: '', cardName: '',
  })

  const subtotal = cartItems.reduce((s, i) => {
    const p = i.withPot ? (i.product.salePrice ?? i.product.price) + 15 : (i.product.salePrice ?? i.product.price)
    return s + p * i.quantity
  }, 0)
  const shipping = subtotal >= 60 ? 0 : 5.99
  const discount = couponApplied ? subtotal * 0.1 : 0
  const total = subtotal + shipping - discount

  const steps: { id: Step; label: string; icon: string; caption: string }[] = [
    { id: 'shipping', label: 'Shipping', icon: '🌱', caption: 'Where it grows' },
    { id: 'payment', label: 'Payment', icon: '🪴', caption: 'Pot it up' },
    { id: 'review', label: 'Review', icon: '🌿', caption: 'Ready to ship' },
  ]

  const stepIndex = steps.findIndex((s) => s.id === step)
  const progressPct = (stepIndex / (steps.length - 1)) * 100

  const today = new Date()
  const deliveryStart = new Date(today)
  deliveryStart.setDate(today.getDate() + 3)
  const deliveryEnd = new Date(today)
  deliveryEnd.setDate(today.getDate() + 5)
  const fmt = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

  // Order success screen
  if (orderNumber) {
    const orderSteps = ['Order placed', 'Hand-packed', 'On its way', 'Delivered']
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg w-full"
        >
          <div
            className="relative rounded-[28px] p-8 sm:p-10 text-center overflow-hidden"
            style={{ background: 'var(--brand-surface)', border: '1px solid var(--brand-border)' }}
          >
            {/* Decorative corner leaves */}
            <span className="absolute -top-4 -right-4 text-7xl opacity-10 rotate-12 select-none">🌿</span>
            <span className="absolute -bottom-6 -left-6 text-7xl opacity-10 -rotate-12 select-none">🌱</span>

            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.15 }}
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10"
              style={{ background: 'var(--brand-green)' }}
            >
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--brand-cream)" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </motion.div>

            <h1 className="text-3xl sm:text-4xl font-bold mb-2 relative z-10" style={{ fontFamily: 'Fraunces, serif', color: 'var(--brand-green)' }}>
              It's rooted!
            </h1>
            <p className="text-sm mb-5 relative z-10" style={{ color: 'var(--brand-warm-gray)' }}>Your order is confirmed and headed to the grow room.</p>

            <div
              className="inline-flex items-center gap-2 font-mono text-sm px-4 py-2 rounded-full mb-8 relative z-10"
              style={{ background: 'var(--brand-cream)', color: 'var(--brand-green)', border: '1px dashed var(--brand-green)' }}
            >
              🏷️ {orderNumber}
            </div>

            {/* Growth timeline */}
            <div className="flex items-center justify-between relative z-10 mb-8 px-2">
              {orderSteps.map((s, i) => (
                <div key={s} className="flex flex-col items-center flex-1 relative">
                  {i < orderSteps.length - 1 && (
                    <div
                      className="absolute top-2.5 left-1/2 w-full h-0.5"
                      style={{ background: i === 0 ? 'var(--brand-green)' : 'var(--brand-border)' }}
                    />
                  )}
                  <span
                    className="w-5 h-5 rounded-full relative z-10 flex-shrink-0"
                    style={{ background: i === 0 ? 'var(--brand-green)' : 'var(--brand-cream)', border: `2px solid ${i === 0 ? 'var(--brand-green)' : 'var(--brand-border)'}` }}
                  />
                  <span className="text-[10px] mt-2 text-center leading-tight" style={{ color: i === 0 ? 'var(--brand-green)' : 'var(--brand-warm-gray)' }}>{s}</span>
                </div>
              ))}
            </div>

            <p className="text-xs mb-8 relative z-10" style={{ color: 'var(--brand-warm-gray)' }}>
              Estimated delivery <strong style={{ color: 'var(--brand-charcoal)' }}>{fmt(deliveryStart)} – {fmt(deliveryEnd)}</strong>. A confirmation email is on its way to you.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center relative z-10">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('account')}
                className="px-6 py-3 rounded-full font-semibold text-sm"
                style={{ background: 'var(--brand-green)', color: 'var(--brand-cream)' }}
              >
                Track Order
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('shop')}
                className="px-6 py-3 rounded-full font-semibold text-sm border-2"
                style={{ borderColor: 'var(--brand-green)', color: 'var(--brand-green)' }}
              >
                Shop More Plants
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <div>
          <span className="text-6xl block mb-4">🛒</span>
          <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Fraunces, serif' }}>Your cart is empty</h2>
          <button onClick={() => navigate('shop')} className="px-6 py-3 rounded-full text-sm font-semibold" style={{ background: 'var(--brand-green)', color: 'var(--brand-cream)' }}>
            Shop Plants
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-3xl font-bold" style={{ fontFamily: 'Fraunces, serif' }}>Let's get this planted</h1>
        <span className="hidden sm:inline text-xs px-3 py-1.5 rounded-full font-medium" style={{ background: 'var(--brand-surface)', color: 'var(--brand-green)' }}>
          🚚 Arrives {fmt(deliveryStart)}–{fmt(deliveryEnd)}
        </span>
      </div>
      <p className="text-sm mb-8" style={{ color: 'var(--brand-warm-gray)' }}>Hand-packed and inspected before it ever leaves the grow room.</p>

      {/* Growth-vine progress */}
      <div className="relative mb-12 px-1">
        <div className="absolute top-[19px] left-0 right-0 h-1 rounded-full" style={{ background: 'var(--brand-border)' }} />
        <motion.div
          className="absolute top-[19px] left-0 h-1 rounded-full"
          style={{ background: 'linear-gradient(90deg, var(--brand-green), var(--brand-sage))' }}
          initial={false}
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        />
        <div className="relative flex justify-between">
          {steps.map((s, i) => (
            <div key={s.id} className="flex flex-col items-center" style={{ width: '33%' }}>
              <motion.div
                animate={{
                  scale: i === stepIndex ? 1.12 : 1,
                  backgroundColor: i <= stepIndex ? 'var(--brand-green)' : 'var(--brand-cream)',
                  borderColor: i <= stepIndex ? 'var(--brand-green)' : 'var(--brand-border)',
                }}
                className="w-10 h-10 rounded-full flex items-center justify-center text-base border-2 shadow-sm"
              >
                {i < stepIndex ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--brand-cream)" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                ) : (
                  <span style={{ filter: i === stepIndex ? 'none' : 'grayscale(1) opacity(0.6)' }}>{s.icon}</span>
                )}
              </motion.div>
              <span className="text-xs font-semibold mt-2" style={{ color: i === stepIndex ? 'var(--brand-green)' : 'var(--brand-warm-gray)' }}>{s.label}</span>
              <span className="text-[10px] hidden sm:block" style={{ color: 'var(--brand-warm-gray)' }}>{s.caption}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-8">
        {/* Left — form panels */}
        <div>
          <AnimatePresence mode="wait">
            {/* SHIPPING */}
            {step === 'shipping' && (
              <motion.div
                key="shipping"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <h2 className="text-xl font-semibold mb-6" style={{ fontFamily: 'Fraunces, serif' }}>Shipping Address</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { key: 'firstName', label: 'First Name' },
                    { key: 'lastName', label: 'Last Name' },
                  ].map((f) => (
                    <div key={f.key}>
                      <label className="text-xs font-medium block mb-1.5">{f.label}</label>
                      <input
                        value={form[f.key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                        className="w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[var(--brand-green)]"
                        style={{ borderColor: 'var(--brand-border)' }}
                        placeholder={f.label}
                      />
                    </div>
                  ))}
                  {[
                    { key: 'email', label: 'Email Address', colSpan: true, type: 'email' },
                    { key: 'phone', label: 'Phone Number', colSpan: false, type: 'tel' },
                    { key: 'address', label: 'Street Address', colSpan: true, type: 'text' },
                    { key: 'city', label: 'City', colSpan: false, type: 'text' },
                    { key: 'state', label: 'State / Province', colSpan: false, type: 'text' },
                    { key: 'zip', label: 'ZIP / Postcode', colSpan: false, type: 'text' },
                  ].map((f) => (
                    <div key={f.key} className={f.colSpan ? 'sm:col-span-2' : ''}>
                      <label className="text-xs font-medium block mb-1.5">{f.label}</label>
                      <input
                        type={f.type}
                        value={form[f.key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                        className="w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[var(--brand-green)]"
                        style={{ borderColor: 'var(--brand-border)' }}
                        placeholder={f.label}
                      />
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setStep('payment')}
                  className="mt-6 w-full py-3.5 rounded-2xl font-semibold text-sm transition-all hover:opacity-90"
                  style={{ background: 'var(--brand-green)', color: 'var(--brand-cream)' }}
                >
                  Continue to Payment →
                </button>
              </motion.div>
            )}

            {/* PAYMENT */}
            {step === 'payment' && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <h2 className="text-xl font-semibold mb-6" style={{ fontFamily: 'Fraunces, serif' }}>Payment Method</h2>

                <div className="flex flex-col gap-3 mb-6">
                  {([
                    { id: 'card', label: 'Credit / Debit Card', icon: '💳' },
                    { id: 'paypal', label: 'PayPal', icon: '🅿' },
                    { id: 'cod', label: 'Cash on Delivery', icon: '💵' },
                  ] as const).map((m) => (
                    <label
                      key={m.id}
                      className="flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all"
                      style={{
                        borderColor: paymentMethod === m.id ? 'var(--brand-green)' : 'var(--brand-border)',
                        background: paymentMethod === m.id ? 'var(--brand-surface)' : 'var(--card)',
                      }}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={m.id}
                        checked={paymentMethod === m.id}
                        onChange={() => setPaymentMethod(m.id)}
                        className="accent-[var(--brand-green)]"
                      />
                      <span className="text-lg">{m.icon}</span>
                      <span className="font-medium text-sm">{m.label}</span>
                    </label>
                  ))}
                </div>

                {paymentMethod === 'card' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="grid sm:grid-cols-2 gap-4 mb-6"
                  >
                    <div className="sm:col-span-2">
                      <label className="text-xs font-medium block mb-1.5">Card Number</label>
                      <input
                        value={form.cardNumber}
                        onChange={(e) => setForm({ ...form, cardNumber: e.target.value })}
                        placeholder="1234 5678 9012 3456"
                        className="w-full border rounded-xl px-4 py-2.5 text-sm outline-none"
                        style={{ borderColor: 'var(--brand-border)' }}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium block mb-1.5">Expiry Date</label>
                      <input
                        value={form.cardExpiry}
                        onChange={(e) => setForm({ ...form, cardExpiry: e.target.value })}
                        placeholder="MM / YY"
                        className="w-full border rounded-xl px-4 py-2.5 text-sm outline-none"
                        style={{ borderColor: 'var(--brand-border)' }}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium block mb-1.5">CVC</label>
                      <input
                        value={form.cardCvc}
                        onChange={(e) => setForm({ ...form, cardCvc: e.target.value })}
                        placeholder="123"
                        className="w-full border rounded-xl px-4 py-2.5 text-sm outline-none"
                        style={{ borderColor: 'var(--brand-border)' }}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs font-medium block mb-1.5">Name on Card</label>
                      <input
                        value={form.cardName}
                        onChange={(e) => setForm({ ...form, cardName: e.target.value })}
                        placeholder="Jane Smith"
                        className="w-full border rounded-xl px-4 py-2.5 text-sm outline-none"
                        style={{ borderColor: 'var(--brand-border)' }}
                      />
                    </div>
                  </motion.div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep('shipping')}
                    className="px-5 py-3 rounded-2xl text-sm font-medium border"
                    style={{ borderColor: 'var(--brand-border)' }}
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setStep('review')}
                    className="flex-1 py-3.5 rounded-2xl font-semibold text-sm hover:opacity-90"
                    style={{ background: 'var(--brand-green)', color: 'var(--brand-cream)' }}
                  >
                    Review Order →
                  </button>
                </div>
              </motion.div>
            )}

            {/* REVIEW */}
            {step === 'review' && (
              <motion.div
                key="review"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <h2 className="text-xl font-semibold mb-6" style={{ fontFamily: 'Fraunces, serif' }}>Review & Place Order</h2>

                {/* Items */}
                <div className="flex flex-col gap-3 mb-6 p-4 rounded-2xl" style={{ background: 'var(--brand-surface)' }}>
                  {cartItems.map((item) => {
                    const p = item.withPot ? (item.product.salePrice ?? item.product.price) + 15 : (item.product.salePrice ?? item.product.price)
                    return (
                      <div key={item.product.id} className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0" style={{ background: 'var(--brand-border)' }}>
                          <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{item.product.name}</p>
                          <p className="text-xs" style={{ color: 'var(--brand-warm-gray)' }}>Qty: {item.quantity}{item.withPot ? ' + Pot' : ''}</p>
                        </div>
                        <p className="font-semibold text-sm">${(p * item.quantity).toFixed(2)}</p>
                      </div>
                    )
                  })}
                </div>

                {/* Shipping details */}
                <div className="p-4 rounded-2xl border mb-6" style={{ borderColor: 'var(--brand-border)' }}>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--brand-warm-gray)' }}>Shipping To</p>
                  <p className="text-sm">{form.firstName} {form.lastName}</p>
                  <p className="text-sm" style={{ color: 'var(--brand-warm-gray)' }}>{form.address || '123 Example Street'}, {form.city || 'New York'}, {form.state || 'NY'} {form.zip || '10001'}</p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep('payment')}
                    className="px-5 py-3 rounded-2xl text-sm font-medium border"
                    style={{ borderColor: 'var(--brand-border)' }}
                  >
                    ← Back
                  </button>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={placeOrder}
                    className="flex-1 py-3.5 rounded-2xl font-semibold text-sm hover:opacity-90"
                    style={{ background: 'var(--brand-terracotta)', color: '#fff' }}
                  >
                    Place Order — ${total.toFixed(2)} 🌿
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right — order summary, styled like a nursery tag/receipt */}
        <div>
          <motion.div
            initial={{ opacity: 0, rotate: -1, y: 12 }}
            animate={{ opacity: 1, rotate: -0.6, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative p-5 pt-6 rounded-2xl sticky top-24 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.15)]"
            style={{
              background: 'var(--brand-surface)',
              border: '1px dashed var(--brand-green)',
            }}
          >
            {/* Tag hole + string */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <div className="w-8 h-1.5 rounded-full" style={{ background: 'var(--brand-border)' }} />
              <div className="w-3 h-3 rounded-full mt-0.5" style={{ background: 'var(--brand-cream)', border: '2px solid var(--brand-warm-gray)' }} />
            </div>

            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold" style={{ fontFamily: 'Fraunces, serif' }}>Your Order</h3>
              <span className="text-[10px] font-mono px-2 py-1 rounded-md" style={{ background: 'var(--brand-cream)', color: 'var(--brand-warm-gray)' }}>
                {cartItems.reduce((n, i) => n + i.quantity, 0)} item{cartItems.reduce((n, i) => n + i.quantity, 0) === 1 ? '' : 's'}
              </span>
            </div>

            <div className="flex flex-col gap-3 mb-4">
              {cartItems.map((item) => {
                const p = item.withPot ? (item.product.salePrice ?? item.product.price) + 15 : (item.product.salePrice ?? item.product.price)
                return (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0" style={{ background: 'var(--brand-border)' }}>
                      <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                      <span
                        className="absolute -top-1 -right-1 w-4 h-4 text-[10px] font-bold flex items-center justify-center rounded-full"
                        style={{ background: 'var(--brand-green)', color: '#fff' }}
                      >
                        {item.quantity}
                      </span>
                    </div>
                    <p className="flex-1 text-sm font-medium line-clamp-1">{item.product.name}</p>
                    <p className="text-sm font-semibold">${(p * item.quantity).toFixed(2)}</p>
                  </div>
                )
              })}
            </div>

            {/* Coupon */}
            <div className="flex gap-2 mb-4">
              <input
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Discount code"
                className="flex-1 border rounded-xl px-3 py-2 text-sm outline-none"
                style={{ borderColor: 'var(--brand-border)', background: 'var(--card)' }}
              />
              <button
                onClick={() => { if (coupon.toUpperCase() === 'PLANT10') setCouponApplied(true) }}
                className="px-3 py-2 rounded-xl text-xs font-semibold"
                style={{ background: 'var(--brand-green)', color: 'var(--brand-cream)' }}
              >
                Apply
              </button>
            </div>
            {couponApplied && (
              <p className="text-xs font-medium mb-3" style={{ color: 'var(--brand-sage)' }}>✓ PLANT10 applied — 10% off</p>
            )}

            <div className="space-y-2 pt-3 border-t" style={{ borderColor: 'var(--brand-border)' }}>
              <div className="flex justify-between text-sm">
                <span style={{ color: 'var(--brand-warm-gray)' }}>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm" style={{ color: 'var(--brand-sage)' }}>
                  <span>Discount (10%)</span>
                  <span>−${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span style={{ color: 'var(--brand-warm-gray)' }}>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between font-semibold text-base pt-2 border-t" style={{ borderColor: 'var(--brand-border)' }}>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <p className="text-[11px] text-center mt-4 pt-3 border-t" style={{ color: 'var(--brand-warm-gray)', borderColor: 'var(--brand-border)' }}>
              🌿 Hand-packed by our grow team · Healthy-arrival guarantee
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
