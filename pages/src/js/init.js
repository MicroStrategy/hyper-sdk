import './utils/common';
import { storage } from './utils/storage';
import { buildUrl } from './utils/buildUrl';
import { validateServerUrl } from './utils/validateServerUrl';

window.addEventListener(
  'load',
  () => {
    const serverUrlInput = document.getElementById('t-server-url');
    serverUrlInput.value = storage.server();

    serverUrlInput.addEventListener('keydown', (e) => {
      e.target.classList.remove('is-success', 'is-danger');
    });

    serverUrlInput.addEventListener('change', (e) => {
      const newUrl = buildUrl(serverUrlInput.value);
      validateServerUrl(newUrl)
        .then(() => {
          storage.server(newUrl);
          e.target.classList.add('is-success');
        })
        .catch((error) => {
          e.target.classList.add('is-danger');
          e.target.setAttribute('title', error.message);
        });
    });
  },
  { once: true }
);
