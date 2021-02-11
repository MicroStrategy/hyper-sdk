(() => {
  const iframe = document.getElementsByTagName('iframe')[0];
  const navItems = document.querySelectorAll('.nav-item');

  const clearSelection = () => {
    for (let i = 0; i < navItems.length; i += 1) {
      navItems[i].classList.remove('is-active');
    }
  };

  window.addEventListener('load', () => {
    document.querySelector('.nav').addEventListener('click', (e) => {
      if (!e.target.dataset.src) {
        return;
      }

      iframe.src = e.target.dataset.src;
      clearSelection();
      e.target.classList.add('is-active');
    });
  });
})();
