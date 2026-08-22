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
} catch (error) {
  console.warn('Market polish: no se pudo ajustar una interacción opcional.', error);
}

// English abre una landing audiovisual independiente.
const languageSwitch = document.querySelector('.cover-language-switch');
if (languageSwitch?.textContent.trim().toLowerCase() === 'english') {
  languageSwitch.href = 'english.html';
}

// La ficha de formato aparece recién al terminar toda la presentación.
// Su geometría vive exclusivamente en CSS; responsive-guard.css es la autoridad final.
const formatLine = document.querySelector('.format-line');
if (formatLine) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

// El video de portada sólo corre cuando el viewport tiene espacio útil suficiente.
// También se reevalúa al rotar o redimensionar: un teléfono en landscape no debe
// quedar decodificando el MP4 de escritorio después de cambiar de orientación.
const compactVideoViewport = window.matchMedia(
  '(max-width: 720px), (max-height: 500px) and (orientation: landscape), (hover: none) and (pointer: coarse) and (orientation: landscape) and (max-height: 600px)'
);

const syncCoverVideoPolicy = () => {
  if (!video) return;

  if (compactVideoViewport.matches) {
    video.pause();
    video.removeAttribute('autoplay');
    return;
  }

  video.setAttribute('autoplay', '');
  const playback = video.play();
  if (playback?.catch) playback.catch(() => {});
};

syncCoverVideoPolicy();
if (compactVideoViewport.addEventListener) {
  compactVideoViewport.addEventListener('change', syncCoverVideoPolicy);
} else if (compactVideoViewport.addListener) {
  compactVideoViewport.addListener(syncCoverVideoPolicy);
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

  // Corrige una preposición residual del mailto de la landing inglesa sin tocar su estructura.
  document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
    const href = link.getAttribute('href');
    if (href?.includes('in%20relation%20with%20financing')) {
      link.setAttribute('href', href.replace('in%20relation%20with%20financing', 'in%20relation%20to%20financing'));
    }
  });
}