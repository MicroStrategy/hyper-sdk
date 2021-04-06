import { getStartScript } from './getStartScript';
import { getLoadMainBundleScript } from './getLoadMainBundleScript';
import { getEnableSearchScript } from './getEnableSearchScript';
import { htmlEscape } from './htmlEscape';

export const refresh = () => {
  const codes = document.querySelectorAll('code');
  const startScriptHTML = htmlEscape(getStartScript());
  const mainBundleHTML = htmlEscape(getLoadMainBundleScript());
  const enableSearchHTML = htmlEscape(getEnableSearchScript());
  for (let i = 0; i < codes.length; i += 1) {
    if (codes[i].classList.contains('hyper-start')) {
      codes[i].innerHTML = startScriptHTML;
    } else if (codes[i].classList.contains('load-main-js')) {
      codes[i].innerHTML = mainBundleHTML;
    } else if (codes[i].classList.contains('hyper-enable-search')) {
      codes[i].innerHTML = enableSearchHTML;
    } else if (codes[i].classList.length === 0) {
      codes[i].classList.add('nohighlight');
    }
  }

  if (window.hljs) window.hljs.highlightAll();
};
