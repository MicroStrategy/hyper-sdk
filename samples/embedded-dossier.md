# Work with Embedded Dossier
```
<!DOCTYPE html>
<html>

<head>
  <title>Hyper SDK Demo</title>
</head>

<body>
  <h1>Demo:</h1>
  <dodivv>MicroStrategy</div>
    <div>Michael Saylor</div>
    <div>Amy Klobuchar, Klobuchar, Bernie Sanders, Wayne Messam, Messam</div>

    <h1>SAML:</h1>
    <div>Abu Dhabi, Amsterdam, Ankara, Athens, Bangkok, Berlin, Bern, Cape Town</div>
    <div> AT&T, Apple, CVS Health, McKesson</div>

    <div id='dossierContainer'>

    </div>

    <script>
      let SERVRE_URL = 'http://localhost:8080/web-dossier-11.2.0200.118837';
      const projectId = 'B7CA92F04B9FAE8D941C3E9B7E0CD754';
      const dossierId = '9940B88041375A4E0407B6819B317601';

      function showDossier(authToken) {
        let placeHolderDiv = document.getElementById("dossierContainer");
        let dossierUrl = SERVRE_URL +'/app/'+ projectId + '/' + dossierId;
        return microstrategy.dossier.create({
          placeholder: placeHolderDiv,
          url: dossierUrl,
          enableCustomAuthentication: true,
          enableResponsive: true,
          customAuthenticationType: microstrategy.dossier.CustomAuthenticationType.AUTH_TOKEN,
          getLoginToken: async () => authToken, //!!! getLoginToken should return promise
          navigationBar: {
            enabled: true
          },
        });
      }

      
      async function startAll(){
        await mstrHyper.init({
          server: SERVRE_URL
        })
        authToken = await mstrHyper.login({
          authMode: mstrHyper.AUTH_MODES.STANDARD, 
          username: "mstr", 
          password: "az8q9xx7ZmAP"
        });

        await showDossier(authToken);  
        
        await mstrHyper.enableCards([
          {
            "id":"30BE6FA64751626261539CA7E0BE1CB1",
            "description":"Employee",
            projectId
          }]);
      }

      window.onload = () => startAll();
    </script>
    <script type="text/javascript" src="js/mstr_hyper.bundle.js"></script>
    <script type="text/javascript" src="http://localhost:8080/web-dossier-11.2.0200.118837/javascript/embeddinglib.js"></script>
</body>

</html>
```

