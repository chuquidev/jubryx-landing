import { lazy, Suspense, useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { Search, X, SearchX, FilterX, Sparkles } from 'lucide-react'
import { PRODUCTS, TYPES, RUBROS, normalize } from '../data/products.js'
import { useDebounce } from '../hooks.js'
import ProductCard from './ProductCard.jsx'

const ProductDialog = lazy(() => import('./ProductDialog.jsx'))
const PAGE = 12

export default function Catalog({ filters, onChange, onClear, onQuote, onAssist }) {
  const { q, type, rubro } = filters

  // Campo local + debounce; sincroniza con cambios externos (hero, rubros, limpiar).
  const [input, setInput] = useState(q)
  const debounced = useDebounce(input, 250)
  const lastPushed = useRef(q)

  useEffect(() => {
    if (debounced === input && debounced !== lastPushed.current) {
      lastPushed.current = debounced
      onChange({ q: debounced })
    }
  }, [debounced, input, onChange])

  useEffect(() => {
    if (q !== lastPushed.current) {
      lastPushed.current = q
      setInput(q)
    }
  }, [q])

  const [visible, setVisible] = useState(PAGE)
  useEffect(() => setVisible(PAGE), [q, type, rubro])

  const results = useMemo(() => {
    const terms = normalize(q).split(/\s+/).filter(Boolean)
    return PRODUCTS.filter(
      (p) =>
        (!type || p.type === type) &&
        (!rubro || p.rubro === rubro) &&
        terms.every((t) => p.haystack.includes(t)),
    )
  }, [q, type, rubro])

  const [selected, setSelected] = useState(null)
  const openProduct = useCallback((p) => setSelected(p), [])
  const hasFilters = Boolean(q || type || rubro)
  const shown = results.slice(0, visible)

  return (
    <section id="soluciones" className="section" aria-labelledby="catalogo-title">
      <div className="container">
        <header className="section__head">
          <h2 id="catalogo-title">Catálogo de soluciones</h2>
          <p>Busca por nombre o palabra clave y combina los filtros para encontrar tu sistema.</p>
          <button type="button" className="btn btn--soft assist-cta" onClick={onAssist}>
            <Sparkles size={18} aria-hidden="true" />
            Ayúdame a elegir (3 preguntas)
          </button>
        </header>

        <div className="toolbar">
          <div className="field field--search" role="search" aria-label="Buscar en el catálogo">
            <label htmlFor="catalog-q" className="sr-only">
              Buscar en el catálogo
            </label>
            <Search size={20} aria-hidden="true" className="field__icon" />
            <input
              id="catalog-q"
              type="search"
              autoComplete="off"
              placeholder="Buscar: restaurante, CRM, farmacia, TPV…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            {input && (
              <button
                type="button"
                className="field__clear"
                onClick={() => setInput('')}
                aria-label="Borrar búsqueda"
              >
                <X size={18} aria-hidden="true" />
              </button>
            )}
          </div>

          <fieldset className="filters">
            <legend>Tipo de solución</legend>
            <div className="chips">
              <button
                type="button"
                className="chip"
                aria-pressed={!type}
                onClick={() => onChange({ type: '' })}
              >
                Todos
              </button>
              {TYPES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className="chip"
                  aria-pressed={type === t.id}
                  onClick={() => onChange({ type: type === t.id ? '' : t.id })}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="filters">
            <legend>Rubro</legend>
            <div className="chips chips--scroll">
              <button
                type="button"
                className="chip"
                aria-pressed={!rubro}
                onClick={() => onChange({ rubro: '' })}
              >
                Todos
              </button>
              {RUBROS.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  className="chip"
                  aria-pressed={rubro === r.id}
                  onClick={() => onChange({ rubro: rubro === r.id ? '' : r.id })}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="toolbar__meta">
            <p className="count" role="status" aria-live="polite">
              {results.length === 0
                ? 'Sin resultados'
                : `${results.length} ${results.length === 1 ? 'solución' : 'soluciones'}`}
              {results.length > 0 && results.length < PRODUCTS.length && ` de ${PRODUCTS.length}`}
            </p>
            <button type="button" className="link-btn" onClick={onClear} disabled={!hasFilters}>
              <FilterX size={16} aria-hidden="true" />
              Limpiar filtros
            </button>
          </div>
        </div>

        {results.length === 0 ? (
          <div className="empty">
            <SearchX size={40} aria-hidden="true" />
            <h3>No encontramos soluciones con esos criterios</h3>
            <p>Prueba con otra palabra, quita algún filtro o cuéntanos qué necesitas.</p>
            <div className="empty__actions">
              <button type="button" className="btn btn--primary" onClick={onClear}>
                Limpiar filtros
              </button>
              <button type="button" className="btn btn--soft" onClick={onAssist}>
                <Sparkles size={18} aria-hidden="true" />
                Ayúdame a elegir
              </button>
              <a className="btn btn--outline" href="#contacto">
                Consultar por otra solución
              </a>
            </div>
          </div>
        ) : (
          <>
            <ul className="grid">
              {shown.map((p) => (
                <li key={p.id}>
                  <ProductCard product={p} onOpen={openProduct} />
                </li>
              ))}
            </ul>
            {visible < results.length && (
              <div className="more">
                <button
                  type="button"
                  className="btn btn--outline"
                  onClick={() => setVisible((v) => v + PAGE)}
                >
                  Mostrar más ({results.length - visible} restantes)
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {selected && (
        <Suspense fallback={null}>
          <ProductDialog
            product={selected}
            onClose={() => setSelected(null)}
            onQuote={(p) => {
              setSelected(null)
              onQuote(p)
            }}
          />
        </Suspense>
      )}
    </section>
  )
}
