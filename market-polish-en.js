// English landing overrides. Runs after script.js and market-polish.js.
// Deploy sync: keeps the polished skip control aligned with the Spanish landing.
try {
  if (plateSequence?.[1]) {
    plateSequence[1].lines = [
      'Created by',
      {
        text: 'Maite Piñeyrúa Segura & Guillermo Barbeito',
        parts: [
          { text: 'Maite Piñeyrúa Segura', className: plateNameClass },
          { text: ' & ' },
          { text: 'Guillermo Barbeito', className: plateNameClass },
        ],
      },
    ];
  }

  if (plateSequence?.[2]) {
    plateSequence[2].lines = [
      'SUPPORT · Cultural Incentive Fund (FIC)',
      'LAB · DETOUR Series Lab',
      'AWARD · DETOUR Teaser Award',
      'SELECTION · Campus Málaga Talent 2025',
    ];
  }

  if (plateSequence?.[3]) {
    plateSequence[3].lines = [
      {
        text: 'Coproduction with SKA Films',
        parts: [
          { text: 'Coproduction with ' },
          { text: 'SKA Films', className: plateNameClass },
        ],
      },
    ];
  }

  if (skipIntroButton) {
    skipIntroButton.setAttribute('aria-label', 'Skip presentation and show the full cover');
    skipIntroButton.innerHTML = '<span>Skip presentation</span><span aria-hidden="true">→</span>';
  }
} catch (error) {
  console.warn('English landing: optional translation override failed.', error);
}
