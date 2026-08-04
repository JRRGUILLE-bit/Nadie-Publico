const video = document.querySelector('.background-video');
const plates = document.querySelector('#plates');
const aboutTrigger = document.querySelector('#about-trigger');
const aboutCarousel = document.querySelector('#about-carousel');
const aboutFrame = aboutCarousel?.querySelector('.about-carousel__frame');
const aboutClose = document.querySelector('#about-close');
const aboutPrev = document.querySelector('#about-prev');
const aboutNext = document.querySelector('#about-next');
let aboutPause = document.querySelector('#about-pause');
const aboutSlides = Array.from(document.querySelectorAll('[data-about-slide]'));
const aboutDots = Array.from(document.querySelectorAll('[data-about-dot]'));
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const plateNameClass = 'plate__name';

if (video) {
  video.playbackRate = 1;
  video.addEventListener('canplay', () => document.body.classList.add('video-ready'));
  video.play().catch(() => document.body.classList.add('video-blocked'));
}

const plateSequence = [
  {
    className: 'plate--title',
    lines: ['Nadie te dijo', 'que iba a ser así.'],
  },
  {
    className: 'plate--credits plate--secondary',
    lines: [
      'Creado por',
      {
        text: 'Maite Piñeyrúa Segura y Guillermo Barbeito',
        parts: [
          { text: 'Maite Piñeyrúa Segura', className: plateNameClass },
          { text: ' y ' },
          { text: 'Guillermo Barbeito', className: plateNameClass },
        ],
      },
    ],
  },
  {
    className: 'plate--recognition plate--secondary',
    lines: ['Con el apoyo del FIC', 'DETOUR Series Lab: Premio Teaser'],
  },
  {
    className: 'plate--coproduction plate--secondary',
    lines: [
      {
        text: 'Una co-producción con SKA Films',
        parts: [
          { text: 'Una co-producción con ' },
          { text: 'SKA Films', className: plateNameClass },
        ],
      },
    ],
  },
];

const timing = {
  initialPause: 650,
  betweenPlatesPause: 102,
  plateRevealPause: 100,
  typingDelay: 39,
  linePause: 136,
  holdAfterTyping: 153,
  contactRevealPause: 300,
};

const wait = (duration) => new Promise((resolve) => window.setTimeout(resolve, duration));
const getLineText = (line) => (typeof line === 'string' ? line : line.text);

const createLine = (lineContent, index) => {
  const line = document.createElement('p');
  line.className = `plate__line plate__line--${index + 1}`;
  line.dataset.fullText = getLineText(lineContent);
  return line;
};

const typeCharacters = async (target, text) => {
  for (const character of text) {
    target.textContent += character;
    await wait(timing.typingDelay);
  }
};

const typeLine = async (line, lineContent) => {
  const target = lineContent.href ? document.createElement('a') : line;

  if (lineContent.href) {
    target.href = lineContent.href;
    target.target = '_blank';
    target.rel = 'noopener noreferrer';
    line.appendChild(target);
  }

  if (lineContent.parts?.length) {
    for (const part of lineContent.parts) {
      const partTarget = part.className
        ? document.createElement('span')
        : document.createTextNode('');

      if (part.className) {
        partTarget.className = part.className;
      }

      target.appendChild(partTarget);
      await typeCharacters(partTarget, part.text);
    }
    return;
  }

  await typeCharacters(target, getLineText(lineContent));
};

const showPersistentPlate = async (plate) => {
  const plateElement = document.createElement('div');
  plateElement.className = `plate ${plate.className}`;
  plateElement.setAttribute('aria-hidden', 'false');

  const lines = plate.lines.map(createLine);
  lines.forEach((line) => plateElement.appendChild(line));
  plates.appendChild(plateElement);

  await wait(timing.plateRevealPause);
  plateElement.classList.add('plate--visible');

  for (const [index, line] of lines.entries()) {
    line.classList.add('plate__line--typing');
    await typeLine(line, plate.lines[index]);
    line.classList.remove('plate__line--typing');
    line.classList.add('plate__line--typed');

    if (index < lines.length - 1) {
      await wait(timing.linePause);
    }
  }

  plateElement.classList.add('plate--complete');
  await wait(timing.holdAfterTyping);
};

