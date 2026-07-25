import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'name-asc' | 'name-desc'

const careLevels = ['Easy', 'Medium', 'Advanced'] as const
const lightLevels = ['Low', 'Medium', 'Bright Indirect'] as const
const categoryOptions = ['Office Plants', 'Low-Light', 'Air Purifying', 'Pet-Safe', 'Succulents']

export default function ShopPage() {
  const [filterOpen, setFilterOpen] = useState(false)
  const [sort, setSort] = useState<SortOption>('featured')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100])
  const [selectedCare, setSelectedCare] = useState<string[]>([])
  const [selectedLight, setSelectedLight] = useState<string[]>([])
  const [selectedCats, setSelectedCats] = useState<string[]>([])
  const [petSafeOnly, setPetSafeOnly] = useState(false)
  const [inStockOnly, setInStockOnly] = useState(false)

  const toggleArr = (arr: string[], val: string, set: (a: string[]) => void) => {
    set(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val])
  }

  const clearAll = () => {
    setSelectedCare([])
    setSelectedLight([])
    setSelectedCats([])
    setPetSafeOnly(false)
    setInStockOnly(false)
    setPriceRange([0, 100])
  }

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const price = p.salePrice ?? p.price
      if (price < priceRange[0] || price > priceRange[1]) return false
      if (selectedCare.length && !selectedCare.includes(p.careLevel)) return false
      if (selectedLight.length && !selectedLight.includes(p.lightRequirement)) return false
      if (selectedCats.length && !selectedCats.some((c) => p.category.includes(c))) return false
      if (petSafeOnly && !p.petSafe) return false
      if (inStockOnly && !p.inStock) return false
      return true
    })

    switch (sort) {
      case 'price-asc': return [...list].sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price))
      case 'price-desc': return [...list].sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price))
      case 'rating': return [...list].sort((a, b) => b.rating - a.rating)
      case 'name-asc': return [...list].sort((a, b) => a.name.localeCompare(b.name))
      case 'name-desc': return [...list].sort((a, b) => b.name.localeCompare(a.name))
      default: return [...list].sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
    }
  }, [sort, priceRange, selectedCare, selectedLight, selectedCats, petSafeOnly, inStockOnly])

  const activeFilters =
    selectedCare.length + selectedLight.length + selectedCats.length +
    (petSafeOnly ? 1 : 0) + (inStockOnly ? 1 : 0)

  const FilterPanel = () => (
    <div className="flex flex-col gap-6">
      {/* Availability */}
      <div>
        <h4 className="font-semibold text-sm mb-3">Availability</h4>
        {[
          { label: `In Stock (${products.filter(p => p.inStock).length})`, val: inStockOnly, set: () => setInStockOnly(!inStockOnly) },
        ].map((f) => (
          <label key={f.label} className="flex items-center gap-2.5 cursor-pointer mb-2">
            <input
              type="checkbox"
              checked={f.val}
              onChange={f.set}
              className="w-4 h-4 accent-[var(--brand-green)] cursor-pointer"
            />
            <span className="text-sm">{f.label}</span>
          </label>
        ))}
      </div>

      {/* Price range */}
      <div>
        <h4 className="font-semibold text-sm mb-3">Price Range</h4>
        <div className="flex gap-2 mb-3">
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
            className="w-full border rounded-lg px-2 py-1.5 text-sm outline-none"
            style={{ borderColor: 'var(--brand-border)' }}
          />
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
            className="w-full border rounded-lg px-2 py-1.5 text-sm outline-none"
            style={{ borderColor: 'var(--brand-border)' }}
          />
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
          className="w-full"
        />
        <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--brand-warm-gray)' }}>
          <span>$0</span><span>$100</span>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h4 className="font-semibold text-sm mb-3">Category</h4>
        {categoryOptions.map((c) => (
          <label key={c} className="flex items-center gap-2.5 cursor-pointer mb-2">
            <input
              type="checkbox"
              checked={selectedCats.includes(c)}
              onChange={() => toggleArr(selectedCats, c, setSelectedCats)}
              className="w-4 h-4 accent-[var(--brand-green)]"
            />
            <span className="text-sm">{c}</span>
          </label>
        ))}
      </div>

      {/* Care level */}
      <div>
        <h4 className="font-semibold text-sm mb-3">Care Level</h4>
        {careLevels.map((c) => (
          <label key={c} className="flex items-center gap-2.5 cursor-pointer mb-2">
            <input
              type="checkbox"
              checked={selectedCare.includes(c)}
              onChange={() => toggleArr(selectedCare, c, setSelectedCare)}
              className="w-4 h-4 accent-[var(--brand-green)]"
            />
            <span className="text-sm">{c}</span>
          </label>
        ))}
      </div>

      {/* Light */}
      <div>
        <h4 className="font-semibold text-sm mb-3">Light Requirement</h4>
        {lightLevels.map((l) => (
          <label key={l} className="flex items-center gap-2.5 cursor-pointer mb-2">
            <input
              type="checkbox"
              checked={selectedLight.includes(l)}
              onChange={() => toggleArr(selectedLight, l, setSelectedLight)}
              className="w-4 h-4 accent-[var(--brand-green)]"
            />
            <span className="text-sm">{l}</span>
          </label>
        ))}
      </div>

      {/* Pet Safe */}
      <div>
        <h4 className="font-semibold text-sm mb-3">Pet Safety</h4>
        <label className="flex items-center gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={petSafeOnly}
            onChange={() => setPetSafeOnly(!petSafeOnly)}
            className="w-4 h-4 accent-[var(--brand-green)]"
          />
          <span className="text-sm">Pet-safe only 🐾</span>
        </label>
      </div>

      {activeFilters > 0 && (
        <button
          onClick={clearAll}
          className="text-sm font-medium underline text-left"
          style={{ color: 'var(--brand-terracotta)' }}
        >
          Clear all filters
        </button>
      )}
    </div>
  )

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div
        className="px-4 sm:px-6 py-12 md:py-16 border-b"
        style={{ background: 'var(--brand-green)', borderColor: '#0a3527' }}
      >
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--brand-terracotta)' }}>
            The Collection
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Fraunces, serif', color: 'var(--brand-cream)' }}>
            Office Plants
          </h1>
          <p className="text-base max-w-xl mb-6" style={{ color: 'rgba(250,247,242,0.75)' }}>
            Curated for desks, shelves, and workspaces. All plants arrive healthy, potted or bare-root, with a personalised care card.
          </p>
          <div className="flex flex-wrap gap-2">
            {['Low-Maintenance', 'Air-Purifying', 'Pet-Friendly Options', 'Expert-Packed'].map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(255,255,255,0.12)', color: 'var(--brand-cream)' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Filter + Sort bar */}
        <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all"
              style={{
                borderColor: filterOpen ? 'var(--brand-green)' : 'var(--brand-border)',
                background: filterOpen ? 'var(--brand-green)' : 'transparent',
                color: filterOpen ? 'var(--brand-cream)' : 'var(--brand-charcoal)',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="21" y1="4" x2="14" y2="4"/><line x1="10" y1="4" x2="3" y2="4"/>
                <line x1="21" y1="12" x2="12" y2="12"/><line x1="8" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="20" x2="16" y2="20"/><line x1="12" y1="20" x2="3" y2="20"/>
                <line x1="14" y1="2" x2="14" y2="6"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="16" y1="18" x2="16" y2="22"/>
              </svg>
              Filters {activeFilters > 0 && <span className="bg-[var(--brand-terracotta)] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{activeFilters}</span>}
            </button>
            <p className="text-sm" style={{ color: 'var(--brand-warm-gray)' }}>
              {filtered.length} plant{filtered.length !== 1 ? 's' : ''}
            </p>
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="px-4 py-2.5 rounded-xl border text-sm outline-none"
            style={{ borderColor: 'var(--brand-border)', background: 'transparent' }}
          >
            <option value="featured">Featured</option>
            <option value="rating">Best Rated</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A–Z</option>
            <option value="name-desc">Name: Z–A</option>
          </select>
        </div>

        <div className="flex gap-8">
          {/* Filter sidebar — desktop */}
          <AnimatePresence>
            {filterOpen && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 260, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="flex-shrink-0 overflow-hidden hidden md:block"
              >
                <div className="w-[260px] pr-4">
                  <FilterPanel />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile filter drawer */}
          <AnimatePresence>
            {filterOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[150] bg-black/30 md:hidden"
                  onClick={() => setFilterOpen(false)}
                />
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ type: 'spring', stiffness: 380, damping: 36 }}
                  className="fixed left-0 top-0 bottom-0 z-[160] w-80 overflow-y-auto p-6 md:hidden"
                  style={{ background: 'var(--brand-cream)' }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold" style={{ fontFamily: 'Fraunces, serif' }}>Filters</h3>
                    <button onClick={() => setFilterOpen(false)}>✕</button>
                  </div>
                  <FilterPanel />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
                <span className="text-6xl">🔍</span>
                <h3 className="text-xl font-semibold" style={{ fontFamily: 'Fraunces, serif' }}>No plants match your filters</h3>
                <p className="text-sm" style={{ color: 'var(--brand-warm-gray)' }}>Try adjusting or clearing your filter criteria</p>
                <button
                  onClick={clearAll}
                  className="mt-2 px-6 py-2.5 rounded-full text-sm font-semibold"
                  style={{ background: 'var(--brand-green)', color: 'var(--brand-cream)' }}
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
