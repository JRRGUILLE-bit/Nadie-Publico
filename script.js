const video = document.querySelector('.background-video');
const plates = document.querySelector('#plates');
const splash = document.querySelector('.splash');
const aboutTrigger = document.querySelector('#about-trigger');
const aboutCarousel = document.querySelector('#about-carousel');
const aboutFrame = aboutCarousel?.querySelector('.about-carousel__frame');
const aboutClose = document.querySelector('#about-close');
const aboutPrev = document.querySelector('#about-prev');
const aboutNext = document.querySelector('#about-next');
const aboutSlides = Array.from(document.querySelectorAll('[data-about-slide]'));
const aboutDots = Array.from(document.querySelectorAll('[data-about-dot]'));
const aboutCurrent = document.querySelector('.about-carousel__current');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const plateNameClass = 'plate__name';

let introSkipped = false;
let skipIntroButton;
let activeAboutSlide = 0;

const aboutFocusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

const timing = {
  initialPause: 650,
  betweenPlatesPause: 102,
  plateRevealPause: 100,
  typingDelay: 39,
  linePause: 136,
  holdAfterTyping: 153,
  contactRevealPause: 300,
};

if (video) {
  video.playbackRate = 1;
  video.addEventListener('canplay', () => document.body.classList.add('video-ready'));
  video.play().catch(() => document.body.classList.add('video-blocked'));
}

document.body.classList.add('contacts-visible');

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
    lines: [
      'APOYO · Fondo de Incentivo Cultural',
      'LABORATORIO · DETOUR Series Lab',
      'PREMIO · Premio Teaser DETOUR',
      'SELECCIÓN · Campus Málaga Talent 2025',
    ],
  },
  {
    className: 'plate--coproduction plate--secondary',
    lines: [
      {
        text: 'Una coproducción con SKA Films',
        parts: [
          { text: 'Una coproducción con ' },
          { text: 'SKA Films', className: plateNameClass },
        ],
      },
    ],
  },
];

const wait = (duration) => new Promise((resolve) => window.setTimeout(resolve, duration));

const normalizeLine = (lineContent) =>
  typeof lineContent === 'string' ? { text: lineContent } : lineContent;

const createLine = (lineContent, index) => {
  const normalized = normalizeLine(lineContent);
  const line = document.createElement('p');
  line.className = `plate__line plate__line--${index + 1}`;
  line.dataset.fullText = normalized.text;
  return line;
};

const appendCompleteLineContent = (line, lineContent) => {
  const normalized = normalizeLine(lineContent);
  const target = normalized.href ? document.createElement('a') : line;

  if (normalized.href) {
    target.href = normalized.href;
    target.target = '_blank';
    target.rel = 'noopener noreferrer';
    line.appendChild(target);
  }

  if (normalized.parts?.length) {
    normalized.parts.forEach((part) => {
      if (part.className) {
        const span = document.createElement('span');
        span.className = part.className;
        span.textContent = part.text;
        target.appendChild(span);
      } else {
        target.appendChild(document.createTextNode(part.text));
      }
    });
    return;
  }

  target.textContent = normalized.text;
};

const renderCompletedPlates = () => {
  if (!plates) {
    return;
  }

  plates.replaceChildren();

  plateSequence.forEach((plate) => {
    const plateElement = document.createElement('div');
    plateElement.className = `plate ${plate.className} plate--visible plate--complete`;
    plateElement.setAttribute('aria-hidden', 'false');

    plate.lines.forEach((lineContent, index) => {
      const line = createLine(lineContent, index);
      line.classList.add('plate__line--typed');
      appendCompleteLineContent(line, lineContent);
      plateElement.appendChild(line);
    });

    plates.appendChild(plateElement);
  });
};

const finishIntro = ({ skipped = false } = {}) => {
  document.body.classList.add('contacts-visible', 'intro-complete');
  document.body.classList.toggle('intro-skipped', skipped);
  skipIntroButton?.remove();
  skipIntroButton = undefined;
};

const skipPresentation = () => {
  if (introSkipped || document.body.classList.contains('intro-complete')) {
    return;
  }

  introSkipped = true;
  renderCompletedPlates();
  finishIntro({ skipped: true });
  document.querySelector('.contact-link--materials')?.focus({ preventScroll: true });
};

