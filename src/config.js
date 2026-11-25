// Datos oficiales de contacto de JUBRYX TECHNOLOGIES.
export const CONTACT = {
  email: 'jubryx@gmail.com',
  phones: [
    { raw: '969943657', display: '969 943 657', intl: '51969943657' },
    { raw: '933698031', display: '933 698 031', intl: '51933698031' },
  ],
}

export const telLink = (phone) => `tel:+51${phone.raw}`

export const waLink = (message, phone = CONTACT.phones[0]) =>
  `https://wa.me/${phone.intl}?text=${encodeURIComponent(message)}`

export const mailLink = (subject, body) =>
  `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

export const productMessage = (product) =>
  `Hola JUBRYX TECHNOLOGIES, me interesa una demostración y cotización de: ${product.name}.`

export const GENERAL_MESSAGE =
  'Hola JUBRYX TECHNOLOGIES, quisiera información sobre sus sistemas de software.'

// ---- Contenido editable de la página ----
export const ABOUT = {
  tagline: 'Engineering the digital future',
  zone: 'Perú',
}

// Horario de atención. Déjalo vacío ('') para ocultarlo.
export const HOURS = 'Atención de 8:00 a. m. a 9:00 p. m.'

// Redes sociales: aparecen en el contacto y en el pie cuando tienen url.
// TikTok ya apunta a la cuenta de JUBRYX. Facebook, Instagram y YouTube apuntan por ahora
// a la página principal de cada red: reemplaza cada url por la de tu cuenta cuando la tengas.
export const SOCIALS = [
  { id: 'facebook', label: 'Facebook', url: 'https://www.facebook.com' },
  { id: 'instagram', label: 'Instagram', url: 'https://www.instagram.com' },
  { id: 'tiktok', label: 'TikTok', url: 'https://www.tiktok.com/@jubryxtechnologies' },
  { id: 'youtube', label: 'YouTube', url: 'https://www.youtube.com' },
]
