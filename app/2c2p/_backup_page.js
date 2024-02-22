'use client'
// Import useEffect and useState from React
import { useEffect, useState, useRef } from 'react';
import Script from 'next/script';

const Page = () => {
  const [isScriptLoaded, setScriptLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('contactID'); // default tab
  const [contactId, setContactId] = useState('');
  const ccpContainerRef = useRef(null); // Using refs for DOM manipulation

  // Function to initialize the app
  const init = () => {
    const connectUrl = "https://thconnect.my.connect.aws/connect";

    console.log('ccpContainerRef.current :', ccpContainerRef.current)
    // Initialization logic as per your provided script
    if (ccpContainerRef.current) {
      window.connect.agentApp.initApp(
        "ccp",
        "ccp-container",
        connectUrl + "/ccp-v2/",
        { 
            style: "width:400px; height:600px;",
            region: 'ap-southeast-1',
            loginPopup: true,                // Enable login popup
            loginPopupAutoClose: true,       // Automatically close the login popup
            loginOptions: {                  // Define login window options
            autoClose: true,               // Automatically close the login window
            height: 600,                   // Height of the login window
            width: 400,                    // Width of the login window
            top: 0,                        // Top position of the login window
            left: 0                        // Left position of the login window
            },
            softphone: {                     // Softphone configuration
            allowFramedSoftphone: true,    // Allow softphone in a frame
            disableRingtone: false,        // Enable the ringtone
            ringtoneUrl: "./ringtone.mp3"  // Ringtone URL
            },
            pageOptions: {                   // Page options
            enableAudioDeviceSettings: true, // Enable audio device settings
            enablePhoneTypeSettings: true  // Enable phone type settings
            },
            ccpAckTimeout: 5000,             // CCP acknowledgment timeout
            ccpSynTimeout: 3000,             // CCP synchronization timeout
            ccpLoadTimeout: 10000            // CCP load timeout
        }
      );
  
      window.connect.agentApp.initApp(
        "customerprofiles",
        "customerprofiles-container",
        connectUrl + "/customerprofiles-v2/",
        { style: "width:400px; height:600px;" }
      ); 
  
      window.connect.agentApp.initApp(
        "customviews",
        "customviews-container",
        connectUrl + "/stargate/app",
        { style: "width:400px; height:600px;" }
      );
    }
    // Handling contact flow
    window.connect.contact((contact) => {
    contact.onConnected((contact) => {
        const currentContactId = contact.contactId;
        const contactAttributes = contact.getAttributes();

        setContactId(contact.contactId); 

        if (contactAttributes["DefaultFlowForAgentUI"]) {
        const contactflowId = contactAttributes["DefaultFlowForAgentUI"].value;
        const customViewsIframe = document.querySelector('#customviews-container > iframe');
        customViewsIframe.setAttribute('src', `${connectUrl}/stargate/app?contactFlowId=${contactflowId}&currentContactId=${currentContactId}`);
        }
    });
    });
  };

  // Use useEffect to load the external script and to initialize the app
  useEffect(() => {
    // Create a script element
    const script = document.createElement('script');
    script.src = 'https://amazon-connect.github.io/amazon-connect-streams/release/connect-streams.js'
    script.type = 'text/javascript';
    script.async = true;

    // Add script to the body
    document.body.appendChild(script);

    // Set script load state
    script.onload = () => {
      setScriptLoaded(true);
    };

    // Clean up the script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Initialize the app once the script is loaded
  useEffect(() => {
    if (isScriptLoaded) {
      init();
    }
  }, [isScriptLoaded]);

  return (
    <main className="flex">
      <div ref={ccpContainerRef} id="ccp-container"></div>

      {/* Tab Navigation */}
      <div className="flex mb-4">
        <button className={`px-4 py-2 ${activeTab === 'contactID' ? 'bg-gray-200' : ''}`} onClick={() => setActiveTab('contactID')}>Contact ID</button>
        <button className={`px-4 py-2 ${activeTab === 'customerProfiles' ? 'bg-gray-200' : ''}`} onClick={() => setActiveTab('customerProfiles')}>Customer Profiles</button>
        <button className={`px-4 py-2 ${activeTab === 'customViews' ? 'bg-gray-200' : ''}`} onClick={() => setActiveTab('customViews')}>Custom Views</button>
      </div>

      {/* Tab Content */}
      {activeTab === 'contactID' && (
        <div>
          <h2>Contact ID</h2>
          <p>{contactId || 'No active contact'}</p>
        </div>
      )}
      {activeTab === 'customerProfiles' && (
        <div id="customerprofiles-container"></div>
      )}
      {activeTab === 'customViews' && (
        <div id="customviews-container"></div>
      )}
    </main>
  );
};

export default Page;
