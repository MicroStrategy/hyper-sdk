# Quick Start

To start using HyperIntelligence SDK, see the basic workflow below:

---
**Prerequisites**

- You’ll need a MicroStrategy Library Server to enable HyperIntelligence on your websites. For testing purposes, you may try it with https://demo.microstrategy.com/MicroStrategyLibrary/.

- You’ll need to create one or more Hyper Cards with Workstation and deploy them. Check the [Introduction to HyperIntelligence](https://www2.microstrategy.com/producthelp/Current/Hyper/en-us/Content/intro_hyperintelligence.htm) for details. On the demo Library Server, a few Hyper Cards are available so you may skip this step.
---

In your website or application, add this HTML code snippet to your web pages:

```js
<script type="text/javascript" src="https://demo.microstrategy.com/MicroStrategyLibrary/static/hyper/sdk/js/mstr_hyper.bundle.js"></script>
<script>
  window.addEventListener('DOMContentLoaded', function () {
    mstrHyper
      .start({
        server: 'https://demo.microstrategy.com/MicroStrategyLibrary/',
        auth: {
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

Now pen your websites with a browser and you should see Hyper highlights.
