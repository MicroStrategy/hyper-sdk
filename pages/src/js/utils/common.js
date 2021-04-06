import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { bindCopyCode } from './bindCopyCode';
import { bindAccordion } from './bindAccordion';
import { refresh } from './refresh';

window.addEventListener(
  'load',
  () => {
    bindCopyCode();
    bindAccordion();
    refresh();
    window.addEventListener('storage-change', refresh);
  },
  { once: true }
);
