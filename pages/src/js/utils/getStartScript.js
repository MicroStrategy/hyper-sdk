import { storage } from './storage';
import { isBasicAuthMode } from './isBasicAuthMode';

export const getStartScript = () => {
  let authMode = storage.authMode();
  const isBasic = isBasicAuthMode(authMode);
  if (authMode)
    authMode = authMode.startsWith('mstrHyper.AUTH_MODES.')
      ? `authMode: ${authMode},`
      : `authMode: '${authMode}',`;

  let username = storage.username();
  if (username) username = `username: '${username.replace(/'/g, "\\'")}',`;

  let password = username ? storage.password() : '';
  if (username || password)
    password = `password: '${password.replace(/'/g, "\\'")}',`;

  let authToken = storage.authToken();
  if (authToken) authToken = `authToken: '${authToken.replace(/'/g, "\\'")}',`;

  const onSessionError = storage.onSessionError();

  let cards = storage.cards();
  if (cards) cards = `cards: ${cards},`;

  let logLevel = storage.logLevel();
  if (logLevel) logLevel = `logLevel: '${logLevel}',`;

  let highlightType = storage.highlightType();
  if (highlightType) highlightType = `type: ${highlightType},`;

  let highlightIframes = storage.highlightIframes();
  if (highlightIframes)
    highlightIframes = `highlightIframes: ${highlightIframes}`;

  let highlight = '';
  if (highlightType || highlightIframes) {
    highlight = `highlight: {
        ${highlightType}
        ${highlightIframes}
      }`;
  }

  const script = `<script>
${onSessionError.replace(/\n/g, '\n  ')}
window.addEventListener('load', function () {
  mstrHyper
    .start({
      server: '${storage.server()}',
      auth: {
        ${authToken ? '' : authMode}
        ${authToken || !isBasic ? '' : username}
        ${authToken || !isBasic ? '' : password}
        ${authToken}
        ${onSessionError ? 'onSessionError: onSessionError' : ''}
      },
      searchEnabled: true,
      ${cards}
      ${logLevel}
      ${highlight}
    })
    .then(function () {
      console.log('Strategy HyperIntelligence is initialized.');
    })
    .catch(function (error) {
      console.error(error);
    });
});
</script>
`;

  return script
    .split('\n')
    .filter((l) => l.trim().length > 0)
    .join('\n');
};
