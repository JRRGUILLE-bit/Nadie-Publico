/*
 * Language preference and routing for the static GitHub Pages site.
 * - Explicit ?lang=en / ?lang=es choices are saved and respected.
 * - Direct visits to a language-specific URL are never redirected away.
 * - A first-time English-browser visitor gets a suggestion instead of a forced redirect.
 * This script does not inspect or infer a visitor's physical location.
 */
(() => {
  'use strict';

  const preferenceKey = 'nadie-te-dijo-language-preference';

  const supportedLanguage = (value) => {
    const language = String(value || '').trim().toLowerCase();
    if (language === 'en' || language.startsWith('en-')) return 'en';
    if (language === 'es' || language.startsWith('es-')) return 'es';
    return null;
  };

  const languagePages = {
    'index.html': { es: 'index.html', en: 'english.html' },
    'english.html': { es: 'index.html', en: 'english.html' },
    'sobre.html': { es: 'sobre.html', en: 'dossier-en.html' },
    'dossier-en.html': { es: 'sobre.html', en: 'dossier-en.html' },
    'teaser.html': { es: 'teaser.html', en: 'teaser-en.html' },
    'teaser-en.html': { es: 'teaser.html', en: 'teaser-en.html' },
    'video-pitch.html': { es: 'video-pitch.html', en: 'video-pitch-en.html' },
    'video-pitch-en.html': { es: 'video-pitch.html', en: 'video-pitch-en.html' }
  };

  const url = new URL(window.location.href);
  const currentFile = url.pathname.split('/').filter(Boolean).pop() || 'index.html';
  const languagePair = languagePages[currentFile] || languagePages['index.html'];
  const currentLanguage = languagePair.en === currentFile ||
    ['english.html', 'dossier-en.html', 'teaser-en.html', 'video-pitch-en.html'].includes(currentFile)
    ? 'en'
    : 'es';

  const pageFor = (language) => new URL(languagePair[language], window.location.href);

  const savePreference = (language) => {
    try {
      window.localStorage.setItem(preferenceKey, language);
    } catch (_error) {
      // Storage may be unavailable in private browsing; navigation still works.
    }
  };

  const explicitlyRequested = supportedLanguage(url.searchParams.get('lang'));

  if (explicitlyRequested) {
    savePreference(explicitlyRequested);

    if (explicitlyRequested !== currentLanguage) {
      const destination = pageFor(explicitlyRequested);
      destination.searchParams.set('lang', explicitlyRequested);
      destination.hash = url.hash;
      window.location.replace(destination.href);
      return;
    }

    // Keep the explicit choice but remove the one-use routing parameter.
    url.searchParams.delete('lang');
    window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
    return;
  }

  const isLandingEntry =
    url.pathname.endsWith('/') || /\/index\.html$/i.test(url.pathname);

  if (!isLandingEntry) return;

  let savedPreference = null;
  try {
    savedPreference = supportedLanguage(window.localStorage.getItem(preferenceKey));
  } catch (_error) {
    // Continue without a saved preference.
  }

  // A previous explicit choice can be applied on the home entry point.
  // A first-visit browser-language guess never forces a redirect.
  if (savedPreference) {
    if (savedPreference !== currentLanguage) {
      window.location.replace(pageFor(savedPreference).href);
    }
    return;
  }

  const browserLanguages =
    Array.isArray(window.navigator.languages) && window.navigator.languages.length
      ? window.navigator.languages
      : [window.navigator.language];

  let preferredLanguage = 'es';
  for (const candidate of browserLanguages) {
    const language = supportedLanguage(candidate);
    if (language) {
      preferredLanguage = language;
      break;
    }
  }

  if (preferredLanguage === 'en' && currentLanguage === 'es') {
    document.addEventListener('DOMContentLoaded', () => {
      if (!document.body || document.querySelector('.language-suggestion')) return;

      const notice = document.createElement('aside');
      notice.className = 'language-suggestion';
      notice.setAttribute('role', 'region');
      notice.setAttribute('aria-label', 'Language suggestion');

      const message = document.createElement('p');
      message.lang = 'en';
      message.textContent = 'Your browser is set to English. Would you like to view this site in English?';

      const actions = document.createElement('div');
      actions.className = 'language-suggestion__actions';

      const accept = document.createElement('a');
      accept.href = 'english.html?lang=en';
      accept.textContent = 'View in English';

      const dismiss = document.createElement('button');
      dismiss.type = 'button';
      dismiss.textContent = 'Stay in Spanish';
      dismiss.addEventListener('click', () => {
        savePreference('es');
        notice.remove();
      });

      actions.append(accept, dismiss);
      notice.append(message, actions);
      document.body.appendChild(notice);
    });
  }
})();
