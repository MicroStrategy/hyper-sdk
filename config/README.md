# Configuration and Customization

* [Initialize HyperIntelligence SDK](#initialize-hyper-sdk)
* [Authentication Configurations](#authentication-configurations)
* [Enable and Disable Cards](#enable-and-disable-cards)
* [Highlight Settings](#highlight-settings)
* [Error Handling](#error-handling)

## Initialize HyperIntelligence SDK

### Loading the main HyperIntelligence SDK JavaScript bundle

The first step is to load the HyperIntelligence SDK's main JavaScript bundle. You can do it by adding the code snippet below to your web pages.

```html
<script
  type="text/javascript"
  src="{YOUR_LIBRARY_SERVER_URL}/static/hyper/sdk/js/mstr_hyper.bundle.js"></script>

```

[It’s a good practice](https://developers.google.com/apps-script/guides/html/best-practices#load_javascript_last) to put the above code snippet before the close tag of the body element: `</body>`.

### Initialize HyperIntelligence SDK

For HyperIntelligence SDK to work, it needs to connect to the MicroStrategy Library Server and download the HyperIntelligence Cards. Next, add the following code snippet to your web pages to initialize the HyperIntelligence SDK.

```html
<script>
  window.addEventListener('DOMContentLoaded', function () {
    mstrHyper
      .start({
        // Change the URL to your own Library Server's base URI.
        server: 'https://demo.microstrategy.com/MicroStrategyLibrary/',
        // Authentication customizations, see the API documents.
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

>Please replace Library server url with your MCI instance url.
e.g. *https://mci-xxx.hypernow.microstrategy.com/MicroStrategyLibrary*
Regarding how to create a HyperIntelligence Service instance, please refer to [HyperIntelligence](https://www.microstrategy.com/en/hyperintelligence).

For more information about the `mstrHyper.start()`, check [the API documents](../api.md).

> Both of the main HyperIntelligence SDK JavaScript bundle and the code snippet above must be added to ALL of the web pages that you want HyperIntelligence to be enabled.


## Authentication Configurations

### Supported Authentication

Currently, HyperIntelligence SDK supports below authentication modes:
- OIDC
- Guest
- Standard

#### Session Management

There are two ways to establish a MicroStrategy Library Server session for HyperIntelligence SDK:

##### Let HyperIntelligence SDK manage the session

You can provide the necessary authentication information and let the HyperIntelligence SDK manage the session.

You must choose one of the supported authentication modes and determine whether a session should be created automatically during initialization. See the sample code below:

```html
<script>
  window.addEventListener('DOMContentLoaded', function () {
    mstrHyper
      .start({
        server: 'https://demo.microstrategy.com/MicroStrategyLibrary/',
        auth: {
          // Choose the authentication mode to use.
          // For your convenience, you can specify the autentication mode
          // with `mstrHyper.AUTH_MODES`.
          authMode: mstrHyper.AUTH_MODES.OIDC
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
*Read more about [authentication mode](https://www2.microstrategy.com/producthelp/2019/Library/en-us/Content/Modes_of_authentication.htm)*

When you don&apos;t want HyperIntelligence SDK to authenticate the end-user and establish a session during the initialization, you can set `authLogin` to `false` and invoke `mstrHyper.login` API whenever you want.

For more information about the `mstrHyper.login` API, check [the API documents](../api.md).

#### Your web application manages the session

Alternatively, your website can establish a MicroStrategy Library Server session and pass it to HyperIntelligence SDK. With this method, you can:

- Pass the authToken of the session to HyperIntelligence SDK during initialization.
- *Or* leave authToken to null but call mstrHyper.login at the time you choose.

> **What is the `authToken`?**
>
> The authToken is short for &quot;authorization token&quot;. It is made of a few random characters that represent a session for a particular user account. For more information, check the [/api/auth/login](https://demo.microstrategy.com/MicroStrategyLibrary/api-docs/index.html#/Authentication/postLogin) RESTful API of MicroStrategy Library Server.

When the MicroStrategy Library Server session times out, you’ll need to make a new session and pass the new `authToken` to the HyperIntelligence SDK in the `onSessionError` callback function.

*Example:*
```html
<script>
  window.addEventListener('DOMContentLoaded', function () {
    mstrHyper
      .start({
        server: 'https://demo.microstrategy.com/MicroStrategyLibrary/',
        auth: {
          // Provide the authentication token to HyperIntelligence SDK.
          authToken: 'a1b2c3d4e5f6'
        },
        // Tells HyperIntelligence SDK what to do when session errors,
        // It's an asynchronous handler, you could:
        // - Optionally perform cleanups actions;
        // - Or present a login dialog to the end user.
        // Eventually you should return a promise of a new authToken.
        onSessionError: function (authError) {
          console.error(authError);
          return mstrHyper.login({
            auth: {
            // Provide a new authentication token to HyperIntelligence SDK.
            authToken: 'a1b2c3d4e5f6'
        },
          });
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

For more details about `auth` configurations, see [the API documents](../api.md).




## Enable and Disable Cards

By default, HyperIntelligence SDK enables all the Hyper Cards that are available to the users. If you want to enable a selected list of HyperIntelligence Cards, you can list them in the initialization settings.

#### Enable selected cards during initialization

You can specify the `cards` paramater to let SDK know the list of cards the app wants to enable when it calls `mstrHyper.start()`.
> If the **cards** paramater is not specified, the SDK will load all available cards for the logged in user, including:
>- All certified cards
>- All non-certified cards created by the current user

E.g. we have 2 certified cards on server from the same project id: `EC70648611E7A2F962E90080EFD58751`, and the metadata(card) ids are: `51CBD67C11E9E92900000080EF25C5C7` and `692CC6C011EA07CC00000080EF3532F5`. The parameter configuration could look like:

```html
<script>
  window.addEventListener('DOMContentLoaded', function () {
    mstrHyper
      .start({
        server: 'https://demo.microstrategy.com/MicroStrategyLibrary/',
        auth: {
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
async enableCards( cards );
```
**Kind**: static method of [<code>mstrHyper</code>](#mstrHyper)

| Param       | Type                 | Default            | Description                                                                           |
| ----------- | -------------------- | ------------------ | ------------------------------------------------------------------------------------- |
| cards       | <code>Array</code>   |                    | a list of cards to be enabled [{id: string, projectId: string}]                       |



For more information, check [the API documents](../api.md).

*Example:*
``` js
const cardsToEnable = [{ "name": "Companies", "id": "51CBD67C11E9E92900000080EF25C5C7", "projectId": "EC70648611E7A2F962E90080EFD58751" }]
mstrHyper.enableCards(cardsToEnable);
```


#### Using the `disableCards` API to disable selected Hyper Cards

You may disable a list of Hyper Cards at any time by calling the disableCards API.

```js
async disableCards( cards );
```
**Kind**: static method of [<code>mstrHyper</code>](#mstrHyper)

For more information, check [the API documents](../api.md).

*Example:*
``` js
const cardsToDisable = [{ "id": "51CBD67C11E9E92900000080EF25C5C7", "projectId": "EC70648611E7A2F962E90080EFD58751" }]
mstrHyper.disableCards(cardsToDisable);
```




## Highlight Settings

### Whether to highlight iframes

A web page can embed another web page with the `iframe` tag in HTML. You may choose to let HyperIntelligence SDK highlight the nested web pages by setting `highlightIframes` to `true`.

```html
<script>
  window.addEventListener('DOMContentLoaded', function () {
    mstrHyper
      .start({
        server: 'https://demo.microstrategy.com/MicroStrategyLibrary/',
        auth: {
          authMode: mstrHyper.AUTH_MODES.GUEST
        },
        highlighting: {
          // Highlight iframes, `false` by default.
          highlightIframes: true
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




## Error Handling
If there is any error while using HyperIntelligence SDK, the error object will be thrown as specificied below:

**Error Object**

```js
const Error = {
  name,  // value of enum ErrorNames
  message, //string, error message
  type, // value of enum ErrorTypes
  cause, // Error Object, the root cause of the error
  toJSON, // function to print the name, message and type
}
```

**Error Names**
```js
const ErrorNames = {
  SERVER_UNREACHABLE_ERROR: 'ServerUnreachableError',
  SESSION_ERROR: 'SessionError',
  CARD_ERROR: 'CardError',
  AUTHENTICATION_ERROR: 'AuthenticationError'
}
```

`AuthenticationError` will be thrown when there is an error either authenticating user with login API or using start API.

`ServerUnreachableError` will be thrown if it times out when connecting with the MicroStrategy Library server.

`SessionError` will be thrown after user logins successfully, and sending rest api calls to the MicroStrategyLibrary server causes an error.

`CardError` will be thrown when there is error either downloading the card data, getting the card html content, or having the quota exceeded to store card data.


For `AuthenticationError`, the default errortype is ErrorTypes.AUTH_FAILED , Additionally, it could also have error types of

| Downloading Card Error |
|------------------------|
| `ErrorTypes.INVALID_AUTH_MODE` |
| `ErrorTypes.TAB_OPENNING_BLOCKED` |
| `ErrorTypes.LACK_OF_PRIVILEGE` |
| `ErrorTypes.INCORRECT_CREDENTIALS` |

For `ServerUnreachableError`, the default error type is `ErrorTypes.SERVER_UNREACHABLE`.

For `SessionError`, the default error type is `ErrorTypes.SESSION_TIMEOUT`.

For `CardError`, the default error type is `ErrorTypes.CARD_NOT_AVAILABLE`. Additionally, it could also have error types of:

| Downloading Card Error |
|------------------------|
| NO_KPI_DATA|
| CARD_NOT_AVAILABLE|
| NO_CARD_PRIVILEGES|
| NO_CARDS_RETRIEVED|
| MEMORY_EXCEEDED|
| NO_TITLE_FORM_AVAILABLE |
| UNSUPPORTED_CARD_VERSION |
| UNSUPPORTED_CARD_TEMPLATE |
| NO_ELEMENT_DATA |


| Hovering Card Error|
|------------------------|
| CARD_DOES_NOT_EXIST|
| ACCESS_TO_CARD_DENIED|
| CARD_CUBE_NOT_PUBLISHED|
| MISSING_KEY_ATTRIBUTE|
| LOCKED_ATTRIBUTE_IN_CARD|
