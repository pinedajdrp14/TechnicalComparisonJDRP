/**
 * TechCompare — app.js
 * Maneja el estado de categoría/selección, el renderizado de la cuadrícula
 * de componentes y de la tabla comparativa, y la persistencia en localStorage.
 */

(function () {
  "use strict";

  const CLAVE_ALMACENAMIENTO = "techcompare:seleccion";
  const MAX_SELECCION = 3;

  /** @type {{ categoria: string, idsSeleccionados: Record<string,string[]>, consulta: string }} */
  const estado = {
    categoria: "cpu",
    idsSeleccionados: { cpu: [], gpu: [], ram: [], ssd: [] },
    consulta: "",
  };

  // ---- Referencias al DOM ------------------------------------------
  const pestanasCategoria = document.querySelectorAll(".pestana-categoria");
  const cuadricula = document.getElementById("cuadricula-componentes");
  const entradaBusqueda = document.getElementById("entrada-busqueda");
  const botonLimpiar = document.getElementById("limpiar-seleccion");
  const comparacionVacia = document.getElementById("comparacion-vacia");
  const contenedorComparacion = document.getElementById("contenedor-tabla-comparacion");
  const tablaComparacion = document.getElementById("tabla-comparacion");

  // ---- Persistencia --------------------------------------------------
  function cargarSeleccion() {
    try {
      const datosGuardados = localStorage.getItem(CLAVE_ALMACENAMIENTO);
      if (!datosGuardados) return;
      const datos = JSON.parse(datosGuardados);
      if (datos && typeof datos === "object") {
        Object.keys(estado.idsSeleccionados).forEach((cat) => {
          if (Array.isArray(datos[cat])) {
            estado.idsSeleccionados[cat] = datos[cat].filter((id) =>
              DATOS_TECHCOMPARE[cat].elementos.some((elemento) => elemento.id === id)
            );
          }
        });
      }
    } catch (err) {
      // localStorage no disponible o datos corruptos: se ignora en silencio
      console.warn("TechCompare: no se pudo leer la selección guardada.", err);
    }
  }

  function guardarSeleccion() {
    try {
      localStorage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify(estado.idsSeleccionados));
    } catch (err) {
      console.warn("TechCompare: no se pudo guardar la selección.", err);
    }
  }

  // ---- Utilidades ------------------------------------------------------
  function formatearValor(valor, unidad) {
    const formateado =
      typeof valor === "number" ? valor.toLocaleString("es-CO") : valor;
    return unidad ? `${formateado} ${unidad}` : `${formateado}`;
  }

  function normalizar(texto) {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function obtenerElementosActuales() {
    const datosCategoria = DATOS_TECHCOMPARE[estado.categoria];
    const q = normalizar(estado.consulta.trim());
    if (!q) return datosCategoria.elementos;
    return datosCategoria.elementos.filter(
      (elemento) =>
        normalizar(elemento.nombre).includes(q) || normalizar(elemento.marca).includes(q)
    );
  }

  function obtenerElementosSeleccionados() {
    const datosCategoria = DATOS_TECHCOMPARE[estado.categoria];
    const ids = estado.idsSeleccionados[estado.categoria];
    return ids
      .map((id) => datosCategoria.elementos.find((elemento) => elemento.id === id))
      .filter(Boolean);
  }

  // ---- Render: pestañas de categoría ---------------------------------------
  function renderizarPestanas() {
    pestanasCategoria.forEach((pestana) => {
      const estaActiva = pestana.dataset.categoria === estado.categoria;
      pestana.classList.toggle("activa", estaActiva);
      pestana.setAttribute("aria-selected", String(estaActiva));
    });
  }

  // ---- Render: cuadrícula de componentes -------------------------------------
  function renderizarCuadricula() {
    const elementos = obtenerElementosActuales();
    const idsSeleccionados = estado.idsSeleccionados[estado.categoria];
    cuadricula.innerHTML = "";

    if (elementos.length === 0) {
      const vacio = document.createElement("p");
      vacio.className = "sin-resultados";
      vacio.textContent = "No se encontraron componentes con ese criterio.";
      cuadricula.appendChild(vacio);
      return;
    }

    const fragmento = document.createDocumentFragment();

    elementos.forEach((elemento) => {
      const estaSeleccionado = idsSeleccionados.includes(elemento.id);
      const estaDeshabilitado =
        !estaSeleccionado && idsSeleccionados.length >= MAX_SELECCION;

      const tarjeta = document.createElement("button");
      tarjeta.type = "button";
      tarjeta.className = "tarjeta-componente";
      tarjeta.setAttribute("role", "listitem");
      tarjeta.setAttribute(
        "aria-pressed",
        estaSeleccionado ? "true" : "false"
      );
      tarjeta.setAttribute(
        "aria-label",
        `${elemento.nombre}, ${estaSeleccionado ? "seleccionado" : "no seleccionado"}`
      );
      if (estaSeleccionado) tarjeta.classList.add("seleccionada");
      if (estaDeshabilitado) tarjeta.classList.add("deshabilitada");

      tarjeta.innerHTML = `
        <span class="check-tarjeta" aria-hidden="true">
          <svg viewBox="0 0 16 16"><path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </span>
        <div class="marca-tarjeta">${elemento.marca}</div>
        <div class="nombre-tarjeta">${elemento.nombre}</div>
        <div class="precio-tarjeta">${formatearValor(elemento.precio, "USD")}</div>
      `;

      tarjeta.addEventListener("click", () => alternarSeleccion(elemento.id));
      fragmento.appendChild(tarjeta);
    });

    cuadricula.appendChild(fragmento);
  }

  function alternarSeleccion(id) {
    const lista = estado.idsSeleccionados[estado.categoria];
    const indice = lista.indexOf(id);

    if (indice >= 0) {
      lista.splice(indice, 1);
    } else {
      if (lista.length >= MAX_SELECCION) return;
      lista.push(id);
    }

    guardarSeleccion();
    renderizarCuadricula();
    renderizarComparacion();
  }

  function quitarSeleccion(id) {
    const lista = estado.idsSeleccionados[estado.categoria];
    const indice = lista.indexOf(id);
    if (indice >= 0) lista.splice(indice, 1);
    guardarSeleccion();
    renderizarCuadricula();
    renderizarComparacion();
  }

  // ---- Render: tabla comparativa ----------------------------------------
  function renderizarComparacion() {
    const datosCategoria = DATOS_TECHCOMPARE[estado.categoria];
    const seleccionados = obtenerElementosSeleccionados();

    if (seleccionados.length < 2) {
      comparacionVacia.hidden = false;
      contenedorComparacion.hidden = true;
      return;
    }

    comparacionVacia.hidden = true;
    contenedorComparacion.hidden = false;

    // Precalcular máximos por especificación para las barras medidoras
    const maximoPorEspec = {};
    datosCategoria.especificaciones.forEach((especificacion) => {
      maximoPorEspec[especificacion.clave] = Math.max(
        ...seleccionados.map((elemento) => elemento[especificacion.clave])
      );
    });

    // Cabecera
    let htmlEncabezado = "<thead><tr><th>Especificación</th>";
    seleccionados.forEach((elemento) => {
      htmlEncabezado += `
        <th class="celda-especificacion">
          <div class="th-componente">
            <span class="th-marca">${elemento.marca}</span>
            <span>${elemento.nombre}</span>
            <button class="th-quitar" type="button" data-quitar-id="${elemento.id}">Quitar</button>
          </div>
        </th>`;
    });
    htmlEncabezado += "</tr></thead>";

    // Cuerpo: una fila por especificación
    let htmlCuerpo = "<tbody>";
    datosCategoria.especificaciones.forEach((especificacion) => {
      const maximo = maximoPorEspec[especificacion.clave] || 1;
      htmlCuerpo += `<tr><td class="celda-etiqueta-fila">${especificacion.etiqueta}</td>`;

      seleccionados.forEach((elemento) => {
        const valor = elemento[especificacion.clave];
        const esGanador = especificacion.mayorEsMejor
          ? valor === maximo && seleccionados.some((o) => o[especificacion.clave] !== valor)
          : valor === Math.min(...seleccionados.map((o) => o[especificacion.clave])) &&
            seleccionados.some((o) => o[especificacion.clave] !== valor);

        // La longitud de la barra siempre representa el valor relativo al máximo del grupo,
        // sin importar si "mayor es mejor" o "menor es mejor" para esa fila.
        const porcentajeBarra = Math.max(6, Math.round((valor / maximo) * 100));

        htmlCuerpo += `
          <td class="celda-especificacion">
            <div class="fila-valor-especificacion">
              <span class="valor-especificacion ${esGanador ? "ganador" : ""}">${valor.toLocaleString("es-CO")}</span>
              <span class="unidad-especificacion">${especificacion.unidad}</span>
            </div>
            <div class="medidor" role="img" aria-label="${especificacion.etiqueta}: ${formatearValor(valor, especificacion.unidad)}">
              <div class="relleno-medidor ${esGanador ? "ganador" : ""}" style="width:${porcentajeBarra}%"></div>
            </div>
            ${esGanador ? '<div class="insignia-ganador">◆ Mejor valor</div>' : ""}
          </td>`;
      });

      htmlCuerpo += "</tr>";
    });
    htmlCuerpo += "</tbody>";

    tablaComparacion.innerHTML = htmlEncabezado + htmlCuerpo;

    // Listeners de los botones "Quitar" dentro de la tabla
    tablaComparacion.querySelectorAll("[data-quitar-id]").forEach((boton) => {
      boton.addEventListener("click", () => quitarSeleccion(boton.dataset.quitarId));
    });

    // Forzar reflow para que la transición de ancho de las barras se anime
    requestAnimationFrame(() => {
      tablaComparacion.querySelectorAll(".relleno-medidor").forEach((el) => {
        const anchoObjetivo = el.style.width;
        el.style.width = "0%";
        requestAnimationFrame(() => {
          el.style.width = anchoObjetivo;
        });
      });
    });
  }

  // ---- Eventos globales --------------------------------------------------
  pestanasCategoria.forEach((pestana) => {
    pestana.addEventListener("click", () => {
      estado.categoria = pestana.dataset.categoria;
      estado.consulta = "";
      entradaBusqueda.value = "";
      renderizarPestanas();
      renderizarCuadricula();
      renderizarComparacion();
    });
  });

  entradaBusqueda.addEventListener("input", (e) => {
    estado.consulta = e.target.value;
    renderizarCuadricula();
  });

  botonLimpiar.addEventListener("click", () => {
    estado.idsSeleccionados[estado.categoria] = [];
    guardarSeleccion();
    renderizarCuadricula();
    renderizarComparacion();
  });

  // ---- Inicio ---------------------------------------------------------------
  function iniciar() {
    cargarSeleccion();
    renderizarPestanas();
    renderizarCuadricula();
    renderizarComparacion();
  }

  document.addEventListener("DOMContentLoaded", iniciar);
})();
