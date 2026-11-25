import { Phone } from 'lucide-react'
import { WhatsAppIcon } from './icons.jsx'
import { CONTACT, telLink, waLink, GENERAL_MESSAGE } from '../config.js'

// Barra fija solo para móvil: dos acciones de contacto siempre a la mano.
export default function MobileBar() {
  return (
    <div className="mbar" role="region" aria-label="Contacto rápido">
      <a className="mbar__btn mbar__btn--call" href={telLink(CONTACT.phones[0])}>
        <Phone size={20} aria-hidden="true" />
        Llamar
      </a>
      <a
        className="mbar__btn mbar__btn--wa"
        href={waLink(GENERAL_MESSAGE)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <WhatsAppIcon size={20} />
        WhatsApp
      </a>
    </div>
  )
}
