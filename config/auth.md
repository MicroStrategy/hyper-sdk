# Authentication Configurations

## Supported Authentication

For a list of supported authentication methods, click [here](https://www2.microstrategy.com/producthelp/Current/Hyper/en-us/Content/supported_authentication.htm). 
- [ ] TODO: add a new column for SDK in the table.

## Session Management

There’re two ways to establish a Library Server session for Hyper SDK:

### Let Hyper SDK manage the session

You can provide the necessary authentication information and let the Hyper SDK manage the session.

You must choose one of the [supported authentication mode]([here](https://www2.microstrategy.com/producthelp/Current/Hyper/en-us/Content/supported_authentication.htm)) to use and determine whether a session should be created automatically during initialization. See the sample code below:

```html
<script>
  window.addEventListener('DOMContentLoaded', function () {
    mstrHyper
      .start({
        server: 'https://demo.microstrategy.com/MicroStrategyLibrary/',
        auth: {
          // Tells Hyper SDK to authenticate the user automatically
          // during the initialization.
          autoLogin: true,
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

When you don&apos;t want Hyper SDK to authenticate the end-user and establish a session during the initialization, you can set `authLogin` to `false` and invoke `mstrHyper.login` API whenever you want.

For more information about the `mstrHyper.login` API, check [the API documents](api).

### Your web application manages the session

Alternatively, your website can establish a Library Server session. With this method, you can:

- Either pass the authToken of the session to Hyper SDK during initialization
- Or, leave authToken to null but call mstrHyper.login at the time you choose.

> **What is the `authToken`?**
>
> The authToken is short for &quot;authorization token&quot;. It is made of a few random characters that represent a session for a particular user account. For more information, check the [/api/auth/login](https://demo.microstrategy.com/MicroStrategyLibrary/api-docs/index.html#/Authentication/postLogin) RESTful API of MicroStrategy Library Server.
{.is-info}

When the Library Server session times out, you’ll need to make a new session and pass the new `authToken` to the Hyper SDK in the `onSessionError` callback function.

```html
<script>
  window.addEventListener('DOMContentLoaded', function () {
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
            authMode: mstrHyper.AUTH_MODES.LDAP,
            username: 'username',
            password: 'password'
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

