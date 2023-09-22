(function (config) {
  const PATH_TO_HYPER_JS = `/static/hyper/sdk/js/mstr_hyper.bundle.js?v=${new Date().getTime()}`;
  const joinUrl = (baseUrl, apiUrl) =>
    `${baseUrl.replace(/\/+$/g, '')}/${apiUrl.replace(/^\/+/g, '')}`;

  //your hyper card's project id
  const ProjectID = 'PROJECT_ID';

  const dossierMap = {
    //the dossier id you want to show highlight on
    'DOSSIER_1_ID': [
      {
        // the hyper card id you want to enable on this certain dossier
        id: 'HYPER_CARD_1_ID',
        projectId: ProjectID
      }
    ],
    'DOSSIER_2_ID': [
      {
        // the hyper card id you want to enable on this certain dossier
        id: 'HYPER_CARD_2_ID',
        projectId: ProjectID
      }
    ]
  };

  history.pushState = ((f) =>
    function pushState() {
      var ret = f.apply(this, arguments);
      window.dispatchEvent(new Event('pushstate'));
      window.dispatchEvent(new Event('locationchange'));
      return ret;
    })(history.pushState);

  history.replaceState = ((f) =>
    function replaceState() {
      var ret = f.apply(this, arguments);
      window.dispatchEvent(new Event('replacestate'));
      window.dispatchEvent(new Event('locationchange'));
      return ret;
    })(history.replaceState);

  window.addEventListener('popstate', () => {
    window.dispatchEvent(new Event('locationchange'));
  });

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

    let lastUrl = location.href;
    window.addEventListener('locationchange', function (event) {
      const url = location.href;
      if (url !== lastUrl) {
        lastUrl = url;
        onUrlChange(url);
      }
    });
  };

  const onUrlChange = (url) => {
    if (!mstrHyper) return;
    console.log('URL changed!', location.href);
    mstrHyper.disableCards();

    const asArray = Object.entries(dossierMap);
    const filtered = asArray.filter(([key, value]) => url.includes(key));

    console.log(filtered);

    if (filtered.length) {
      const cardIds = filtered[0][1];

      mstrHyper.disableCards();
      mstrHyper.enableCards(cardIds);
    } else {
      mstrHyper.disableCards();
    }
  };

  if (document.readyState === 'complete') {
    console.log('document ready:');
    initPlugin();
  } else {
    window.addEventListener('load', initPlugin);
  }
})({
  libraryServerUrl: 'YOUR LIBRARY SERVER URL'
});
