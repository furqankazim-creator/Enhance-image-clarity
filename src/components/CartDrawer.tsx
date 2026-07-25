import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../store/appStore'

export default function CartDrawer() {
  const { cartOpen, setCartOpen, cartItems, removeFromCart, updateQty, navigate } = useAppStore()

  const subtotal = cartItems.reduce((s, i) => {
    const price = i.withPot ? (i.product.salePrice ?? i.product.price) + 15 : (i.product.salePrice ?? i.product.price)
    return s + price * i.quantity
  }, 0)

  const shipping = subtotal >= 60 ? 0 : 5.99
  const total = subtotal + shipping

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-[150] bg-black/30 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 36 }}
            className="fixed right-0 top-0 bottom-0 z-[160] w-full max-w-md flex flex-col shadow-2xl"
            style={{ background: 'var(--brand-cream)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: 'var(--brand-border)' }}>
              <h2 className="text-lg font-semibold" style={{ fontFamily: 'Fraunces, serif' }}>
                Your Cart ({cartItems.reduce((s, i) => s + i.quantity, 0)})
              </h2>
              <button
                onClick={() => setCartOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[var(--brand-surface)] transition-colors"
                aria-label="Close cart"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
              {cartItems.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center py-20">
                  <span className="text-6xl">🪴</span>
                  <p className="font-medium" style={{ fontFamily: 'Fraunces, serif', color: 'var(--brand-charcoal)' }}>Your cart is empty</p>
                  <p className="text-sm" style={{ color: 'var(--brand-warm-gray)' }}>Add some plants to get started</p>
                  <button
                    onClick={() => { navigate('shop'); setCartOpen(false) }}
                    className="mt-2 px-6 py-2.5 rounded-full text-sm font-semibold"
                    style={{ background: 'var(--brand-green)', color: 'var(--brand-cream)' }}
                  >
                    Shop Plants
                  </button>
                </div>
              ) : (
                <AnimatePresence>
                  {cartItems.map((item) => {
                    const basePrice = item.product.salePrice ?? item.product.price
                    const itemPrice = item.withPot ? basePrice + 15 : basePrice
                    return (
                      <motion.div
                        key={item.product.id + (item.withPot ? '-pot' : '')}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex gap-4 pb-4 border-b"
                        style={{ borderColor: 'var(--brand-border)' }}
                      >
                        <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-[var(--brand-surface)]">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate" style={{ fontFamily: 'Fraunces, serif' }}>
                            {item.product.name}
                            {item.withPot && <span className="text-xs ml-1" style={{ color: 'var(--brand-warm-gray)' }}>+ Pot</span>}
                          </p>
                          <p className="text-sm font-semibold mt-0.5" style={{ color: 'var(--brand-green)' }}>
                            ${(itemPrice * item.quantity).toFixed(2)}
                          </p>

                          {/* Qty stepper */}
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateQty(item.product.id, item.quantity - 1)}
                              className="w-7 h-7 rounded-full border flex items-center justify-center text-sm hover:bg-[var(--brand-surface)] transition-colors"
                              style={{ borderColor: 'var(--brand-border)' }}
                            >
                              −
                            </button>
                            <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQty(item.product.id, item.quantity + 1)}
                              className="w-7 h-7 rounded-full border flex items-center justify-center text-sm hover:bg-[var(--brand-surface)] transition-colors"
                              style={{ borderColor: 'var(--brand-border)' }}
                            >
                              +
                            </button>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="ml-auto text-xs hover:underline"
                              style={{ color: 'var(--brand-warm-gray)' }}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="px-6 py-5 border-t" style={{ borderColor: 'var(--brand-border)' }}>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span style={{ color: 'var(--brand-warm-gray)' }}>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: 'var(--brand-warm-gray)' }}>Shipping</span>
                    <span>{shipping === 0 ? <span style={{ color: 'var(--brand-sage)' }}>Free</span> : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs" style={{ color: 'var(--brand-warm-gray)' }}>
                      Add ${(60 - subtotal).toFixed(2)} more for free shipping
                    </p>
                  )}
                  <div className="flex justify-between font-semibold pt-2 border-t" style={{ borderColor: 'var(--brand-border)' }}>
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { navigate('checkout'); setCartOpen(false) }}
                  className="w-full py-3.5 rounded-full font-semibold text-sm transition-all hover:opacity-90"
                  style={{ background: 'var(--brand-green)', color: 'var(--brand-cream)' }}
                >
                  Proceed to Checkout
                </motion.button>
                <button
                  onClick={() => { navigate('shop'); setCartOpen(false) }}
                  className="w-full py-2.5 text-sm font-medium mt-2 hover:underline"
                  style={{ color: 'var(--brand-warm-gray)' }}
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
