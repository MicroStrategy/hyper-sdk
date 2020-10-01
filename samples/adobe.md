# Adobe Experience Manager

## What is AEM?

Adobe Experience Manager. Adobe platform to create marketing website. AEM offers the following features products.

- AEM Sites
- AEM Assets (images, video)
- AEM Forms
- AEM Apps
- AEM Community (blogs, forums)

AEM has built-in integration with:

- Adobe CC. (Sync assets directly with CMS)
- Adobe Analytics
- Adobe Target

## Learning Resource

[Getting Started with AEM Sites - WKND Tutorial](https://docs.adobe.com/content/help/en/experience-manager-learn/getting-started-wknd-tutorial-develop/overview.html#)

[Adobe Experience Manager as a Cloud Service Tutorials](https://docs.adobe.com/content/help/en/experience-manager-learn/cloud-service/overview.html#)

## How does AEM work?

### Deployment Model

Ref: [AEM 6.5 Deploying Guide](https://docs.adobe.com/content/help/en/experience-manager-65/deploying/deploying/deploy.html#)

- **On-premise**
- **Cloud: Managed Services - Cloud Manager for Adobe Experience Manager**

## How to integrate

Web Developer has access to the source code and can add javascript code to the page directly.

```html
<script
  type="text/javascript"
  src="https://tutorial.microstrategy.com/hypersdk/js/mstr_hyper.bundle.js">
</script>
<script>
  document.addEventListener("DOMContentLoaded", function(){
    mstrHyper.start({
      server: "https://demo.microstrategy.com/MicroStrategyLibrary",
      authMode: 0x08,
      baseURI: "https://tutorial.microstrategy.com/hypersdk/"
    });
  });
</script>
```

Video Tutorial:

https://web.microsoftstream.com/embed/video/f245254a-2148-423b-a00c-f9684ae05be6?autoplay=false&amp;showinfo=true
