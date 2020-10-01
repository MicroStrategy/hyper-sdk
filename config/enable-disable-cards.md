## Enable and Disable Cards

By default, Hyper SDK enables all the Hyper Cards that are available to the end-user. If you want to enable a selected list of Hyper Cards, you can list them in the initialization settings.

#### Enable selected Hyper Cards during initialization

You can specify the `cards` paramater to let SDK know the list of cards the app wants to enable when it calls `mstrHyper.start()`.
> If the **cards** paramater is not specified, the SDK will load all available cards for the logged in user, including:
- All certified cards
- All non-certified cards created by the current user

E.g. we have 2 certified cards on server from the same project id: `EC70648611E7A2F962E90080EFD58751`, and the metadata(card) ids are: `51CBD67C11E9E92900000080EF25C5C7` and `692CC6C011EA07CC00000080EF3532F5`. The parameter configuration could look like:

```html
<script>
  window.addEventListener('DOMContentLoaded', function () {
    mstrHyper
      .start({
        server: 'https://demo.microstrategy.com/MicroStrategyLibrary/',
        auth: {
          autoLogin: true,
          authMode: mstrHyper.AUTH_MODES.GUEST
        },
        // List the enabled cards.
        cards: [{
          id: '51CBD67C11E9E92900000080EF25C5C7',
          name: 'Companies',
          projectId: 'EC70648611E7A2F962E90080EFD58751',
        }, {
          id: '692CC6C011EA07CC00000080EF3532F5',
          name: 'Universities',
          projectId: 'EC70648611E7A2F962E90080EFD58751',
        }]
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

#### Using the `enableCards` API to enable selected Hyper Cards
After starting the SDK, you may enable a list of Hyper Cards at any time with the enableCards API.

```js
async enableCards({ cards, fetchLatest });
```
**Kind**: static method of [<code>mstrHyper</code>](#mstrHyper)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| cards | <code>Array</code> |  | a list of cards to be enabled [{id: string, projectId: string}] |
| fetchLatest | <code>boolean</code> | <code>false</code> | boolean value specify whether to fetch the latest cardlist and card data from server. |


For more information, check [the API documents](../api.md).

*Example:*
``` js
const cardsToEnable = [{ "name": "Companies", "id": "51CBD67C11E9E92900000080EF25C5C7", "projectId": "EC70648611E7A2F962E90080EFD58751" }]
mstrHyper.enableCards({ cards: cardsToEnable, fetchLatest: true });
```


#### Using the `disableCards` API to disable selected Hyper Cards

You may disable a list of Hyper Cards at any time by calling the disableCards API.

```js
async disableCards({ cards });
```
**Kind**: static method of [<code>mstrHyper</code>](#mstrHyper)  

For more information, check [the API documents](../api.md).

*Example:*
``` js
const cardsToDisable = [{ "id": "51CBD67C11E9E92900000080EF25C5C7", "projectId": "EC70648611E7A2F962E90080EFD58751" }]
mstrHyper.disableCards({ cards: cardsToDisable, fetchLatest: true });
```
