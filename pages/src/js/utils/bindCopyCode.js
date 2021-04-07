import { copyToClipboard } from './copyToClipboard';

export const bindCopyCode = () => {
  document.addEventListener('click', (e) => {
    if (!e.target.classList.contains('copy')) {
      return;
    }

    e.preventDefault();
    const code = e.target.parentElement.nextElementSibling;
    copyToClipboard(code.innerText.trim());
    e.target.innerText = 'Copied';
    setTimeout(() => {
      e.target.innerText = 'Copy';
    }, 1500);
  });
};
