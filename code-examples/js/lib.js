window.demo = ((win, doc) => {
  let refresh;
  const readOrWrite = (key, value, defaultValue = '') => {
    const k = `HyperSDK.${key}`;

    if (value !== undefined) {
      if (typeof value === 'string') {
        localStorage.setItem(k, value);
      } else {
        localStorage.removeItem(k);
      }

      refresh();
    }

    return localStorage.getItem(k) || defaultValue || '';
  };

  const storage = {
    server: (value) =>
      readOrWrite(
        'server',
        value,
        'https://demo.microstrategy.com/MicroStrategyLibrary/',
      ),
    autoLogin: (value) => readOrWrite('auth.autoLogin', value, 'true'),
    authMode: (value) =>
      readOrWrite('auth.authMode', value, 'mstrHyper.AUTH_MODES.GUEST'),
    username: (value) => readOrWrite('auth.username', value),
    password: (value) => readOrWrite('auth.password', value),
    authToken: (value) => readOrWrite('auth.authToken', value),
    onSessionError: (value) => readOrWrite('auth.onSessionError', value),
    cards: (value) => readOrWrite('cards', value),
    logLevel: (value) => readOrWrite('logLevel', value),
    highlightType: (value) => readOrWrite('highlight.type', value),
    highlightIframes: (value) =>
      readOrWrite('highlight.highlightIframes', value),
    previewPageContent: (value) => readOrWrite('previewPageContent', value),
  };

  const getStartScript = () => {
    let authMode = storage.authMode();
    if (!authMode.startsWith('mstrHyper.')) authMode = `'${authMode}'`;

    let username = storage.username();
    if (username) username = `username: '${username.replace(/'/g, "\\'")}',`;

    let password = username ? storage.password() : '';
    if (username || password)
      password = `password: '${password.replace(/'/g, "\\'")}',`;

    let authToken = storage.authToken();
    if (authToken)
      authToken = `authToken: '${authToken.replace(/'/g, "\\'")}',`;

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
  ${onSessionError}
  window.addEventListener('DOMContentLoaded', function () {
    mstrHyper
      .start({
        server: '${storage.server()}',
        auth: {
          autoLogin: ${storage.autoLogin()},
          authMode: ${authMode},
          ${authToken ? '' : username}
          ${authToken ? '' : password}
          ${authToken}
          ${onSessionError ? 'onSessionError' : ''}
        },
        ${cards}
        ${logLevel}
        ${highlight}
      })
      .then(function () {
        console.log('MicroStrategy HyperIntelligence is initialized.');
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

  const getLoadMainBundleScript = () =>
    `<script type="text/javascript" src="${storage.server()}static/hyper/sdk/js/mstr_hyper.bundle.js"></script>`;

  const highlight = (code) => {
    let html = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    const items = [
      // ['attribute', [/\w+=/g]],
      ['string', [/"(\\"|[^"])*"/g, /'(\\'|[^'])*'/g, /`(\\`|[^`])*`/g]],
      [
        'keyword',
        [
          'window',
          'document',
          'console',
          'then',
          'catch',
          'function',
          /(&gt;)?&lt;\/?script(&gt;)?/g,
        ],
      ],
      ['comment', [/(?<!:)\/\/.+/g, /\/\*.*\*\//gm]],
    ];

    for (let i = 0; i < items.length; i += 1) {
      const className = items[i][0];
      for (let j = 0; j < items[i][1].length; j += 1) {
        const keyword = items[i][1][j];
        const pattern =
          typeof keyword === 'string' ? new RegExp(keyword, 'g') : keyword;
        html = html.replace(
          pattern,
          (m) => `<span class="${className}">${m}</span>`,
        );
      }
    }

    return html;
  };

  refresh = () => {
    const codes = document.querySelectorAll('code');
    const startScriptHTML = highlight(getStartScript());
    const mainBundleHTML = highlight(getLoadMainBundleScript());

    for (let i = 0; i < codes.length; i += 1) {
      if (codes[i].classList.contains('hyper-start')) {
        codes[i].innerHTML = startScriptHTML;
      } else if (codes[i].classList.contains('load-main-js')) {
        codes[i].innerHTML = mainBundleHTML;
      } else if (!codes[i].classList.contains('is-highlighted')) {
        codes[i].innerHTML = highlight(codes[i].innerHTML);
        codes[i].classList.add('is-highlighted');
      }
    }
  };

  const copyToClipboard = (str) => {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  const bindCopyCode = () => {
    document.addEventListener('click', (e) => {
      if (!e.target.classList.contains('copy')) {
        return;
      }

      const code = e.target.parentElement.nextElementSibling.firstElementChild;
      copyToClipboard(code.innerText.trim());
      e.target.innerText = 'Copied';
      setTimeout(() => {
        e.target.innerText = 'Copy';
      }, 1500);
    });
  };

  const bindAccordion = () => {
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('accordion-head')) {
        e.target.parentElement.classList.toggle('is-active');
      }
    });
  };

  window.addEventListener('DOMContentLoaded', () => {
    bindCopyCode();
    bindAccordion();
    refresh();
  });

  const buildURL = (base, path) => {
    if (typeof base !== 'string') {
      return '';
    }

    const trailingSlashes = /\/+$/g;
    const left = `${base.replace(trailingSlashes, '')}/`;
    if (!path) {
      return left;
    }

    const leadingSlashes = /^\/+/g;
    const right = path.replace(leadingSlashes, '');
    if (!right) {
      return left;
    }

    return left ? `${left}${right}` : right;
  };

  const raiseHTTPError = async (url, response, notFoundMessage) => {
    if (response.status < 400) {
      return;
    }

    const body = await response.text();
    if (response.status < 500) {
      throw new Error(
        [
          notFoundMessage,
          `GET ${url}`,
          `Status ${response.status} ${response.statusText}`,
          body,
        ].join('\n'),
      );
    }

    throw new Error(
      [
        'Server error',
        `GET ${url}`,
        `Status ${response.status} ${response.statusText}`,
        body,
      ].join('\n'),
    );
  };

  const validateServerURL = async (url) => {
    const options = { mode: 'cors' };
    const isValidServer = await fetch(buildURL(url, '/api/status'), options);
    await raiseHTTPError(url, isValidServer, 'Server is not reachable.');

    const sdk = buildURL(url, '/static/hyper/sdk/js/mstr_hyper.bundle.js');
    const hasHyperSDK = await fetch(sdk, options);
    await raiseHTTPError(
      sdk,
      hasHyperSDK,
      'Hyper SDK resources were not found on server.',
    );
  };

  return {
    storage,
    refresh,
    buildURL,
    validateServerURL,
  };
})(window, document);
