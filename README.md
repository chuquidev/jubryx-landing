# JUBRYX TECHNOLOGIES – Landing

React + Vite. Catálogo de 85 soluciones, buscador con filtros, formulario y contacto por WhatsApp/teléfono/correo.

```bash
npm install
npm run dev       # desarrollo
npm run build     # producción en /dist
npm run preview   # probar el build
```

## Dónde editar

- Productos, tipos y rubros: `src/data/products.js`
- Teléfonos, correo y mensajes de WhatsApp: `src/config.js`
- Colores y espaciados: variables CSS al inicio de `src/styles.css`
- Horario y redes sociales: `HOURS` y `SOCIALS` en `src/config.js` (vacíos = no se muestran)
- Preguntas frecuentes: `src/components/Faq.jsx` (respuestas provisionales)
- Logo: `src/components/Logo.jsx` y `public/favicon.svg` 

Informe de calidad y pendientes: `AUDITORIA.md`.
