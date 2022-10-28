# About
Example Project to demonstrate how to use Vue.js with nodejs backend with Azure App Service EasyAuth.

## Why
As of time of writing, MSAL library does not support Azure's App Service EasyAuth.
[see](https://github.com/AzureAD/microsoft-authentication-library-for-js/issues/3972)

## Easy Auth
Easy Auth provides out of the box integration with various Identity providers (IDPs) including Azure Active Directory (AAD).

* [Configure Azure AD authentication - Azure App Service | Microsoft Learn](https://learn.microsoft.com/en-us/azure/app-service/configure-authentication-provider-aad)
* [Tutorial: Authenticate users E2E - Azure App Service | Microsoft Learn](https://learn.microsoft.com/en-us/azure/app-service/tutorial-auth-aad?pivots=platform-linux)

Once configured, Azure App Service will authenticate the user and inject [HTTP headers](https://learn.microsoft.com/en-us/azure/active-directory-b2c/configure-authentication-in-azure-web-app#retrieve-tokens-in-app-code) (that can't be spoofed).

## Frontend app (SPA)
Frontend single page application can read user information by calling `/.auth/me` endpoint.

```js
const response = await axios.get('/.auth/me');
```

## Backend app
Backend application (or server side rendered apps) can read user information by parsing one of the injected headers.

```js
const easyAuth = req.header("X-MS-CLIENT-PRINCIPAL"); // only app service can set this header

let bufferObj = Buffer.from(easyAuth, "base64");
let decodedString = bufferObj.toString("utf8");
let easyAuthObj = JSON.parse(decodedString);

let user = {};
// convert to user object
var claims = easyAuthObj.claims;
for (let i = 0; i < claims.length; i++) {
    if (!user[claims[i].typ] && claims[i].typ !== "roles") {
    user[claims[i].typ] = claims[i].val;
    }
}

user.roles = claims.filter((c) => c.typ === "roles").reduce((acc, c) => { acc[c.val] = true; return acc; }, {});

console.log(req.user);
```

### External apps calling backend APIs
When external application needs to call backend app, it needs to obtain a valid JWT token from AAD.

todo: POC to be added to this repository