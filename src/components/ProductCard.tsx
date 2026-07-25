import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Product } from '../data/products'
import { useAppStore } from '../store/appStore'

type Props = {
  product: Product
  onNavigate?: () => void
}

export default function ProductCard({ product, onNavigate }: Props) {
  const [hovered, setHovered] = useState(false)
  const { addToCart, toggleWishlist, wishlist, navigate } = useAppStore()
  const isWishlisted = wishlist.includes(product.id)

  const price = product.salePrice ?? product.price
  const hasSale = !!product.salePrice

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden rounded-2xl bg-[var(--brand-surface)] cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-shadow duration-300 group-hover:shadow-[0_16px_32px_-12px_rgba(0,0,0,0.18)]"
        style={{ aspectRatio: '5/6' }}
        onClick={() => {
          navigate('product', product)
          onNavigate?.()
        }}
      >
        {/* Main image */}
        <img
          src={product.images[0]}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-[1.06]"
          style={{ opacity: hovered ? 0 : 1 }}
          loading="lazy"
        />
        {/* Hover image */}
        <img
          src={product.images[1]}
          alt={`${product.name} alternate view`}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-[1.06]"
          style={{ opacity: hovered ? 1 : 0 }}
          loading="lazy"
        />

        {/* Sale badge */}
        {hasSale && (
          <span
            className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ background: 'var(--brand-terracotta)', color: '#fff' }}
          >
            SALE
          </span>
        )}

        {/* Out of stock */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="text-sm font-medium" style={{ color: 'var(--brand-warm-gray)' }}>
              Out of Stock
            </span>
          </div>
        )}

        {/* Wishlist */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.8 }}
          onClick={(e) => {
            e.stopPropagation()
            toggleWishlist(product.id)
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center bg-white/80 backdrop-blur-sm transition-all"
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <motion.svg
            key={isWishlisted ? 'filled' : 'empty'}
            initial={{ scale: 0.6 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            width="16" height="16" viewBox="0 0 24 24" fill={isWishlisted ? 'var(--brand-terracotta)' : 'none'} stroke={isWishlisted ? 'var(--brand-terracotta)' : 'var(--brand-charcoal)'} strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </motion.svg>
        </motion.button>

        {/* Add to cart — hover reveal desktop */}
        {product.inStock && (
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => {
              e.stopPropagation()
              addToCart(product)
            }}
            className="absolute bottom-3 left-3 right-3 py-2.5 rounded-xl text-sm font-semibold transition-all hidden sm:block shadow-lg"
            style={{ background: 'var(--brand-green)', color: 'var(--brand-cream)' }}
          >
            Add to Cart
          </motion.button>
        )}
      </div>

      {/* Info */}
      <div className="mt-3 flex flex-col gap-1 flex-1">
        <p className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--brand-warm-gray)' }}>
          {product.careLevel} Care · {product.lightRequirement} Light
        </p>
        <h3
          className="font-medium text-[15px] line-clamp-2 cursor-pointer hover:underline"
          style={{ fontFamily: 'Fraunces, serif', color: 'var(--brand-charcoal)' }}
          onClick={() => navigate('product', product)}
        >
          {product.name}
        </h3>

        {/* Stars */}
        <div className="flex items-center gap-1.5">
          <div className="flex">
            {[1,2,3,4,5].map((s) => (
              <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill={s <= Math.round(product.rating) ? 'var(--brand-terracotta)' : 'var(--brand-border)'}>
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>
          <span className="text-xs" style={{ color: 'var(--brand-warm-gray)' }}>({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-0.5">
          <span className="font-semibold text-[15px]" style={{ color: hasSale ? 'var(--brand-terracotta)' : 'var(--brand-charcoal)' }}>
            ${price}
          </span>
          {hasSale && (
            <span className="text-sm line-through" style={{ color: 'var(--brand-warm-gray)' }}>${product.price}</span>
          )}
        </div>

        {/* Mobile add to cart */}
        {product.inStock && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => addToCart(product)}
            className="mt-2 py-2 rounded-xl text-sm font-semibold sm:hidden"
            style={{ background: 'var(--brand-green)', color: 'var(--brand-cream)' }}
          >
            Add to Cart
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}
