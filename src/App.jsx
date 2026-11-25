import { lazy, Suspense, useCallback, useState } from 'react'
import { WhatsAppIcon } from './components/icons.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Rubros from './components/Rubros.jsx'
import Catalog from './components/Catalog.jsx'
import TypesGuide from './components/TypesGuide.jsx'
import Steps from './components/Steps.jsx'
import About from './components/About.jsx'
import Faq from './components/Faq.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import MobileBar from './components/MobileBar.jsx'
import AssistantLauncher from './components/AssistantLauncher.jsx'
import { waLink, GENERAL_MESSAGE } from './config.js'

// El asistente se descarga solo cuando el visitante lo abre.
const Assistant = lazy(() => import('./components/Assistant.jsx'))

const INITIAL = { q: '', type: '', rubro: '' }

function scrollTo(id) {
  requestAnimationFrame(() => {
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    })
  })
}

export default function App() {
  const [filters, setFilters] = useState(INITIAL)
  const [quote, setQuote] = useState(null)
  const [assistantOpen, setAssistantOpen] = useState(false)
  const openAssistant = useCallback(() => setAssistantOpen(true), [])

  const change = useCallback((patch) => setFilters((f) => ({ ...f, ...patch })), [])
  const clear = useCallback(() => setFilters(INITIAL), [])

  return (
    <>
      <a className="skip" href="#contenido">Saltar al contenido</a>
      <Header />
      <main id="contenido">
        <Hero
          onSearch={(q) => {
            setFilters({ ...INITIAL, q: q.trim() })
            scrollTo('soluciones')
          }}
        />
        <Rubros
          onPick={(rubro) => {
            setFilters({ ...INITIAL, rubro })
            scrollTo('soluciones')
          }}
        />
        <Catalog
          filters={filters}
          onChange={change}
          onClear={clear}
          onAssist={openAssistant}
          onQuote={(p) => {
            setQuote(p)
            scrollTo('contacto')
          }}
        />
        <TypesGuide
          onPick={(type) => {
            setFilters({ ...INITIAL, type })
            scrollTo('soluciones')
          }}
        />
        <Steps />
        <About />
        <Faq />
        <Contact product={quote} />
      </main>
      <Footer />
      {assistantOpen && (
        <Suspense fallback={null}>
          <Assistant
            onClose={() => setAssistantOpen(false)}
            onViewCatalog={(rubro, q) => {
              setAssistantOpen(false)
              setFilters({ ...INITIAL, rubro, q: q || '' })
              scrollTo('soluciones')
            }}
          />
        </Suspense>
      )}
      <MobileBar />
      {!assistantOpen && <AssistantLauncher onOpen={openAssistant} />}
      <a
        className="wa-fab"
        href={waLink(GENERAL_MESSAGE)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribir por WhatsApp"
      >
        <WhatsAppIcon size={30} />
      </a>
    </>
  )
}
