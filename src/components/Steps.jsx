import { Search, MessageCircle, MonitorPlay } from 'lucide-react'

const STEPS = [
  { icon: Search, title: 'Encuentra tu sistema', text: 'Usa el buscador o filtra por rubro y tipo de solución.' },
  { icon: MessageCircle, title: 'Consúltanos', text: 'Escríbenos por WhatsApp, llámanos o usa el formulario.' },
  { icon: MonitorPlay, title: 'Pide tu demostración', text: 'Te mostramos la solución y te enviamos tu cotización.' },
]

export default function Steps() {
  return (
    <section id="como-solicitar" className="section section--soft" aria-labelledby="steps-title">
      <div className="container">
        <header className="section__head">
          <h2 id="steps-title">Cómo solicitar una demostración o cotización</h2>
        </header>
        <ol className="steps">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="step">
              <span className="step__num" aria-hidden="true">{i + 1}</span>
              <Icon size={24} aria-hidden="true" className="step__icon" />
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
