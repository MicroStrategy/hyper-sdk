window.demo = ((win, doc) => {
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
    authMode: (value) =>
      readOrWrite('auth.authMode', value, 'mstrHyper.AUTH_MODES.OIDC'),
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
    keywordInput: (value) => readOrWrite('keywordInput', value),
  };

  const getMainBundleURL = (server) => {
    if (server.toLowerCase().startsWith('https://demo.microstrategy.com')) {
      return 'https://demo.microstrategy.com/hypersdk/js/mstr_hyper.bundle.js';
    }

    return buildURL(server, 'static/hyper/sdk/js/mstr_hyper.bundle.js');
  };

  const getEnableSearchScript = () => {
    return 'await mstrHyper.enableCards()';
  };

  const getStartScript = () => {
    let authMode = storage.authMode();
    const isBasic = authMode && authMode.toLowerCase().endsWith('standard');
    if (authMode)
      authMode = authMode.startsWith('mstrHyper.AUTH_MODES.')
        ? `authMode: ${authMode},`
        : `authMode: '${authMode}',`;

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
  ${onSessionError.replace(/\n/g, '\n  ')}
  window.addEventListener('load', function () {
    mstrHyper
      .start({
        server: '${storage.server()}',
        auth: {
          ${authToken ? '' : authMode}
          ${authToken || !isBasic ? '' : username}
          ${authToken || !isBasic ? '' : password}
          ${authToken}
          ${onSessionError ? 'onSessionError: onSessionError' : ''}
        },
        searchEnabled: true,
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
    `<script type="text/javascript" src="${getMainBundleURL(
      storage.server(),
    )}"></script>`;

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
          /(&gt;)?&lt;\/?\w+(&gt;)?/g,
        ],
      ],
      ['comment', [/\s*(?<!:)\/\/.+/g, /\/\*.*\*\//gm]],
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
    const enableSearchHTML = highlight(getEnableSearchScript());
    for (let i = 0; i < codes.length; i += 1) {
      if (codes[i].classList.contains('hyper-start')) {
        codes[i].innerHTML = startScriptHTML;
      } else if (codes[i].classList.contains('load-main-js')) {
        codes[i].innerHTML = mainBundleHTML;
      } else if (!codes[i].classList.contains('is-highlighted')) {
        codes[i].innerHTML = highlight(codes[i].innerHTML);
        codes[i].classList.add('is-highlighted');
      } else if (!codes[i].classList.contains('hyper-enable-search')) {
        codes[i].innerHTML = enableSearchHTML;
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

      const code = e.target.parentElement.nextElementSibling;
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

  window.addEventListener('load', () => {
    bindCopyCode();
    bindAccordion();
    refresh();
  });

  const raiseHTTPError = async (url, response, notFoundMessage) => {
    if (response.status < 400) {
      return;
    }

    const headers = [...response.headers.entries()]
      .map(([k, v]) => `${k}: ${v}`)
      .join('\n');
    const body = await response.text();
    if (response.status < 500) {
      throw new Error(
        [
          notFoundMessage,
          `GET ${url}`,
          `${response.status} ${response.statusText}`,
          headers,
          body,
        ].join('\n\n'),
      );
    }

    throw new Error(
      [
        'Server error',
        `GET ${url}`,
        `${response.status} ${response.statusText}`,
        headers,
        body,
      ].join('\n\n'),
    );
  };

  const validateServerURL = async (url) => {
    const isTrusted = storage.authMode().endsWith('TRUSTED');
    const options = isTrusted
      ? {
          mode: 'cors',
          credentials: 'include',
        }
      : { mode: 'no-cors' };
    const isValidServer = await fetch(buildURL(url, '/api/status'), options);
    await raiseHTTPError(url, isValidServer, 'Server is not reachable.');

    const sdk = getMainBundleURL(url);
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
    getMainBundleURL,
  };
})(window, document);