const runPlates = async () => {
  if (!plates) {
    return;
  }

  await wait(timing.initialPause);

  for (const [index, plate] of plateSequence.entries()) {
    await showPersistentPlate(plate);
    if (index < plateSequence.length - 1) {
      await wait(timing.betweenPlatesPause);
    }
  }

  await wait(timing.contactRevealPause);
  document.body.classList.add('contacts-visible');
};

let activeAboutSlide = 0;
let aboutAutoplay;
let aboutIsPaused = false;
const aboutReadingMsPer100Words = 30000;
const aboutMinimumReadingDelay = 70000;

const getAboutSlideWordCount = (slide) => {
  if (!slide) {
    return 0;
  }
  return slide.textContent.trim().split(/\s+/).filter(Boolean).length;
};

const getAboutAutoplayDelay = () => {
  const wordCount = getAboutSlideWordCount(aboutSlides[activeAboutSlide]);
  return Math.max(
    Math.ceil((wordCount / 100) * aboutReadingMsPer100Words),
    aboutMinimumReadingDelay
  );
};

const updateAboutPauseButton = () => {
  if (!aboutPause) {
    return;
  }
  aboutPause.textContent = aboutIsPaused ? 'Reanudar' : 'Pausar';
  aboutPause.setAttribute('aria-pressed', String(aboutIsPaused));
  aboutPause.setAttribute(
    'aria-label',
    aboutIsPaused ? 'Reanudar avance automático' : 'Pausar avance automático'
  );
};

const setAboutSlide = (index) => {
  if (!aboutSlides.length) {
    return;
  }

  activeAboutSlide = (index + aboutSlides.length) % aboutSlides.length;

  aboutSlides.forEach((slide, slideIndex) => {
    const isActive = slideIndex === activeAboutSlide;
    slide.classList.toggle('is-active', isActive);
    slide.setAttribute('aria-hidden', String(!isActive));
  });

  aboutDots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === activeAboutSlide;
    dot.classList.toggle('is-active', isActive);
    dot.setAttribute('aria-current', isActive ? 'true' : 'false');
  });
};

const stopAboutAutoplay = () => {
  window.clearTimeout(aboutAutoplay);
  aboutAutoplay = undefined;
};

const startAboutAutoplay = () => {
  stopAboutAutoplay();

  if (
    aboutIsPaused ||
    prefersReducedMotion.matches ||
    !document.body.classList.contains('about-open')
  ) {
    return;
  }

  aboutAutoplay = window.setTimeout(() => {
    setAboutSlide(activeAboutSlide + 1);
    startAboutAutoplay();
  }, getAboutAutoplayDelay());
};

const restartAboutAutoplay = () => {
  stopAboutAutoplay();
  startAboutAutoplay();
};

const openAbout = () => {
  if (!aboutCarousel) {
    return;
  }
  document.body.classList.add('about-open');
  aboutCarousel.setAttribute('aria-hidden', 'false');
  setAboutSlide(activeAboutSlide);
  updateAboutPauseButton();
  startAboutAutoplay();
  aboutClose?.focus({ preventScroll: true });
};

const closeAbout = () => {
  if (!aboutCarousel) {
    return;
  }
  document.body.classList.remove('about-open');
  aboutCarousel.setAttribute('aria-hidden', 'true');
  stopAboutAutoplay();
  aboutTrigger?.focus({ preventScroll: true });
};

const moveAboutSlide = (direction) => {
  setAboutSlide(activeAboutSlide + direction);
  restartAboutAutoplay();
};

const toggleAboutPause = () => {
  aboutIsPaused = !aboutIsPaused;
  updateAboutPauseButton();
  if (aboutIsPaused) {
    stopAboutAutoplay();
  } else {
    startAboutAutoplay();
  }
};

