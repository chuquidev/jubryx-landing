import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

const KEY = 'jx-greeted'

// Botón flotante con la mascota. El saludo aparece una sola vez por sesión y sin animación permanente.
export default function AssistantLauncher({ onOpen }) {
  const [greet, setGreet] = useState(false)

  useEffect(() => {
    let seen = false
    try {
      seen = sessionStorage.getItem(KEY) === '1'
    } catch {
      /* almacenamiento no disponible: se muestra igual */
    }
    if (seen) return undefined
    const show = setTimeout(() => {
      setGreet(true)
      try {
        sessionStorage.setItem(KEY, '1')
      } catch {
        /* sin almacenamiento */
      }
    }, 2500)
    return () => clearTimeout(show)
  }, [])

  useEffect(() => {
    if (!greet) return undefined
    const hide = setTimeout(() => setGreet(false), 14000)
    return () => clearTimeout(hide)
  }, [greet])

  const open = () => {
    setGreet(false)
    onOpen()
  }

  return (
    <div className="launcher">
      {greet && (
        <div className="launcher__bubble">
          <button type="button" className="launcher__say" onClick={open}>
            ¡Hola! 👋 Soy <strong>Juby</strong>, tu asistente de JUBRYX. ¿Te ayudo a elegir tu sistema?
          </button>
          <button type="button" className="launcher__x" onClick={() => setGreet(false)} aria-label="Cerrar saludo">
            <X size={14} aria-hidden="true" />
          </button>
        </div>
      )}
      <button
        type="button"
        className="launcher__btn"
        onClick={open}
        aria-label="Abrir chat con Juby, asistente virtual"
      >
        <img src="/mascot.webp" width="160" height="160" alt="" decoding="async" />
        <span className="launcher__label">
          <strong>Juby</strong>
          <small>¿Te ayudo?</small>
        </span>
      </button>
    </div>
  )
}
