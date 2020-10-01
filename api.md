## Classes

<dl>
<dt><a href="#mstrHyper">mstrHyper</a></dt>
<dd><p>The entry class of Hyper SDK</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#exportLogs">exportLogs()</a> ⇒ <code>string</code></dt>
<dd><p>Export logs</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#onSessionError">onSessionError</a> : <code>function</code></dt>
<dd></dd>
</dl>

<a name="mstrHyper"></a>

## mstrHyper
The entry class of Hyper SDK

**Kind**: global class  

- [Classes](#classes)
- [Functions](#functions)
- [Typedefs](#typedefs)
- [mstrHyper](#mstrhyper)
  - [mstrHyper.start(options)](#mstrhyperstartoptions)
  - [mstrHyper.login(authOptions)](#mstrhyperloginauthoptions)
  - [mstrHyper.isLoggedIn() ⇒ <code>boolean</code>](#mstrhyperisloggedin--boolean)
  - [mstrHyper.enableCards(options)](#mstrhyperenablecardsoptions)
  - [mstrHyper.disableCards([options])](#mstrhyperdisablecardsoptions)
- [exportLogs() ⇒ <code>string</code>](#exportlogs--string)
- [onSessionError : <code>function</code>](#onsessionerror--function)

<a name="mstrHyper.start"></a>

### mstrHyper.start(options)
Starting the mstrHyper App allows users to start configuring the SDK's settings. This includes logging into the application, configuring which cards to enable, and setting the server url, baseURI and highlight options

**Kind**: static method of [<code>mstrHyper</code>](#mstrHyper)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>object</code> |  | a configuration object configuring the mstrHyper App |
| [options.auth] | <code>object</code> | <code>{}</code> | authentication options |
| [options.auth.authMode] | <code>number</code> |  | authentication mode |
| [options.auth.username] | <code>string</code> |  | username |
| [options.auth.password] | <code>string</code> |  | password |
| [options.auth.authToken] | <code>string</code> |  | authtoken |
| [options.cards] | <code>Array</code> |  | a list of cards to be enabled when using SDK |
| [options.onSessionError] | [<code>onSessionError</code>](#onSessionError) |  | a callback function that be used to recover session |
| [options.logLevel] | <code>string</code> | <code>&quot;&#x27;error&#x27;&quot;</code> | logLevel ["error", "warn", "info"] |
| [options.highlightType] | <code>string</code> | <code>&quot;&#x27;overlay&#x27;&quot;</code> | highlightType ["insertion", "overlay"] |
| [options.highlightIframes] | <code>string</code> | <code>true</code> | whether to highlight iframe |

<a name="mstrHyper.login"></a>

### mstrHyper.login(authOptions)
Login to get a valid authToken

**Kind**: static method of [<code>mstrHyper</code>](#mstrHyper)  

| Param | Type | Description |
| --- | --- | --- |
| authOptions | <code>object</code> | authentication options |
| [authOptions.authMode] | <code>number</code> | authentication mode |
| [authOptions.username] | <code>string</code> | username |
| [authOptions.password] | <code>string</code> | password |
| [authOptions.authToken] | <code>string</code> | authtoken |

<a name="mstrHyper.isLoggedIn"></a>

### mstrHyper.isLoggedIn() ⇒ <code>boolean</code>
Checking whether the user is logged in

**Kind**: static method of [<code>mstrHyper</code>](#mstrHyper)  
**Returns**: <code>boolean</code> - value to indicate whether the user logged in  
<a name="mstrHyper.enableCards"></a>

### mstrHyper.enableCards(options)
Choose a specific set of cards to enable

**Kind**: static method of [<code>mstrHyper</code>](#mstrHyper)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>object</code> |  | options to enables a list of cards |
| options.cards | <code>Array</code> |  | a list of cards to be enabled [{id: string, projectId: string}] |
| [options.fetchLatest] | <code>boolean</code> | <code>false</code> | boolean value specify whether or not to fetch the latest cardlist and card data from the server. |

<a name="mstrHyper.disableCards"></a>

### mstrHyper.disableCards([options])
Choose a specific set of cards to disable

**Kind**: static method of [<code>mstrHyper</code>](#mstrHyper)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [options] | <code>object</code> | <code>{}</code> | options to disable a list of cards |
| options.cards | <code>Array</code> |  | a list of cards to be disabled |

<a name="exportLogs"></a>

## exportLogs() ⇒ <code>string</code>
Export logs

**Kind**: global function  
**Returns**: <code>string</code> - a string containing all the logs  
<a name="onSessionError"></a>

## onSessionError : <code>function</code>
**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| sessionError | <code>object</code> | session error object |

