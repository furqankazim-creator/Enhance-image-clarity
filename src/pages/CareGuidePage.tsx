import { motion } from 'framer-motion'
import { useAppStore } from '../store/appStore'

const guides = [
  {
    icon: '💧',
    title: 'Watering',
    sections: [
      { heading: 'How often?', body: 'Most office plants prefer to dry out between waterings. Stick your finger 2 inches into the soil — if it feels dry, water thoroughly until it drains from the bottom. In winter, reduce frequency by half.' },
      { heading: 'How much?', body: 'Water until it flows freely from drainage holes. Empty the saucer after 30 minutes to prevent root rot. Never let plants sit in standing water.' },
    ],
  },
  {
    icon: '☀️',
    title: 'Light',
    sections: [
      { heading: 'Low Light', body: 'North-facing windows, or 6+ feet from a window. Snake Plants, ZZ Plants, and Pothos all thrive here.' },
      { heading: 'Medium / Indirect', body: 'East-facing windows or dappled light from south/west windows through a sheer curtain. Perfect for Pilea, Peace Lily, and Money Plant.' },
      { heading: 'Bright Indirect', body: 'South or west windows with direct morning sun acceptable. Succulents and Aloe need the most light.' },
    ],
  },
  {
    icon: '🌡️',
    title: 'Temperature & Humidity',
    sections: [
      { heading: 'Temperature', body: 'Most indoor plants are comfortable between 15–30°C. Avoid cold draughts, heating vents, and air conditioning directly on foliage.' },
      { heading: 'Humidity', body: 'Average room humidity is fine for most desk plants. If leaves brown at the tips, mist occasionally or place a small pebble tray with water beneath the pot.' },
    ],
  },
  {
    icon: '🌿',
    title: 'Feeding',
    sections: [
      { heading: 'When to feed?', body: 'Spring and summer only — this is the active growing season. Stop feeding in autumn and winter when growth slows.' },
      { heading: 'What to use?', body: 'A balanced liquid fertiliser (NPK 10-10-10) diluted to half strength, once a month. Over-feeding causes salt build-up and brown leaf tips.' },
    ],
  },
  {
    icon: '🪴',
    title: 'Repotting',
    sections: [
      { heading: 'When to repot?', body: 'When roots circle the bottom of the pot or push out of drainage holes. Typically every 1–2 years, in spring.' },
      { heading: 'How to repot?', body: 'Choose a pot 2–4cm larger in diameter. Use fresh, well-draining potting mix. Water thoroughly after repotting and keep out of direct sun for a week.' },
    ],
  },
  {
    icon: '🐛',
    title: 'Pests & Problems',
    sections: [
      { heading: 'Common pests', body: 'Spider mites (fine webbing), mealybugs (white fluff), fungus gnats (tiny flies in soil). Inspect new plants before introducing them to existing plants.' },
      { heading: 'Treatment', body: 'Wipe leaves with a damp cloth. Spray with neem oil solution weekly for 3–4 weeks. For gnats, let soil dry completely between waterings.' },
    ],
  },
]

export default function CareGuidePage() {
  const { navigate } = useAppStore()

  return (
    <div>
      {/* Header */}
      <div className="px-4 sm:px-6 py-14 md:py-20 text-center" style={{ background: 'var(--brand-green)' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--brand-terracotta)' }}>Free Resource</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Fraunces, serif', color: 'var(--brand-cream)' }}>
            Complete Care Guide
          </h1>
          <p className="max-w-lg mx-auto" style={{ color: 'rgba(250,247,242,0.75)' }}>
            Everything you need to keep your desk plants thriving, season after season.
          </p>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex flex-col gap-10">
          {guides.map((guide, i) => (
            <motion.section
              key={guide.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="p-6 md:p-8 rounded-3xl border"
              style={{ borderColor: 'var(--brand-border)', background: 'var(--card)' }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">{guide.icon}</span>
                <h2 className="text-2xl font-bold" style={{ fontFamily: 'Fraunces, serif' }}>{guide.title}</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {guide.sections.map((s) => (
                  <div key={s.heading}>
                    <h3 className="font-semibold text-sm mb-2" style={{ color: 'var(--brand-green)' }}>{s.heading}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--brand-warm-gray)' }}>{s.body}</p>
                  </div>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Fraunces, serif' }}>Ready to bring a plant home?</h2>
          <p className="mb-6" style={{ color: 'var(--brand-warm-gray)' }}>Every order comes with a personalised care card for your specific plant.</p>
          <button
            onClick={() => navigate('shop')}
            className="px-8 py-3.5 rounded-full font-semibold text-sm"
            style={{ background: 'var(--brand-green)', color: 'var(--brand-cream)' }}
          >
            Shop All Plants →
          </button>
        </div>
      </div>
    </div>
  )
}
