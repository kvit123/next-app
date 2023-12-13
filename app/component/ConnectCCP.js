"use client"
import React, { useEffect, useState } from 'react';

const ConnectCCP = ({ onScriptLoad }) => {
  // const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  // useEffect(() => {
  //   // Create a new script element
  //   const script = document.createElement('script');
  //   script.src = "https://amazon-connect.github.io/amazon-connect-streams/release/connect-streams.js";
  //   script.async = true;
  //   script.onload = () => setIsScriptLoaded(true);
  //   document.body.appendChild(script);
  // }, []);

  // useEffect(() => {
  //   if (isScriptLoaded) {
  //     const containerDiv = document.createElement("div");
  //     containerDiv.id = "containerDiv";
  //     document.body.appendChild(containerDiv);

  //     window.connect.core.initCCP(containerDiv, {
  //       ccpUrl: "https://thconnect.my.connect.aws/ccp-v2/",
  //       region: 'ap-southeast-1',
  //       loginPopup: true,				// optional, defaults to `true`
  //       loginPopupAutoClose: true,		// optional, defaults to `false`
  //       loginOptions: {                 // optional, if provided opens login in new window
  //           autoClose: true,              // optional, defaults to `false`
  //           height: 600,                  // optional, defaults to 578
  //           width: 400,                   // optional, defaults to 433
  //           top: 0,                       // optional, defaults to 0
  //           left: 0                       // optional, defaults to 0
  //       },
  //       softphone: {                    // optional, defaults below apply if not provided
  //           allowFramedSoftphone: true,   // optional, defaults to false
  //           disableRingtone: false,       // optional, defaults to false
  //           ringtoneUrl: "./ringtone.mp3" // optional, defaults to CCP’s default ringtone if a falsy value is set
  //       },
  //       pageOptions: {                  // optional
  //           enableAudioDeviceSettings: true, // optional, defaults to 'false'
  //           enablePhoneTypeSettings: true // optional, defaults to 'true'
  //       },
  //       ccpAckTimeout: 5000, //optional, defaults to 3000 (ms)
  //       ccpSynTimeout: 3000, //optional, defaults to 1000 (ms)
  //       ccpLoadTimeout: 10000 //optional, defaults to 5000 (ms)
  //       // Other necessary configuration...
  //     });
  //   }
  // }, [isScriptLoaded]);

  const [isScriptLoaded, setIsScriptLoaded] = useState(false); // Ensure this line is present

  useEffect(() => {
    // Create a new script element
    const script = document.createElement('script');
    script.src = "https://amazon-connect.github.io/amazon-connect-streams/release/connect-streams.js";
    script.async = true;

    
    // Set the onload handler
    script.onload = () => {
        console.log("Amazon Connect script loading");
        setIsScriptLoaded(true);
        // Notify the parent component that the script is loaded
        onScriptLoad(true);

        // Proceed to initialize the CCP
        const containerDiv = document.createElement("div");
        containerDiv.id = "containerDiv";
        document.body.appendChild(containerDiv);

        window.connect.core.initCCP(containerDiv, {
            ccpUrl: "https://thconnect.my.connect.aws/ccp-v2/",
            region: 'ap-southeast-1',
            loginPopup: true,
            loginPopupAutoClose: true,
            loginOptions: {
                autoClose: true,
                height: 600,
                width: 400,
                top: 0,
                left: 0
            },
            softphone: {
                allowFramedSoftphone: true,
                disableRingtone: false,
                ringtoneUrl: "./ringtone.mp3"
            },
            pageOptions: {
                enableAudioDeviceSettings: true,
                enablePhoneTypeSettings: true
            },
            ccpAckTimeout: 5000,
            ccpSynTimeout: 3000,
            ccpLoadTimeout: 10000
            // Other necessary configuration...
        });
        console.log("Amazon Connect script loaded");
    };

    // Append the script to the body
    document.body.appendChild(script);

    // Clean-up function to remove the script when the component unmounts
    return () => {
        document.body.removeChild(script);
        // Remove the containerDiv only if it's a child of document.body
        const ccpContainer = document.getElementById("containerDiv");
        if (ccpContainer && ccpContainer.parentNode === document.body) {
            document.body.removeChild(ccpContainer);
        }
    };
}, [onScriptLoad]);

  return (
    <div className='flex none'>
      <div id="containerDiv" className="hidden"></div>
      {/* Other elements */}
    </div>
  );
};

export default ConnectCCP;
