// Refinamiento de interacción para contexto de mercado.
// Este archivo corre después de script.js y preserva la lógica base.

try {
  // Ritmo cinematográfico apenas más ágil que la versión de 75 ms,
  // sin perder la respiración de una apertura audiovisual. Quien quiera avanzar
  // tiene siempre disponible el botón Saltar presentación.
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

  // Carrusel manual: en un expediente profesional el usuario controla el ritmo.
  aboutIsPaused = true;
  stopAboutAutoplay();
  aboutPause?.remove();
} catch (error) {
  console.warn('Market polish: no se pudo ajustar una interacción opcional.', error);
}

// English abre una landing audiovisual independiente, no el viejo expediente about.html.
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

const aboutCards = Array.from(document.querySelectorAll('.about-card'));
const maiteCard = aboutCards.find((card) => /Maite Piñeyrúa Segura/.test(card.querySelector('h2')?.textContent ?? ''));
if (maiteCard) {
  const paragraphs = maiteCard.querySelectorAll('p');
  if (paragraphs[0]) {
    paragraphs[0].textContent = 'Cocreadora y coguionista de Nadie te dijo que iba a ser así. Trabaja en la construcción del tono, los personajes y la tensión entre intimidad, absurdo cotidiano y conflicto político.';
  }
}

const skaCard = aboutCards.find((card) => /SKA Films/.test(card.querySelector('h2')?.textContent ?? ''));
if (skaCard) {
  skaCard.querySelectorAll('p').forEach((paragraph) => {
    paragraph.textContent = paragraph.textContent
      .replace(/coproducci[oó]n uruguaya/gi, 'coproducción')
      .replace(/Uruguayan coproduction/gi, 'coproduction');
  });
}

// La ficha de formato aparece recién al terminar toda la presentación.
// Durante el tipeo permanece invisible; al completar la intro entra con un fade suave.
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

// El control de salto se trata como parte de los opening titles: oscuro, táctil y discreto.
// Conserva el +20% de escala pedido, pero con una terminación más cinematográfica.
const skipPolishStyle = document.createElement('style');
skipPolishStyle.textContent = `
  .skip-intro-button {
    left: 50%;
    right: auto;
    transform: translateX(-50%);
    scale: 1.2;
    transform-origin: center bottom;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.68rem;
    min-height: 2.75rem;
    padding: 0.66rem 1.08rem 0.62rem;
    overflow: hidden;
    border: 1px solid rgba(226, 190, 116, 0.48);
    border-radius: 999px;
    background:
      linear-gradient(180deg, rgba(24, 29, 27, 0.82), rgba(8, 11, 10, 0.92)),
      rgba(8, 10, 9, 0.82);
    -webkit-backdrop-filter: blur(9px) saturate(1.08);
    backdrop-filter: blur(9px) saturate(1.08);
    color: rgba(246, 235, 210, 0.94);
    font-family: 'Lekton', 'Courier Prime', 'Courier New', Courier, monospace;
    font-size: clamp(0.72rem, 0.95vw, 0.84rem);
    font-weight: 700;
    line-height: 1;
    letter-spacing: 0.085em;
    text-transform: uppercase;
    text-shadow: 0 1px 8px rgba(0, 0, 0, 0.58);
    box-shadow:
      0 12px 30px rgba(0, 0, 0, 0.36),
      inset 0 1px 0 rgba(255, 255, 255, 0.055),
      inset 0 0 0 1px rgba(255, 255, 255, 0.015);
    transition:
      transform 180ms ease,
      border-color 180ms ease,
      background 180ms ease,
      box-shadow 180ms ease,
      color 180ms ease;
  }

  .skip-intro-button::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    border-radius: inherit;
    background: linear-gradient(105deg, transparent 22%, rgba(255, 242, 210, 0.075) 48%, transparent 72%);
    transform: translateX(-115%);
    transition: transform 520ms ease;
  }

  .skip-intro-button > span {
    position: relative;
    z-index: 1;
  }

  .skip-intro-button > span:last-child {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.42rem;
    height: 1.42rem;
    margin-right: -0.2rem;
    border: 1px solid rgba(226, 190, 116, 0.32);
    border-radius: 999px;
    background: rgba(226, 190, 116, 0.075);
    color: rgba(247, 230, 192, 0.96);
    font-size: 0.92rem;
    line-height: 1;
    letter-spacing: 0;
    transition:
      transform 180ms ease,
      border-color 180ms ease,
      background 180ms ease;
  }

  .skip-intro-button:hover {
    transform: translateX(-50%) translateY(-2px);
    border-color: rgba(226, 190, 116, 0.75);
    color: rgba(255, 244, 219, 0.99);
    background:
      linear-gradient(180deg, rgba(29, 34, 31, 0.9), rgba(10, 13, 12, 0.96)),
      rgba(8, 10, 9, 0.88);
    box-shadow:
      0 15px 36px rgba(0, 0, 0, 0.44),
      0 0 20px rgba(226, 190, 116, 0.105),
      inset 0 1px 0 rgba(255, 255, 255, 0.075);
  }

  .skip-intro-button:hover::before {
    transform: translateX(115%);
  }

  .skip-intro-button:hover > span:last-child {
    transform: translateX(2px);
    border-color: rgba(226, 190, 116, 0.58);
    background: rgba(226, 190, 116, 0.14);
  }

  .skip-intro-button:active {
    transform: translateX(-50%) translateY(0);
  }

  .skip-intro-button:focus-visible {
    outline: none;
    border-color: rgba(236, 202, 128, 0.92);
    box-shadow:
      0 0 0 3px rgba(226, 190, 116, 0.17),
      0 15px 36px rgba(0, 0, 0, 0.42);
  }

  @media (max-width: 720px) {
    .skip-intro-button {
      gap: 0.56rem;
      min-height: 2.55rem;
      padding: 0.61rem 0.94rem 0.58rem;
      font-size: clamp(0.67rem, 2.75vw, 0.77rem);
      letter-spacing: 0.07em;
    }

    .skip-intro-button > span:last-child {
      width: 1.25rem;
      height: 1.25rem;
      font-size: 0.82rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .skip-intro-button,
    .skip-intro-button::before,
    .skip-intro-button > span:last-child {
      transition: none;
    }
  }
`;
document.head.appendChild(skipPolishStyle);

if (skipIntroButton) {
  const skipArrow = skipIntroButton.querySelector('span[aria-hidden="true"]');
  if (skipArrow) {
    skipArrow.textContent = '→';
  }
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
