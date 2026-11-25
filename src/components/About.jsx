import { LayoutGrid, MonitorPlay, ClipboardList, Rocket, GraduationCap, LifeBuoy, MapPin } from 'lucide-react'
import { PRODUCTS } from '../data/products.js'
import { ABOUT } from '../config.js'

const OFFER = [
  {
    icon: LayoutGrid,
    title: 'Soluciones por rubro',
    text: `Un catálogo de ${PRODUCTS.length} sistemas, CRM, ERP, SaaS y puntos de venta para distintos tipos de negocio.`,
  },
  {
    icon: MonitorPlay,
    title: 'Demostración previa',
    text: 'Solicita una demostración y conoce la solución antes de decidir.',
  },
  {
    icon: ClipboardList,
    title: 'Cotización según tu negocio',
    text: 'Cuéntanos qué necesitas y te enviamos una cotización pensada para tu caso.',
  },
  {
    icon: Rocket,
    title: 'Implementación',
    text: 'Dejamos la solución configurada para que empiece a funcionar en tu negocio.',
  },
  {
    icon: GraduationCap,
    title: 'Capacitación',
    text: 'Enseñamos a tu equipo a usar el sistema con confianza.',
  },
  {
    icon: LifeBuoy,
    title: 'Soporte',
    text: 'Te acompañamos para resolver dudas e incidencias después de empezar.',
  },
]

export default function About() {
  return (
    <section id="nosotros" className="section" aria-labelledby="nosotros-title">
      <div className="container about">
        <div className="about__copy">
          <p className="eyebrow eyebrow--dark">{ABOUT.tagline}</p>
          <h2 id="nosotros-title">Sobre JUBRYX TECHNOLOGIES</h2>
          <p>
            Desarrollamos software y sistemas de gestión para negocios de distintos rubros, y te
            acompañamos desde la demostración hasta la implementación, la capacitación y el
            soporte.
          </p>
          <p className="about__zone">
            <MapPin size={18} aria-hidden="true" />
            Atención a negocios en {ABOUT.zone}
          </p>
        </div>
        <ul className="offer">
          {OFFER.map(({ icon: Icon, title, text }) => (
            <li key={title} className="offer__item">
              <span className="offer__icon">
                <Icon size={22} aria-hidden="true" />
              </span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
