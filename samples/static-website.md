# Integrate Hyper SDK to a static website

## 1. Load Hyper SDK on your web pages
```html
<script type="text/javascript" 
src="https://demo.microstrategy.com/MicroStrategyLibrary/static/hyper/sdk/js/mstr_hyper.bundle.js">
</script>
```
>Please replace library server url with your MCI instance url.
e.g. *https://mci-xxx.hypernow.microstrategy.com/MicroStrategyLibrary*

When you have the URL to Hyper SDK, determine the URL to the main JavaScript bundle file.

> You can get the URL to the main JavaScript bundle by appending `/js/mstr_hyper.bundle.js` to the URL of Hyper SDK. E.g. if the URL to your copy of Hyper SDK is https://mci-xxx.hypernow.microstrategy.com/MicroStrategyLibrary/static/hyper/sdk, the URL to the main JavaScript bundle is https://mci-xxx.hypernow.microstrategy.com/MicroStrategyLibrary/static/hyper/sdk/js/mstr_hyper.bundle.js

## 2. Initialize Hyper SDK

Hyper SDK needs to connect to a Library Server to work, you may use `https://demo.microstrategy.com/MicroStrategyLibrary` for testing purposes.

After Hyper SDK is added to your web page, initialize Hyper SDK by calling mstrHyper.start function like the following code snippet:

```html
<script>
  window.addEventListener('DOMContentLoaded', function () {
    mstrHyper
      .start({
        server: 'https://demo.microstrategy.com/MicroStrategyLibrary',
        auth: {
          autoLogin: true,
          authMode: mstrHyper.AUTH_MODES.GUEST
        }
      })
      .then(function () {
        console.log('MicroStrategy HyperIntelligence is initialized.');
      })
      .catch(function (error) {
        console.error(error);
      });
  });
</script>
```

Example: 
https://tutorial.microstrategy.com/Sierra/

