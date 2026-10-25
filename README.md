# Portfolio · Sergio Fernández

Web personal estática: Vite + JavaScript, animaciones con GSAP (ScrollTrigger) y scroll suave con Lenis.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # genera dist/
```

## Editar contenido

Todo el texto está en [`src/data.js`](src/data.js): proyectos, DuoQIT, trabajo, estudios, certificaciones, extras, stack y enlaces.
Para quitar un proyecto, borra su objeto; para destacarlo, pon `featured: true`. `accent` elige el color (`m`, `c` o `y`).

Cada proyecto se abre en una vista de detalle (`#p/<slug>`, enlazable) con `long`, `highlights` y capturas:
pon `public/shots/<slug>-1.webp`, `-2.webp`… y `<slug>-m.webp` (móvil), y en el proyecto `shots: <número>` y `mobile: true`.

Los iconos son de [Lucide](https://lucide.dev). Para usar uno nuevo, impórtalo y añádelo en [`src/icons.js`](src/icons.js).

El CV descargable es `public/cv-sergio-fernandez.pdf`.

## Paleta

`#FFFEFF` · `#FF01FB` · `#02A9EA` · `#FAFF00` · `#000300`. Pulsa **espacio** (o el botón de los tres puntos) para barajar los acentos.

## Desplegar

**Vercel:** importa el repo y despliega; detecta Vite solo.

**GitHub Pages:** sube el repo a GitHub, ve a *Settings → Pages → Source: GitHub Actions*. El workflow `.github/workflows/deploy.yml` construye y publica en cada push a `main`. Si llamas al repo `Serwii01.github.io`, la web queda en `https://serwii01.github.io`.
