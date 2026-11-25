import { useEffect, useRef } from 'react'
import { X, Phone, Mail, ClipboardList } from 'lucide-react'
import { productIcon, WhatsAppIcon } from './icons.jsx'
import { CONTACT, telLink, waLink, mailLink, productMessage } from '../config.js'

const KIND = {
  sistema: 'Sistema de gestión',
  saas: 'Solución SaaS (software como servicio)',
  crm: 'CRM para gestión de clientes',
  erp: 'ERP para gestión integral',
  tpv: 'Punto de venta (TPV)',
}

export default function ProductDialog({ product, onClose, onQuote }) {
  const ref = useRef(null)
  const Icon = productIcon(product)

  useEffect(() => {
    const dlg = ref.current
    if (dlg && !dlg.open) dlg.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const onBackdrop = (e) => {
    if (e.target === ref.current) onClose()
  }

  return (
    <dialog
      ref={ref}
      className="dialog"
      aria-labelledby="dialog-title"
      onClose={onClose}
      onClick={onBackdrop}
    >
      <div className="dialog__panel">
        <button type="button" className="dialog__close" onClick={onClose} aria-label="Cerrar detalle">
          <X size={22} aria-hidden="true" />
        </button>

        <span className="card__icon card__icon--lg">
          <Icon size={28} aria-hidden="true" />
        </span>
        <p className="dialog__meta">
          <span className={`badge badge--${product.type}`}>{product.typeLabel}</span>
          <span>{product.rubroLabel}</span>
          <span>N.° {product.code}</span>
        </p>
        <h3 id="dialog-title">{product.name}</h3>
        <p>
          {KIND[product.type]} pensado para el rubro de {product.rubroLabel.toLowerCase()}. Solicita
          una demostración para conocer su alcance y recibir una cotización según tu negocio.
        </p>

        <div className="dialog__cta">
          <a
            className="btn btn--primary btn--lg"
            href={waLink(productMessage(product))}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon size={18} />
            Consultar por WhatsApp
          </a>
          <button type="button" className="btn btn--soft btn--lg" onClick={() => onQuote(product)}>
            <ClipboardList size={18} aria-hidden="true" />
            Pedir cotización
          </button>
        </div>
        <p className="dialog__alt">
          <a href={telLink(CONTACT.phones[0])}>
            <Phone size={16} aria-hidden="true" /> {CONTACT.phones[0].display}
          </a>
          <a href={mailLink(`Consulta: ${product.name}`, productMessage(product))}>
            <Mail size={16} aria-hidden="true" /> {CONTACT.email}
          </a>
        </p>
      </div>
    </dialog>
  )
}
