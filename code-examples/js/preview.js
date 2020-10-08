const status = (message, type) => {
  const status = document.getElementById('hyper-init-status');
  status.getElementsByTagName('p')[0].innerHTML = message;
  status.setAttribute('class', `hero is-small is-${type}`);
};

const loadMainJs = (server) =>
  new Promise((resolve, reject) => {
    let timeoutId;
    const handleLoad = () => {
      if (timeoutId) clearTimeout(timeoutId);
      resolve();
    };

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = demo.getMainBundleURL(server);
    script.onload = handleLoad;
    script.onload = handleLoad;
    document.body.appendChild(script);

    timeoutId = setTimeout(
      () =>
        reject(
          new Error(
            'Failed to load the main HyperIntelligence SDK JavaScript bundle.',
          ),
        ),
      5000,
    );
  });

const init = async () => {
  const s = demo.storage;
  const server = s.server();
  await demo.validateServerURL(server);
  await loadMainJs(server);

  let authMode = s.authMode();
  if (authMode.startsWith('mstrHyper.'))
    authMode = mstrHyper.AUTH_MODES[authMode.split('.').pop()];

  const onSessionErrorText = s.onSessionError();
  try {
    eval(onSessionErrorText);
  } catch (error) {
    window.onSessionError = async (err) => {
      console.log('Session Error:', JSON.stringify(err));
      await mstrHyper.login({
        authMode: mstrHyper.AUTH_MODES.GUEST,
      });
    };
  }

  const cards = s.cards();
  if (cards) {
    try {
      eval(`window.hyperCards = ${cards};`);
    } catch (error) {
      window.hyperCards = null;
    }
  }

  const authToken = s.authToken() || null;
  const username = s.username() || null;
  const password = s.password() || (username ? '' : null);
  return mstrHyper.start({
    server,
    auth: {
      authMode,
      username: authToken ? null : username,
      password: authToken ? null : password,
      authToken,
      onSessionError: onSessionErrorText ? onSessionError : null,
    },
    cards: cards ? hyperCards : null,
    logLevel: s.logLevel() || 'error',
    highlight: {
      type: s.highlightType() || 'insertion',
      highlightIframes: s.highlightIframes() !== 'false',
    },
  });
};

const deleteHighlights = (e) => {
  const highlights = e.getElementsByTagName('mstr-hi');
  for (let i = 0; i < highlights.length; i += 1) {
    const it = highlights[i];
    const p = it.parentElement;

    const span = document.createElement('span');
    span.innerText = it.innerText;
    p.insertBefore(span, it);
    p.removeChild(it);
  }
};

const bindEdit = () => {
  const button = document.getElementById('edit');
  const content = demo.storage.previewPageContent();
  if (content) button.parentElement.querySelector('div').innerText = content;

  button.addEventListener('click', (e) => {
    const btn = e.target;
    const parent = btn.parentElement;
    const isEditing = parent.classList.contains('is-editing');

    if (isEditing) {
      const editor = btn.nextElementSibling;
      const container = document.createElement('div');
      container.innerText = editor.value;
      demo.storage.previewPageContent(editor.value);
      parent.removeChild(editor);
      parent.appendChild(container);
    } else {
      const container = btn.nextElementSibling;
      parent.removeChild(container);
      container.innerHTML = container.innerHTML.replace(
        /<mstr-hi>(.*)<\/mstr-hi>/g,
        '$1',
      );

      const editor = document.createElement('textarea');
      editor.style.height = '50rem';
      editor.classList.add('input', 'is-info');
      editor.value = demo.storage.previewPageContent() || container.innerText;
      parent.appendChild(editor);
    }

    btn.innerText = isEditing ? 'Edit' : 'Save';
    btn.classList.toggle('is-info');
    btn.style.zIndex = 999;
    parent.classList.toggle('is-editing');
  });
};

window.addEventListener('DOMContentLoaded', () => {
  status('Initializing...', 'info');

  document.getElementById('go-back').addEventListener('click', () => {
    history.back();
  });

  bindEdit();

  init()
    .then(() => {
      status(
        `MicroStrategy HyperIntelligence is initialized.<br/><br/>
You may now open the DevTools and call any of the HyperIntelligence SDK APIs, such as <i>mstrHyper.enableCards</i> and <i>mstrHyper.disableCards</i>.
`,
        'success',
      );
    })
    .catch((error) => {
      status(
        `Failed to initialize HyperIntelligence SDK, error: \n\n${error.stack}`.replace(
          /\n/g,
          '<br/>',
        ),
        'warning',
      );
    });
});
