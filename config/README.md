# Configuration and Customization

* [Initialize Hyper SDK](#initialize-hyper-sdk)
* [Authentication Configurations](#authentication-configurations)
* [Enable and Disable Cards](#enable-and-disable-cards)
* [Search](#search)
* [Highlight Settings](#highlight-settings)
* [Error Handling](#error-handling)

## Initialize Hyper SDK

### Loading the main Hyper SDK JavaScript bundle

The first step is to load the Hyper SDK's main JavaScript bundle. You can do it by adding the code snippet below to your web pages.

```html
<script
  type="text/javascript"
  src="{YOUR_LIBRARY_SERVER_URL}/static/hyper/sdk/js/mstr_hyper.bundle.js"></script>
```

[It’s a good practice](https://developers.google.com/apps-script/guides/html/best-practices#load_javascript_last) to put the above code snippet before the close tag of the body element: `</body>`.

### Initialization

For Hyper SDK to work, it needs to connect to the MicroStrategy Library Server and download the HyperIntelligence Cards. Next, add the following code snippet to your web pages to initialize the Hyper SDK.

```html
<script>
  window.addEventListener('load', function () {
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

> Please replace Library server url with your MCI instance url.
> e.g. *https://mci-xxx.hypernow.microstrategy.com/MicroStrategyLibrary*

Regarding how to create a HyperIntelligence Service instance, please refer to [HyperIntelligence](https://www.microstrategy.com/en/hyperintelligence).

For more information about the `mstrHyper.start()`, check [the API documents](../api.md).

> Both of the main Hyper SDK JavaScript bundle and the code snippet above must be added to ALL of the web pages that you want HyperIntelligence to be enabled.

## Authentication Configurations

### Supported Authentication Modes

Currently, Hyper SDK supports below authentication modes:

* OIDC
* Guest
* Standard (*see the note below*)
* SAML

*Read more about [authentication mode](https://www2.microstrategy.com/producthelp/2019/Library/en-us/Content/Modes_of_authentication.htm)*.

> **NOTE**
>
> For security reasons, the user and password should not be written directly
> on the JavaScript code to prevent it from being visible to all users.
> A more secure way to use the Standard authentication mode would be present
> a login form and collect the credentials from your website's visitors, then
> pass the credentials to the `mstrHyper.start` function, like below:
>
> ```html
> <div>
>   <input type="text" id="username" placeholder="Enter username">
>   <input type="password" id="password" placeholder="Enter password">
>   <button type="button" id="hyper-sdk-login">Sign In</button>
> </div>
> <script>
>   document
>     .getElementById('hyper-sdk-login')
>     .addEventListener('click', function () {
>       var username = document.getElementById('username').value;
>       var password = document.getElementById('password').value;
>       mstrHyper
>         .start({
>           server: 'https://demo.microstrategy.com/MicroStrategyLibrary/',
>           auth: {
>             authMode: mstrHyper.AUTH_MODES.STANDARD,
>             username: username,
>             password: password
>           }
>         })
>         .then(function () {
>           console.log('MicroStrategy HyperIntelligence is initialized.');
>         })
>         .catch(function (error) {
>           console.error(error);
>         });
>     });
> </script>
> ```

### Session Management

There are two ways to establish a MicroStrategy Library Server session for Hyper SDK:

#### Let Hyper SDK manage the session

You can provide the necessary authentication information and let the Hyper SDK manage the session.

You must choose one of the supported authentication modes and determine whether a session should be created automatically during initialization. See the sample code below:

```html
<script>
  window.addEventListener('load', function () {
    mstrHyper
      .start({
        server: 'https://demo.microstrategy.com/MicroStrategyLibrary/',
        auth: {
          // Choose the authentication mode to use.
          // For your convenience, you can specify the authentication mode
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

The Hyper SDK always reuses the Library Server session if it exists, otherwise it tries to open a Library Server session automatically. For Single-Sign-On authentication modes such as `OIDC`, it might not be able to open a Library Server session automatically, because most likely both of the Library Server and the Single-Sign-On authentication server live in different domains from the website. In this case, the Hyper SDK could open a Library Server session automatically only if all of following requirements are satisfied:

* The user is logged into the Single-Sign-On authentication server.

  > Log into the Single-Sign-On authentication server requires user interactions and can't be done automatically.

* If the authentication mode is SAML/OIDC, the Single-Sign-On authentication server musts live in the same domain and allow to be embedded in the website. For more information , check [X-Frame-Options](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options).
* The Library Server must live in the same domain of the website or has [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) enabled, check the [CORS Requirements](#cors-requirements) for details.
* The Library Server should have enabled `https` and set both of `SameSite=None` and `Secure` attributes to its cookies. For more information about the cookie `SameSite` attribute, check [SameSite cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite).

You can specify the `onSessionError` function to handle the authentication errors. With `onSessionError` you can define your own way to open the Library Server session as well, `mstrHyper.login` and `mstrHyper.ssoLogin` APIs are available for your convenience. For more information about the login APIs, check [the API documents](../api.md). For instance, below sample code uses `OIDC` authentication mode and opens the login window with `mstrHyper.ssoLogin`:

```html
<script type="text/javascript" src="https://demo.microstrategy.com/hypersdk/js/mstr_hyper.bundle.js"></script>
<script>
  window.addEventListener('load', function () {
    mstrHyper.start({
        server: 'https://demo.microstrategy.com/MicroStrategyLibrary/',
        auth: {
          authMode: mstrHyper.AUTH_MODES.OIDC,
          onSessionError: function (error) {
            // Print the authentication error.
            console.log(error);
            // Open a new window for user to login.
            return mstrHyper.ssoLogin(mstrHyper.AUTH_MODES.OIDC);
          }
        },
        searchEnabled: true
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

##### CORS Requirements

The Cross-Origin Resource Sharing (CORS) standard works by adding new [HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers) that let servers describe which origins are permitted to read that information from a web browser.

* The Library Server must accept preflight requests of the HTTP [OPTIONS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/OPTIONS) request method.
* The Library Server must respond the requests with below headers:
  * `Access-Control-Allow-Credentials`: the value must be `true` (case-sensitive).
  * `Access-Control-Allow-Origin`: the value must be the `origin` from the request, `*` wildcard must not be used.
  * `Vary`: the value must be `Origin`.
  * `Access-Control-Allow-Methods`: the value must include `GET, POST, PUT, DELETE, OPTIONS`.
  * `Access-Control-Allow-Headers`: the value must include `Content-Type, Content-Length, Authorization, X-Requested-With, X-MSTR-AuthToken, X-MSTR-Total-Count, X-MSTR-ProjectID`.
  * `Access-Control-Expose-Headers`: the value must include `Content-Type, Content-Length, X-MSTR-AuthToken, X-MSTR-Total-Count`.

#### Your web application manages the session

Alternatively, your website can establish a MicroStrategy Library Server session and pass it to Hyper SDK. With this method, you can:

* Pass the authToken of the session to Hyper SDK during initialization.
* *Or* leave authToken to null but call mstrHyper.login at the time you choose.

> **What is the `authToken`?**
>
> The authToken is short for &quot;authorization token&quot;. It is made of a few random characters that represent a session for a particular user account. For more information, check the [/api/auth/login](https://demo.microstrategy.com/MicroStrategyLibrary/api-docs/index.html#/Authentication/postLogin) RESTful API of MicroStrategy Library Server.

When the MicroStrategy Library Server session times out, you’ll need to make a new session and pass the new `authToken` to the Hyper SDK in the `onSessionError` callback function.

*Example:*

```html
<script>
  window.addEventListener('load', function () {
    mstrHyper
      .start({
        server: 'https://demo.microstrategy.com/MicroStrategyLibrary/',
        auth: {
          // Provide the authentication token to Hyper SDK.
          authToken: 'a1b2c3d4e5f6'
        },
        // Tells Hyper SDK what to do when session errors,
        // It's an asynchronous handler, you could:
        // - Optionally perform cleanups actions;
        // - Or present a login dialog to the end user.
        // Eventually you should return a promise of a new authToken.
        onSessionError: function (authError) {
          console.error(authError);
          return mstrHyper.login({
            auth: {
              // Provide a new authentication token to Hyper SDK.
              authToken: 'a1b2c3d4e5f6'
            }
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

By default, Hyper SDK enables all the Hyper Cards that are available to the users. If you want to enable a selected list of HyperIntelligence Cards, you can list them in the initialization settings.

### Enable selected cards during initialization

You can specify the `cards` parameter to let SDK know the list of cards the app wants to enable when it calls `mstrHyper.start()`.
> If the **cards** parameter is not specified, the SDK will load all
> available cards for the logged in user, including:
>
> * All certified cards
> * All non-certified cards created by the current user

E.g. we have 2 certified cards on server from the same project id: `EC70648611E7A2F962E90080EFD58751`, and the metadata(card) ids are: `51CBD67C11E9E92900000080EF25C5C7` and `692CC6C011EA07CC00000080EF3532F5`. The parameter configuration could look like:

```html
<script>
  window.addEventListener('load', function () {
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

### Using the `enableCards` API to enable selected Hyper Cards

After starting the SDK, you may enable a list of Hyper Cards at any time with the enableCards API.

```js
async enableCards( cards );
```

**Kind**: static method of [<code>mstrHyper</code>](#mstrHyper)

| Param | Type               | Default | Description                                                     |
| ----- | ------------------ | ------- | --------------------------------------------------------------- |
| cards | <code>Array</code> |         | a list of cards to be enabled [{id: string, projectId: string}] |

For more information, check [the API documents](../api.md).

*Example:*

``` js
const cardsToEnable = [{ "name": "Companies", "id": "51CBD67C11E9E92900000080EF25C5C7", "projectId": "EC70648611E7A2F962E90080EFD58751" }]
mstrHyper.enableCards(cardsToEnable);
```

### Using the `disableCards` API to disable selected Hyper Cards

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

## Search

### Enable Search

To enable Search api functionality, you can include a searchEnabled flag in the `mstrHyper.start` call or separately enable the functionality.  Both ways accept optional callback functions within the option object called `searching` with values `onSearch` and `onSort`.

```html
<script>
  mstrHyper.start({
    ...,
    searchEnabled: true,
    searching : { onSearch, onSort },
  });
</script>
```

```html
<script>
  mstrHyper.enableSearch(options);
</script>
```

### Execute Search

To execute a search query, call `mstrHyper.searchKeyword()`.  This will return an object containing an array of promises which result to partial search results as well as a `searchId`. The `searchId` can be used within the custom callbacks to handle real time result handling.  To merge the array of promises into one search result list, use the `mstrHyper.mergeSearchResults()` function. The return value of `mergeSearchResults` will be an object containing two fields, `primaryResults` (matched carsd on primiary titles) and `alternateResults` (matched cards on alternate titles). See `api.md` for more specific details.

```html
<script>
  let r = await mstrHyper.searchKeyword(searchTerm);
  let {primaryResults, alternateResults} = await mstrHyper.mergeSearchResults(r.searchResults);
</script>
```

### Render Card

To render a card, provide the html `node` to render to, `cardUID` (ref value of search result), and card `elementID` (cardSetId value of search result) to the `showCard()` function.  To hide the card, provide the node that the card is rendered in to the `hideCard()` function. Note that these functionalities are meant to be used with one card per node.  Multiple cards per node may cause undefined behavior.

```html
<script>
  //Render the first primary result to node
  let node =  document.getElementById('your-node-id');
  await mstrHyper.showCard({elementId: primaryResults[0].ref, cardUID: primaryResults[0].cardSetId, nodeToRenderTo: node});
</script>
```

## Highlight Settings

### Specify highlighting type
The Hyper Intelligence SDK supports two different techniques to highlight or underline keywords on a webpage.
- `insertion`
  This is the `default` highlighting or underlining style that is enabled for most of the webpages.
- `overlay`
Instead of directly modifying the HTML of the page, a new highlighting container is created, which is then overlayed on top of the keywords.

An example of specifiying `overlay` as the highlighting method:
```html
<script>
  window.addEventListener('load', function () {
    mstrHyper
      .start({
        server: 'https://demo.microstrategy.com/MicroStrategyLibrary/',
        auth: {
          authMode: mstrHyper.AUTH_MODES.GUEST
        },
        highlighting: {
          // Highlight iframes, `false` by default.
          type: 'overlay'
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

### Whether to highlight iframes

A web page can embed another web page with the `iframe` tag in HTML. You may choose to let Hyper SDK highlight the nested web pages by setting `highlightIframes` to `true`.

```html
<script>
  window.addEventListener('load', function () {
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

If there is any error while using Hyper SDK, the error object will be thrown as specified below:

### Error Object

```js
const Error = {
  name,  // value of enum ErrorNames
  message, //string, error message
  type, // value of enum ErrorTypes
  cause, // Error Object, the root cause of the error
  toJSON, // function to print the name, message and type
}
```

### Error Names

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

For `AuthenticationError`, the default error type is ErrorTypes.AUTH_FAILED , Additionally, it could also have error types of

| Downloading Card Error             |
| ---------------------------------- |
| `ErrorTypes.INVALID_AUTH_MODE`     |
| `ErrorTypes.TAB_OPENNING_BLOCKED`  |
| `ErrorTypes.LACK_OF_PRIVILEGE`     |
| `ErrorTypes.INCORRECT_CREDENTIALS` |

For `ServerUnreachableError`, the default error type is `ErrorTypes.SERVER_UNREACHABLE`.

For `SessionError`, the default error type is `ErrorTypes.SESSION_TIMEOUT`.

For `CardError`, the default error type is `ErrorTypes.CARD_NOT_AVAILABLE`. Additionally, it could also have error types of:

| Downloading Card Error    |
| ------------------------- |
| NO_KPI_DATA               |
| CARD_NOT_AVAILABLE        |
| NO_CARD_PRIVILEGES        |
| NO_CARDS_RETRIEVED        |
| MEMORY_EXCEEDED           |
| NO_TITLE_FORM_AVAILABLE   |
| UNSUPPORTED_CARD_VERSION  |
| UNSUPPORTED_CARD_TEMPLATE |
| NO_ELEMENT_DATA           |

| Hovering Card Error      |
| ------------------------ |
| CARD_DOES_NOT_EXIST      |
| ACCESS_TO_CARD_DENIED    |
| CARD_CUBE_NOT_PUBLISHED  |
| MISSING_KEY_ATTRIBUTE    |
| LOCKED_ATTRIBUTE_IN_CARD |
