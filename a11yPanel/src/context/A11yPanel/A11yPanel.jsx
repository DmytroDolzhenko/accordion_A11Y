import { useEffect, useRef } from 'react';
import { useA11y } from '../../context/A11yContext';
import { A11yTile } from './A11yTile';
import './A11yPanel.css';

const TEXT_ALIGN = ['left', 'center', 'right'];
const CONTRAST = ['normal', 'high', 'dark', 'invert'];
const SATURATION = ['normal', 'high', 'low', 'mono'];
const LINE_HEIGHT = [1.5, 1.8, 2.1];
const LETTER_SPACING = [0, 1, 2, 3];

const nextFrom = (list, current) => list[(list.indexOf(current) + 1) % list.length];

export const A11yPanel = ({ isOpen, onClose }) => {
  const { settings, toggle, setVal } = useA11y();
  const panelRef = useRef(null);
  const previousFocusRef = useRef(null);
  useEffect(() => {
    if (!isOpen) return undefined;

    previousFocusRef.current = document.activeElement;
    const panel = panelRef.current;
    const focusable = panel?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable?.length) {
      focusable[0].focus();
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab') return;

      const nodes = panel?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!nodes?.length) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      previousFocusRef.current?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <aside
      ref={panelRef}
      className="userway-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="a11y-title"
    >
        <div className="panel-header">
          <h2 id="a11y-title">Accessibility</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close accessibility panel">×</button>
        </div>

        <div className="panel-content">
          <section className="category">
            <h4>Text</h4>
            <div className="tiles-grid">
              <A11yTile label="Font size" value={`L${settings.fontSizeLevel + 1}`} onClick={() => setVal('fontSizeLevel', (settings.fontSizeLevel + 1) % 5)} isActive={settings.fontSizeLevel > 0} ariaLabel={`Font size level ${settings.fontSizeLevel + 1}`} />
              <A11yTile label="Line height" value={`${settings.lineHeight}`} onClick={() => setVal('lineHeight', nextFrom(LINE_HEIGHT, settings.lineHeight))} isActive={settings.lineHeight !== 1.5} ariaLabel={`Line height ${settings.lineHeight}`} />
              <A11yTile label="Letter spacing" value={`${settings.letterSpacing}px`} onClick={() => setVal('letterSpacing', nextFrom(LETTER_SPACING, settings.letterSpacing))} isActive={settings.letterSpacing > 0} ariaLabel={`Letter spacing ${settings.letterSpacing} pixels`} />
              <A11yTile label="Text align" value={settings.textAlign} onClick={() => setVal('textAlign', nextFrom(TEXT_ALIGN, settings.textAlign))} isActive={settings.textAlign !== 'left'} ariaLabel={`Text alignment ${settings.textAlign}`} />
              <A11yTile label="Uppercase" value={settings.uppercase ? 'On' : 'Off'} onClick={() => toggle('uppercase')} isActive={settings.uppercase} ariaLabel={`Uppercase ${settings.uppercase ? 'enabled' : 'disabled'}`} />
            </div>
          </section>

          <section className="category">
            <h4>Colors</h4>
            <div className="tiles-grid">
              <A11yTile label="Contrast" value={settings.contrast} onClick={() => setVal('contrast', nextFrom(CONTRAST, settings.contrast))} isActive={settings.contrast !== 'normal'} ariaLabel={`Contrast mode ${settings.contrast}`} />
              <A11yTile label="Saturation" value={settings.saturation} onClick={() => setVal('saturation', nextFrom(SATURATION, settings.saturation))} isActive={settings.saturation !== 'normal'} ariaLabel={`Saturation mode ${settings.saturation}`} />
            </div>
          </section>

          <section className="category">
            <h4>Navigation</h4>
            <div className="tiles-grid">
              <A11yTile label="Highlight links" value={settings.highlightLinks ? 'On' : 'Off'} onClick={() => toggle('highlightLinks')} isActive={settings.highlightLinks} ariaLabel={`Highlight links ${settings.highlightLinks ? 'enabled' : 'disabled'}`} />
              <A11yTile label="Big cursor" value={settings.bigCursor ? 'On' : 'Off'} onClick={() => toggle('bigCursor')} isActive={settings.bigCursor} ariaLabel={`Big cursor ${settings.bigCursor ? 'enabled' : 'disabled'}`} />
              <A11yTile label="Pause motion" value={settings.stopAnimations ? 'On' : 'Off'} onClick={() => toggle('stopAnimations')} isActive={settings.stopAnimations} ariaLabel={`Pause animations ${settings.stopAnimations ? 'enabled' : 'disabled'}`} />
            </div>
          </section>
        </div>
      </aside>
  );
};

