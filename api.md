
# mstrHyper

Hyper SDK entrypoint class.

**Kind**: global class
## Functions

<dl>
<dt><a href="#start">start(options)</a> ⇒ <code>Promise&lt;Object&gt;</code></dt>
<dd><p>Start the hyper sdk with configurations. It will init the hyper sdk, and login user with the auth options, then enable cards specified in the configurations, if not specified, it will enable all the certified cards or owned cards by default.</p>
</dd>
<dt><a href="#enableSearch">enableSearch(options)</a></dt>
<dd></dd>
<dt><a href="#init">init(options)</a></dt>
<dd><p>Init the hyper sdk with configurations</p>
</dd>
<dt><a href="#ssoLogin">ssoLogin(authMode)</a> ⇒ <code>Promise&lt;string&gt;</code></dt>
<dd><p>Initiate the authentication process for supported Single Sign On
authentication modes(OIDC/SAML/Badge). A new login window
will open automatically; when user is authenticated, the login
window will be closed automatically.</p>
</dd>
<dt><a href="#exportLogs">exportLogs()</a> ⇒ <code>string</code></dt>
<dd><p>Export logs</p>
</dd>
<dt><a href="#enableCards">enableCards(cards)</a> ⇒ <code>Promise&lt;Object&gt;</code></dt>
<dd><p>Enable a list of cards</p>
</dd>
<dt><a href="#disableCards">disableCards(cards)</a></dt>
<dd><p>Disable a list of cards</p>
</dd>
<dt><a href="#searchKeyword">searchKeyword(searchTerm)</a> ⇒ <code>Object</code></dt>
<dd><p>Searches all enabled cardsets for a searchTerm and returns the results in an object</p>
</dd>
<dt><a href="#hideCard">hideCard(nodeToRenderTo)</a></dt>
<dd><p>Hides hyper card in a given node</p>
</dd>
<dt><a href="#showCard">showCard(nodeToRenderTo, elementId, cardUID)</a> ⇒ <code>IframeCard</code></dt>
<dd><p>Renders a hyper card to the given node</p>
</dd>
<dt><a href="#mergeSearchResults">mergeSearchResults(searchResultPromises)</a> ⇒ <code>object</code></dt>
<dd><p>Merges search results and returns one object containing concatenated primaryResults and alternateResults</p>
</dd>
</dl>

<a name="start"></a>

## start(options) ⇒ <code>Promise&lt;Object&gt;</code>
Start the hyper sdk with configurations. It will init the hyper sdk, and login user with the auth options, then enable cards specified in the configurations, if not specified, it will enable all the certified cards or owned cards by default.

**Kind**: global function
**Returns**: A promise of Object represent which card is enabled and which card meet error when enable it.
```
{
	enabledCards: { cardId: string; projectId: string; name: string }[];
	errors: {
		cardId: string;
		projectId: string;
		name: string;
		error: { name: string; message: string; type: string };
	}[];
}
```

| Param                                   | Type                                   | Default                | Description                                                                  |
| --------------------------------------- | -------------------------------------- | ---------------------- | ---------------------------------------------------------------------------- |
| options                                 | <code>object</code>                    |                        | an configuration object configuring the mstrHyper App                        |
| [options.server]                        | <code>string</code>                    |                        | server url, for example https://demo.microstrategy.com/MicroStrategyLibrary  |
| [options.auth.authMode]                 | <code>mstrHyper.AUTH_MODES</code>      |                        | authentication mode                                                          |
| [options.auth.username]                 | <code>string</code>                    |                        | username                                                                     |
| [options.auth.password]                 | <code>string</code>                    |                        | password                                                                     |
| [options.auth.authToken]                | <code>string</code>                    |                        | authtoken                                                                    |
| [options.auth.onSessionError]           | <code>function</code>                  |                        | a callback function that be used to handle session error and recover session |
| [options.cards]                         | <code>Array</code>                     |                        | a list of cards to be enabled when using SDK                                 |
| [options.logLevel]                      | <code>mstrHyper.LOG_LEVELS</code>      | <code>"error"</code>   | logLevel ["error", "warn", "info"]                                           |
| [options.highlighting.type]             | <code>mstrHyper.HIGHLIGHT_TYPES</code> | <code>"overlay"</code> | type ["insertion", "overlay"]                                                |
| [options.highlighting.highlightIframes] | <code>boolean</code>                   | <code>true</code>      | whether to highlight iframes                                                 |
| [options.searching]                     | <code>object</code>                    |                        | optional callback functions for handling search                              |
| [options.searching.onSearch]            | <code>object</code>                    |                        | callback for handling incremental search result                              |
| [options.searching.onSort]              | <code>object</code>                    |                        | callback for handling sort event                                             |
| [options.searchEnabled]                 | <code>boolean</code>                   |                        | flag to have search feature enabled, false by default                        |

<a name="enableSearch"></a>

## enableSearch(options)
**Kind**: global function

