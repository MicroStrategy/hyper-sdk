window.addEventListener('DOMContentLoaded', () => {
  const s = demo.storage;

  const highlightType =
    s.highlightType() || 'mstrHyper.HIGHLIGHT_TYPES.INSERTION';
  const select = document.form.type;
  for (let i = 0; i < select.options.length; i += 1) {
    if (select.options[i].value === highlightType) {
      select.selectedIndex = i;
      break;
    }
  }

  select.addEventListener('change', () => {
    s.highlightType(select.value || null);
  });

  const highlightIframes = s.highlightIframes() !== 'false';
  const [yes, no] = document.form.iframes;
  yes.checked = highlightIframes;
  no.checked = !highlightIframes;

  yes.addEventListener('change', () => {
    s.highlightIframes(null);
  });

  no.addEventListener('change', () => {
    s.highlightIframes('false');
  });
});
