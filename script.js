const video = document.querySelector('.background-video');
const plates = document.querySelector('#plates');
const activePlate = document.querySelector('#active-plate');

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
  holdAfterTyping: 2600,
  fadeOut: 900,
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

const showPlate = async (plate) => {
  activePlate.className = `plate ${plate.className}`;
  activePlate.textContent = '';
  activePlate.setAttribute('aria-hidden', 'false');

  const lines = plate.lines.map(createLine);
  lines.forEach((line) => activePlate.appendChild(line));

  plates.classList.add('plates--visible');
  activePlate.classList.add('plate--visible');

  await wait(180);

  for (const [index, line] of lines.entries()) {
    line.classList.add('plate__line--typing');
    await typeLine(line, plate.lines[index]);
    line.classList.remove('plate__line--typing');
    line.classList.add('plate__line--typed');

    if (index < lines.length - 1) {
      await wait(timing.linePause);
    }
  }

  activePlate.classList.add('plate--complete');
  await wait(timing.holdAfterTyping);
  activePlate.classList.remove('plate--visible', 'plate--complete');
  activePlate.classList.add('plate--leaving');
  await wait(timing.fadeOut);
  activePlate.className = 'plate';
  activePlate.textContent = '';
  activePlate.setAttribute('aria-hidden', 'true');
  plates.classList.remove('plates--visible');
};

const runPlates = async () => {
  if (!plates || !activePlate) {
    return;
  }

  await wait(timing.initialPause);

  for (const [index, plate] of plateSequence.entries()) {
    await showPlate(plate);

    if (index < plateSequence.length - 1) {
      await wait(timing.betweenPlatesPause);
    }
  }
};

runPlates();
