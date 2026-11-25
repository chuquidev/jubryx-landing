import { useEffect, useMemo, useRef, useState } from 'react'
import { X, RotateCcw, Check, Send, Undo2 } from 'lucide-react'
import { PRODUCTS, RUBROS, normalize } from '../data/products.js'
import { productIcon, WhatsAppIcon } from './icons.jsx'
import { waLink, productMessage } from '../config.js'

// Asistente conversacional sin IA: reglas simples sobre el propio catálogo.
// No inventa funciones ni precios: solo ordena las soluciones existentes.

const NEEDS = [
  { id: 'ventas', label: 'Ventas y caja', words: ['ventas', 'caja', 'punto de venta', 'facturacion', 'pedidos', 'comandas'], type: 'tpv' },
  { id: 'inventario', label: 'Inventario y stock', words: ['stock', 'inventario', 'kardex', 'almacen', 'productos'] },
  { id: 'clientes', label: 'Clientes y seguimiento', words: ['clientes', 'pacientes', 'alumnos', 'socios', 'residentes', 'seguimiento', 'oportunidades'], type: 'crm' },
  { id: 'citas', label: 'Citas, reservas o turnos', words: ['citas', 'agenda', 'turnos', 'reservas', 'habitaciones', 'mesas'] },
  { id: 'cobros', label: 'Cobros, cuotas o planillas', words: ['cobranza', 'cuotas', 'creditos', 'cobros', 'planilla', 'sueldos'] },
  { id: 'personal', label: 'Personal y asistencia', words: ['asistencia', 'personal', 'marcacion', 'trabajadores'] },
  { id: 'documentos', label: 'Documentos y trámites', words: ['expedientes', 'archivos', 'tramites', 'documental'] },
  { id: 'integral', label: 'Gestión integral del negocio', words: [], type: 'erp' },
  { id: 'internet', label: 'Usarlo desde internet', words: ['web'], type: 'saas' },
]

const SIZES = ['Solo yo', '2 a 5 personas', '6 a 15 personas', 'Más de 15 personas']
const NEEDS_NORM = NEEDS.map((n) => ({ ...n, words: n.words.map(normalize) }))
const stem = (t) => t.replace(/(es|s)$/, '')
const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function recommend(rubro, needIds) {
  // Sin rubro ni necesidades no hay base para sugerir: se invita a dar más datos.
  if (!rubro && needIds.length === 0) return { items: [], matched: true }
  const needs = NEEDS_NORM.filter((n) => needIds.includes(n.id))
  const pool = rubro ? PRODUCTS.filter((p) => p.rubro === rubro) : PRODUCTS
  const scored = pool.map((p) => {
    let score = 0
    for (const n of needs) {
      if (n.words.some((w) => p.haystack.includes(w))) score += 2
      if (n.type && p.type === n.type) score += 1.5
    }
    return { p, score }
  })
  scored.sort((a, b) => b.score - a.score || a.p.id - b.p.id)
  return {
    items: scored.slice(0, 4).map((s) => s.p),
    matched: needs.length === 0 || scored.some((s) => s.score > 0),
  }
}

function searchProducts(text) {
  const terms = normalize(text).split(/\s+/).filter((t) => t.length > 1).map(stem)
  if (!terms.length) return []
  const scored = PRODUCTS.map((p) => ({ p, hits: terms.filter((t) => p.haystack.includes(t)).length }))
    .filter((s) => s.hits > 0)
    .sort((a, b) => b.hits - a.hits || a.p.id - b.p.id)
  return scored.slice(0, 4).map((s) => s.p)
}

function buildMessage({ rubroLabel, query, needLabels, size, items }) {
  return [
    'Hola JUBRYX TECHNOLOGIES, usé el asistente de su página.',
    query && `Busqué: "${query}".`,
    rubroLabel && `Rubro: ${rubroLabel}.`,
    needLabels.length && `Necesito controlar: ${needLabels.join(', ')}.`,
    size && `Lo usarían: ${size.toLowerCase()}.`,
    items.length && `Me interesan: ${items.map((p) => p.name).join('; ')}.`,
    '¿Podemos coordinar una demostración y cotización?',
  ]
    .filter(Boolean)
    .join(' ')
}

function Mascot({ className = 'msg__avatar' }) {
  return <img className={className} src="/mascot.webp" width="160" height="160" alt="" decoding="async" />
}

const Bot = ({ children }) => (
  <div className="msg msg--bot">
    <Mascot />
    <div className="bubble">{children}</div>
  </div>
)
const User = ({ children }) => (
  <div className="msg msg--user">
    <div className="bubble">{children}</div>
  </div>
)
const Typing = () => (
  <div className="msg msg--bot">
    <Mascot />
    <div className="bubble bubble--typing" aria-hidden="true">
      <i />
      <i />
      <i />
    </div>
  </div>
)

