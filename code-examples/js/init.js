window.addEventListener('DOMContentLoaded', () => {
  const serverURLInput = document.getElementById('t-server-url');
  serverURLInput.value = demo.storage.server();

  serverURLInput.addEventListener('keydown', (e) => {
    e.target.classList.remove('is-success', 'is-danger');
  });

  serverURLInput.addEventListener('change', (e) => {
    const newURL = demo.buildURL(serverURLInput.value);
    demo
      .validateServerURL(newURL)
      .then(() => {
        demo.storage.server(newURL);
        e.target.classList.add('is-success');
      })
      .catch((error) => {
        e.target.classList.add('is-danger');
        e.target.setAttribute('title', error.message);
      });
  });
});
