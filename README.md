# MicroStrategy HyperSDK


- [System Requirements](system-requirements.md)
- [Configuration and Customization](config)
  * [Initialize Hyper SDK](config/README.md#initialize-hyper-sdk)
  * [Authentication Configurations](config/README.md#authentication-configurations)
  * [Enable and Disable Cards](config/README.md#enable-and-disable-cards)
  * [Highlight Settings](config/README.md#highlight-settings)
  * [Error Handling](config/README.md#error-handling)
- [Application Integration Samples](samples)
  * [Integrate HyperSDK to websites](samples#integrate-hypersdk-to-a-website)
  * [MicroStrategy Web Plugin](samples#integrating-hypersdk-to-microstrategy-web-via-a-plugin)
- [Frequently Asked Questions](faq.md)
- [API Doc](api.md)

## Introduction to HyperIntelligence

HyperIntelligence was introduced in MicroStrategy 2019 as a new addition to MicroStrategy Workstation and allows analysts to create objects called cards.

Cards are visual representations of your data. In a card, you can create lists, matrix grids, ring charts, or text boxes to display your data in a quick and concise manner. By using an attribute from your data to serve as the keyword attribute, that attribute will then identify the elements that will trigger a card to appear.

After creating cards in Workstation, analysts can deploy their cards to a user's web browser, mobile device, and Microsoft Outlook. Users can then get real-time answers by hovering over keywords in a web browser, scanning a barcode on a mobile device, or clicking on an email to see relevant cards.

![hyper-card-sample.png](img/hyper-card-sample.png)

## What is HyperSDK

HyperSDK is a JavaScript SDK that allows you to quickly add HyperIntelligence to your own websites. Most HyperIntelligence features are supported in the SDK, such as finding and highlighting keywords on web pages, showing Hyper Cards when hovering a highlighted keyword, and the ability to copy &amp; share cards.

The HyperSDK is comprised of a few JavaScript and stylesheet files, as well as a handful of images and fonts.

![hyper-sdk-arch.png](img/hyper-sdk-arch.png)

To enable HyperIntelligence with the SDK on your web page, 
you will need to configure HyperSDK to connect to a HyperIntelligence Service instance where HyperSDK is hosted in order to consume HyperIntelligence Cards.

Upon calling `start()` function, it will proceed to scan and highlight matched DOM elements on the web page.



