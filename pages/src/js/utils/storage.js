import { DEMO_LIB_URL } from './constants';

const readOrWrite = (key, value, defaultValue = '') => {
  const k = `HyperSDK.${key}`;

  if (value !== undefined) {
    if (typeof value === 'string') {
      localStorage.setItem(k, value);
    } else {
      localStorage.removeItem(k);
    }

    window.dispatchEvent(new Event('storage-change'));
  }

  return localStorage.getItem(k) || defaultValue || '';
};

export const storage = {
  server: (value) => readOrWrite('server', value, DEMO_LIB_URL),
  authMode: (value) =>
    readOrWrite('auth.authMode', value, 'mstrHyper.AUTH_MODES.OIDC'),
  username: (value) => readOrWrite('auth.username', value),
  password: (value) => readOrWrite('auth.password', value),
  authToken: (value) => readOrWrite('auth.authToken', value),
  onSessionError: (value) => readOrWrite('auth.onSessionError', value),
  cards: (value) => readOrWrite('cards', value),
  logLevel: (value) => readOrWrite('logLevel', value),
  highlightType: (value) => readOrWrite('highlight.type', value),
  highlightIframes: (value) => readOrWrite('highlight.highlightIframes', value),
  previewPageContent: (value) => readOrWrite('previewPageContent', value),
  keywordInput: (value) => readOrWrite('keywordInput', value)
};
