// Selección de elementos del DOM
const textoEncriptar = document.querySelector("#texto-encriptar");
const mensaje = document.querySelector("#texto-encriptado");

// Reglas de encriptación:
// "e" -> "enter"
// "i" -> "imes"
// "a" -> "ai"
// "o" -> "ober"
// "u" -> "ufat"

function btnEncriptar() {
  // Encriptar el texto ingresado y mostrarlo en el segundo textarea
  const textoEncriptado = encriptar(textoEncriptar.value);
  mensaje.value = textoEncriptado;

  // Actualizar en tiempo real el texto encriptado mientras se escribe
  textoEncriptar.addEventListener("input", () => {
    const textoEncriptado = encriptar(textoEncriptar.value);
    mensaje.value = textoEncriptado;
  });

  // Ocultar elementos innecesarios al encriptar
  const elementosOcultar = document.querySelectorAll("#imgmuneco, #text-derecha, #mensaje");
  elementosOcultar.forEach((elemento) => elemento.classList.add("oculto"));

  // Mostrar elementos relevantes después de encriptar
  const elementosMostrar = document.querySelectorAll("#texto-encriptado, #btn-copiar");
  elementosMostrar.forEach((elemento) => elemento.classList.remove("oculto"));

  // Limpiar el textarea de entrada después de encriptar
  textoEncriptar.value = "";
}

function contarLineas(texto) {
  // Contar las líneas en el textarea dividiendo el texto por saltos de línea
  const lineas = texto.split(/\r?\n/);
  return lineas.length;
}

function asignarFilas(textoEncriptar, mensaje) {
  // Asignar el número de filas del textarea destino según las líneas del texto encriptado
  const cantidadLineas = contarLineas(textoEncriptar);
  mensaje.setAttribute("rows", cantidadLineas);
}

function encriptar(stringEncriptada) {
  // Matriz de reglas de encriptación
  const matrizCodigo = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"]
  ];

  stringEncriptada = stringEncriptada.toLowerCase();

  // Reemplazar cada letra según la matriz de encriptación
  matrizCodigo.forEach(([original, encriptado]) => {
    if (stringEncriptada.includes(original)) {
      stringEncriptada = stringEncriptada.replaceAll(original, encriptado);
    }
  });

  // Asignar el número de filas del textarea según el texto encriptado
  asignarFilas(stringEncriptada, mensaje);
  
  return stringEncriptada;
}

function btnDesencriptar() {
  // Desencriptar el texto ingresado y mostrarlo en el segundo textarea
  const textoDesencriptado = desencriptar(textoEncriptar.value);
  mensaje.value = textoDesencriptado;

  // Limpiar el textarea de entrada después de desencriptar
  textoEncriptar.value = "";
}

function desencriptar(stringDesencriptada) {
  // Matriz de reglas de desencriptación
  const matrizCodigo = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"]
  ];

  stringDesencriptada = stringDesencriptada.toLowerCase();

  // Ocultar elementos innecesarios al desencriptar
  const elementosOcultar = document.querySelectorAll("#imgmuneco, #text-derecha, #mensaje");
  elementosOcultar.forEach((elemento) => elemento.classList.add("oculto"));

  // Mostrar elementos relevantes después de desencriptar
  const elementosMostrar = document.querySelectorAll("#texto-encriptar, #btn-copiar");
  elementosMostrar.forEach((elemento) => elemento.classList.remove("oculto"));

  // Reemplazar cada palabra encriptada con la letra correspondiente
  matrizCodigo.forEach(([original, encriptado]) => {
    if (stringDesencriptada.includes(encriptado)) {
      stringDesencriptada = stringDesencriptada.replaceAll(encriptado, original);
    }
  });

  return stringDesencriptada;
}

function copyText() {
  // Copiar el texto encriptado al portapapeles
  let inputText = document.getElementById("texto-encriptado");
  inputText.select();
  inputText.setSelectionRange(0, 99999); // Para dispositivos móviles

  navigator.clipboard.writeText(inputText.value);

  // Mover el texto copiado al textarea de entrada y limpiar el textarea de salida
  textoEncriptar.value = inputText.value;
  mensaje.value = "";

  // Mostrar alerta personalizada al copiar
  document.getElementById("custom-alert").classList.remove("oculto");

  // Ocultar la alerta después de 1 segundo
  setTimeout(() => {
    document.getElementById("custom-alert").classList.add("oculto");
  }, 1000);
}
