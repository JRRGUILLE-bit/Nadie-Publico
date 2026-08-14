// Refinamiento de interacción para contexto de mercado.
// Este archivo corre después de script.js y preserva la lógica base.

try {
  // Ritmo de máquina de escribir pensado como apertura audiovisual, no como carga rápida.
  // La referencia es la intro original (39 ms): 47 ms es aproximadamente 20% más lento.
  // Se restauran también las respiraciones entre líneas y placas. Quien quiera avanzar
  // tiene siempre disponible el botón Saltar presentación.
  timing.typingDelay = 47;
  timing.linePause = 165;
  timing.holdAfterTyping = 185;
  timing.betweenPlatesPause = 125;
  timing.plateRevealPause = 120;
  timing.contactRevealPause = 300;

  // Créditos más compactos. Los reconocimientos originales de script.js
  // se preservan completos, incluido el apoyo del Fondo de Incentivo Cultural.
  if (plateSequence?.[1]) {
    plateSequence[1].lines[0] = 'Creada por';
  }

  // Carrusel manual: en un expediente profesional el usuario controla el ritmo.
  aboutIsPaused = true;
  stopAboutAutoplay();
  aboutPause?.remove();
} catch (error) {
  console.warn('Market polish: no se pudo ajustar una interacción opcional.', error);
}

// La ficha de formato queda en el aire entre el título y los créditos,
// nunca superpuesta sobre la segunda línea del título.
const formatLine = document.querySelector('.format-line');
if (formatLine) {
  formatLine.style.top = '36vh';
}

// En mobile privilegiamos el póster y evitamos reproducir el video pesado.
if (window.matchMedia('(max-width: 720px)').matches && video) {
  video.pause();
  video.removeAttribute('autoplay');
}

// script.js agregaba un confirm() nativo y su URL de Gmail perdía el parámetro cc.
// Reemplazar los enlaces por clones elimina esos listeners y devuelve el comportamiento
// mailto: nativo, que conserva destinatario, cc, asunto y cuerpo en cualquier cliente.
document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
  const cleanLink = link.cloneNode(true);
  link.replaceWith(cleanLink);
});
