# Prerequisites for Using Hyper SDK

The following prerequisites must be met to use Hyper SDK.

## System Requirements

The Hyper SDK leverages [Strategy REST API](https://lw.microstrategy.com/msdz/MSDL/GARelease_Current/docs/projects/RESTSDK/Content/topics/REST_API/REST_API.htm) and is currently hosted with Strategy Library server instance. You will need to have your application integrated with the Hyper SDK and connected to a Strategy Library server instance in order to consume HyperIntelligence Cards.

**Platform Version Support:**

- [MicroStrategy 2021](https://community.microstrategy.com/s/products)
- [Hyper.Now](https://www.microstrategy.com/en/hyperintelligence)

## Supported Authentication

Currently, Hyper SDK supports:

- OIDC
- Guest
- Standard
- SAML

## Browser Support

| **Browser**     | **Supported Versions** |
| :-------------- | :--------------------- |
| Google Chrome   | v80.0+                 |
| Microsoft Edge  | v80.0+                 |

## Other Prerequisites

### Enable Cross-Origin Resource Sharing (CORS)

> Note: It is not required to enable CORS for Hyper.Now (SaaS)
> environments as it is already enabled on its Library Server.

Cross-Origin Resource Sharing (CORS) provides a way for a web application running in one origin (domain, protocol, and port) to access selected resources from a server in a different origin. A cross-origin HTTP request uses additional HTTP headers to tell the browser to let the web application share resources. For security reasons, browsers restrict cross-origin HTTP requests initiated from within scripts. This means that when a web application requests HTTP resources from a different origin, the response from the other origin must include the right CORS headers.

To enable CORS for the REST Server:

1. Open the Library Admin page. Your URL should be similar to the following:

    ```html
    https://<host_name>:<port>/MicroStrategyLibrary/admin
    ```

2. Navigate to Library Server -> Security Settings.
3. Choose the appropriate setting for Allow Library embedding in other sites to reconfigure CORS.
![picture 1](img/CORS_config.png)

Using the Library Admin page is the easiest way to enable CORS for the REST Server, but you can also configure CORS manually.

1. Navigate to `MicroStrategyLibrary/WEB-INF/classes/config/configOverride.properties`.
2. Edit the configOverride.properties file in a text editor.
3. Add the following lines, or replace them if already present:

    ```yaml
    auth.cors.origins=http://example.com:port
    security.allowedOrigins=http://example.com:port
    ```

4. Restart your Strategy Library web application hosted on the application server.

### SameSite

> Note: It is not required to set SameSite for Hyper.Now (SaaS)
> environments as it is already set to `None` on its Library Server.

Chrome(version 80+) and Edge(version 86+) Web Browser introduce new changes which may impact embedding.

For Hyper SDK to function as expected in a 3rd party context, it is required to explicitly label session cookies with `SameSite=None; Secure`.

For more information, see [Chrome v80 Cookie Behavior and the Impact on Strategy One Deployments](https://community.microstrategy.com/s/article/Chrome-v80-Cookie-Behavior-and-the-impact-on-MicroStrategy-Deployments?language=en_US).
