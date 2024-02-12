'use client'
import React, { useEffect, useState } from 'react';
import PhoneInterface from './PhoneInterface';
import MembershipTable from './MembershipTable';
// import ConnectCCP from '../component/ConnectCCP';



export default function Page() {

    const [isScriptLoaded, setIsScriptLoaded] = useState(false); // Ensure this line is present

   // console.log("apiLoaded: ", isConnectScriptLoaded);

    useEffect(() => {
      // Create a new script element
      const script = document.createElement('script');
      script.src = "https://amazon-connect.github.io/amazon-connect-streams/release/connect-streams.js";
      script.async = true;
  
      
      // Set the onload handler
      script.onload = () => {
          console.log("Amazon Connect script loaded");
          setIsScriptLoaded(true);

  
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
  }, []);

    return (
        <div className='flex container mx-auto p-4"'>
            <MembershipTable />
            {/* <ConnectCCP onScriptLoad={setIsConnectScriptLoaded} /> */}
            <div className='flex none'>
            <div id="containerDiv" className="hidden"></div>
            {/* Other elements */}
            </div>
            {isScriptLoaded && <PhoneInterface apiLoaded={isScriptLoaded} />}
            
        </div>


    );
}
