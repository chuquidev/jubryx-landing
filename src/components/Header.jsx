import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import Logo from './Logo.jsx'
import { WhatsAppIcon } from './icons.jsx'
import { waLink, GENERAL_MESSAGE } from '../config.js'

const LINKS = [
  { href: '#soluciones', label: 'Soluciones' },
  { href: '#rubros', label: 'Para quién' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#preguntas', label: 'Preguntas' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#inicio" className="header__brand" aria-label="JUBRYX TECHNOLOGIES, inicio">
          <Logo />
        </a>

        <nav
          id="menu-principal"
          className={`nav${open ? ' nav--open' : ''}`}
          aria-label="Principal"
        >
          <ul>
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            className="btn btn--primary nav__cta"
            href={waLink(GENERAL_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon size={18} />
            Cotizar por WhatsApp
          </a>
        </nav>

        <button
          type="button"
          className="menu-btn"
          aria-expanded={open}
          aria-controls="menu-principal"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          <span className="sr-only">{open ? 'Cerrar menú' : 'Abrir menú'}</span>
        </button>
      </div>
    </header>
  )
}
