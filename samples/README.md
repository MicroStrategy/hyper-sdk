# Application Integration Samples

## Integrate HyperSDK to a website

HyperSDK can be integrated to any website so that users can interact with HyperIntelligence cards. In order to integrate HyperSDK to a website, the following instructions should be followed.

### 1. Load HyperSDK on your web pages
```html
<script type="text/javascript" 
src="https://demo.microstrategy.com/MicroStrategyLibrary/static/hyper/sdk/js/mstr_hyper.bundle.js">
</script>
```
>Please replace Library server url with your instance url.
e.g. *https://mci-xxx.hypernow.microstrategy.com/MicroStrategyLibrary*

When you have the URL to HyperSDK, determine the URL to the main JavaScript bundle file.

> You can get the URL to the main JavaScript bundle by appending `/js/mstr_hyper.bundle.js` to the URL of Hyper SDK. E.g. if the URL to your copy of Hyper SDK is https://mci-xxx.hypernow.microstrategy.com/MicroStrategyLibrary/static/hyper/sdk, the URL to the main JavaScript bundle is https://mci-xxx.hypernow.microstrategy.com/MicroStrategyLibrary/static/hyper/sdk/js/mstr_hyper.bundle.js

### 2. Initialize HyperSDK

HyperSDK needs to connect to a MicroStrategy Library Server to work. After Hyper SDK is added to your web page, initialize Hyper SDK by calling mstrHyper.start function like the following code snippet:

```html
<script>
  window.addEventListener('DOMContentLoaded', function () {
    mstrHyper
      .start({
        server: 'https://test.microstrategy.com/MicroStrategyLibrary',
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


## Integrating HyperSDK to MicroStrategy Web via a plugin

Some MicroStrategy Web customizations require the use of JavaScript to be included on a MicroStrategy Web page. The plug-in architecture provided by MicroStrategy Web can be used to achieve this purpose.
> Read more about [Adding Custom JavaScript](https://lw.microstrategy.com/msdz/MSDL/GARelease_Current/docs/projects/WebSDK/Content/topics/promptarch/PA_Adding_Custom_JavaScript.htm)

### Example of the HyperSDK Custom Javascript
```js
(function() {
    // replace this line with the real sdk path
    const baseSDKFolder = 'https://mci-xxx.hypernow.microstrategy.com/MicroStrategyLibrary/static/hyper/sdk';

    // add initialization after page is done
    document.addEventListener("DOMContentLoaded", function() {
        // add script
        const script = document.createElement('script');
        script.src = baseSDKFolder + '/js/mstr_hyper.bundle.js';
        document.body.appendChild(script);

        script.onload = () => {
            mstrHyper.start({
                server: "https://demo.microstrategy.com/MicroStrategyLibrary",
                auth: {
                    authMode: mstrHyper.AUTH_MODES.GUEST
                }
            });
        }
    });
}());
```

#### How to deploy the HyperSDK plugin on MicroStrategy Web?

1.	Connect to the application server where MicroStrategy Web is installed
2.	Navigate to the path for MicroStrategy Web
3.	Copy and paste the “hypersdk” folder in the “Plugins” folder under “MicroStrategy”.  
4.	Open and edit the “global.js” in “javascript” under the “hypersdk” folder just pasted.
5.	Restart the application server 

#### Example of Plugin File
[Sample MSTR Web Plugin](../files/global.js)

