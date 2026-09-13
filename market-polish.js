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

// SKA Films: el archivo recibido del productor está guardado con extensión .png,
// pero su contenido real es JPEG y por lo tanto no puede transportar transparencia.
// Para conservar exactamente el logo recibido sin sustituirlo por una versión anterior,
// limpiamos únicamente el fondo claro conectado visualmente con las esquinas.
(() => {
  const skaLogo = document.querySelector('.about-card--ska .ska-brand > img');
  if (!skaLogo) return;

  const logoPresentation = document.createElement('style');
  logoPresentation.dataset.skaLogoPolish = 'true';
  logoPresentation.textContent = `
    .about-card--ska .ska-brand > img {
      width: min(100%, clamp(10.5rem, 18vw, 14.5rem));
      height: auto;
      object-fit: contain;
      object-position: center;
      margin-top: clamp(0.6rem, 1.4vh, 1rem);
      opacity: 1;
      transform: translateZ(0);
      transition: opacity 180ms ease, transform 220ms ease, filter 220ms ease;
    }
    .about-card--ska .ska-brand > img[data-logo-processing='true'] {
      opacity: 0;
    }
    .about-card--ska .ska-brand > img[data-logo-cleaned='true'] {
      padding: 0;
      border: 0;
      background: transparent;
      mix-blend-mode: normal;
      filter:
        drop-shadow(0 7px 7px rgba(0, 0, 0, 0.44))
        drop-shadow(0 0 16px rgba(238, 221, 181, 0.12));
    }
    .about-card--ska .ska-brand > img[data-logo-cleaned='false'] {
      width: min(100%, clamp(9.5rem, 16vw, 12.5rem));
      padding: clamp(0.6rem, 1vw, 0.85rem);
      border: 1px solid rgba(236, 220, 181, 0.34);
      border-radius: 2px;
      background: rgba(237, 226, 200, 0.96);
      box-shadow: 7px 8px 0 rgba(169, 28, 112, 0.16), 0 14px 34px rgba(0, 0, 0, 0.3);
      transform: rotate(-0.45deg);
      filter: saturate(0.94) contrast(1.02);
    }
    @media (max-width: 720px) {
      .about-card--ska .ska-brand > img {
        width: min(42vw, 11rem);
        margin-top: 0.45rem;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .about-card--ska .ska-brand > img { transition: none; }
    }
  `;
  document.head.appendChild(logoPresentation);

  const clampChannel = (value) => Math.max(0, Math.min(255, Math.round(value)));
  const smoothstep = (edge0, edge1, value) => {
    const t = Math.max(0, Math.min(1, (value - edge0) / (edge1 - edge0)));
    return t * t * (3 - 2 * t);
  };

  const cleanLogoBackground = () => {
    if (!skaLogo.naturalWidth || !skaLogo.naturalHeight) return;
    skaLogo.dataset.logoProcessing = 'true';

    try {
      const canvas = document.createElement('canvas');
      canvas.width = skaLogo.naturalWidth;
      canvas.height = skaLogo.naturalHeight;
      const context = canvas.getContext('2d', { willReadFrequently: true });
      if (!context) throw new Error('Canvas 2D no disponible');

      context.drawImage(skaLogo, 0, 0);
      const frame = context.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = frame.data;
      const sampleRadius = Math.max(2, Math.round(Math.min(canvas.width, canvas.height) * 0.035));
      const corners = [
        [0, 0],
        [canvas.width - sampleRadius, 0],
        [0, canvas.height - sampleRadius],
        [canvas.width - sampleRadius, canvas.height - sampleRadius],
      ];

      let red = 0;
      let green = 0;
      let blue = 0;
      let samples = 0;
      const cornerMeans = [];

      corners.forEach(([startX, startY]) => {
        let cornerRed = 0;
        let cornerGreen = 0;
        let cornerBlue = 0;
        let cornerSamples = 0;

        for (let y = startY; y < Math.min(canvas.height, startY + sampleRadius); y += 1) {
          for (let x = startX; x < Math.min(canvas.width, startX + sampleRadius); x += 1) {
            const index = (y * canvas.width + x) * 4;
            cornerRed += pixels[index];
            cornerGreen += pixels[index + 1];
            cornerBlue += pixels[index + 2];
            cornerSamples += 1;
          }
        }

        const mean = [
          cornerRed / cornerSamples,
          cornerGreen / cornerSamples,
          cornerBlue / cornerSamples,
        ];
        cornerMeans.push(mean);
        red += cornerRed;
        green += cornerGreen;
        blue += cornerBlue;
        samples += cornerSamples;
      });

      const background = [red / samples, green / samples, blue / samples];
      const backgroundLuma = (background[0] * 0.2126) + (background[1] * 0.7152) + (background[2] * 0.0722);
      const cornerSpread = Math.max(...cornerMeans.map((corner) => Math.hypot(
        corner[0] - background[0],
        corner[1] - background[1],
        corner[2] - background[2]
      )));

      // Sólo actuamos cuando las cuatro esquinas describen un fondo claro y estable.
      // Si el archivo cambia en el futuro, el fallback editorial evita destruir el arte.
      if (backgroundLuma < 165 || cornerSpread > 38) {
        skaLogo.dataset.logoCleaned = 'false';
        return;
      }

      for (let index = 0; index < pixels.length; index += 4) {
        const distance = Math.hypot(
          pixels[index] - background[0],
          pixels[index + 1] - background[1],
          pixels[index + 2] - background[2]
        );
        const alpha = smoothstep(10, 68, distance);

        if (alpha <= 0.025) {
          pixels[index + 3] = 0;
          continue;
        }

        if (alpha < 0.985) {
          // Descontamina el halo JPEG suponiendo que el borde fue compuesto sobre el fondo detectado.
          pixels[index] = clampChannel((pixels[index] - ((1 - alpha) * background[0])) / alpha);
          pixels[index + 1] = clampChannel((pixels[index + 1] - ((1 - alpha) * background[1])) / alpha);
          pixels[index + 2] = clampChannel((pixels[index + 2] - ((1 - alpha) * background[2])) / alpha);
          pixels[index + 3] = clampChannel(255 * alpha);
        }
      }

      context.putImageData(frame, 0, 0);
      const transparentLogo = canvas.toDataURL('image/png');
      skaLogo.addEventListener('load', () => {
        skaLogo.dataset.logoCleaned = 'true';
        delete skaLogo.dataset.logoProcessing;
      }, { once: true });
      skaLogo.src = transparentLogo;
    } catch (error) {
      delete skaLogo.dataset.logoProcessing;
      skaLogo.dataset.logoCleaned = 'false';
      console.warn('SKA logo: no se pudo limpiar el fondo; se usa el tratamiento editorial de respaldo.', error);
    }
  };

  if (skaLogo.complete) {
    cleanLogoBackground();
  } else {
    skaLogo.addEventListener('load', cleanLogoBackground, { once: true });
  }
})();