if (!aboutPause && aboutClose) {
  aboutPause = document.createElement('button');
  aboutPause.className = 'about-carousel__back';
  aboutPause.id = 'about-pause';
  aboutPause.type = 'button';
  aboutPause.setAttribute('aria-pressed', 'false');
  aboutClose.insertAdjacentElement('beforebegin', aboutPause);
  updateAboutPauseButton();
}

aboutTrigger?.addEventListener('click', openAbout);
aboutClose?.addEventListener('click', closeAbout);
aboutCarousel?.addEventListener('click', (event) => {
  if (
    document.body.classList.contains('about-open') &&
    !aboutFrame?.contains(event.target)
  ) {
    closeAbout();
  }
});
aboutPrev?.addEventListener('click', () => moveAboutSlide(-1));
aboutNext?.addEventListener('click', () => moveAboutSlide(1));
aboutPause?.addEventListener('click', toggleAboutPause);
aboutDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    setAboutSlide(index);
    restartAboutAutoplay();
  });
});

if (typeof prefersReducedMotion.addEventListener === 'function') {
  prefersReducedMotion.addEventListener('change', restartAboutAutoplay);
} else if (typeof prefersReducedMotion.addListener === 'function') {
  prefersReducedMotion.addListener(restartAboutAutoplay);
}

document.addEventListener('keydown', (event) => {
  if (!document.body.classList.contains('about-open')) {
    return;
  }
  if (event.key === 'Escape') {
    closeAbout();
  } else if (event.key === 'ArrowLeft') {
    moveAboutSlide(-1);
  } else if (event.key === 'ArrowRight') {
    moveAboutSlide(1);
  }
});

const injectIndustryStyles = () => {
  if (document.querySelector('#project-industry-styles')) {
    return;
  }

  const styles = document.createElement('style');
  styles.id = 'project-industry-styles';
  styles.textContent = `
    .project-status,
    .project-partner-search {
      padding: 1rem 1.05rem 0.95rem;
      background: rgba(7, 10, 9, 0.52);
      box-shadow: inset 0 1px 0 rgba(238, 224, 194, 0.08);
    }

    .project-status {
      margin: 1.3rem 0 1.15rem;
      border: 1px solid rgba(238, 224, 194, 0.3);
      background:
        linear-gradient(135deg, rgba(226, 210, 168, 0.12), transparent 48%),
        rgba(7, 10, 9, 0.5);
    }

    .project-partner-search {
      margin: 0 0 1.15rem;
      border: 1px solid rgba(212, 178, 113, 0.34);
      background:
        linear-gradient(145deg, rgba(105, 77, 35, 0.16), transparent 54%),
        rgba(8, 11, 10, 0.58);
      box-shadow:
        inset 3px 0 0 rgba(212, 178, 113, 0.46),
        inset 0 1px 0 rgba(238, 224, 194, 0.06);
    }

    .project-status__eyebrow,
    .project-partner-search__eyebrow {
      margin: 0 0 0.35rem;
      font-family: 'Special Elite', 'Courier Prime', 'Courier New', Courier, monospace;
      font-size: clamp(0.64rem, 1.15vw, 0.76rem);
      letter-spacing: 0.12em;
      text-transform: uppercase;
      opacity: 0.88;
    }

    .project-status__eyebrow { color: #dcc99d; }
    .project-partner-search__eyebrow { color: #d8b879; }

    .project-status h3,
    .project-partner-search h3 {
      margin: 0 0 0.65rem;
      color: #eee0c2;
      font-family: 'Special Elite', 'Courier Prime', 'Courier New', Courier, monospace;
      font-size: clamp(1rem, 2vw, 1.3rem);
      font-weight: 400;
      letter-spacing: 0.05em;
      line-height: 1.2;
      text-transform: uppercase;
    }

    .project-status__list,
    .project-partner-search__list {
      display: grid;
      gap: 0.35rem;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .project-status__list li,
    .project-partner-search__list li {
      position: relative;
      margin: 0;
      padding-left: 1rem;
      color: rgba(238, 228, 207, 0.9);
      font-size: clamp(0.82rem, 1.5vw, 0.96rem);
      line-height: 1.4;
    }

    .project-status__list li::before {
      content: '—';
      position: absolute;
      left: 0;
      color: #dcc99d;
      opacity: 0.72;
    }

    .project-partner-search__list li::before {
      content: '›';
      position: absolute;
      left: 0.08rem;
      color: #d8b879;
      font-weight: 700;
    }

    .project-status__list strong {
      color: #eee0c2;
      font-weight: 700;
    }

    .project-partner-search__intro {
      margin: 0 0 0.7rem;
      color: rgba(238, 228, 207, 0.9);
      font-size: clamp(0.82rem, 1.5vw, 0.96rem);
      line-height: 1.42;
    }
  `;
  document.head.appendChild(styles);
};

