(() => {
  const iframe = document.getElementsByTagName('iframe')[0];
  const home = document.querySelector('.navbar-brand strong');
  const navItems = document
    .querySelector('.navbar-start')
    .querySelectorAll('.navbar-item');

  const clearSelection = () => {
    for (let i = 0; i < navItems.length; i += 1) {
      navItems[i].classList.remove('is-active');
    }
  };

  window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.navbar-start').addEventListener('click', (e) => {
      if (e.target.tagName !== 'LI') {
        return;
      }

      iframe.src = e.target.dataset.src;
      clearSelection();
      e.target.classList.add('is-active');
    });

    home.addEventListener('click', () => {
      iframe.src = 'welcome.html';
      clearSelection();
    });
  });
})();
