import { useState } from 'react'
import { motion } from 'framer-motion'
import { products } from '../data/products'
import { useAppStore } from '../store/appStore'

type AdminSection = 'dashboard' | 'products' | 'orders' | 'customers' | 'coupons' | 'settings'

const mockOrders = [
  { id: '#DP-58291', customer: 'Sarah Mitchell', date: 'Jul 22, 2025', total: 52, payment: 'Paid', status: 'Delivered' },
  { id: '#DP-58105', customer: 'James Kowalski', date: 'Jul 21, 2025', total: 89, payment: 'Paid', status: 'Shipped' },
  { id: '#DP-57940', customer: 'Priya Nair', date: 'Jul 20, 2025', total: 34, payment: 'Paid', status: 'Processing' },
  { id: '#DP-57811', customer: 'Tom Weston', date: 'Jul 19, 2025', total: 76, payment: 'Pending', status: 'Processing' },
  { id: '#DP-57720', customer: 'Elena Rossi', date: 'Jul 18, 2025', total: 22, payment: 'Paid', status: 'Delivered' },
  { id: '#DP-57601', customer: 'Mark Chen', date: 'Jul 17, 2025', total: 38, payment: 'Paid', status: 'Cancelled' },
]

const mockCustomers = [
  { name: 'Sarah Mitchell', email: 'sarah@example.com', orders: 8, spent: 412, joined: 'Jan 2024' },
  { name: 'James Kowalski', email: 'james@example.com', orders: 5, spent: 289, joined: 'Mar 2024' },
  { name: 'Priya Nair', email: 'priya@example.com', orders: 3, spent: 136, joined: 'Jun 2024' },
  { name: 'Tom Weston', email: 'tom@example.com', orders: 12, spent: 654, joined: 'Sep 2023' },
]

const statusColors: Record<string, { bg: string; text: string }> = {
  Processing: { bg: '#FFF3CD', text: 'var(--brand-terracotta)' },
  Shipped: { bg: '#D1ECF1', text: '#0a5070' },
  Delivered: { bg: '#D4EDDA', text: 'var(--brand-green)' },
  Cancelled: { bg: '#F8D7DA', text: 'var(--brand-muted-red)' },
  Paid: { bg: '#D4EDDA', text: 'var(--brand-green)' },
  Pending: { bg: '#FFF3CD', text: 'var(--brand-terracotta)' },
}

function statusStyle(status: { bg: string; text: string }) {
  return { background: status.bg, color: status.text }
}

const navItems: { id: AdminSection; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'products', label: 'Products', icon: '🌿' },
  { id: 'orders', label: 'Orders', icon: '📦' },
  { id: 'customers', label: 'Customers', icon: '👥' },
  { id: 'coupons', label: 'Coupons', icon: '🏷️' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
]

