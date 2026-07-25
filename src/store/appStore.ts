import { create } from 'zustand'
import type { Product } from '../data/products'

export type Page =
  | 'home'
  | 'shop'
  | 'product'
  | 'cart'
  | 'checkout'
  | 'order-success'
  | 'account'
  | 'login'
  | 'register'
  | 'care-guide'
  | 'about'
  | 'admin'
  | 'wishlist'

export type CartItem = {
  product: Product
  quantity: number
  withPot: boolean
}

export type Toast = {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}

export type Theme = 'light' | 'dark'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  const stored = window.localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

type AppState = {
  page: Page
  selectedProduct: Product | null
  cartItems: CartItem[]
  cartOpen: boolean
  wishlist: string[]
  toasts: Toast[]
  isLoggedIn: boolean
  orderNumber: string | null
  theme: Theme

  navigate: (page: Page, product?: Product) => void
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
  addToCart: (product: Product, qty?: number, withPot?: boolean) => void
  removeFromCart: (productId: string) => void
  updateQty: (productId: string, qty: number) => void
  clearCart: () => void
  setCartOpen: (open: boolean) => void
  toggleWishlist: (productId: string) => void
  addToast: (message: string, type?: Toast['type']) => void
  removeToast: (id: string) => void
  setLoggedIn: (v: boolean) => void
  placeOrder: () => void
}

export const useAppStore = create<AppState>((set, get) => ({
  page: 'home',
  selectedProduct: null,
  cartItems: [],
  cartOpen: false,
  wishlist: [],
  toasts: [],
  isLoggedIn: false,
  orderNumber: null,
  theme: getInitialTheme(),

  navigate: (page, product) =>
    set({ page, selectedProduct: product ?? get().selectedProduct }),

  toggleTheme: () => {
    const next = get().theme === 'dark' ? 'light' : 'dark'
    get().setTheme(next)
  },

  setTheme: (theme) => {
    set({ theme })
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('theme', theme)
      document.documentElement.setAttribute('data-theme', theme)
    }
  },

  addToCart: (product, qty = 1, withPot = false) => {
    set((s) => {
      const existing = s.cartItems.find(
        (i) => i.product.id === product.id && i.withPot === withPot
      )
      if (existing) {
        return {
          cartItems: s.cartItems.map((i) =>
            i.product.id === product.id && i.withPot === withPot
              ? { ...i, quantity: i.quantity + qty }
              : i
          ),
        }
      }
      return { cartItems: [...s.cartItems, { product, quantity: qty, withPot }] }
    })
    get().addToast(`${product.name} added to cart`, 'success')
    set({ cartOpen: true })
  },

  removeFromCart: (productId) =>
    set((s) => ({
      cartItems: s.cartItems.filter((i) => i.product.id !== productId),
    })),

  updateQty: (productId, qty) =>
    set((s) => ({
      cartItems: s.cartItems
        .map((i) => (i.product.id === productId ? { ...i, quantity: qty } : i))
        .filter((i) => i.quantity > 0),
    })),

  clearCart: () => set({ cartItems: [] }),

  setCartOpen: (open) => set({ cartOpen: open }),

  toggleWishlist: (productId) =>
    set((s) => ({
      wishlist: s.wishlist.includes(productId)
        ? s.wishlist.filter((id) => id !== productId)
        : [...s.wishlist, productId],
    })),

  addToast: (message, type = 'success') => {
    const id = Math.random().toString(36).slice(2)
    set((s) => ({ toasts: [...s.toasts, { id, message, type }] }))
    setTimeout(() => get().removeToast(id), 3200)
  },

  removeToast: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),

  setLoggedIn: (v) => set({ isLoggedIn: v }),

  placeOrder: () => {
    const num = '#DP-' + Math.floor(10000 + Math.random() * 90000)
    set({ orderNumber: num, cartItems: [], page: 'order-success' })
  },
}))
