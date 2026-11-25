# Auditoría – Landing JUBRYX TECHNOLOGIES

Fecha: 2026-11-25 · Stack: React 18 + Vite 6 · Catálogo: 85 soluciones (PDF "Catálogo de Software y Sistemas")

## 1. Puntuaciones Lighthouse (reales, medidas)

Condiciones: Lighthouse 12, perfil móvil por defecto (CPU ralentizada + red 4G lenta simulada), Chrome headless, sobre `vite preview` del build de producción en localhost. 3 corridas.

| Corrida | Performance | Accessibility | Best Practices | SEO | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|
| 1 | 99 | 100 | 100 | 100 | 1.6 s | 90 ms | 0 |
| 2 | 99 | 100 | 100 | 100 | 1.6 s | 70 ms | 0 |
| 3 | 99 | 100 | 100 | 100 | 1.6 s | 70 ms | 0 |

Objetivos (90 / 95 / 95 / 95): cumplidos en este entorno.

Medición final (con asistente conversacional con mascota, botón flotante y barra móvil): Performance 95–96, Accessibility 100, Best Practices 100, SEO 100; LCP 1.8–2.0 s, TBT 200–240 ms, CLS 0 (3 corridas, Lighthouse móvil con throttling por defecto). El Performance bajó 3–4 puntos frente a la medición anterior (99) al agregar el botón flotante con imagen; sigue sobre la meta de 90. INP no medido. axe-core sin violaciones (WCAG 2.2 AA y buenas prácticas) en la página y en los pasos del asistente.

## 2. Core Web Vitals

- LCP: 1.6 s (laboratorio, móvil simulado) → dentro del máximo de 2.5 s.
- CLS: 0 → dentro del máximo de 0.1.
- INP: **no medido**. Lighthouse no mide INP; se usó TBT (70–90 ms) solo como indicador. Falta medirlo con interacción real o con datos de campo (CrUX / `web-vitals`) una vez publicado.

## 3. Tamaño de recursos (build de producción)

| Recurso | Tamaño | gzip |
|---|---|---|
| index.html | 1.36 kB | 0.70 kB |
| JS principal (React + app + iconos) | 228.15 kB | 69.97 kB |
| Chunk del asistente (carga bajo demanda) | 9.98 kB | 3.95 kB |
| Mascota (`mascot.webp`, 160×160) | 10 kB | — |
| Assistant (carga diferida al abrir el asistente) | 7.12 kB | 2.82 kB |
| ProductDialog (carga diferida al abrir un detalle) | 2.63 kB | 1.22 kB |
| CSS | 25.93 kB | 5.75 kB |
| Logo (WebP, claro u oscuro) | 13.0 kB / 8.9 kB | – |
| Favicon PNG | 9.5 kB | – |
| Fuente Inter variable, subconjunto latino (woff2) | 48.26 kB | – |

Los demás subconjuntos de Inter (latin-ext, cirílico, etc.) se declaran con `unicode-range`; el navegador solo descarga los que la página necesita.

## 4. Dependencias

Producción: `react`, `react-dom`, `lucide-react` (imports por icono, tree-shaking), `@fontsource-variable/inter` (fuente autoalojada, una sola familia). Desarrollo: `vite`, `@vitejs/plugin-react`. Sin librerías de UI, router, estado ni animación.

## 5. Optimizaciones aplicadas

- Catálogo: búsqueda con debounce de 250 ms, texto de búsqueda normalizado (sin tildes) y precalculado, filtros combinables por tipo y rubro, contador dinámico, botón "Limpiar filtros", estado vacío con acciones y carga progresiva (12 en 12; no se renderizan las 85 tarjetas a la vez).
- Detalle de cada solución en `<dialog>` nativo (foco atrapado y Esc de serie), cargado con `React.lazy`.
- Tarjetas con `memo`; sin imágenes (ilustración del hero en CSS), por lo que no hay recurso LCP pesado ni riesgo de CLS por imágenes.
- `content-visibility: auto` en secciones bajo el pliegue; animaciones solo de opacidad/transform; `prefers-reduced-motion` respetado; sin blur ni sombras pesadas.
- Fuente con `font-display: swap`, un solo peso variable.
- Diseño mobile-first con variables CSS (colores, tipografía, espaciados, radios).
- Accesibilidad: enlace "saltar al contenido", landmarks, foco visible, `aria-pressed` en filtros, `aria-live` en contador y estado del formulario, errores asociados con `aria-describedby`, áreas táctiles ≥ 44 px.
- Conversión: WhatsApp con mensaje predefinido por producto (formato +51), `tel:` y `mailto:` en cabecera, tarjetas, detalle, contacto y pie; formulario validado que abre WhatsApp o correo con el mensaje armado.