const addProjectStatusBlock = () => {
  const projectCard = document.querySelector('.about-card--project');
  if (!projectCard || projectCard.querySelector('.project-status')) {
    return;
  }

  const statusBlock = document.createElement('section');
  statusBlock.className = 'project-status';
  statusBlock.setAttribute('aria-labelledby', 'project-status-title');
  statusBlock.innerHTML = `
    <p class="project-status__eyebrow">Estado del proyecto</p>
    <h3 id="project-status-title">Desarrollo activo</h3>
    <ul class="project-status__list">
      <li><strong>Formato:</strong> serie de ficción de 6 × 20–25 minutos.</li>
      <li><strong>Escritura:</strong> guion del episodio piloto disponible.</li>
      <li><strong>Desarrollo:</strong> dossier, biblia y arco de temporada disponibles.</li>
      <li><strong>Material audiovisual:</strong> teaser realizado.</li>
      <li><strong>Etapa:</strong> proyecto en desarrollo.</li>
    </ul>
  `;
  projectCard.insertBefore(statusBlock, projectCard.lastElementChild);
};

const addProjectPartnerSearchBlock = () => {
  const projectCard = document.querySelector('.about-card--project');
  if (!projectCard || projectCard.querySelector('.project-partner-search')) {
    return;
  }

  const searchBlock = document.createElement('section');
  searchBlock.className = 'project-partner-search';
  searchBlock.setAttribute('aria-labelledby', 'project-partner-search-title');
  searchBlock.innerHTML = `
    <p class="project-partner-search__eyebrow">Qué estamos buscando</p>
    <h3 id="project-partner-search-title">Nuevas alianzas para la próxima etapa</h3>
    <p class="project-partner-search__intro">
      El proyecto está abierto a conversaciones con socios que puedan fortalecer su desarrollo, financiación, producción y circulación.
    </p>
    <ul class="project-partner-search__list">
      <li>Coproductores nacionales e internacionales.</li>
      <li>Socios de desarrollo y producción.</li>
      <li>Financiamiento, fondos y alianzas estratégicas.</li>
      <li>Vínculos internacionales para ampliar el recorrido del proyecto.</li>
      <li>Distribución y ventas, cuando corresponda a la etapa.</li>
    </ul>
  `;

  const statusBlock = projectCard.querySelector('.project-status');
  if (statusBlock) {
    statusBlock.insertAdjacentElement('afterend', searchBlock);
  } else {
    projectCard.insertBefore(searchBlock, projectCard.lastElementChild);
  }
};

