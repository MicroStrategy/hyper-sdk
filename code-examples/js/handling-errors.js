window.addEventListener('DOMContentLoaded', () => {
  const input = document.form.onSessionError;
  input.placeholder = `var onSessionError = function (error) {
  return mstrHyper.login({
    authMode: mstrHyper.AUTH_MODES.STANDARD,
    username: 'username',
    password: 'password'
  });
};`;

  input.value = demo.storage.onSessionError() || ``;
  input.addEventListener('change', () => {
    demo.storage.onSessionError(input.value || '');
  });
});
