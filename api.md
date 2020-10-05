<a name="mstrHyper"></a>

## mstrHyper
HyperIntelligence SDK entrypoint class.

**Kind**: global class  

- [mstrHyper](#mstrhyper)
  - [mstrHyper.start(options)](#mstrhyperstartoptions)
  - [mstrHyper.init(options)](#mstrhyperinitoptions)
  - [mstrHyper.login(authOptions)](#mstrhyperloginauthoptions)
  - [mstrHyper.isLoggedIn() ⇒ <code>boolean</code>](#mstrhyperisloggedin--boolean)
  - [mstrHyper.exportLogs() ⇒ <code>string</code>](#mstrhyperexportlogs--string)
  - [mstrHyper.enableCards(cards)](#mstrhyperenablecardscards)
  - [mstrHyper.disableCards(cards)](#mstrhyperdisablecardscards)

<a name="mstrHyper.start"></a>

### mstrHyper.start(options)
Start the hyper sdk with configurations. It will init the hyper sdk, and login user with the auth options, then enable cards specified in the configurations, if not specified, it will enable all the certified cards or owned cards by default.

**Kind**: static method of [<code>mstrHyper</code>](#mstrHyper)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>object</code> |  | an configuration object configuring the mstrHyper App |
| [options.server] | <code>string</code> |  | server url, for example https://demo.microstrategy.com/MicroStrategyLibrary |
| [options.auth.authMode] | <code>mstrHyper.AUTH\_MODES</code> |  | authentication mode |
| [options.auth.username] | <code>string</code> |  | username |
| [options.auth.password] | <code>string</code> |  | password |
| [options.auth.authToken] | <code>string</code> |  | authtoken |
| [options.auth.onSessionError] | <code>function</code> |  | a callback function that be used to handle session error and recover session |
| [options.cards] | <code>Array</code> |  | a list of cards to be enabled when using SDK |
| [options.logLevel] | <code>mstrHyper.LOG\_LEVELS</code> | <code>&#x27;error&#x27;</code> | logLevel ["error", "warn", "info"] |
| [options.highlighting.highlightIframes] | <code>boolean</code> | <code>true</code> | whether to highlight iframes |

<a name="mstrHyper.init"></a>

### mstrHyper.init(options)
Init the hyper sdk with configurations

**Kind**: static method of [<code>mstrHyper</code>](#mstrHyper)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>object</code> |  | an configuration object configuring the mstrHyper App |
| [options.server] | <code>string</code> |  | server url, for example https://demo.microstrategy.com/MicroStrategyLibrary |
| [options.logLevel] | <code>mstrHyper.LOG\_LEVELS</code> | <code>&#x27;error&#x27;</code> | logLevel ["error", "warn", "info"] |
| [options.highlighting.highlightIframes] | <code>boolean</code> | <code>true</code> | whether to highlight iframes |

<a name="mstrHyper.login"></a>

### mstrHyper.login(authOptions)
Login to get valid authToken

**Kind**: static method of [<code>mstrHyper</code>](#mstrHyper)  

| Param | Type | Description |
| --- | --- | --- |
| authOptions | <code>object</code> | authentication options |
| [authOptions.authMode] | <code>mstrHyper.AUTH\_MODES</code> | authentication mode: OIDC|STANDARD|GUEST |
| [authOptions.username] | <code>string</code> | username |
| [authOptions.password] | <code>string</code> | password |
| [authOptions.authToken] | <code>string</code> | authtoken |
| [authOptions.onSessionError] | <code>function</code> | a callback function that be used to handle session error and recover session during enableCards or hovering card |

<a name="mstrHyper.isLoggedIn"></a>

### mstrHyper.isLoggedIn() ⇒ <code>boolean</code>
Checking whether the SDK has been logged in

**Kind**: static method of [<code>mstrHyper</code>](#mstrHyper)  
**Returns**: <code>boolean</code> - indicate whether the SDK has logged in  
<a name="mstrHyper.exportLogs"></a>

### mstrHyper.exportLogs() ⇒ <code>string</code>
Export logs

**Kind**: static method of [<code>mstrHyper</code>](#mstrHyper)  
**Returns**: <code>string</code> - a string contains all the logs  
<a name="mstrHyper.enableCards"></a>

### mstrHyper.enableCards(cards)
Enable a list of cards

**Kind**: static method of [<code>mstrHyper</code>](#mstrHyper)  

| Param | Type | Description |
| --- | --- | --- |
| cards | <code>Array</code> | a list of cards to be enabled in an array [{id: string, projectId: string}] |

<a name="mstrHyper.disableCards"></a>

### mstrHyper.disableCards(cards)
Disable a list of cards

**Kind**: static method of [<code>mstrHyper</code>](#mstrHyper)  

| Param | Type | Description |
| --- | --- | --- |
| cards | <code>Array</code> | a list of cards to be disabled |