## 6. Verificaciones funcionales (Playwright, Chrome)

- Resoluciones 360, 768 y 1366 px: sin desbordamiento horizontal y sin errores ni avisos en consola.
- Catálogo: 85 soluciones en total; "farmacia" → 3; "farmacia" + SaaS → 1; búsqueda sin resultados muestra el estado vacío; "Limpiar filtros" restaura 85 y vacía el buscador; "Mostrar más" pasa de 12 a 24.
- Detalle: abre, muestra el producto y el enlace de WhatsApp con el número 51969943657; cierra con Esc.
- Menú móvil abre y cierra. Enlaces `tel:` (+51969943657, +51933698031) y `mailto:` (jubryx@gmail.com) presentes.
- Formulario vacío: se muestran 3 errores de validación.

## 6b. Contenido nuevo (revisar)

- "¿Qué tipo de solución necesito?": definiciones genéricas de Sistema, ERP, CRM, SaaS y TPV; cada tarjeta filtra el catálogo.
- "Sobre JUBRYX": solo afirma lo que la página ya ofrece (catálogo, demostración, cotización). Zona de atención "Perú" y lema tomados del logo/teléfonos: confirmar.
- "Preguntas frecuentes": respuestas **provisionales**; ajustarlas con la información real (modalidades SaaS, plazos, precios).
- Horario: "Atención de 8:00 a. m. a 9:00 p. m." (sin días indicados; confirmar si es todos los días). Se muestra en contacto, pie y preguntas frecuentes (`HOURS` en `src/config.js`).
- Redes sociales: visibles en contacto y pie. TikTok enlaza a @jubryxtechnologies; Facebook, Instagram y YouTube enlazan por ahora a la página principal de cada red (pendiente reemplazar por las cuentas reales en `SOCIALS`, `src/config.js`).
- Implementación, capacitación y soporte: incluidos en "Sobre JUBRYX" con textos genéricos, sin plazos ni garantías (confirmado por el cliente).

## 6c. Asistente guiado y barra móvil

- Asistente sin IA: 3 preguntas (rubro, necesidades, tamaño del equipo). Ordena las soluciones del propio catálogo con reglas simples y arma el mensaje de WhatsApp. El tamaño del equipo solo se usa para la cotización, no para ordenar. Reglas en `src/components/Assistant.jsx` (`NEEDS`).
- Sin rubro ni necesidades no sugiere nada y pide más datos.
- Barra fija "Llamar / WhatsApp" solo en móvil (< 900 px); en escritorio queda el botón flotante.

## 7. Pendientes identificados

1. ~~Logo~~: integrado el logo oficial (recortado y convertido a WebP con transparencia, con versión para fondo oscuro y favicon). Se limpió el fondo blanco desde un JPEG (no es vectorial); si tienes el archivo vectorial (SVG/AI), se reemplaza para máxima nitidez.
2. **Descripciones de producto**: el PDF solo trae nombres. Los textos son genéricos (tipo + rubro); no se inventaron módulos ni cifras. Conviene añadir una descripción real por solución en `src/data/products.js`.
3. **Categorías**: tipo (Sistema, SaaS, CRM, ERP, TPV) y rubro se asignaron a partir del nombre; revisar la clasificación. Los números 44 y 57 tienen el mismo nombre en el PDF ("Sistema de restaurante"); el 57 se muestra como "(versión 2)".
4. **Mediciones sobre el sitio publicado**: las puntuaciones salen de un servidor local. Repetir Lighthouse y medir INP tras el despliegue (compresión gzip/brotli y cabeceras de caché dependen del hosting).
5. No se probó el envío real a WhatsApp ni al cliente de correo (solo que se generan los enlaces correctos).
6. Falta dominio final: añadir `canonical`, `og:url`, `og:image` y sitemap cuando exista.
7. Lighthouse mide una vista; faltan pruebas manuales con lector de pantalla y en dispositivos físicos.