export default function Assistant({ onClose, onViewCatalog }) {
  const dialogRef = useRef(null)
  const logRef = useRef(null)
  const [step, setStep] = useState(0)
  const [rubro, setRubro] = useState('')
  const [query, setQuery] = useState('')
  const [needs, setNeeds] = useState([])
  const [size, setSize] = useState('')
  const [draft, setDraft] = useState('')
  const [typing, setTyping] = useState(true)

  useEffect(() => {
    const dlg = dialogRef.current
    if (dlg && !dlg.open) dlg.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  // "Escribiendo…" breve antes de cada mensaje del asistente (sin espera si se prefiere menos movimiento).
  useEffect(() => {
    setTyping(true)
    const id = setTimeout(() => setTyping(false), prefersReduced() ? 0 : step === 3 ? 700 : 500)
    return () => clearTimeout(id)
  }, [step])

  // Al terminar de "escribir": desplazar al final y llevar el foco a la primera respuesta.
  useEffect(() => {
    const log = logRef.current
    if (!log) return
    log.scrollTo({ top: log.scrollHeight, behavior: prefersReduced() ? 'auto' : 'smooth' })
    if (!typing) log.querySelector('[data-first]')?.focus({ preventScroll: true })
  }, [step, typing])

  const rubroLabel = rubro ? RUBROS.find((r) => r.id === rubro).label : ''
  const needLabels = NEEDS.filter((n) => needs.includes(n.id)).map((n) => n.label)
  const result = useMemo(() => {
    if (step !== 3) return null
    return query ? { items: searchProducts(query), matched: true } : recommend(rubro, needs)
  }, [step, query, rubro, needs])

  const toggleNeed = (id) =>
    setNeeds((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]))
  const restart = () => {
    setRubro('')
    setQuery('')
    setNeeds([])
    setSize('')
    setDraft('')
    setStep(0)
  }
  const back = () => {
    if (step === 1) {
      setRubro('')
      setStep(0)
    } else if (step === 2) setStep(1)
  }
  const sendDraft = (e) => {
    e.preventDefault()
    const text = draft.trim()
    if (!text) return
    setQuery(text)
    setRubro('')
    setDraft('')
    setStep(3)
  }

  const scope = rubro
    ? `tu rubro (${rubroLabel.toLowerCase()})${needLabels.length ? ' y lo que necesitas' : ''}`
    : needLabels.length
      ? 'lo que necesitas'
      : ''

  let resultText = ''
  if (result) {
    if (query)
      resultText = result.items.length
        ? `Esto encontré para “${query}”:`
        : `No encontré soluciones para “${query}”. Prueba con otra palabra, elige un rubro o escríbenos y te orientamos.`
    else if (!result.items.length)
      resultText = 'Con tan pocos datos no puedo sugerirte una solución. Puedes volver a empezar y marcar algo, o escribirnos y te orientamos.'
    else if (!result.matched)
      resultText = `No hallé coincidencias exactas con lo que marcaste; estas son las soluciones de tu rubro (${rubroLabel.toLowerCase()}):`
    else resultText = scope ? `¡Listo! Según ${scope}, esto puede servirte:` : '¡Listo! Estas son algunas de nuestras soluciones para empezar:'
  }

  const showReplies = !typing && step < 3

  return (
    <dialog
      ref={dialogRef}
      className="dialog chat"
      aria-labelledby="chat-title"
      onClose={onClose}
      onClick={(e) => e.target === dialogRef.current && onClose()}
    >
      <header className="chat__head">
        <Mascot className="chat__avatar" />
        <div className="chat__title">
          <strong id="chat-title">Juby</strong>
          <small>Asistente virtual de JUBRYX</small>
        </div>
        <div className="chat__tools">
          {step > 0 && (
            <button type="button" className="chat__iconbtn" onClick={restart} aria-label="Reiniciar conversación">
              <RotateCcw size={20} aria-hidden="true" />
            </button>
          )}
          <button type="button" className="chat__iconbtn" onClick={onClose} aria-label="Cerrar asistente">
            <X size={22} aria-hidden="true" />
          </button>
        </div>
      </header>

      <div className="chat__log" ref={logRef} role="log" aria-live="polite" aria-relevant="additions">
        {step === 0 && typing ? (
          <Typing />
        ) : (
          <Bot>
            <strong>¡Hola! 👋 Soy Juby, el asistente virtual de JUBRYX.</strong> Te ayudo a encontrar el sistema ideal en 3
            preguntas. ¿En qué rubro está tu negocio?
          </Bot>
        )}

        {step >= 1 && <User>{query ? `“${query}”` : rubroLabel || 'Aún no lo tengo claro'}</User>}

        {step >= 1 && !query && (
          <>
            {step === 1 && typing ? (
              <Typing />
            ) : (
              <Bot>
                {rubroLabel ? `Perfecto, ${rubroLabel.toLowerCase()}. ` : 'Sin problema. '}
                ¿Qué necesitas controlar? Marca todo lo que aplique.
              </Bot>
            )}
            {step >= 2 && <User>{needLabels.length ? needLabels.join(', ') : 'Nada en especial'}</User>}
          </>
        )}

        {step >= 2 && !query && (
          <>
            {step === 2 && typing ? (
              <Typing />
            ) : (
              <Bot>¿Cuántas personas lo usarían? Así preparamos mejor tu cotización (no cambia las sugerencias).</Bot>
            )}
            {step >= 3 && <User>{size}</User>}
          </>
        )}

        {showReplies && step === 0 && (
          <div className="replies">
            {RUBROS.map((r, i) => (
              <button
                key={r.id}
                type="button"
                className="reply"
                data-first={i === 0 ? '' : undefined}
                onClick={() => {
                  setRubro(r.id)
                  setStep(1)
                }}
              >
                {r.label}
              </button>
            ))}
            <button
              type="button"
              className="reply reply--muted"
              onClick={() => {
                setRubro('')
                setStep(1)
              }}
            >
              Aún no lo tengo claro
            </button>
          </div>
        )}

        {showReplies && step === 1 && (
          <div className="replies">
            {NEEDS.map((n, i) => (
              <button
                key={n.id}
                type="button"
                className="reply reply--check"
                aria-pressed={needs.includes(n.id)}
                data-first={i === 0 ? '' : undefined}
                onClick={() => toggleNeed(n.id)}
              >
                {needs.includes(n.id) && <Check size={14} aria-hidden="true" />}
                {n.label}
              </button>
            ))}
            <div className="replies__actions">
              <button type="button" className="link-btn" onClick={back}>
                <Undo2 size={16} aria-hidden="true" /> Cambiar rubro
              </button>
              <button type="button" className="btn btn--primary" onClick={() => setStep(2)}>
                {needs.length ? `Listo (${needs.length})` : 'Omitir'}
              </button>
            </div>
          </div>
        )}

        {showReplies && step === 2 && (
          <div className="replies">
            {SIZES.map((s, i) => (
              <button
                key={s}
                type="button"
                className="reply"
                data-first={i === 0 ? '' : undefined}
                onClick={() => {
                  setSize(s)
                  setStep(3)
                }}
              >
                {s}
              </button>
            ))}
            <div className="replies__actions">
              <button type="button" className="link-btn" onClick={back}>
                <Undo2 size={16} aria-hidden="true" /> Cambiar necesidades
              </button>
            </div>
          </div>
        )}

        {step === 3 &&
          (typing ? (
            <Typing />
          ) : (
            <>
              <Bot>{resultText}</Bot>
              {result.items.length > 0 && (
                <ul className="picks">
                  {result.items.map((p) => {
                    const Icon = productIcon(p)
                    return (
                      <li key={p.id} className="pick">
                        <span className="card__icon">
                          <Icon size={22} aria-hidden="true" />
                        </span>
                        <div className="pick__text">
                          <strong>{p.name}</strong>
                          <span>
                            <span className={`badge badge--${p.type}`}>{p.typeLabel}</span> {p.rubroLabel}
                          </span>
                        </div>
                        <a
                          className="btn btn--icon"
                          href={waLink(productMessage(p))}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Consultar por WhatsApp: ${p.name}`}
                        >
                          <WhatsAppIcon size={20} />
                        </a>
                      </li>
                    )
                  })}
                </ul>
              )}
              <div className="chat__cta">
                <a
                  className="btn btn--primary btn--lg"
                  data-first=""
                  href={waLink(
                    buildMessage({ rubroLabel, query, needLabels, size, items: result.items }),
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon size={18} />
                  Enviar mi consulta por WhatsApp
                </a>
                <button type="button" className="btn btn--soft btn--lg" onClick={() => onViewCatalog(rubro, query)}>
                  Ver en el catálogo
                </button>
                <button type="button" className="link-btn" onClick={restart}>
                  <RotateCcw size={16} aria-hidden="true" /> Empezar de nuevo
                </button>
              </div>
            </>
          ))}
      </div>

      {step === 0 && !typing && (
        <form className="chat__composer" onSubmit={sendDraft}>
          <label htmlFor="chat-input" className="sr-only">
            Escribe lo que buscas
          </label>
          <input
            id="chat-input"
            type="text"
            autoComplete="off"
            maxLength={80}
            placeholder="O escribe lo que buscas: pizzería, farmacia…"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />
          <button type="submit" className="chat__send" aria-label="Enviar" disabled={!draft.trim()}>
            <Send size={20} aria-hidden="true" />
          </button>
        </form>
      )}
    </dialog>
  )
}
