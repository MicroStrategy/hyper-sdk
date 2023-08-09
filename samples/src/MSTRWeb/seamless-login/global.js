(function (mstrConfig, config) {
  const { libraryServerUrl, mstrWebUrl } = config;
  const joinUrl = (baseUrl, apiUrl) =>
    `${baseUrl.replace(/\/+$/, '')}/${apiUrl.replace(/^\/+/, '')}`;

  const isInBlackListPage = () => {
    const blackList = ['welcome', 'login', 'welcomeadmin'];
    if (window.microstrategy) {
      return blackList.includes(window.microstrategy.pageName);
    }
    return false;
  };

  const makeRequest = (url, config) =>
    fetch(url, {
      mode: 'cors',
      credentials: 'include',
      ...config
    });

  const getCurrentLibraryToken = () =>
    makeRequest(joinUrl(libraryServerUrl, '/api/auth/token'), {
      method: 'GET',
      headers: { Accept: '*/*' }
    }).then((response) => {
      if (response.status === 204) {
        return response.headers.get('x-mstr-authtoken');
      }

      throw new Error(`HTTP ${response.status}: no library session.`);
    });

  const createIdentityToken = () => {
    const taskUrl = (mstrConfig || {}).taskURL || 'taskProc';
    const api = joinUrl(
      mstrWebUrl,
      `/servlet/${taskUrl}?taskId=createIdentityToken&taskContentType=json&taskEnv=xhr`
    );

    return makeRequest(api, { method: 'POST' }).then((response) => {
      if (response.status === 200) {
        return response.json().then((e) => e.identityToken);
      }

      throw new Error(
        `HTTP ${response.status}: failed to create web identity token.`
      );
    });
  };

  const getLibraryTokenByIdentityToken = (identityToken) =>
    makeRequest(joinUrl(libraryServerUrl, '/api/auth/delegate'), {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ loginMode: -1, identityToken: identityToken })
    }).then((response) => {
      if (response.status === 204) {
        return response.headers.get('x-mstr-authtoken');
      }

      throw new Error(
        `HTTP ${response.status}: failed to get library token by identity token.`
      );
    });

  const webSeamlessLogin = () =>
    createIdentityToken().then(getLibraryTokenByIdentityToken);

  const loadHyperSdk = () => {
    const script = document.createElement('script');
    script.src = joinUrl(
      libraryServerUrl,
      `/static/hyper/sdk/js/mstr_hyper.bundle.js?v=${new Date().getTime()}`
    );
    document.body.appendChild(script);
    return script;
  };

  const startHyperSdk = (libraryToken) => {
    let webAuthMode;
    if (mstrConfig) {
      webAuthMode = parseInt(mstrConfig.authMode, 10);
    } else {
      webAuthMode = mstrHyper.AUTH_MODES.STANDARD;
      console.warn(
        'mstrConfig is not available, assuming standard authentication mode.'
      );
    }

    mstrHyper
      .start({
        server: libraryServerUrl,
        auth: {
          authMode: webAuthMode,
          authToken: libraryToken,
          onSessionError: (error) => {
            console.error(error.message);
            return webSeamlessLogin();
          }
        }
      })
      .then((cards) => {
        console.log('MicroStrategy HyperIntelligence is initialized.');
        console.log('Hyper Cards:', cards);
      })
      .catch((error) => console.error('mstrHyper.start error: ', error));
  };

  const initHyperSdk = (libraryToken) => {
    const script = loadHyperSdk();
    script.onload = () => startHyperSdk(libraryToken);
  };

  const initPlugin = () => {
    if (isInBlackListPage() || !(mstrConfig || {}).seamlessLoginEnabled) {
      return;
    }

    getCurrentLibraryToken()
      .catch(webSeamlessLogin)
      .then(initHyperSdk)
      .catch((error) => console.error('Initialize Hyper SDK error:', error));
  };

  if (document.readyState === 'complete') {
    initPlugin();
  } else {
    window.addEventListener('load', initPlugin);
  }
})(window.mstrConfig, {
  libraryServerUrl: 'YOUR LIBRARY SERVER URL',
  mstrWebUrl: 'YOU MSTR WEB URL'
});
