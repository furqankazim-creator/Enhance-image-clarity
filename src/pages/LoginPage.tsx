import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '../store/appStore'

export default function LoginPage() {
  const { navigate, setLoggedIn, addToast } = useAppStore()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoggedIn(true)
    addToast(mode === 'login' ? 'Welcome back!' : 'Account created!', 'success')
    navigate('account')
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <button onClick={() => navigate('home')} className="text-3xl mb-4 block mx-auto">🌿</button>
          <h1 className="text-3xl font-bold" style={{ fontFamily: 'Fraunces, serif' }}>
            {mode === 'login' ? 'Welcome back' : 'Create account'}
          </h1>
          <p className="text-sm mt-2" style={{ color: 'var(--brand-warm-gray)' }}>
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="font-semibold underline"
              style={{ color: 'var(--brand-green)' }}
            >
              {mode === 'login' ? 'Register' : 'Sign in'}
            </button>
          </p>
        </div>

        <div className="p-6 rounded-2xl border" style={{ borderColor: 'var(--brand-border)', background: 'var(--card)' }}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === 'register' && (
              <div>
                <label className="text-xs font-medium block mb-1.5">Full Name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Jane Smith"
                  className="w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[var(--brand-green)]"
                  style={{ borderColor: 'var(--brand-border)' }}
                />
              </div>
            )}
            <div>
              <label className="text-xs font-medium block mb-1.5">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="your@email.com"
                className="w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[var(--brand-green)]"
                style={{ borderColor: 'var(--brand-border)' }}
              />
            </div>
            <div>
              <label className="text-xs font-medium block mb-1.5">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                className="w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[var(--brand-green)]"
                style={{ borderColor: 'var(--brand-border)' }}
              />
            </div>
            {mode === 'register' && (
              <div>
                <label className="text-xs font-medium block mb-1.5">Confirm Password</label>
                <input
                  type="password"
                  value={form.confirm}
                  onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                  placeholder="••••••••"
                  className="w-full border rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[var(--brand-green)]"
                  style={{ borderColor: 'var(--brand-border)' }}
                />
              </div>
            )}

            {mode === 'login' && (
              <button type="button" className="text-xs text-right underline" style={{ color: 'var(--brand-warm-gray)' }}>
                Forgot password?
              </button>
            )}

            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3.5 rounded-2xl font-semibold text-sm mt-1"
              style={{ background: 'var(--brand-green)', color: 'var(--brand-cream)' }}
            >
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </motion.button>
          </form>

          <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--brand-border)' }}>
            <p className="text-xs text-center mb-3" style={{ color: 'var(--brand-warm-gray)' }}>Or continue with</p>
            <button
              onClick={handleSubmit}
              className="w-full py-2.5 rounded-xl border text-sm font-medium flex items-center justify-center gap-2"
              style={{ borderColor: 'var(--brand-border)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Continue with Google
            </button>
          </div>
        </div>

        <p className="text-xs text-center mt-6" style={{ color: 'var(--brand-warm-gray)' }}>
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </motion.div>
    </div>
  )
}
