export const bindAccordion = () => {
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('accordion-head')) {
      e.target.parentElement.classList.toggle('is-active');
    }
  });
};