const condenseTeamBios = () => {
  const bios = [
    {
      index: 1,
      title: 'Maite Piñeyrúa Segura',
      paragraphs: [
        'Cocreadora y coguionista. Trabaja en la construcción del tono, los personajes y la relación entre intimidad, absurdo y conflicto político.',
        'Dirigió el documental Tumbero, reconocido y seleccionado en festivales nacionales. Fue seleccionada por ACAU para participar del Campus Málaga Talent 2025 con este proyecto.',
      ],
    },
    {
      index: 2,
      title: 'Guillermo Barbeito Rodríguez',
      paragraphs: [
        'Cocreador y coguionista. Participa en la arquitectura narrativa, el desarrollo del universo y la articulación entre comedia negra y thriller político.',
        'Su trabajo en la serie se concentra en una ficción rioplatense donde el humor surge de la precariedad cotidiana y de las consecuencias crecientes de cada decisión.',
      ],
    },
    {
      index: 3,
      title: 'Ignacio “Nacho” Jaunsolo / SKA Films',
      paragraphs: [
        'Coproductor ejecutivo, fundador y director ejecutivo de SKA Films. Su trayectoria abarca producción, dirección, fotografía y desarrollo de contenidos audiovisuales.',
        'En la serie aporta estructura de producción, experiencia industrial y estrategia para su desarrollo y circulación.',
      ],
    },
    {
      index: 4,
      title: 'Malena Benavides',
      paragraphs: [
        'Productora ejecutiva. Coordina el desarrollo, la organización de producción y el vínculo con aliados, instituciones y espacios de circulación.',
        'También produjo el documental Tumbero. En este proyecto ordena prioridades y sostiene las condiciones concretas para avanzar hacia la producción.',
      ],
    },
  ];

  bios.forEach(({ index, title, paragraphs }) => {
    const slide = aboutSlides[index];
    if (!slide) {
      return;
    }

    slide.innerHTML = `
      <h2>${title}</h2>
      ${paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join('')}
    `;
  });
};

const createMailto = (subject, body) =>
  `mailto:malenabh1@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

const upgradeProfessionalNavigation = () => {
  const contactNav = document.querySelector('.contact-links');
  const materialsLink = contactNav?.querySelector('a[href^="mailto:"]');

  if (materialsLink) {
    materialsLink.classList.add('contact-link--materials');
    materialsLink.href = createMailto(
      'Solicitud de dossier y materiales — Nadie te dijo que iba a ser así',
      'Hola,\n\nVi el proyecto Nadie te dijo que iba a ser así y quisiera solicitar el dossier y los materiales disponibles.\n\nNombre:\nEmpresa / institución:\n\nSaludos,'
    );
    materialsLink.querySelector('img')?.setAttribute(
      'alt',
      'Solicitar dossier y materiales del proyecto'
    );
    const materialsLabel = materialsLink.querySelector('span');
    if (materialsLabel) {
      materialsLabel.textContent = 'Solicitar dossier y materiales';
    }
  }

  if (contactNav && materialsLink && !contactNav.querySelector('.contact-link--coproduction')) {
    const coproductionLink = document.createElement('a');
    coproductionLink.className = 'contact-link contact-link--coproduction';
    coproductionLink.href = createMailto(
      'Conversación sobre coproducción — Nadie te dijo que iba a ser así',
      'Hola,\n\nConocí el proyecto Nadie te dijo que iba a ser así y me interesa conversar sobre una posible coproducción o alianza para su desarrollo.\n\nNombre:\nEmpresa / institución:\nPaís:\n\nSaludos,'
    );
    coproductionLink.innerHTML = `
      <img src="assets/logos/email-icon.png" alt="Conversar sobre coproducción" />
      <span>Conversar sobre coproducción</span>
    `;
    materialsLink.insertAdjacentElement('afterend', coproductionLink);
  }

  if (aboutTrigger) {
    aboutTrigger.querySelector('img')?.setAttribute('alt', 'Proyecto y equipo');
    const aboutLabel = aboutTrigger.querySelector('span');
    if (aboutLabel) {
      aboutLabel.textContent = 'Proyecto y equipo';
    }
  }

  const aboutEyebrow = document.querySelector('.about-carousel__eyebrow');
  if (aboutEyebrow) {
    aboutEyebrow.textContent = 'Expediente / Proyecto y equipo';
  }

  document
    .querySelector('.about-carousel__controls')
    ?.setAttribute('aria-label', 'Controles del carrusel Proyecto y equipo');
};

injectIndustryStyles();
addProjectStatusBlock();
addProjectPartnerSearchBlock();
condenseTeamBios();
upgradeProfessionalNavigation();
setAboutSlide(0);
updateAboutPauseButton();
runPlates();
