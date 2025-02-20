// Configuración inicial
const laberinto = document.getElementById("laberinto");
const resultado = document.getElementById("resultado");
let posicionPersonaje = { x: 0, y: 0 }; // Posición inicial del personaje
const meta = { x: 4, y: 4 }; // Posición de la meta

// Generar el laberinto
function generarLaberinto() {
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
      const celda = document.createElement("div");
      celda.classList.add("celda");
      if (x === posicionPersonaje.x && y === posicionPersonaje.y) {
        celda.classList.add("personaje");
        celda.textContent = "⭐"; // Personaje
      } else if (x === meta.x && y === meta.y) {
        celda.classList.add("meta");
        celda.textContent = "🏁"; // Meta
      }
      laberinto.appendChild(celda);
    }
  }
}

// Mover al personaje
function moverPersonaje(direccion) {
  const nuevaPosicion = { ...posicionPersonaje };

  switch (direccion) {
    case "arriba":
      nuevaPosicion.y = Math.max(0, posicionPersonaje.y - 1);
      break;
    case "abajo":
      nuevaPosicion.y = Math.min(4, posicionPersonaje.y + 1);
      break;
    case "izquierda":
      nuevaPosicion.x = Math.max(0, posicionPersonaje.x - 1);
      break;
    case "derecha":
      nuevaPosicion.x = Math.min(4, posicionPersonaje.x + 1);
      break;
  }

  // Actualizar posición del personaje
  posicionPersonaje = nuevaPosicion;
  actualizarLaberinto();
}

// Actualizar el laberinto
function actualizarLaberinto() {
  const celdas = document.querySelectorAll(".celda");
  celdas.forEach((celda, index) => {
    const x = index % 5;
    const y = Math.floor(index / 5);
    celda.textContent = "";
    celda.classList.remove("personaje");

    if (x === posicionPersonaje.x && y === posicionPersonaje.y) {
      celda.classList.add("personaje");
      celda.textContent = "⭐";
    }
  });

  // Verificar si el personaje llegó a la meta
  if (posicionPersonaje.x === meta.x && posicionPersonaje.y === meta.y) {
    resultado.textContent = "¡Felicidades! Llegaste a la meta. �";
    resultado.style.color = "green";
  }
}

// Ejecutar el código del usuario
function ejecutarCodigo() {
  const codigoUsuario = document.getElementById("codigo-usuario").value;
  resultado.textContent = "";
  resultado.style.color = "white";

  try {
    // Convertir el código del usuario en funciones
    const acciones = codigoUsuario.split("\n");
    acciones.forEach((accion) => {
      if (accion.trim() === "moverArriba()") moverPersonaje("arriba");
      if (accion.trim() === "moverAbajo()") moverPersonaje("abajo");
      if (accion.trim() === "moverIzquierda()") moverPersonaje("izquierda");
      if (accion.trim() === "moverDerecha()") moverPersonaje("derecha");
    });
  } catch (error) {
    resultado.textContent = "Error: " + error.message;
    resultado.style.color = "red";
  }
}

// Inicializar el laberinto
generarLaberinto();