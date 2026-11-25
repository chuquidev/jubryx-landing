import { SOCIALS } from '../config.js'
import { SocialIcon } from './social.jsx'

// Muestra solo las redes configuradas; si no hay ninguna, no renderiza nada.
export default function Socials({ className = '' }) {
  const items = SOCIALS.filter((s) => s.url)
  if (!items.length) return null
  return (
    <ul className={`socials ${className}`} aria-label="Redes sociales">
      {items.map((s) => (
        <li key={s.id}>
          <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={`${s.label} (se abre en una pestaña nueva)`}>
            <SocialIcon id={s.id} size={20} />
          </a>
        </li>
      ))}
    </ul>
  )
}
