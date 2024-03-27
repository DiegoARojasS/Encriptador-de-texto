let txtEncriptado = '';
let txtDesencriptado = '';
let imagen = document.getElementById('incognito');
let caracteresPermitidos = /^[a-z\s]*$/i;
let inputTxtArea = document.getElementById('txtOriginal');
let llavesEncriptacion = {
    'e' : 'enter',
    'i' : 'imes',
    'a' : 'ai',
    'o' : 'ober',
    'u' : 'ufat'
};
let llavesDesencriptacion = {
    'enter' : 'e',
    'imes' : 'i',
    'ai' : 'a',
    'ober' : 'o',
    'ufat' : 'u'
};

inputTxtArea.addEventListener('keypress', (event) => {
  if (!caracteresPermitidos.test(event.key)) {
    event.preventDefault();
  }
});

inputTxtArea.addEventListener('input', () => {
    inputTxtArea.value = inputTxtArea.value.toLowerCase()
});

function mostrarImagen() {
    if (inputTxtArea.value.length === 0) {
      imagen.style.display = 'inline';
    } else {
      imagen.style.display = 'none';
    }
  }

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function codificarLetras(match) {
    return llavesEncriptacion[match] || match;
}

function decodificarLetras(match) {
    return llavesDesencriptacion[match] || match;
}

function encriptarTxt() {
    mostrarImagen();
    let usarLlaves = new RegExp(Object.keys(llavesEncriptacion).join('|'), 'g');
    let txtEncriptado = inputTxtArea.value.replace(usarLlaves, codificarLetras);
    return asignarTextoElemento('p', txtEncriptado);
}

function desencriptarTxt() {
    mostrarImagen();
    let usarLlaves = new RegExp(Object.keys(llavesDesencriptacion).join('|'), 'g');
    let txtDesencriptado = inputTxtArea.value.replace(usarLlaves, decodificarLetras);
    return asignarTextoElemento('p', txtDesencriptado);
}

async function copiarTxt() {
    try {
      const text = document.getElementById('txtResultado').textContent;
      await navigator.clipboard.writeText(text);
      console.log('Contenido copiado al portapapeles');
    } catch (err) {
      console.error('Copia fallida: ', err);
    }
  }