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

// Limpieza de créditos visibles en la landing española.
const projectSummary = document.querySelector('.project-summary');
if (projectSummary) {
  projectSummary.textContent = projectSummary.textContent
    .replace(/, y dirigida por Maite Piñeyrúa Segura\.?/i, '.')
    .replace(/, dirigida por Maite Piñeyrúa Segura\.?/i, '.');
}

document.querySelectorAll('.project-status__list li').forEach((item) => {
  const text = item.textContent.trim();
  if (/direcci[oó]n confirmada|director attached/i.test(text)) {
    item.remove();
    return;
  }
  item.textContent = text
    .replace(/coproducci[oó]n uruguaya con/gi, 'coproducción con')
    .replace(/Uruguayan coproduction with/gi, 'Coproduction with');
});

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

// El botón de salto tiene una única capa visual propia.
// Nada de estilos inyectados acá: así no compite JS contra CSS.
if (!document.querySelector('link[data-skip-intro-polish]')) {
  const skipStylesheet = document.createElement('link');
  skipStylesheet.rel = 'stylesheet';
  skipStylesheet.href = 'skip-intro-polish.css?v=1';
  skipStylesheet.dataset.skipIntroPolish = 'true';
  document.head.appendChild(skipStylesheet);
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
