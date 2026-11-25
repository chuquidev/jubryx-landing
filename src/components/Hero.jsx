import { useState } from 'react'
import { Search, ArrowRight, Layers, Store, Stethoscope } from 'lucide-react'
import { WhatsAppIcon } from './icons.jsx'
import { waLink, GENERAL_MESSAGE } from '../config.js'
import { PRODUCTS, TYPES } from '../data/products.js'

const SUGGESTIONS = ['Restaurante', 'Farmacia', 'Colegio', 'Taller', 'Gimnasio']

export default function Hero({ onSearch }) {
  const [value, setValue] = useState('')

  const submit = (e) => {
    e.preventDefault()
    onSearch(value)
  }

  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="eyebrow">Software y sistemas de gestión</p>
          <h1 id="hero-title">El sistema que tu negocio necesita, listo para demostrar</h1>
          <p className="hero__lead">
            JUBRYX TECHNOLOGIES ofrece {PRODUCTS.length} soluciones: ERP, CRM, SaaS, sistemas a
            medida de cada rubro y puntos de venta (TPV).
          </p>

          <form className="hero__search" role="search" aria-label="Buscar solución" onSubmit={submit}>
            <label htmlFor="hero-q" className="sr-only">
              Buscar una solución
            </label>
            <Search size={20} aria-hidden="true" className="hero__search-icon" />
            <input
              id="hero-q"
              type="search"
              inputMode="search"
              autoComplete="off"
              placeholder="Ej.: restaurante, farmacia, colegio…"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button type="submit" className="btn btn--primary">
              Buscar
            </button>
          </form>

          <p className="hero__chips">
            <span>Prueba con:</span>
            {SUGGESTIONS.map((s) => (
              <button key={s} type="button" className="chip chip--ghost" onClick={() => onSearch(s)}>
                {s}
              </button>
            ))}
          </p>

          <div className="hero__actions">
            <a className="btn btn--primary btn--lg" href="#soluciones">
              Ver catálogo
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a
              className="btn btn--outline-light btn--lg"
              href={waLink(GENERAL_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon size={18} />
              Solicitar demostración
            </a>
          </div>
        </div>

        {/* Ilustración ligera en CSS: sin imágenes ni JavaScript adicional. */}
        <div className="hero__visual" aria-hidden="true">
          <div className="mock">
            <div className="mock__bar">
              <i /> <i /> <i />
            </div>
            <div className="mock__body">
              <div className="mock__side">
                <span /> <span /> <span /> <span />
              </div>
              <div className="mock__main">
                <div className="mock__row">
                  <b />
                  <b />
                  <b />
                </div>
                <div className="mock__chart">
                  <s style={{ height: '40%' }} />
                  <s style={{ height: '65%' }} />
                  <s style={{ height: '50%' }} />
                  <s style={{ height: '85%' }} />
                  <s style={{ height: '60%' }} />
                  <s style={{ height: '95%' }} />
                </div>
              </div>
            </div>
          </div>
          <div className="float float--a">
            <Layers size={18} /> {TYPES.length} tipos de solución
          </div>
          <div className="float float--b">
            <Store size={18} /> Comercio
          </div>
          <div className="float float--c">
            <Stethoscope size={18} /> Salud
          </div>
        </div>
      </div>
    </section>
  )
}
