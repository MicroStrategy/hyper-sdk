import './utils/common';
import { storage } from './utils/storage';
import { isBasicAuthMode } from './utils/isBasicAuthMode';

const initAuthMode = () => {
  const authMode = storage.authMode();
  const select = document.auth.authMode;
  for (let i = 0; i < select.options.length; i += 1) {
    if (select.options[i].value === authMode) {
      select.selectedIndex = i;
      break;
    }
  }

  const setAuthMode = () => {
    storage.authMode(select.value);
    const isBasic = isBasicAuthMode(select.value);
    Array.from(document.querySelectorAll('.credential')).forEach((it) =>
      it.classList.toggle('is-hidden', !isBasic)
    );
  };

  setAuthMode();
  select.addEventListener('change', setAuthMode);
};

const initCredentials = () => {
  const txtUsername = document.auth.username;
  txtUsername.value = storage.username();
  txtUsername.addEventListener('change', () => {
    storage.username(txtUsername.value || null);
  });

  const txtPassword = document.auth.password;
  txtPassword.value = storage.username() ? storage.password() : '';
  txtPassword.addEventListener('change', () => {
    storage.password(txtPassword.value || null);
  });

  const txtAuthToken = document.auth.authToken;
  txtAuthToken.value = storage.authToken();
  txtAuthToken.addEventListener('change', () => {
    storage.authToken(txtAuthToken.value || null);
  });
};

window.addEventListener(
  'load',
  () => {
    initAuthMode();
    initCredentials();
  },
  { once: true }
);
