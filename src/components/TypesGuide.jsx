import { LayoutDashboard, Network, Users, Cloud, CreditCard, ArrowRight } from 'lucide-react'
import { PRODUCTS } from '../data/products.js'

const COUNTS = PRODUCTS.reduce((acc, p) => {
  acc[p.type] = (acc[p.type] || 0) + 1
  return acc
}, {})

const TYPES_INFO = [
  {
    id: 'sistema',
    icon: LayoutDashboard,
    title: 'Sistema de gestión',
    text: 'Programa pensado para un rubro concreto (restaurante, botica, hostal…) que ordena la operación diaria de tu negocio.',
  },
  {
    id: 'erp',
    icon: Network,
    title: 'ERP',
    text: 'Reúne en un solo lugar las áreas del negocio (ventas, inventario, compras, finanzas) para que la información no quede dispersa.',
  },
  {
    id: 'crm',
    icon: Users,
    title: 'CRM',
    text: 'Organiza a tus clientes y el seguimiento de cada contacto o venta: quién consultó, qué se le ofreció y qué sigue.',
  },
  {
    id: 'saas',
    icon: Cloud,
    title: 'SaaS',
    text: 'Software como servicio: se usa desde internet, sin depender de instalar programas en cada equipo.',
  },
  {
    id: 'tpv',
    icon: CreditCard,
    title: 'TPV (punto de venta)',
    text: 'La caja de tu negocio: sirve para registrar ventas y cobros de forma rápida en mostrador.',
  },
]

export default function TypesGuide({ onPick }) {
  return (
    <section id="tipos" className="section section--soft" aria-labelledby="tipos-title">
      <div className="container">
        <header className="section__head">
          <h2 id="tipos-title">¿Qué tipo de solución necesito?</h2>
          <p>Si los términos te suenan técnicos, aquí tienes la diferencia en pocas palabras.</p>
        </header>
        <ul className="types">
          {TYPES_INFO.map(({ id, icon: Icon, title, text }) => (
            <li key={id} className="type">
              <span className="type__icon">
                <Icon size={22} aria-hidden="true" />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
              <button type="button" className="link-btn" onClick={() => onPick(id)}>
                Ver {COUNTS[id]} {COUNTS[id] === 1 ? 'solución' : 'soluciones'}
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
