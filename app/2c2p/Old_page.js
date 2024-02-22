"use client"
import React, { useEffect, useState } from 'react';
import SbsGuild from '../connect/SbsGuild';

const Page = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://amazon-connect.github.io/amazon-connect-streams/release/connect-streams.js";
    script.async = true;
    script.onload = () => setIsScriptLoaded(true);
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (isScriptLoaded) {
      const containerDiv = document.createElement("div");
      containerDiv.id = "containerDiv";
      document.body.appendChild(containerDiv);

      window.connect.core.initCCP(containerDiv, {
        ccpUrl: "https://thconnect.my.connect.aws/ccp-v2/",
        region: 'ap-southeast-1',
        loginPopup: true,				// optional, defaults to `true`
        loginPopupAutoClose: true,		// optional, defaults to `false`
        loginOptions: {                 // optional, if provided opens login in new window
            autoClose: true,              // optional, defaults to `false`
            height: 600,                  // optional, defaults to 578
            width: 400,                   // optional, defaults to 433
            top: 0,                       // optional, defaults to 0
            left: 0                       // optional, defaults to 0
        },
        softphone: {                    // optional, defaults below apply if not provided
            allowFramedSoftphone: true,   // optional, defaults to false
            disableRingtone: false,       // optional, defaults to false
            ringtoneUrl: "./ringtone.mp3" // optional, defaults to CCP’s default ringtone if a falsy value is set
        },
        pageOptions: {                  // optional
            enableAudioDeviceSettings: true, // optional, defaults to 'false'
            enablePhoneTypeSettings: true // optional, defaults to 'true'
        },
        ccpAckTimeout: 5000, //optional, defaults to 3000 (ms)
        ccpSynTimeout: 3000, //optional, defaults to 1000 (ms)
        ccpLoadTimeout: 10000 //optional, defaults to 5000 (ms)
        // Other necessary configuration...
      });
    }
  }, [isScriptLoaded]);

  return (
    <div className='flex none container mx-auto'>
      <div id="containerDiv" className='w-80 min-w-[400px] h-[600px] min-h-[600px] border border-gray-300'></div>
      {/* Other elements */}
      <div className='pl-5'> 
        <div role="tablist" class="tabs tabs-lifted">
          <a role="tab" class="tab tab-active">
            Step by Step Guild
          </a>
          <a role="tab" class="tab">Normal</a>
          <a role="tab" class="tab">Normal</a>
        </div>
        <SbsGuild />

      </div>
    </div>
  );
};

export default Page;