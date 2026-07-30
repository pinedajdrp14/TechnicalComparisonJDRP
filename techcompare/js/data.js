/**
 * TechCompare — Conjunto de datos de componentes
 * Cada categoría define sus propias "especificaciones" (métricas comparables).
 * `mayorEsMejor` indica si un valor más alto gana esa fila en el comparador.
 */

const DATOS_TECHCOMPARE = {
  cpu: {
    etiqueta: "Procesadores",
    especificaciones: [
      { clave: "nucleos", etiqueta: "Núcleos", unidad: "", mayorEsMejor: true },
      { clave: "hilos", etiqueta: "Hilos", unidad: "", mayorEsMejor: true },
      { clave: "frecuenciaBase", etiqueta: "Frecuencia base", unidad: "GHz", mayorEsMejor: true },
      { clave: "frecuenciaBoost", etiqueta: "Frecuencia boost", unidad: "GHz", mayorEsMejor: true },
      { clave: "cacheL3", etiqueta: "Caché L3", unidad: "MB", mayorEsMejor: true },
      { clave: "tdp", etiqueta: "TDP", unidad: "W", mayorEsMejor: false },
      { clave: "precio", etiqueta: "Precio aprox.", unidad: "USD", mayorEsMejor: false },
    ],
    elementos: [
      { id: "i9-14900k", nombre: "Intel Core i9-14900K", marca: "Intel", nucleos: 24, hilos: 32, frecuenciaBase: 3.2, frecuenciaBoost: 6.0, cacheL3: 36, tdp: 125, precio: 589 },
      { id: "i7-14700k", nombre: "Intel Core i7-14700K", marca: "Intel", nucleos: 20, hilos: 28, frecuenciaBase: 3.4, frecuenciaBoost: 5.6, cacheL3: 33, tdp: 125, precio: 409 },
      { id: "i5-14600k", nombre: "Intel Core i5-14600K", marca: "Intel", nucleos: 14, hilos: 20, frecuenciaBase: 3.5, frecuenciaBoost: 5.3, cacheL3: 24, tdp: 125, precio: 319 },
      { id: "ryzen9-7950x3d", nombre: "AMD Ryzen 9 7950X3D", marca: "AMD", nucleos: 16, hilos: 32, frecuenciaBase: 4.2, frecuenciaBoost: 5.7, cacheL3: 128, tdp: 120, precio: 599 },
      { id: "ryzen9-7900x", nombre: "AMD Ryzen 9 7900X", marca: "AMD", nucleos: 12, hilos: 24, frecuenciaBase: 4.7, frecuenciaBoost: 5.6, cacheL3: 64, tdp: 170, precio: 429 },
      { id: "ryzen7-7800x3d", nombre: "AMD Ryzen 7 7800X3D", marca: "AMD", nucleos: 8, hilos: 16, frecuenciaBase: 4.2, frecuenciaBoost: 5.0, cacheL3: 96, tdp: 120, precio: 359 },
      { id: "ryzen5-7600x", nombre: "AMD Ryzen 5 7600X", marca: "AMD", nucleos: 6, hilos: 12, frecuenciaBase: 4.7, frecuenciaBoost: 5.3, cacheL3: 32, tdp: 105, precio: 229 },
      { id: "i9-13900k", nombre: "Intel Core i9-13900K", marca: "Intel", nucleos: 24, hilos: 32, frecuenciaBase: 3.0, frecuenciaBoost: 5.8, cacheL3: 36, tdp: 125, precio: 499 },
    ],
  },

  gpu: {
    etiqueta: "Tarjetas gráficas",
    especificaciones: [
      { clave: "vram", etiqueta: "VRAM", unidad: "GB", mayorEsMejor: true },
      { clave: "frecuenciaBoost", etiqueta: "Frecuencia boost", unidad: "MHz", mayorEsMejor: true },
      { clave: "busMemoria", etiqueta: "Bus de memoria", unidad: "bit", mayorEsMejor: true },
      { clave: "tdp", etiqueta: "TDP", unidad: "W", mayorEsMejor: false },
      { clave: "precio", etiqueta: "Precio aprox.", unidad: "USD", mayorEsMejor: false },
    ],
    elementos: [
      { id: "rtx4090", nombre: "NVIDIA GeForce RTX 4090", marca: "NVIDIA", vram: 24, frecuenciaBoost: 2520, busMemoria: 384, tdp: 450, precio: 1599 },
      { id: "rtx4080s", nombre: "NVIDIA GeForce RTX 4080 SUPER", marca: "NVIDIA", vram: 16, frecuenciaBoost: 2550, busMemoria: 256, tdp: 320, precio: 999 },
      { id: "rtx4070ti", nombre: "NVIDIA GeForce RTX 4070 Ti", marca: "NVIDIA", vram: 12, frecuenciaBoost: 2610, busMemoria: 192, tdp: 285, precio: 799 },
      { id: "rtx4060", nombre: "NVIDIA GeForce RTX 4060", marca: "NVIDIA", vram: 8, frecuenciaBoost: 2460, busMemoria: 128, tdp: 115, precio: 299 },
      { id: "rx7900xtx", nombre: "AMD Radeon RX 7900 XTX", marca: "AMD", vram: 24, frecuenciaBoost: 2500, busMemoria: 384, tdp: 355, precio: 949 },
      { id: "rx7800xt", nombre: "AMD Radeon RX 7800 XT", marca: "AMD", vram: 16, frecuenciaBoost: 2430, busMemoria: 256, tdp: 263, precio: 499 },
      { id: "rx7600", nombre: "AMD Radeon RX 7600", marca: "AMD", vram: 8, frecuenciaBoost: 2655, busMemoria: 128, tdp: 165, precio: 269 },
      { id: "rtx4070super", nombre: "NVIDIA GeForce RTX 4070 SUPER", marca: "NVIDIA", vram: 12, frecuenciaBoost: 2475, busMemoria: 192, tdp: 220, precio: 599 },
    ],
  },

  ram: {
    etiqueta: "Memoria RAM",
    especificaciones: [
      { clave: "capacidad", etiqueta: "Capacidad", unidad: "GB", mayorEsMejor: true },
      { clave: "velocidad", etiqueta: "Velocidad", unidad: "MT/s", mayorEsMejor: true },
      { clave: "latenciaCL", etiqueta: "Latencia CL", unidad: "CL", mayorEsMejor: false },
      { clave: "voltaje", etiqueta: "Voltaje", unidad: "V", mayorEsMejor: false },
      { clave: "precio", etiqueta: "Precio aprox.", unidad: "USD", mayorEsMejor: false },
    ],
    elementos: [
      { id: "corsair-vengeance-32-6000", nombre: "Corsair Vengeance DDR5 32GB", marca: "Corsair", capacidad: 32, velocidad: 6000, latenciaCL: 36, voltaje: 1.35, precio: 109 },
      { id: "gskill-trident-32-6400", nombre: "G.Skill Trident Z5 RGB 32GB", marca: "G.Skill", capacidad: 32, velocidad: 6400, latenciaCL: 32, voltaje: 1.4, precio: 139 },
      { id: "kingston-fury-16-5600", nombre: "Kingston Fury Beast 16GB", marca: "Kingston", capacidad: 16, velocidad: 5600, latenciaCL: 36, voltaje: 1.25, precio: 54 },
      { id: "corsair-dominator-64-6000", nombre: "Corsair Dominator Titanium 64GB", marca: "Corsair", capacidad: 64, velocidad: 6000, latenciaCL: 30, voltaje: 1.35, precio: 289 },
      { id: "gskill-flare-32-6000", nombre: "G.Skill Flare X5 32GB", marca: "G.Skill", capacidad: 32, velocidad: 6000, latenciaCL: 30, voltaje: 1.35, precio: 119 },
      { id: "crucial-16-4800", nombre: "Crucial 16GB DDR5", marca: "Crucial", capacidad: 16, velocidad: 4800, latenciaCL: 40, voltaje: 1.1, precio: 44 },
      { id: "teamgroup-32-7200", nombre: "TeamGroup T-Force Delta 32GB", marca: "TeamGroup", capacidad: 32, velocidad: 7200, latenciaCL: 34, voltaje: 1.4, precio: 159 },
    ],
  },

  ssd: {
    etiqueta: "Almacenamiento SSD",
    especificaciones: [
      { clave: "capacidad", etiqueta: "Capacidad", unidad: "GB", mayorEsMejor: true },
      { clave: "velocidadLectura", etiqueta: "Lectura secuencial", unidad: "MB/s", mayorEsMejor: true },
      { clave: "velocidadEscritura", etiqueta: "Escritura secuencial", unidad: "MB/s", mayorEsMejor: true },
      { clave: "resistenciaTBW", etiqueta: "Resistencia (TBW)", unidad: "TB", mayorEsMejor: true },
      { clave: "precio", etiqueta: "Precio aprox.", unidad: "USD", mayorEsMejor: false },
    ],
    elementos: [
      { id: "samsung-990pro-2tb", nombre: "Samsung 990 PRO 2TB", marca: "Samsung", capacidad: 2000, velocidadLectura: 7450, velocidadEscritura: 6900, resistenciaTBW: 1200, precio: 169 },
      { id: "wd-black-sn850x-1tb", nombre: "WD Black SN850X 1TB", marca: "Western Digital", capacidad: 1000, velocidadLectura: 7300, velocidadEscritura: 6300, resistenciaTBW: 600, precio: 89 },
      { id: "crucial-t700-2tb", nombre: "Crucial T700 2TB", marca: "Crucial", capacidad: 2000, velocidadLectura: 12400, velocidadEscritura: 11800, resistenciaTBW: 1200, precio: 219 },
      { id: "samsung-970evoplus-1tb", nombre: "Samsung 970 EVO Plus 1TB", marca: "Samsung", capacidad: 1000, velocidadLectura: 3500, velocidadEscritura: 3300, resistenciaTBW: 600, precio: 69 },
      { id: "kingston-kc3000-1tb", nombre: "Kingston KC3000 1TB", marca: "Kingston", capacidad: 1000, velocidadLectura: 7000, velocidadEscritura: 6000, resistenciaTBW: 800, precio: 79 },
      { id: "sk-hynix-p41-2tb", nombre: "SK hynix Platinum P41 2TB", marca: "SK hynix", capacidad: 2000, velocidadLectura: 7000, velocidadEscritura: 6500, resistenciaTBW: 1200, precio: 159 },
      { id: "seagate-firecuda-530-1tb", nombre: "Seagate FireCuda 530 1TB", marca: "Seagate", capacidad: 1000, velocidadLectura: 7300, velocidadEscritura: 6000, resistenciaTBW: 640, precio: 84 },
    ],
  },
};
