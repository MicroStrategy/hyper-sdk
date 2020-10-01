window.addEventListener('DOMContentLoaded', () => {
  const input = document.form.onSessionError;
  input.value =
    demo.storage.onSessionError() ||
    `var onSessionError = async (error) => {
    console.error('Session Error:', error);
    await mstrHyper.login({
      authMode: mstrHyper.AUTH_MODES.STANDARD,
      username: 'username',
      password: 'password'
    });
  };`;
  input.addEventListener('change', () => {
    demo.storage.onSessionError(input.value || '');
  });
});
