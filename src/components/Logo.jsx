// Logo oficial de JUBRYX (WebP con transparencia, 2x). `light` = versión para fondos oscuros.
export default function Logo({ light = false, alt = '' }) {
  return (
    <img
      className="logo"
      src={light ? '/logo-light.webp' : '/logo.webp'}
      width="287"
      height="88"
      alt={alt}
      decoding="async"
    />
  )
}