const addSkipIntroControl = () => {
  if (!splash || document.querySelector('#skip-intro')) {
    return;
  }

  skipIntroButton = document.createElement('button');
  skipIntroButton.id = 'skip-intro';
  skipIntroButton.className = 'skip-intro-button';
  skipIntroButton.type = 'button';
  skipIntroButton.setAttribute('aria-label', 'Saltar presentación y mostrar la portada completa');
  skipIntroButton.innerHTML = '<span>Saltar presentación</span><span aria-hidden="true">››</span>';
  skipIntroButton.addEventListener('click', skipPresentation);
  splash.appendChild(skipIntroButton);
};

const typeCharacters = async (target, text) => {
  for (const character of text) {
    if (introSkipped) {
      return false;
    }
    target.textContent += character;
    await wait(timing.typingDelay);
  }
  return true;
};

const typeLine = async (line, lineContent) => {
  const normalized = normalizeLine(lineContent);
  const target = normalized.href ? document.createElement('a') : line;

  if (normalized.href) {
    target.href = normalized.href;
    target.target = '_blank';
    target.rel = 'noopener noreferrer';
    line.appendChild(target);
  }

  if (normalized.parts?.length) {
    for (const part of normalized.parts) {
      if (introSkipped) {
        return false;
      }

      const partTarget = part.className
        ? document.createElement('span')
        : document.createTextNode('');

      if (part.className) {
        partTarget.className = part.className;
      }

      target.appendChild(partTarget);
      const completed = await typeCharacters(partTarget, part.text);
      if (!completed) {
        return false;
      }
    }
    return true;
  }

  return typeCharacters(target, normalized.text);
};

const showPersistentPlate = async (plate) => {
  if (!plates || introSkipped) {
    return false;
  }

  const plateElement = document.createElement('div');
  plateElement.className = `plate ${plate.className}`;
  plateElement.setAttribute('aria-hidden', 'false');

  const lines = plate.lines.map(createLine);
  lines.forEach((line) => plateElement.appendChild(line));
  plates.appendChild(plateElement);

  await wait(timing.plateRevealPause);
  if (introSkipped) {
    return false;
  }
  plateElement.classList.add('plate--visible');

  for (const [index, line] of lines.entries()) {
    if (introSkipped) {
      return false;
    }

    line.classList.add('plate__line--typing');
    const completed = await typeLine(line, plate.lines[index]);
    if (!completed || introSkipped) {
      return false;
    }

    line.classList.remove('plate__line--typing');
    line.classList.add('plate__line--typed');

    if (index < lines.length - 1) {
      await wait(timing.linePause);
    }
  }

  plateElement.classList.add('plate--complete');
  await wait(timing.holdAfterTyping);
  return !introSkipped;
};

const runPlates = async () => {
  if (!plates) {
    return;
  }

  await wait(timing.initialPause);
  if (introSkipped) {
    return;
  }

  for (const [index, plate] of plateSequence.entries()) {
    const completed = await showPersistentPlate(plate);
    if (!completed || introSkipped) {
      return;
    }

    if (index < plateSequence.length - 1) {
      await wait(timing.betweenPlatesPause);
    }
  }

  await wait(timing.contactRevealPause);
  if (!introSkipped) {
    finishIntro();
  }
};

const getAboutFocusableElements = () =>
  Array.from(aboutCarousel?.querySelectorAll(aboutFocusableSelector) ?? []).filter((element) => {
    if (element.closest('[inert]') || element.getAttribute('aria-hidden') === 'true') {
      return false;
    }

    const styles = window.getComputedStyle(element);
    return styles.display !== 'none' && styles.visibility !== 'hidden';
  });

const focusActiveAboutHeading = () => {
  aboutSlides[activeAboutSlide]?.querySelector('h2')?.focus({ preventScroll: true });
};

const setAboutSlide = (index, { focusHeading = false } = {}) => {
  if (!aboutSlides.length) {
    return;
  }

  const previousSlide = aboutSlides[activeAboutSlide];
  const focusWasInPreviousSlide = previousSlide?.contains(document.activeElement) ?? false;
  activeAboutSlide = (index + aboutSlides.length) % aboutSlides.length;

  aboutSlides.forEach((slide, slideIndex) => {
    const isActive = slideIndex === activeAboutSlide;
    slide.classList.toggle('is-active', isActive);
    slide.setAttribute('aria-hidden', String(!isActive));
    slide.toggleAttribute('inert', !isActive);
  });

  aboutDots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === activeAboutSlide;
    dot.classList.toggle('is-active', isActive);
    dot.setAttribute('aria-current', isActive ? 'true' : 'false');
  });

  if (aboutCurrent) {
    const label = aboutDots[activeAboutSlide]?.textContent.trim() ?? '';
    aboutCurrent.value = `${String(activeAboutSlide + 1).padStart(2, '0')} / ${String(aboutSlides.length).padStart(2, '0')} — ${label}`;
  }

  if (focusHeading || (focusWasInPreviousSlide && previousSlide !== aboutSlides[activeAboutSlide])) {
    focusActiveAboutHeading();
  }
};

