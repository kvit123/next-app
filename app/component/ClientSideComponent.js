import React, { useEffect } from 'react';

const ClientSideComponent = () => {
    useEffect(() => {
        // Dynamically load the Amazon Connect Streams API script
        const script = document.createElement('script');
        script.src = "/connectstream/connect-streams-min.js";  // Adjust the path as needed
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            if (window.connect) {
                initCCP();
            } else {
                console.error("Amazon Connect Streams API not loaded");
            }
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const initCCP = () => {
        // Make sure the global `connect` object is available
        const containerDiv = document.getElementById("ccp-container");
        if (containerDiv) {
            window.connect.core.initCCP(containerDiv, {
                ccpUrl: "https://thconnect.awsapps.com/connect/ccp-v2/",
                // Additional configuration options...
                loginPopup: true,               // optional, defaults to `true`
                loginPopupAutoClose: true,      // optional, defaults to `false`
                loginOptions: {                 // optional, if provided opens login in new window
                    autoClose: true,              // optional, defaults to `false`
                    height: 600,                  // optional, defaults to 578
                    width: 400,                   // optional, defaults to 433
                    top: 0,                       // optional, defaults to 0
                    left: 0                       // optional, defaults to 0
                },
                region: "ap-southeast-1",         // REQUIRED for `CHAT`, optional otherwise
                softphone: {                    // optional, defaults below apply if not provided
                    allowFramedSoftphone: true,   // optional, defaults to false
                    disableRingtone: false,       // optional, defaults to false
                    ringtoneUrl: "./ringtone.mp3" // optional, defaults to CCP’s default ringtone if a falsy value is set
                },
                pageOptions: { //optional
                    enableAudioDeviceSettings: false, //optional, defaults to 'false'
                    enablePhoneTypeSettings: true //optional, defaults to 'true' 
                },
                shouldAddNamespaceToLogs: false, //optional, defaults to 'false'
                ccpAckTimeout: 5000, //optional, defaults to 3000 (ms)
                ccpSynTimeout: 3000, //optional, defaults to 1000 (ms)
                ccpLoadTimeout: 10000 //optional, defaults to 5000 (ms)
                
            });
        } else {
            console.error("Amazon Connect Streams API not loaded");
        }
    };

    return (
        <div>
            <div id="ccp-container" style={{ width: '400px', height: '800px' }}></div>
        </div>
    );
};

export default ClientSideComponent;
