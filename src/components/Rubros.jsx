import {
  HeartPulse, GraduationCap, ShoppingBag, UtensilsCrossed, BedDouble, Wrench,
  Truck, FolderOpen, Landmark, ShieldCheck, Dumbbell, Briefcase,
} from 'lucide-react'
import { RUBROS, PRODUCTS } from '../data/products.js'

export const RUBRO_ICONS = {
  salud: HeartPulse,
  educacion: GraduationCap,
  comercio: ShoppingBag,
  gastronomia: UtensilsCrossed,
  hospedaje: BedDouble,
  talleres: Wrench,
  logistica: Truck,
  documental: FolderOpen,
  finanzas: Landmark,
  seguridad: ShieldCheck,
  bienestar: Dumbbell,
  servicios: Briefcase,
}

const COUNTS = PRODUCTS.reduce((acc, p) => {
  acc[p.rubro] = (acc[p.rubro] || 0) + 1
  return acc
}, {})

export default function Rubros({ onPick }) {
  return (
    <section id="rubros" className="section section--soft" aria-labelledby="rubros-title">
      <div className="container">
        <header className="section__head">
          <h2 id="rubros-title">¿Para qué tipo de negocio buscas?</h2>
          <p>Elige tu rubro y te mostramos solo las soluciones relacionadas.</p>
        </header>
        <ul className="rubros">
          {RUBROS.map((r) => {
            const Icon = RUBRO_ICONS[r.id]
            return (
              <li key={r.id}>
                <button type="button" className="rubro" onClick={() => onPick(r.id)}>
                  <span className="rubro__icon">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <span className="rubro__name">{r.label}</span>
                  <span className="rubro__count">{COUNTS[r.id]} soluciones</span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
