import { useState } from 'react'
import { useAppStore } from '../store/appStore'

const orders = [
  { id: '#DP-48291', date: 'Jun 12, 2025', total: 52, status: 'Delivered', items: ['Snake Plant', 'Golden Pothos'] },
  { id: '#DP-41073', date: 'Apr 3, 2025', total: 34, status: 'Delivered', items: ['ZZ Plant'] },
  { id: '#DP-38821', date: 'Jan 18, 2025', total: 76, status: 'Delivered', items: ['Aloe Vera', 'Succulent Trio'] },
]

const statusColors: Record<string, string> = {
  Processing: 'var(--brand-terracotta)',
  Shipped: 'var(--brand-sage)',
  Delivered: 'var(--brand-green)',
  Cancelled: 'var(--brand-muted-red)',
}

export default function AccountPage() {
  const { navigate, setLoggedIn, addToast } = useAppStore()
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses'>('orders')

  function handleLogout() {
    setLoggedIn(false)
    addToast('Signed out successfully', 'info')
    navigate('home')
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold" style={{ fontFamily: 'Fraunces, serif' }}>My Account</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--brand-warm-gray)' }}>Welcome back, Jane 👋</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm font-medium px-4 py-2 rounded-xl border"
          style={{ borderColor: 'var(--brand-border)', color: 'var(--brand-warm-gray)' }}
        >
          Sign Out
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl mb-8 w-fit" style={{ background: 'var(--brand-surface)' }}>
        {([
          { id: 'orders', label: 'Orders' },
          { id: 'profile', label: 'Profile' },
          { id: 'addresses', label: 'Addresses' },
        ] as const).map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className="px-5 py-2 rounded-lg text-sm font-medium transition-all"
            style={{
              background: activeTab === t.id ? 'var(--brand-green)' : 'transparent',
              color: activeTab === t.id ? 'var(--brand-cream)' : 'var(--brand-warm-gray)',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'orders' && (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-5 rounded-2xl border"
              style={{ borderColor: 'var(--brand-border)', background: 'var(--card)' }}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <p className="font-semibold font-mono text-sm">{order.id}</p>
                    <span
                      className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                      style={{ background: statusColors[order.status] + '18', color: statusColors[order.status] }}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--brand-warm-gray)' }}>{order.date} · {order.items.join(', ')}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${order.total.toFixed(2)}</p>
                  <button className="text-xs mt-1 underline" style={{ color: 'var(--brand-green)' }}>View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="p-6 rounded-2xl border" style={{ borderColor: 'var(--brand-border)', background: 'var(--card)' }}>
          <h2 className="font-semibold mb-4" style={{ fontFamily: 'Fraunces, serif' }}>Personal Information</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: 'First Name', val: 'Jane' },
              { label: 'Last Name', val: 'Smith' },
              { label: 'Email', val: 'jane@example.com' },
              { label: 'Phone', val: '+1 (555) 000-1234' },
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
          </div>
          <button
            className="mt-4 px-6 py-2.5 rounded-xl text-sm font-semibold"
            style={{ background: 'var(--brand-green)', color: 'var(--brand-cream)' }}
          >
            Save Changes
          </button>
        </div>
      )}

      {activeTab === 'addresses' && (
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border" style={{ borderColor: 'var(--brand-green)', background: 'var(--card)' }}>
            <div className="flex items-center justify-between mb-3">
              <p className="font-semibold text-sm">Default Address</p>
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--brand-surface)', color: 'var(--brand-green)' }}>Default</span>
            </div>
            <p className="text-sm">Jane Smith</p>
            <p className="text-sm" style={{ color: 'var(--brand-warm-gray)' }}>123 Plant Street, Apt 4B</p>
            <p className="text-sm" style={{ color: 'var(--brand-warm-gray)' }}>New York, NY 10001</p>
            <p className="text-sm" style={{ color: 'var(--brand-warm-gray)' }}>United States</p>
            <button className="mt-3 text-xs underline" style={{ color: 'var(--brand-green)' }}>Edit</button>
          </div>
          <button
            className="p-5 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 hover:border-[var(--brand-green)] transition-colors"
            style={{ borderColor: 'var(--brand-border)', minHeight: '140px' }}
          >
            <span className="text-3xl">+</span>
            <span className="text-sm" style={{ color: 'var(--brand-warm-gray)' }}>Add new address</span>
          </button>
        </div>
      )}
    </div>
  )
}
