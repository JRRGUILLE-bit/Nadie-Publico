const video = document.querySelector('.background-video');
const plates = document.querySelector('#plates');
const aboutTrigger = document.querySelector('#about-trigger');
const aboutModal = document.querySelector('#about-modal');
const aboutClose = document.querySelector('#about-close');

if (video) {
  video.playbackRate = 0.8;
  video.addEventListener('canplay', () => {
    document.body.classList.add('video-ready');
  });

  video.play().catch(() => {
    document.body.classList.add('video-blocked');
  });
}

const plateSequence = [
  {
    className: 'plate--title',
    lines: ['Nadie te dijo', 'que iba a ser así.'],
  },
  {
    className: 'plate--credits',
    lines: ['Creado por', 'Maite Piñeyrúa Segura y Guillermo Barbeito'],
  },
  {
    className: 'plate--coproduction',
    lines: ['Una coproducción de SKA Films'],
  },
];

const timing = {
  initialPause: 1800,
  betweenPlatesPause: 1900,
  typingDelay: 82,
  linePause: 360,
  holdAfterTyping: 1200,
  contactRevealPause: 900,
};

const wait = (duration) => new Promise((resolve) => setTimeout(resolve, duration));

const createLine = (text, index) => {
  const line = document.createElement('p');
  line.className = `plate__line plate__line--${index + 1}`;
  line.dataset.fullText = text;
  return line;
};

const typeLine = async (line, text) => {
  for (const character of text) {
    line.textContent += character;
    await wait(timing.typingDelay);
  }
};

const showPersistentPlate = async (plate) => {
  const plateElement = document.createElement('div');
  plateElement.className = `plate ${plate.className}`;
  plateElement.setAttribute('aria-hidden', 'false');

  const lines = plate.lines.map(createLine);
  lines.forEach((line) => plateElement.appendChild(line));
  plates.appendChild(plateElement);

  await wait(180);
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

const openAbout = () => {
  if (!aboutModal) {
    return;
  }

  document.body.classList.add('about-open');
  aboutModal.setAttribute('aria-hidden', 'false');
  aboutClose?.focus({ preventScroll: true });
};

const closeAbout = () => {
  if (!aboutModal) {
    return;
  }

  document.body.classList.remove('about-open');
  aboutModal.setAttribute('aria-hidden', 'true');
  aboutTrigger?.focus({ preventScroll: true });
};

aboutTrigger?.addEventListener('click', openAbout);
aboutClose?.addEventListener('click', closeAbout);

aboutModal?.addEventListener('click', (event) => {
  if (event.target === aboutModal) {
    closeAbout();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && document.body.classList.contains('about-open')) {
    closeAbout();
  }
});

runPlates();
