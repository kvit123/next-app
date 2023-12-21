"use client"
import React, { useEffect, useState, useRef } from 'react';
import Script from 'next/script';


const Page = () => {
  const [activeTab, setActiveTab] = useState('tab2');
  const handleTab1Click = () => setActiveTab('tab1');
  const handleTab2Click = () => setActiveTab('tab2');
  const handleTab3Click = () => setActiveTab('tab3');

  const [sampleLink, setSampleLink] = useState('');

  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const containerDivRef = useRef(null);
  const customViewsContainerRef = useRef(null);

  const [contactAttributes, setContactAttributes] = useState({});

  const setupContactEventListener = () => {
    connect.contact((contact) => {
      console.log('Connected contact:', contact);
      console.log('Contact ID:', contact.getContactId());
      // Get all attributes
      const attributes = contact.getAttributes();
      console.log('Contact Attributes:', attributes);
      setContactAttributes(attributes);
      const customerPhoneNumber = attributes.CustomerPhoneNumber ? attributes.CustomerPhoneNumber.value : 'Unknown';
      const ivrResponse = attributes.IVRResponse ? attributes.IVRResponse.value : 'Unknown';
      const contactId = contact.getContactId();
      const messageDiv = document.getElementById('message-div');
      
      contact.onConnected(() => {
        document.getElementById('contactId').value = contactId;
        document.getElementById('phone').value = customerPhoneNumber;
        document.getElementById('ivrResponse').value = ivrResponse;
        setSampleLink("https://example.com"); // Set the sample link dynamically
        // Update other fields as necessary
      });

      contact.onEnded(() => {
        console.log('Contact disconnected');
        console.log('Contact disconnected:', contact.getContactId());
        
        setContactAttributes({});

        // document.getElementById('contactId').value = '';
        // document.getElementById('phone').value = '';
        // document.getElementById('ivrResponse').value = '';

      });
    
    });


  };


  useEffect(() => {
    if (isScriptLoaded) {
      console.log('Script Loaded:', isScriptLoaded);
      console.log('CCP Container Ref:', containerDivRef.current);
      console.log('Custom Views Container Ref:', customViewsContainerRef.current);

      if (containerDivRef.current && customViewsContainerRef.current) {
        const connectUrl = "https://thconnect.my.connect.aws/ccp-v2/";

        window.connect.core.initCCP(containerDivRef.current, {
          ccpUrl: connectUrl,
          region: 'ap-southeast-1',
          loginPopup: true,				// optional, defaults to `true`
          loginPopupAutoClose: true,		// optional, defaults to `false`
          loginOptions: {                 // optional, if provided opens login in new window
              autoClose: true,              // optional, defaults to `false`
              height: 578,                  // optional, defaults to 578
              width: 433,                   // optional, defaults to 433
              top: 0,                       // optional, defaults to 0
              left: 0                       // optional, defaults to 0
          },
          softphone: {                    // optional, defaults below apply if not provided
              // optional, defaults below apply if not provided
              allowFramedSoftphone: true, // optional, defaults to false
              disableRingtone: false, // optional, defaults to false
              ringtoneUrl: './ringtone.mp3', // optional, defaults to CCP’s default ringtone if a falsy value is set
              disableEchoCancellation: false, // optional, defaults to false
              allowFramedVideoCall: true, // optional, default to false
              allowEarlyGum: true //optional, default to true
          },
          // storageAccess: {
          //   canRequest: true, // By default this is set to true. You can set it to false to opt out from checking storage access.  
          //   mode: "custom", // To use the default banner, set this to "default"
          //   /** More customization options can be found here: https://docs.aws.amazon.com/connect/latest/adminguide/admin-3pcookies.html#config-grant-access */
          // },
          pageOptions: {                  // optional
            enableAudioDeviceSettings: false, //optional, defaults to 'false'
            enableVideoDeviceSettings: false, //optional, defaults to 'false'
            enablePhoneTypeSettings: true //optional, defaults to 'true' 
          },
          shouldAddNamespaceToLogs: false, //optional, defaults to 'false'
          ccpAckTimeout: 5000, //optional, defaults to 3000 (ms)
          ccpSynTimeout: 3000, //optional, defaults to 1000 (ms)
          ccpLoadTimeout: 10000 //optional, defaults to 5000 (ms)
          // Other necessary configuration...
        });

        // Set up a listener for contact connections
        // connect.contact((contact) => {
        //   contact.onConnected((contact) => {
        //     const currentContactId = contact.getContactId();
        //     const contactAttributes = contact.getAttributes();
        //     if (contactAttributes["DefaultFlowForAgentUI"]) {
        //       const contactFlowId = contactAttributes["DefaultFlowForAgentUI"].value;
        //       const customViewsIframe = document.querySelector('#customviews-container > iframe');
              
        //       if (customViewsIframe) {
        //         customViewsIframe.setAttribute('src', `${connectUrl}/stargate/app?contactFlowId=${contactFlowId}&currentContactId=${currentContactId}`);
        //       }
        //     }

        //   });
        // });


        setupContactEventListener();


        try {
          console.log('Initializing custom views app');
          window.connect.agentApp.initApp(
            "customviews", 
            customViewsContainerRef.current.id, 
            connectUrl + "/stargate/app",
            { style: "width:400px; height:600px;" }
          );
        } catch (error) {
          console.error('Error initializing custom views app:', error);
        }

      }
    }
  }, [isScriptLoaded]);

  useEffect(() => {
    const originalConsoleLog = console.log;
    const originalConsoleInfo = console.info;
    const originalConsoleWarn = console.warn;
  
    const displayMessage = (message, type) => {
      const consoleDiv = document.getElementById('consoleLog');
      consoleDiv.innerHTML += `<p><strong>${type}:</strong> ${message}</p>`;
    };
  
    console.log = function(...messages) {
      displayMessage(messages.join(' '), 'Log');
      originalConsoleLog.apply(console, messages);
    };
  
    console.info = function(...messages) {
      displayMessage(messages.join(' '), 'Info');
      originalConsoleInfo.apply(console, messages);

      if (message.includes('softphoneStreamType')) {
        const data = JSON.parse(message);
        data.forEach(item => {
          if (item.packetsLost > 10 || item.roundTripTimeMillis > 40) {
            // Update your indicator here
            document.getElementById('indicator').innerText = 'Warning: High Packet Loss or Latency';
          }
        });
      }
    };
  
    console.warn = function(...messages) {
      displayMessage(messages.join(' '), 'Warn');
      originalConsoleWarn.apply(console, messages);
    };
  
    // ... your other useEffect code ...
  
    return () => {
      // Restore original console methods when component unmounts
      console.log = originalConsoleLog;
      console.info = originalConsoleInfo;
      console.warn = originalConsoleWarn;
    };
  }, []);
  

  // useEffect(() => {
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

  //     const customViewsContainer = document.createElement("div");
  //     customViewsContainer.id = "customviews-container";
  //     document.body.appendChild(customViewsContainer);      

  //     const connectUrl = "https://thconnect.my.connect.aws/ccp-v2/";

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

  //     window.connect.agentApp.initApp(
  //       "customviews", 
  //       "customviews-container", 
  //       connectUrl + "/stargate/app",
  //       { style: "width:400px; height:600px;" }
  //     );

  //   }
  // }, [isScriptLoaded]);
  console.log('isScriptLoaded :'+isScriptLoaded)
  return (
    <div className='flex none container mx-auto'>
      <div ref={containerDivRef}  className='w-80 min-w-[400px] h-[600px] min-h-[600px] border border-gray-300'></div>
      {/* Other elements */}
      <div className='pl-5'> 
        <div role="tablist" className="tabs tabs-lifted">
          <a role="tab" className={`tab ${activeTab === 'tab1' ? 'tab-active' : ''}`} onClick={handleTab1Click}>
            Step by Step Guild
          </a>
          <a role="tab" className={`tab ${activeTab === 'tab2' ? 'tab-active' : ''}`} onClick={handleTab2Click}>
            Contact Detail
          </a>
          <a role="tab" className={`tab ${activeTab === 'tab3' ? 'tab-active' : ''}`} onClick={handleTab3Click}>
            Event Detail
          </a>
        </div>

        <div ref={customViewsContainerRef}  style={{ display: activeTab === 'tab1' ? 'block' : 'none' }} className='w-80 min-w-[400px] h-[600px] min-h-[600px] border border-gray-300'></div>

        <div id="message-div" className="message-container" style={{ display: activeTab === 'tab2' ? 'block' : 'none' }}>
          {/* <form>
            <label htmlFor="contactId">Contact ID:</label>
            <input type="text" id="contactId" name="contactId" readOnly /><br />

            <label htmlFor="phone">Customer Phone Number:</label>
            <input type="text" id="phone" name="phone" readOnly /><br />

            <label htmlFor="ivrResponse">IVR Response:</label>
            <input type="text" id="ivrResponse" name="ivrResponse" readOnly /><br />
          
          </form> */}
          <form>
            {Object.entries(contactAttributes).map(([key, attr]) => (
              <div key={key}>
                <label htmlFor={key}>{key}:</label>
                <input type="text" id={key} name={key} value={attr.value || 'N/A'} readOnly />
              </div>
            ))}
            <div>
              <label htmlFor="sampleLink">Sample Link:</label>
              <input type="text" id="sampleLink" name="sampleLink" value={sampleLink || 'N/A'} readOnly />
            </div>
          </form>
        </div>

        <div id="consoleLog" style={{ display: activeTab === 'tab3' ? 'block' : 'none' }} className="max-h-[700px] overflow-auto">
          
        </div>


      </div>

        <div id="indicator" className="flex ">
          
        </div>

      <Script 
        src="https://amazon-connect.github.io/amazon-connect-streams/release/connect-streams.js"
        onLoad={() => setIsScriptLoaded(true)}
        strategy="afterInteractive"
      />


    </div>
  );
};

export default Page;
