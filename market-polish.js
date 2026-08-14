// Refinamiento de interacción para contexto de mercado.
// Este archivo corre después de script.js y preserva la lógica base.

try {
  // Ritmo cinematográfico un poco más ágil que la versión de 90 ms,
  // sin volver a una sensación de tipeo web acelerado. Quien quiera avanzar
  // tiene siempre disponible el botón Saltar presentación.
  timing.typingDelay = 75;
  timing.linePause = 300;
  timing.holdAfterTyping = 390;
  timing.betweenPlatesPause = 250;
  timing.plateRevealPause = 170;
  timing.contactRevealPause = 420;

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
