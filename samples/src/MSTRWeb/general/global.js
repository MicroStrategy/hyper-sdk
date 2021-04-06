(function (config) {
  const PATH_TO_HYPER_JS = '/static/hyper/sdk/js/mstr_hyper.bundle.js';
  const joinUrl = (baseUrl, apiUrl) =>
    `${baseUrl.replace(/\/+$/g, '')}/${apiUrl.replace(/^\/+/g, '')}`;

  const initPlugin = () => {
    const script = document.createElement('script');
    script.src = joinUrl(config.libraryServerUrl, PATH_TO_HYPER_JS);
    document.body.appendChild(script);

    script.onload = () => {
      mstrHyper.start({
        server: config.libraryServerUrl,
        auth: {
          authMode: mstrHyper.AUTH_MODES.GUEST
        }
      });
    };
  };

  if (document.readyState === 'complete') {
    initPlugin();
  } else {
    window.addEventListener('load', initPlugin);
  }
})({
  libraryServerUrl: 'YOUR LIBRARY SERVER URL'
});
