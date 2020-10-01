### MicroStrategy Web Plugin
Some customizations require the use of JavaScript to be included on a MicroStrategy Web page. The plug-in architecture provided by MicroStrategy Web can be used to achieve this purpose.
> Read more about [Adding Custom JavaScript](https://lw.microstrategy.com/msdz/MSDL/GARelease_Current/docs/projects/WebSDK/Content/topics/promptarch/PA_Adding_Custom_JavaScript.htm)

#### Example of the Custom JavaScript
```js
(function() {
    // replace this line with the real sdk path
    const baseSDKFolder = 'https://mci-xxx.hypernow.microstrategy.com/MicroStrategyLibrary/static/hyper/sdk';

    // add initialization after page is done
    document.addEventListener("DOMContentLoaded", function() {
        // add script
        const script = document.createElement('script');
        script.src = baseSDKFolder + '/js/mstr_hyper.bundle.js';
        document.body.appendChild(script);

        script.onload = () => {
            mstrHyper.start({
                server: "https://demo.microstrategy.com/MicroStrategyLibrary",
                auth: {
                    authMode: mstrHyper.AUTH_MODES.GUEST
                }
            });
        }
    });
}());
```

#### How to deploy the MSTR Web Plugin on MSTR Web?

1.	Connect to the Server which has MSTR Web installed.

2.	Navigate to the Location of where Tomcat is installed on the server

    - For Windows: C:\Program Files (x86)\Common Files\MicroStrategy\Tomcat\
    - For Linux: opt/apache/tomcat/
    - 

![picture 5](../../images/c4d95b91c544201f58b775e1670ef692b8a11c9b8710c46f8cbf99484eb06718.png)  

3.	Select the Tomcat version which has MSTR Web installed and navigate to the “webapps” folder. You will the ‘MicroStrategy’ folder in there.

![picture 6](../../images/89acb7650edec6bdd1245528dad399c353fabecc8a3b833f4529ae9876e29c34.png)  

4.	Copy and paste the “hypersdk” folder in the “Plugins” folder under “MicroStrategy”.  
![picture 7](../../images/9876a877031e7849bed063879f3087a9af96d05f4108c6ed5d6bda3be8e64263.png)  

 
5.	Open and edit the “global.js” in “javascript” under the “hypersdk” folder just pasted.


6.	Restart the Tomcat service and highlights should appear on the MSTR Web.

#### Example of Plugin File
[Sample MSTR Web Plugin](../files/global.js)