import { createContext, useContext, useState, useEffect } from 'react';

const A11yContext = createContext();

const A11Y_CLASSES = [
  'a11y-contrast-high',
  'a11y-contrast-dark',
  'a11y-contrast-invert',
  'a11y-sat-high',
  'a11y-sat-low',
  'a11y-sat-mono',
  'a11y-highlight-links',
  'a11y-big-cursor',
  'a11y-stop-animations',
  'a11y-uppercase',
];

export const A11yProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('userway-a11y-settings');
    return saved
      ? JSON.parse(saved)
      : {
          fontSizeLevel: 0,
          lineHeight: 1.5,
          letterSpacing: 0,
          textAlign: 'left',
          uppercase: false,
          contrast: 'normal',
          saturation: 'normal',
          highlightLinks: false,
          bigCursor: false,
          stopAnimations: false,
        };
  });

  const toggle = (key) => setSettings((p) => ({ ...p, [key]: !p[key] }));
  const setVal = (key, val) => setSettings((p) => ({ ...p, [key]: val }));

  useEffect(() => {
    localStorage.setItem('userway-a11y-settings', JSON.stringify(settings));
    const body = document.body;
    const root = document.querySelector('.a11y-root');
    const varTarget = document.documentElement;

    if (!root) return;
    A11Y_CLASSES.forEach((cls) => root.classList.remove(cls));

    if (settings.contrast !== 'normal') root.classList.add(`a11y-contrast-${settings.contrast}`);
    if (settings.saturation !== 'normal') root.classList.add(`a11y-sat-${settings.saturation}`);
    if (settings.highlightLinks) root.classList.add('a11y-highlight-links');
    if (settings.stopAnimations) root.classList.add('a11y-stop-animations');
    if (settings.uppercase) root.classList.add('a11y-uppercase');

    if (settings.bigCursor) body.classList.add('a11y-big-cursor');
    else body.classList.remove('a11y-big-cursor');

    varTarget.style.setProperty('--a11y-font-multiplier', String(1 + settings.fontSizeLevel * 0.2));
    varTarget.style.setProperty('--a11y-line-height', String(settings.lineHeight));
    varTarget.style.setProperty('--a11y-letter-spacing', `${settings.letterSpacing}px`);
    varTarget.style.setProperty('--a11y-text-align', settings.textAlign);
  }, [settings]);

  return <A11yContext.Provider value={{ settings, toggle, setVal }}>{children}</A11yContext.Provider>;
};

export const useA11y = () => useContext(A11yContext);
