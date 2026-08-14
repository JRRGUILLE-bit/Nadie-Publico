// Refinamiento de interacción para contexto de mercado.
// Este archivo corre después de script.js y preserva la lógica base.

try {
  // La introducción mantiene su gesto de máquina de escribir, pero deja de pedir ~14 s.
  timing.typingDelay = 9;
  timing.linePause = 42;
  timing.holdAfterTyping = 70;
  timing.betweenPlatesPause = 70;
  timing.plateRevealPause = 55;
  timing.contactRevealPause = 100;

  // Créditos más compactos; la ficha industrial permanente ya comunica formato y país.
  if (plateSequence?.[1]) {
    plateSequence[1].lines[0] = 'Creada por';
  }
  if (plateSequence?.[2]) {
    plateSequence[2].lines = [
      'DETOUR SERIES LAB · PREMIO TEASER DETOUR',
      'CAMPUS MÁLAGA TALENT 2025',
    ];
  }

  // Carrusel manual: en un expediente profesional el usuario controla el ritmo.
  aboutIsPaused = true;
  stopAboutAutoplay();
  aboutPause?.remove();
} catch (error) {
  console.warn('Market polish: no se pudo ajustar una interacción opcional.', error);
}

// En mobile privilegiamos el póster y evitamos reproducir/descargar el video pesado.
if (window.matchMedia('(max-width: 720px)').matches && video) {
  video.pause();
  video.removeAttribute('autoplay');
}

// El handler original ofrece Gmail mediante confirm() y omite cc. Interceptamos en captura:
// dejamos que mailto: haga su trabajo nativo, preservando destinatarios, cc, asunto y cuerpo.
document.addEventListener(
  'click',
  (event) => {
    const link = event.target.closest?.('a[href^="mailto:"]');
    if (!link) return;
    event.stopPropagation();
  },
  true
);
