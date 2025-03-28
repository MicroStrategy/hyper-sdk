# Frequently Asked Questions

- `Q`: Does Hyper SDK work in child iframes?
- `A`: Yes, you can set `highlightIframes` to ***true***.
  For more details please refer to [API Doc](api.md#mstrHyper).

---

- `Q`: Why does the SDK throw the error: "lack of privilege"?
- `A`: To be able to use Hyper SDK, you must have the `Use Hyper SDK` privilege.
  *Where to find the settings to control privileges:*
  - Install and open [Strategy Workstation](https://www2.microstrategy.com/producthelp/current/Workstation/WebHelp/Lang_1033/Content/home_workstation.htm)
  - Connect and Select your environment -> Right Menu
  ![picture 3](./img/env_getinfo.png)  
  - Select the [Security Roles](https://www2.microstrategy.com/producthelp/current/Workstation/WebHelp/Lang_1033/Content/create_security_roles.htm)
  ![picture 2](./img/security_roles.png)  
  - Make sure `Use Hyper SDK` is enabled for the corresponding security role
  ![picture 1](./img/privileges.png)  

---
- `Q`: Why `Copy` function is not working on Safari and Firefox?
- `A`: Safari and Firefox currently don't provide the apis to capture card images, we will update once the browsers add support.