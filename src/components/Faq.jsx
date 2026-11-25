import { ChevronDown } from 'lucide-react'
import { HOURS } from '../config.js'

// Respuestas provisionales: revisarlas y ajustarlas con la información real del negocio.
const FAQ = [
  {
    q: '¿Cómo solicito una demostración?',
    a: 'Escríbenos por WhatsApp (el mensaje ya sale redactado), llámanos, envíanos un correo o completa el formulario de contacto. Indícanos qué solución te interesa y coordinamos.',
  },
  {
    q: '¿Qué información necesito para pedir una cotización?',
    a: 'Para cotizar con precisión ayuda que nos cuentes tu rubro, qué quieres controlar (ventas, inventario, citas, clientes…), cuántas personas lo usarían y si hoy trabajas con algún sistema.',
  },
  {
    q: '¿Qué diferencia hay entre un SaaS y un sistema de gestión?',
    a: 'Un SaaS es software como servicio: se usa desde internet, normalmente con un pago periódico. Un sistema de gestión es un programa pensado para un rubro concreto. Consúltanos qué modalidad está disponible en la solución que te interesa.',
  },
  {
    q: '¿Puedo consultar por una solución que no aparece en el catálogo?',
    a: 'Sí, escríbenos y cuéntanos tu necesidad. Te respondemos qué opciones existen para tu caso.',
  },
  {
    q: '¿Ofrecen implementación, capacitación y soporte?',
    a: 'Sí. Además de la solución, ofrecemos implementación, capacitación para tu equipo y soporte. Consúltanos el alcance en tu cotización.',
  },
  {
    q: '¿Cuánto cuesta y cuánto demora?',
    a: 'Depende de la solución elegida y de las necesidades de tu negocio. Te lo confirmamos en la cotización.',
  },
  ...(HOURS
    ? [
        {
          q: '¿En qué horario atienden?',
          a: `${HOURS} Puedes escribirnos por WhatsApp, llamarnos o enviarnos un correo.`,
        },
      ]
    : []),
]

export default function Faq() {
  return (
    <section id="preguntas" className="section section--soft" aria-labelledby="faq-title">
      <div className="container faq">
        <header className="section__head">
          <h2 id="faq-title">Preguntas frecuentes</h2>
        </header>
        <div className="faq__list">
          {FAQ.map(({ q, a }) => (
            <details key={q} className="faq__item">
              <summary>
                <span>{q}</span>
                <ChevronDown size={20} aria-hidden="true" />
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
