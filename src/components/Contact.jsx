import { useEffect, useState } from 'react'
import { Phone, Mail, Send, Check, Clock } from 'lucide-react'
import { WhatsAppIcon } from './icons.jsx'
import Socials from './Socials.jsx'
import { PRODUCTS } from '../data/products.js'
import { CONTACT, HOURS, telLink, waLink, mailLink } from '../config.js'

const EMPTY = { name: '', phone: '', email: '', product: '', message: '' }

function validate(v) {
  const e = {}
  if (v.name.trim().length < 3) e.name = 'Escribe tu nombre (mínimo 3 letras).'
  if (!/^9\d{8}$/.test(v.phone.replace(/[\s-]/g, '')))
    e.phone = 'Ingresa un celular peruano de 9 dígitos que empiece con 9.'
  if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim()))
    e.email = 'El correo no parece válido.'
  if (v.message.trim().length < 10) e.message = 'Cuéntanos brevemente qué necesitas (mínimo 10 caracteres).'
  return e
}

function buildText(v) {
  const sol = PRODUCTS.find((p) => String(p.id) === v.product)
  return [
    'Hola JUBRYX TECHNOLOGIES, solicito una demostración/cotización.',
    `Nombre: ${v.name.trim()}`,
    `Celular: ${v.phone.trim()}`,
    v.email.trim() && `Correo: ${v.email.trim()}`,
    sol && `Solución: ${sol.name}`,
    `Mensaje: ${v.message.trim()}`,
  ]
    .filter(Boolean)
    .join('\n')
}

function Field({ id, label, error, hint, children }) {
  return (
    <div className={`form__group${error ? ' has-error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      {hint && !error && <small id={`${id}-hint`}>{hint}</small>}
      {error && (
        <small id={`${id}-err`} className="form__error">
          {error}
        </small>
      )}
    </div>
  )
}

export default function Contact({ product }) {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState('')

  useEffect(() => {
    if (product) setValues((v) => ({ ...v, product: String(product.id) }))
  }, [product])

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }))
    setSent('')
  }
  const blur = (k) => () => setErrors((prev) => ({ ...prev, [k]: validate(values)[k] }))
  const aria = (k, hint) => ({
    'aria-invalid': errors[k] ? 'true' : undefined,
    'aria-describedby': errors[k] ? `${k}-err` : hint ? `${k}-hint` : undefined,
  })

  const submit = (channel) => (e) => {
    e.preventDefault()
    const errs = validate(values)
    setErrors(errs)
    if (Object.keys(errs).length) {
      document.getElementById(Object.keys(errs)[0])?.focus()
      return
    }
    const text = buildText(values)
    const url =
      channel === 'wa'
        ? waLink(text)
        : mailLink('Solicitud de demostración / cotización', text)
    window.open(url, channel === 'wa' ? '_blank' : '_self', 'noopener')
    setSent(
      channel === 'wa'
        ? 'Abrimos WhatsApp con tu mensaje listo. Solo falta que lo envíes.'
        : 'Abrimos tu aplicación de correo con el mensaje listo. Solo falta que lo envíes.',
    )
  }

  return (
    <section id="contacto" className="section" aria-labelledby="contacto-title">
      <div className="container contact">
        <div className="contact__info">
          <h2 id="contacto-title">Hablemos de tu proyecto</h2>
          <p>Cuéntanos qué necesitas y coordinamos una demostración o cotización.</p>
          <ul className="contact__list">
            {CONTACT.phones.map((p) => (
              <li key={p.raw}>
                <a href={telLink(p)}>
                  <Phone size={20} aria-hidden="true" />
                  <span>
                    Llamar al <strong>{p.display}</strong>
                  </span>
                </a>
              </li>
            ))}
            {CONTACT.phones.map((p) => (
              <li key={`wa-${p.raw}`}>
                <a
                  href={waLink('Hola JUBRYX TECHNOLOGIES, quisiera información.', p)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon size={20} />
                  <span>
                    WhatsApp <strong>{p.display}</strong>
                  </span>
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${CONTACT.email}`}>
                <Mail size={20} aria-hidden="true" />
                <span>
                  <strong>{CONTACT.email}</strong>
                </span>
              </a>
            </li>
          </ul>
          {HOURS && (
            <p className="contact__hours">
              <Clock size={18} aria-hidden="true" /> {HOURS}
            </p>
          )}
          <Socials />
        </div>

        <form className="form" noValidate onSubmit={submit('wa')} aria-label="Formulario de contacto">
          <Field id="name" label="Nombre completo *" error={errors.name}>
            <input id="name" autoComplete="name" value={values.name} onChange={set('name')} onBlur={blur('name')} {...aria('name')} />
          </Field>
          <div className="form__row">
            <Field id="phone" label="Celular *" error={errors.phone} hint="9 dígitos, ej.: 969943657">
              <input id="phone" type="tel" inputMode="tel" autoComplete="tel-national" value={values.phone} onChange={set('phone')} onBlur={blur('phone')} {...aria('phone', true)} />
            </Field>
            <Field id="email" label="Correo (opcional)" error={errors.email}>
              <input id="email" type="email" autoComplete="email" value={values.email} onChange={set('email')} onBlur={blur('email')} {...aria('email')} />
            </Field>
          </div>
          <Field id="product" label="Solución de interés (opcional)">
            <select id="product" value={values.product} onChange={set('product')}>
              <option value="">Aún no lo sé / a medida</option>
              {PRODUCTS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.code} · {p.name}
                </option>
              ))}
            </select>
          </Field>
          <Field id="message" label="¿Qué necesitas? *" error={errors.message}>
            <textarea id="message" rows={4} value={values.message} onChange={set('message')} onBlur={blur('message')} {...aria('message')} />
          </Field>

          <div className="form__actions">
            <button type="submit" className="btn btn--primary btn--lg">
              <WhatsAppIcon size={18} />
              Enviar por WhatsApp
            </button>
            <button type="button" className="btn btn--outline btn--lg" onClick={submit('mail')}>
              <Send size={18} aria-hidden="true" />
              Enviar por correo
            </button>
          </div>
          <p className="form__status" role="status" aria-live="polite">
            {sent && (
              <>
                <Check size={16} aria-hidden="true" /> {sent}
              </>
            )}
          </p>
        </form>
      </div>
    </section>
  )
}
