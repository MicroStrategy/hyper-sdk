import './utils/common';
import { storage } from './utils/storage';

window.addEventListener(
  'load',
  () => {
    const input = document.form.onSessionError;
    input.placeholder = `const onSessionError = function (error) {
  return mstrHyper.login({
    authMode: mstrHyper.AUTH_MODES.STANDARD,
    username: 'username',
    password: 'password'
  });
};`;

    input.value = storage.onSessionError() || ``;
    input.addEventListener('change', () => {
      storage.onSessionError(input.value || '');
    });
  },
  { once: true }
);
