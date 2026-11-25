import { memo } from 'react'
import { ArrowRight } from 'lucide-react'
import { productIcon, WhatsAppIcon } from './icons.jsx'
import { waLink, productMessage } from '../config.js'

const ProductCard = memo(function ProductCard({ product, onOpen }) {
  const Icon = productIcon(product)
  return (
    <article className="card">
      <div className="card__top">
        <span className="card__icon">
          <Icon size={22} aria-hidden="true" />
        </span>
        <span className={`badge badge--${product.type}`}>{product.typeLabel}</span>
      </div>
      <h3 className="card__title">{product.name}</h3>
      <p className="card__rubro">{product.rubroLabel}</p>
      <div className="card__actions">
        <button type="button" className="btn btn--soft" onClick={() => onOpen(product)}>
          Ver detalle
          <ArrowRight size={16} aria-hidden="true" />
        </button>
        <a
          className="btn btn--icon"
          href={waLink(productMessage(product))}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Consultar por WhatsApp: ${product.name}`}
        >
          <WhatsAppIcon size={20} />
        </a>
      </div>
    </article>
  )
})

export default ProductCard
