import './utils/common';
import { storage } from './utils/storage';

window.addEventListener(
  'load',
  () => {
    const highlightType = storage.highlightType() || '';
    const select = document.form.type;
    for (let i = 0; i < select.options.length; i += 1) {
      if (select.options[i].value === highlightType) {
        select.selectedIndex = i;
        break;
      }
    }

    select.addEventListener('change', () => {
      storage.highlightType(select.value || null);
    });

    const highlightIframes = storage.highlightIframes() !== 'false';
    const [yes, no] = document.form.iframes;
    yes.checked = highlightIframes;
    no.checked = !highlightIframes;

    yes.addEventListener('change', () => storage.highlightIframes(null));
    no.addEventListener('change', () => storage.highlightIframes('false'));
  },
  { once: true }
);