const openAbout = () => {
  if (!aboutCarousel) {
    return;
  }

  document.body.classList.add('about-open');
  aboutCarousel.setAttribute('aria-hidden', 'false');
  setAboutSlide(activeAboutSlide);
  focusActiveAboutHeading();
};

const closeAbout = () => {
  if (!aboutCarousel) {
    return;
  }

  document.body.classList.remove('about-open');
  aboutCarousel.setAttribute('aria-hidden', 'true');
  aboutTrigger?.focus({ preventScroll: true });
};

const moveAboutSlide = (direction, options) => {
  setAboutSlide(activeAboutSlide + direction, options);
};

aboutTrigger?.addEventListener('click', openAbout);
aboutClose?.addEventListener('click', closeAbout);
aboutPrev?.addEventListener('click', () => moveAboutSlide(-1));
aboutNext?.addEventListener('click', () => moveAboutSlide(1));

aboutCarousel?.addEventListener('click', (event) => {
  if (document.body.classList.contains('about-open') && !aboutFrame?.contains(event.target)) {
    closeAbout();
  }
});

aboutDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    setAboutSlide(index);
  });
});

document.addEventListener('keydown', (event) => {
  if (!document.body.classList.contains('about-open')) {
    return;
  }

  if (event.key === 'Escape') {
    closeAbout();
  } else if (event.key === 'ArrowLeft') {
    event.preventDefault();
    moveAboutSlide(-1, { focusHeading: true });
  } else if (event.key === 'ArrowRight') {
    event.preventDefault();
    moveAboutSlide(1, { focusHeading: true });
  } else if (event.key === 'Tab') {
    const focusableElements = getAboutFocusableElements();
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements.at(-1);
    const focusIsOnTabStop = focusableElements.includes(document.activeElement);

    if (!firstFocusable) {
      event.preventDefault();
      focusActiveAboutHeading();
    } else if (!focusIsOnTabStop) {
      event.preventDefault();
      (event.shiftKey ? lastFocusable : firstFocusable).focus();
    } else if (event.shiftKey && (document.activeElement === firstFocusable || !aboutCarousel.contains(document.activeElement))) {
      event.preventDefault();
      lastFocusable.focus();
    } else if (!event.shiftKey && document.activeElement === lastFocusable) {
      event.preventDefault();
      firstFocusable.focus();
    }
  }
});

setAboutSlide(0);

if (prefersReducedMotion.matches) {
  renderCompletedPlates();
  finishIntro();
} else {
  addSkipIntroControl();
  runPlates();
}

const buildGmailComposeUrl = (mailtoHref) => {
  try {
    const mailtoUrl = new URL(mailtoHref);
    const parameters = new URLSearchParams({
      view: 'cm',
      fs: '1',
      to: decodeURIComponent(mailtoUrl.pathname),
      su: mailtoUrl.searchParams.get('subject') ?? '',
      body: mailtoUrl.searchParams.get('body') ?? '',
    });

    return `https://mail.google.com/mail/?${parameters.toString()}`;
  } catch {
    return null;
  }
};

const professionalMailLinks = Array.from(
  document.querySelectorAll('a[href^="mailto:malenabh1@gmail.com"]')
);

professionalMailLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const mailtoHref = link.getAttribute('href');
    if (!mailtoHref) {
      return;
    }

    const gmailUrl = buildGmailComposeUrl(mailtoHref);
    if (!gmailUrl) {
      return;
    }

    event.preventDefault();

    const useGmail = window.confirm(
      '¿Cómo querés enviar el correo?\n\nAceptar: abrir Gmail en el navegador.\nCancelar: usar tu aplicación de correo predeterminada.'
    );

    if (useGmail) {
      window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = mailtoHref;
    }
  });
});
