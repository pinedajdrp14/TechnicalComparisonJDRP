# TechCompare

MVP para comparar componentes de PC (CPU, GPU, RAM, SSD) construido con **HTML5, CSS3 y JavaScript puro** — sin frameworks ni build step. 100% compatible con GitHub Pages.

## Estructura del proyecto

```
techcompare/
├── index.html          # Estructura de la aplicación
├── css/
│   └── styles.css      # Sistema de diseño y estilos
├── js/
│   ├── data.js         # Dataset de componentes (CPU/GPU/RAM/SSD)
│   └── app.js           # Estado, renderizado y lógica de comparación
├── assets/
│   └── favicon.svg
└── README.md
```

## Funcionalidad

- 4 categorías: **CPU, GPU, RAM, SSD**.
- Búsqueda por nombre o marca dentro de cada categoría.
- Selección de hasta **3 componentes** simultáneos para comparar.
- Tabla comparativa con **medidores visuales** por especificación: la barra representa el valor relativo al máximo del grupo, y se resalta en ámbar el mejor valor de cada fila (mayor o menor según la métrica).
- La selección se guarda en `localStorage`, por categoría, y persiste al recargar la página.
- Totalmente responsive (grid de tarjetas se adapta a 1–4 columnas; la tabla comparativa hace scroll horizontal en pantallas pequeñas).
- Accesibilidad: roles ARIA en tabs y tarjetas, `aria-pressed`/`aria-selected`, foco visible, `prefers-reduced-motion` respetado.

## Cómo agregar más componentes

Edita `js/data.js`. Cada categoría tiene:

- `specs`: define qué columnas se comparan (`key`, `label`, `unit`, `higherIsBetter`).
- `items`: la lista de componentes; cada uno debe incluir un `id` único y una propiedad por cada `key` definido en `specs`, más `name`, `brand` y `price`.

No se requiere tocar `app.js` ni `styles.css` para agregar componentes o incluso categorías nuevas, siempre que sigas esta misma estructura.

