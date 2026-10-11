/*
 * Language routing for the static GitHub Pages site.
 * First visit: use the first supported browser language (English or Spanish),
 * defaulting to Spanish. A manual language choice is remembered locally.
 *
 * This does not collect or infer a visitor's physical location.
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

  const currentLanguage = /\/english\.html$/i.test(window.location.pathname) ? 'en' : 'es';
  const pageFor = (language) => new URL(language === 'en' ? 'english.html' : 'index.html', window.location.href);
  const savePreference = (language) => {
    try {
      window.localStorage.setItem(preferenceKey, language);
    } catch (_error) {
      // Private browsing or storage restrictions must not prevent language routing.
    }
  };

  const url = new URL(window.location.href);
  const explicitlyRequested = supportedLanguage(url.searchParams.get('lang'));

  // The selector appends ?lang=en or ?lang=es, making the click authoritative.
  if (explicitlyRequested) {
    savePreference(explicitlyRequested);

    if (explicitlyRequested !== currentLanguage) {
      const destination = pageFor(explicitlyRequested);
      destination.searchParams.set('lang', explicitlyRequested);
      window.location.replace(destination.href);
      return;
    }

    // Keep the choice in localStorage but remove the implementation parameter.
    url.searchParams.delete('lang');
    window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
    return;
  }

  let savedPreference = null;
  try {
    savedPreference = supportedLanguage(window.localStorage.getItem(preferenceKey));
  } catch (_error) {
    // Continue using browser language when storage is unavailable.
  }

  // A previously chosen language takes priority over the browser's language.
  if (savedPreference) {
    if (savedPreference !== currentLanguage) {
      window.location.replace(pageFor(savedPreference).href);
    }
    return;
  }

  // Auto-detect only on the site entry point. A direct visit to english.html
  // is respected instead of being bounced away against the visitor's intent.
  const isEntryPoint =
    window.location.pathname.endsWith('/') ||
    /\/index\.html$/i.test(window.location.pathname);

  if (!isEntryPoint) return;

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

  if (preferredLanguage !== currentLanguage) {
    window.location.replace(pageFor(preferredLanguage).href);
  }
})();
