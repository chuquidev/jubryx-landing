import { Phone, Mail, Clock } from 'lucide-react'
import Logo from './Logo.jsx'
import Socials from './Socials.jsx'
import { CONTACT, HOURS, telLink } from '../config.js'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <Logo light alt="JUBRYX TECHNOLOGIES" />
          <p className="footer__text">Software y sistemas de gestión para tu negocio.</p>
          <Socials className="socials--footer" />
        </div>
        <nav aria-label="Pie de página">
          <ul>
            <li><a href="#soluciones">Soluciones</a></li>
            <li><a href="#rubros">Para quién</a></li>
            <li><a href="#como-solicitar">Cómo solicitar</a></li>
            <li><a href="#nosotros">Nosotros</a></li>
            <li><a href="#preguntas">Preguntas frecuentes</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
        </nav>
        <ul className="footer__contact">
          {CONTACT.phones.map((p) => (
            <li key={p.raw}>
              <a href={telLink(p)}>
                <Phone size={16} aria-hidden="true" /> {p.display}
              </a>
            </li>
          ))}
          <li>
            <a href={`mailto:${CONTACT.email}`}>
              <Mail size={16} aria-hidden="true" /> {CONTACT.email}
            </a>
          </li>
          {HOURS && (
            <li className="footer__hours">
              <Clock size={16} aria-hidden="true" /> {HOURS}
            </li>
          )}
        </ul>
      </div>
      <div className="container footer__legal">
        © {new Date().getFullYear()} JUBRYX TECHNOLOGIES. Todos los derechos reservados.
      </div>
    </footer>
  )
}
