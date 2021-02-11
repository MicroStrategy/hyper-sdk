(function() {
    // replace this line with the real sdk path
    const baseSDKFolder = 'https://mci-xxx.hypernow.microstrategy.com/MicroStrategyLibrary/static/hyper/sdk';
    // const baseSDKFolder = './sdk';

    // add initialization after page is done
    window.addEventListener("load", function() {
        // add script
        const script = document.createElement('script');
        script.src = baseSDKFolder + '/js/mstr_hyper.bundle.js';
        document.body.appendChild(script);

        script.onload = () => {
            mstrHyper.start({
                server: "https://demo.microstrategy.com/MicroStrategyLibrary",
                auth: {
                    authMode: mstrHyper.AUTH_MODES.GUEST
                },
                searchEnabled : true,
            });
        }
    });
}());