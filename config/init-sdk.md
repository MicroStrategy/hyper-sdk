# Initialize Hyper SDK

## Loading the main Hyper SDK JavaScript bundle

The first step is to load the Hyper SDK's main JavaScript bundle. You can do it by adding the code snippet below to your web pages.

```html
<script
  type="text/javascript"
  src="{YOUR_LIBRARY_SERVER_URL}/static/hyper/sdk/js/mstr_hyper.bundle.js"></script>

```

[It’s a good practice](https://developers.google.com/apps-script/guides/html/best-practices#load_javascript_last) to put the above code snippet before the close tag of the body element: `</body>`.

## Initialize Hyper SDK

For Hyper SDK to work, it needs to connect to the Library Server and download the Hyper Cards. Next, add the following code snippet to your web pages to initialize the Hyper SDK.

```html
<script>
  window.addEventListener('DOMContentLoaded', function () {
    mstrHyper
      .start({
        // Change the URL to your own Library Server's base URI.
        server: 'https://demo.microstrategy.com/MicroStrategyLibrary/',
        // Authentication customizations, see the API documents.
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

For more information about the `mstrHyper.start`, check [the API documents](api).

> Both of the main Hyper SDK JavaScript bundle and the code snippet above must be added to ALL of the web pages that you want HyperIntelligence to be enabled.
{.is-info}
