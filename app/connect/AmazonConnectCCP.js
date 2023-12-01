import React, { useEffect, useState, useRef } from 'react';

const AmazonConnectCCP = ({ ccpUrl }) => {
    const ccpContainerRef = useRef(null);
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);

    useEffect(() => {
        // Ensure the Amazon Connect Streams API script is loaded
        const script = document.createElement('script');
        script.src = '';
        // script.src = '/connectstream/connect-streams-min_2.js';
        script.async = true;
        script.onload = () => {
            setIsScriptLoaded(true);
        };

        script.onerror = () => {
            console.error('Error loading Amazon Connect Streams script');
        };

        document.body.appendChild(script);

        return () => {
            // Cleanup script when component unmounts
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        if (isScriptLoaded && window.connect && window.connect.core) {
            // Initialize the CCP
            window.connect.core.initCCP(ccpContainerRef.current, {
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
        }
    }, [isScriptLoaded, ccpUrl]);
    
    return (
        <div ref={ccpContainerRef} style={{ width: '400px', height: '800px' }}>
            {/* CCP will be loaded into this div */}
        </div>
    );
};

export default AmazonConnectCCP;
