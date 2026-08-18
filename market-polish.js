// Refinamiento de interacción para contexto de mercado.
// Este archivo corre después de script.js y preserva la lógica base.

try {
  // Ritmo cinematográfico apenas más ágil que la versión de 75 ms,
  // sin perder la respiración de una apertura audiovisual.
  timing.typingDelay = 68;
  timing.linePause = 285;
  timing.holdAfterTyping = 370;
  timing.betweenPlatesPause = 235;
  timing.plateRevealPause = 160;
  timing.contactRevealPause = 400;

  // La portada acredita autoría, no una dirección que todavía no ocurrió.
  // Los reconocimientos originales de script.js se preservan completos, incluido FIC.
  if (plateSequence?.[1]) {
    plateSequence[1].lines = [
      'Creada por',
      plateSequence[1].lines[1],
    ];
  }

} catch (error) {
  console.warn('Market polish: no se pudo ajustar una interacción opcional.', error);
}

// English abre una landing audiovisual independiente.
const languageSwitch = document.querySelector('.cover-language-switch');
if (languageSwitch?.textContent.trim().toLowerCase() === 'english') {
  languageSwitch.href = 'english.html';
}

// La ficha de formato aparece recién al terminar toda la presentación.
const formatLine = document.querySelector('.format-line');
if (formatLine) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  formatLine.style.top = '36vh';
  formatLine.style.animation = 'none';
  formatLine.style.opacity = '0';
  formatLine.style.transition = reducedMotion ? 'none' : 'opacity 900ms ease';

  const updateFormatLineVisibility = () => {
    const introComplete = document.body.classList.contains('intro-complete');
    const aboutOpen = document.body.classList.contains('about-open');
    formatLine.style.opacity = introComplete && !aboutOpen ? '0.92' : '0';
  };

  updateFormatLineVisibility();
  new MutationObserver(updateFormatLineVisibility).observe(document.body, {
    attributes: true,
    attributeFilter: ['class'],
  });
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

// QA: los iconos de los accesos inferiores son decorativos; el texto visible ya nombra la acción.
document.querySelectorAll('.contact-link img').forEach((image) => {
  image.setAttribute('alt', '');
});

// QA: la frase de autoría compartida fue retirada visualmente; también se elimina del DOM
// para evitar contenido muerto y lecturas redundantes por tecnologías de asistencia.
document.querySelectorAll('.creators-authorship').forEach((node) => node.remove());

// QA: el diálogo debe anunciar la placa activa, no quedar etiquetado siempre como PROYECTO/PROJECT.
if (aboutCarousel && aboutSlides.length) {
  aboutCarousel.removeAttribute('aria-labelledby');

  const syncAboutDialogLabel = () => {
    const activeSlide = aboutSlides.find((slide) => slide.classList.contains('is-active')) ?? aboutSlides[0];
    const heading = activeSlide?.querySelector('h2')?.textContent.trim();
    if (heading) {
      aboutCarousel.setAttribute('aria-label', heading);
    }
  };

  syncAboutDialogLabel();
  aboutSlides.forEach((slide) => {
    new MutationObserver(syncAboutDialogLabel).observe(slide, {
      attributes: true,
      attributeFilter: ['class'],
    });
  });
}

// QA: algunos rótulos editoriales del carrusel viven en pseudo-elementos CSS compartidos.
// Se traducen aquí para que la landing inglesa no mezcle idiomas.
if (document.documentElement.lang.toLowerCase().startsWith('en')) {
  const englishCarouselLabels = document.createElement('style');
  englishCarouselLabels.dataset.qaEnglishLabels = 'true';
  englishCarouselLabels.textContent = `
    html[lang^='en'] .about-card--universe::after { content: 'MEMORY / WHAT WAS BURIED'; }
    html[lang^='en'] .about-card--universe h2::after { content: 'PRESENT / MONTEVIDEO'; }
    html[lang^='en'] .about-card--ska .ska-producer::before { content: 'INDUSTRY BACKING / 01'; }
  `;
  document.head.appendChild(englishCarouselLabels);
}
