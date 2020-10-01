# Handling Errors
If there is any error during using Hyper SDK, the error object as below will throw: 

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

`AuthenticationError` will be thrown when there is an error either authenticating user with login API or using start API with autoLogin.

`ServerUnreachableError` will be thrown if it times out when connecting with the MicroStrategyLibrary server.

`SessionError` will be thrown after user logins successfully, and sending rest api calls to the MicroStrategyLibrary server causes an error.

`CardError` will be thrown when there is error either downloading the card data, getting the card html content, or having the quota exceeded to store card data.


For `AuthenticationError`, the default errortype is ErrorTypes.AUTH_FAILED , Additionally, it could also have error types of

`ErrorTypes.INVALID_AUTH_MODE`
`ErrorTypes.TAB_OPENNING_BLOCKED`
`ErrorTypes.LACK_OF_PRIVILEGE`
`ErrorTypes.INCORRECT_CREDENTIALS`

For `ServerUnreachableError`, the default error type is ErrorTypes.SERVER_UNREACHABLE

For `SessionError`, the default error type is ErrorTypes.SESSION_TIMEOUT

For `CardError`, the default error type is ErrorTypes.CARD_NOT_AVAILABLE. Additionally, it could also have error types of

**Downloading Card Error:**
`NO_KPI_DATA`
`CARD_NOT_AVAILABLE`
`NO_CARD_PRIVILEGES`
`NO_CARDS_RETRIEVED`
`MEMORY_EXCEEDED`
`NO_TITLE_FORM_AVAILABLE`
`UNSUPPORTED_CARD_VERSION`
`UNSUPPORTED_CARD_TEMPLATE`
`NO_ELEMENT_DATA`

**Hovering Card Error**
`CARD_DOES_NOT_EXIST`
`ACCESS_TO_CARD_DENIED`
`CARD_CUBE_NOT_PUBLISHED`
`MISSING_KEY_ATTRIBUTE`
`LOCKED_ATTRIBUTE_IN_CARD`