export default function AdminDashboard() {
  const { navigate } = useAppStore()
  const [section, setSection] = useState<AdminSection>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const stats = [
    { label: 'Total Sales', value: '$12,840', change: '+18%', icon: '💰' },
    { label: 'Orders', value: '342', change: '+8%', icon: '📦' },
    { label: 'Customers', value: '1,284', change: '+12%', icon: '👥' },
    { label: 'Low Stock', value: '3', change: '↓ items', icon: '⚠️' },
  ]

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--brand-cream-secondary)' }}>
      {/* Sidebar */}
      <aside
        className="flex-shrink-0 flex flex-col transition-all"
        style={{
          width: sidebarOpen ? 240 : 68,
          background: 'var(--brand-green)',
          minHeight: '100vh',
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 px-4 py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 hover:bg-white/10 transition-colors"
          >
            <span className="text-xl">🌿</span>
          </button>
          {sidebarOpen && (
            <span className="font-bold text-sm" style={{ fontFamily: 'Fraunces, serif', color: 'var(--brand-cream)' }}>
              Admin Panel
            </span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSection(item.id)}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all"
              style={{
                background: section === item.id ? 'rgba(255,255,255,0.12)' : 'transparent',
                color: section === item.id ? 'var(--brand-cream)' : 'rgba(250,247,242,0.6)',
                borderLeft: section === item.id ? '3px solid var(--brand-terracotta)' : '3px solid transparent',
              }}
            >
              <span className="text-base flex-shrink-0">{item.icon}</span>
              {sidebarOpen && item.label}
            </button>
          ))}
        </nav>

        {/* Back to store */}
        <div className="px-4 py-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <button
            onClick={() => navigate('home')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium hover:bg-white/10 transition-colors"
            style={{ color: 'rgba(250,247,242,0.6)' }}
          >
            <span>←</span>
            {sidebarOpen && 'Back to Store'}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0">
        {/* Topbar */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b" style={{ borderColor: 'var(--brand-border)' }}>
          <div>
            <h1 className="text-lg font-semibold capitalize" style={{ fontFamily: 'Fraunces, serif' }}>
              {navItems.find((n) => n.id === section)?.label}
            </h1>
            <p className="text-xs" style={{ color: 'var(--brand-warm-gray)' }}>Jul 24, 2025</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-9 h-9 rounded-full flex items-center justify-center hover:bg-[var(--brand-surface)]">
              🔔
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: 'var(--brand-terracotta)' }} />
            </button>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'var(--brand-green)', color: 'var(--brand-cream)' }}>
              A
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* ── DASHBOARD ── */}
          {section === 'dashboard' && (
            <div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="p-5 rounded-2xl bg-white border"
                    style={{ borderColor: 'var(--brand-border)' }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl">{s.icon}</span>
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: '#D4EDDA', color: 'var(--brand-green)' }}
                      >
                        {s.change}
                      </span>
                    </div>
                    <p className="text-2xl font-bold mb-1" style={{ fontFamily: 'Fraunces, serif' }}>{s.value}</p>
                    <p className="text-xs" style={{ color: 'var(--brand-warm-gray)' }}>{s.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Recent orders table */}
              <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: 'var(--brand-border)' }}>
                <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'var(--brand-border)' }}>
                  <h3 className="font-semibold" style={{ fontFamily: 'Fraunces, serif' }}>Recent Orders</h3>
                  <button onClick={() => setSection('orders')} className="text-xs underline" style={{ color: 'var(--brand-green)' }}>View all</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ background: 'var(--brand-cream-secondary)' }}>
                        {['Order ID', 'Customer', 'Date', 'Total', 'Payment', 'Status'].map((h) => (
                          <th key={h} className="text-left text-xs font-semibold px-4 py-3 uppercase tracking-wider" style={{ color: 'var(--brand-warm-gray)' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {mockOrders.slice(0, 5).map((o) => (
                        <tr key={o.id} className="border-t hover:bg-[var(--brand-cream-secondary)] transition-colors" style={{ borderColor: 'var(--brand-border)' }}>
                          <td className="px-4 py-3 font-mono text-xs">{o.id}</td>
                          <td className="px-4 py-3">{o.customer}</td>
                          <td className="px-4 py-3" style={{ color: 'var(--brand-warm-gray)' }}>{o.date}</td>
                          <td className="px-4 py-3 font-semibold">${o.total}</td>
                          <td className="px-4 py-3">
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={statusStyle(statusColors[o.payment])}>
                              {o.payment}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={statusStyle(statusColors[o.status])}>
                              {o.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── PRODUCTS ── */}
          {section === 'products' && (
            <div>
              <div className="flex items-center justify-between mb-5">
                <input
                  placeholder="Search products..."
                  className="border rounded-xl px-4 py-2.5 text-sm outline-none"
                  style={{ borderColor: 'var(--brand-border)', background: 'var(--card)', width: '260px' }}
                />
                <button
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold"
                  style={{ background: 'var(--brand-green)', color: 'var(--brand-cream)' }}
                >
                  + Add Product
                </button>
              </div>

              <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: 'var(--brand-border)' }}>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ background: 'var(--brand-cream-secondary)' }}>
                        {['Product', 'Category', 'Price', 'Stock', 'Status', 'Actions'].map((h) => (
                          <th key={h} className="text-left text-xs font-semibold px-4 py-3 uppercase tracking-wider" style={{ color: 'var(--brand-warm-gray)' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((p) => (
                        <tr key={p.id} className="border-t hover:bg-[var(--brand-cream-secondary)] transition-colors" style={{ borderColor: 'var(--brand-border)' }}>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0" style={{ background: 'var(--brand-surface)' }}>
                                <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <p className="font-medium">{p.name}</p>
                                <p className="text-xs" style={{ color: 'var(--brand-warm-gray)' }}>SKU: DP-{p.id.padStart(4,'0')}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-xs" style={{ color: 'var(--brand-warm-gray)' }}>{p.category[0]}</td>
                          <td className="px-4 py-3 font-semibold">
                            ${p.salePrice ?? p.price}
                            {p.salePrice && <span className="text-xs line-through ml-1" style={{ color: 'var(--brand-warm-gray)' }}>${p.price}</span>}
                          </td>
                          <td className="px-4 py-3">
                            <span style={{ color: p.stock < 5 ? 'var(--brand-muted-red)' : 'var(--brand-green)' }}>{p.stock}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={statusStyle(p.inStock ? statusColors.Delivered : statusColors.Cancelled)}>
                              {p.inStock ? 'Active' : 'Out of Stock'}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <button className="text-xs underline" style={{ color: 'var(--brand-green)' }}>Edit</button>
                              <button className="text-xs underline" style={{ color: 'var(--brand-muted-red)' }}>Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── ORDERS ── */}
          {section === 'orders' && (
            <div>
              <div className="flex gap-2 mb-5 flex-wrap">
                {['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((f) => (
                  <button
                    key={f}
                    className="px-4 py-1.5 rounded-full text-xs font-medium border"
                    style={{ borderColor: 'var(--brand-border)' }}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: 'var(--brand-border)' }}>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ background: 'var(--brand-cream-secondary)' }}>
                        {['Order ID', 'Customer', 'Date', 'Total', 'Payment', 'Status', 'Action'].map((h) => (
                          <th key={h} className="text-left text-xs font-semibold px-4 py-3 uppercase tracking-wider" style={{ color: 'var(--brand-warm-gray)' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {mockOrders.map((o) => (
                        <tr key={o.id} className="border-t hover:bg-[var(--brand-cream-secondary)] transition-colors cursor-pointer" style={{ borderColor: 'var(--brand-border)' }}>
                          <td className="px-4 py-3 font-mono text-xs">{o.id}</td>
                          <td className="px-4 py-3">{o.customer}</td>
                          <td className="px-4 py-3" style={{ color: 'var(--brand-warm-gray)' }}>{o.date}</td>
                          <td className="px-4 py-3 font-semibold">${o.total}</td>
                          <td className="px-4 py-3">
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={statusStyle(statusColors[o.payment])}>{o.payment}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={statusStyle(statusColors[o.status])}>{o.status}</span>
                          </td>
                          <td className="px-4 py-3">
                            <button className="text-xs underline" style={{ color: 'var(--brand-green)' }}>View</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── CUSTOMERS ── */}
          {section === 'customers' && (
            <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: 'var(--brand-border)' }}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: 'var(--brand-cream-secondary)' }}>
                      {['Customer', 'Email', 'Orders', 'Total Spent', 'Joined', 'Actions'].map((h) => (
                        <th key={h} className="text-left text-xs font-semibold px-4 py-3 uppercase tracking-wider" style={{ color: 'var(--brand-warm-gray)' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {mockCustomers.map((c) => (
                      <tr key={c.email} className="border-t hover:bg-[var(--brand-cream-secondary)] transition-colors" style={{ borderColor: 'var(--brand-border)' }}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: 'var(--brand-green)', color: 'var(--brand-cream)' }}>
                              {c.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            {c.name}
                          </div>
                        </td>
                        <td className="px-4 py-3" style={{ color: 'var(--brand-warm-gray)' }}>{c.email}</td>
                        <td className="px-4 py-3">{c.orders}</td>
                        <td className="px-4 py-3 font-semibold">${c.spent}</td>
                        <td className="px-4 py-3" style={{ color: 'var(--brand-warm-gray)' }}>{c.joined}</td>
                        <td className="px-4 py-3">
                          <button className="text-xs underline" style={{ color: 'var(--brand-green)' }}>View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── COUPONS ── */}
          {section === 'coupons' && (
            <div>
              <div className="flex justify-end mb-5">
                <button className="px-5 py-2.5 rounded-xl text-sm font-semibold" style={{ background: 'var(--brand-green)', color: 'var(--brand-cream)' }}>
                  + Create Coupon
                </button>
              </div>
              <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: 'var(--brand-border)' }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: 'var(--brand-cream-secondary)' }}>
                      {['Code', 'Type', 'Value', 'Expiry', 'Used', 'Actions'].map((h) => (
                        <th key={h} className="text-left text-xs font-semibold px-4 py-3 uppercase tracking-wider" style={{ color: 'var(--brand-warm-gray)' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { code: 'PLANT10', type: 'Percentage', value: '10%', expiry: 'Dec 31, 2025', used: '48/100' },
                      { code: 'WELCOME5', type: 'Flat', value: '$5', expiry: 'Oct 1, 2025', used: '120/500' },
                      { code: 'SUMMER20', type: 'Percentage', value: '20%', expiry: 'Aug 31, 2025', used: '29/50' },
                    ].map((c) => (
                      <tr key={c.code} className="border-t hover:bg-[var(--brand-cream-secondary)]" style={{ borderColor: 'var(--brand-border)' }}>
                        <td className="px-4 py-3 font-mono font-bold text-sm" style={{ color: 'var(--brand-green)' }}>{c.code}</td>
                        <td className="px-4 py-3">{c.type}</td>
                        <td className="px-4 py-3 font-semibold">{c.value}</td>
                        <td className="px-4 py-3" style={{ color: 'var(--brand-warm-gray)' }}>{c.expiry}</td>
                        <td className="px-4 py-3" style={{ color: 'var(--brand-warm-gray)' }}>{c.used}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button className="text-xs underline" style={{ color: 'var(--brand-green)' }}>Edit</button>
                            <button className="text-xs underline" style={{ color: 'var(--brand-muted-red)' }}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── SETTINGS ── */}
          {section === 'settings' && (
            <div className="max-w-2xl">
              <div className="bg-white rounded-2xl border p-6 mb-4" style={{ borderColor: 'var(--brand-border)' }}>
                <h3 className="font-semibold mb-4" style={{ fontFamily: 'Fraunces, serif' }}>Store Settings</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Store Name', val: 'Nabat Green' },
                    { label: 'Currency', val: 'USD ($)' },
                    { label: 'Shipping Fee', val: '5.99' },
                    { label: 'Free Shipping Threshold', val: '60.00' },
                    { label: 'Contact Email', val: 'hello@nabatgreen.com' },
                    { label: 'Phone', val: '+1 (555) 000-9876' },
                  ].map((f) => (
                    <div key={f.label}>
                      <label className="text-xs font-medium block mb-1.5">{f.label}</label>
                      <input
                        defaultValue={f.val}
                        className="w-full border rounded-xl px-4 py-2.5 text-sm outline-none"
                        style={{ borderColor: 'var(--brand-border)' }}
                      />
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <label className="text-xs font-medium block mb-1.5">Announcement Bar Text</label>
                    <input
                      defaultValue="🌿 Free shipping on orders over $60 · Expertly packed, guaranteed to arrive healthy"
                      className="w-full border rounded-xl px-4 py-2.5 text-sm outline-none"
                      style={{ borderColor: 'var(--brand-border)' }}
                    />
                  </div>
                </div>
                <button
                  className="mt-4 px-6 py-2.5 rounded-xl text-sm font-semibold"
                  style={{ background: 'var(--brand-green)', color: 'var(--brand-cream)' }}
                >
                  Save Settings
                </button>
              </div>

              <div className="bg-white rounded-2xl border p-6" style={{ borderColor: 'var(--brand-border)' }}>
                <h3 className="font-semibold mb-4" style={{ fontFamily: 'Fraunces, serif' }}>Social Media</h3>
                <div className="flex flex-col gap-3">
                  {[
                    { label: 'Instagram', val: '@nabatgreen' },
                    { label: 'Twitter / X', val: '@nabatgreen' },
                    { label: 'Pinterest', val: 'nabatgreen' },
                  ].map((f) => (
                    <div key={f.label} className="flex items-center gap-3">
                      <label className="text-sm w-28 flex-shrink-0">{f.label}</label>
                      <input
                        defaultValue={f.val}
                        className="flex-1 border rounded-xl px-4 py-2 text-sm outline-none"
                        style={{ borderColor: 'var(--brand-border)' }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