| Param                        | Type                  | Description                                           |
| ---------------------------- | --------------------- | ----------------------------------------------------- |
| options                      | <code>object</code>   | an configuration object configuring the mstrHyper App |
| [options.searching]          | <code>function</code> | optional callback function for incremental search     |
| [options.searching.onSearch] | <code>object</code>   | callback for handling incremental search result       |
| [options.searching.onSort]   | <code>object</code>   | callback for handling sort event                      |

<a name="init"></a>

## init(options)
Init the hyper sdk with configurations

**Kind**: global function

| Param                                   | Type                                   | Default                | Description                                                                 |
| --------------------------------------- | -------------------------------------- | ---------------------- | --------------------------------------------------------------------------- |
| options                                 | <code>object</code>                    |                        | an configuration object configuring the mstrHyper App                       |
| [options.server]                        | <code>string</code>                    |                        | server url, for example https://demo.microstrategy.com/MicroStrategyLibrary |
| [options.logLevel]                      | <code>mstrHyper.LOG_LEVELS</code>      | <code>"error"</code>   | logLevel ["error", "warn", "info"]                                          |
| [options.highlighting.type]             | <code>mstrHyper.HIGHLIGHT_TYPES</code> | <code>"overlay"</code> | type ["insertion", "overlay"]                                               |
| [options.highlighting.highlightIframes] | <code>boolean</code>                   | <code>true</code>      | whether to highlight iframes                                                |

<a name="ssoLogin"></a>

## ssoLogin(authMode) ⇒ <code>Promise&lt;string&gt;</code>
Initiate the authentication process for supported Single Sign On
authentication modes(OIDC/SAML/Badge). A new login window
will open automatically; when user is authenticated, the login
window will be closed automatically.

**Kind**: global function
**Returns**: A promise of the `authToken` associated with the opened session.
**Params**: authMode: specify the single-sign-on authMode to use, see
 `mstrHyper.AUTH_MODES`.
<a name="exportLogs"></a>

## exportLogs() ⇒ <code>string</code>
Export logs

**Kind**: global function
**Returns**: <code>string</code> - a string contains all the logs
<a name="enableCards"></a>

## enableCards(cards) ⇒ <code>Promise&lt;Object&gt;</code>
Enable a list of cards

**Kind**: global function
**Returns**: A promise of Object represent which card is enabled and which card meet error when enable it.
```
{
	enabledCards: { cardId: string; projectId: string; name: string }[];
	errors: {
		cardId: string;
		projectId: string;
		name: string;
		error: { name: string; message: string; type: string };
	}[];
}
```

| Param | Type               | Description                                                                 |
| ----- | ------------------ | --------------------------------------------------------------------------- |
| cards | <code>Array</code> | a list of cards to be enabled in an array [{id: string, projectId: string}] |


<a name="disableCards"></a>

## disableCards(cards)
Disable a list of cards

**Kind**: global function

| Param | Type               | Description                    |
| ----- | ------------------ | ------------------------------ |
| cards | <code>Array</code> | a list of cards to be disabled |

<a name="searchKeyword"></a>

## searchKeyword(searchTerm) ⇒ <code>Object</code>
Searches all enabled cardsets for a searchTerm and returns the results in an object

**Kind**: global function
**Returns**: <code>Object</code> - Containing { searchId, searchPromises}
searchId can be used to handle incremental results in custom callback functions.
searchPromises contains an array of promises that will resolve to search results.

| Param      | Type                | Description        |
| ---------- | ------------------- | ------------------ |
| searchTerm | <code>String</code> | a string to search |

<a name="hideCard"></a>

## hideCard(nodeToRenderTo)
Hides hyper card in a given node

**Kind**: global function

| Param          | Type             |
| -------------- | ---------------- |
| nodeToRenderTo | <code>ref</code> |

<a name="showCard"></a>

## showCard(nodeToRenderTo, elementId, cardUID) ⇒ <code>IframeCard</code>
Renders a hyper card to the given node

**Kind**: global function
**Returns**: <code>IframeCard</code> - Iframe card object for custom manipulation if desired

| Param          | Type                |
| -------------- | ------------------- |
| nodeToRenderTo | <code>ref</code>    |
| elementId      | <code>string</code> |
| cardUID        | <code>string</code> |

<a name="mergeSearchResults"></a>

## mergeSearchResults(searchResultPromises) ⇒ <code>object</code>
Merges search results and returns one object containing concatenated primaryResults and alternateResults

**Kind**: global function
**Returns**: <code>object</code> - { primaryResults, alternateResults} where primaryResults are all of the cards whose
primary titles match the search term and alternateResults are all of the cards whose alternate titles match
the search term.

| Param                | Type                               | Description                                     |
| -------------------- | ---------------------------------- | ----------------------------------------------- |
| searchResultPromises | <code>Array.&lt;Promise&gt;</code> | array of promises containing the search results |
