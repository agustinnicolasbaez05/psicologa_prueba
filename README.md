# Dra. Valentina Ríos — Landing Page

Sitio web estático de una sola página para consulta psicológica.

## Estructura

```
valentina/
├── index.html              ← Página principal
├── assets/
│   ├── css/
│   │   └── styles.css      ← Todos los estilos + modo oscuro
│   └── js/
│       └── main.js         ← GSAP, calendario, formulario, WA
└── README.md
```

## Uso

Abrí `index.html` en cualquier navegador moderno. No requiere servidor.

Para publicar online podés usar:
- **Netlify Drop** — arrastrá la carpeta a netlify.com/drop
- **GitHub Pages** — subí los archivos a un repo público
- **Vercel** — conectá el repo o subí la carpeta

## Personalización rápida

| Qué cambiar | Dónde |
|---|---|
| Número de WhatsApp | `main.js` → `const numero = '...'` |
| Precio de sesiones | `index.html` → sección `#services` |
| Fotos | `index.html` → URLs de Unsplash |
| Email de contacto | `index.html` → footer |
| Colores | `styles.css` → variables `:root` |

## Dependencias externas (CDN)

- Google Fonts: Playfair Display + Jost
- GSAP 3.12.2 + ScrollTrigger (Cloudflare CDN)
