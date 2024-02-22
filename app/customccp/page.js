"use client";

import { useEffect, useState } from "react";

const Page = () => {
  const [isScriptLoaded, setScriptLoaded] = useState(false);
  const [selectedTab, setSelectedTab] = useState("tab1");

  const [contactId, setContactId] = useState('');
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
  const [contactAttributes, setContactAttributes] = useState({});

  const connectUrl = "https://test-gps.my.connect.aws/connect";

  // Function to initialize the app
  const init = () => {
    // Initialize ccp app
    window.connect.agentApp.initApp(
      "ccp",
      "ccp-container",
      connectUrl + "/ccp-v2/",
      {
        /* ...options... */
        style: "width:400px; height:600px;",
        region: "ap-southeast-1",
        loginPopup: true, // Enable login popup
        loginPopupAutoClose: true, // Automatically close the login popup
        loginOptions: {
          // Define login window options
          autoClose: true, // Automatically close the login window
          height: 600, // Height of the login window
          width: 400, // Width of the login window
          top: 0, // Top position of the login window
          left: 0, // Left position of the login window
        },
        softphone: {
          // Softphone configuration
          allowFramedSoftphone: true, // Allow softphone in a frame
          disableRingtone: false, // Enable the ringtone
          ringtoneUrl: "./ringtone.mp3", // Ringtone URL
        },
        pageOptions: {
          // Page options
          enableAudioDeviceSettings: true, // Enable audio device settings
          enablePhoneTypeSettings: true, // Enable phone type settings
        },
        ccpAckTimeout: 5000, // CCP acknowledgment timeout
        ccpSynTimeout: 3000, // CCP synchronization timeout
        ccpLoadTimeout: 10000, // CCP load timeout
      }
    );

    // Initialize customer profiles app
    window.connect.agentApp.initApp(
      "customerprofiles",
      "customerprofiles-container",
      connectUrl + "/customerprofiles-v2/",
      {
        /* ...options... */
        style: "height: 764px; width: 100%;",
      }
    );

    // Initialize custom views app
    window.connect.agentApp.initApp(
      "customviews",
      "customviews-container",
      connectUrl + "/stargate/app",
      {
        /* ...options... */
        style: "height: 764px; width: 100%;",
      }
    );

    // Subscribe to contact events
    window.connect.contact(subscribeToContact);
  };

  // Function to subscribe to contact events
  const subscribeToContact = (contact) => {
    console.log('contact event : ', contact)
    console.log('contact event Channel Contact: ', contact.getChannelContext)
    console.log('contact event Queue: ', contact.getQueue)
    // Fetch contact ID
    const fetchedContactId = contact.getContactId();
    setContactId(fetchedContactId);

    // Fetch customer phone number
    const customerEndpoint = contact.getInitialConnection().getEndpoint();
    setCustomerPhoneNumber(customerEndpoint.phoneNumber || '');

    // Fetch contact attributes
    const fetchedAttributes = contact.getAttributes();
    console.log('contact event attribute: ', fetchedAttributes)
    setContactAttributes(fetchedAttributes);
  };

  // Load the Amazon Connect Streams script
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://amazon-connect.github.io/amazon-connect-streams/release/connect-streams.js";
    script.async = true;

    script.onload = () => {
      setScriptLoaded(true);
    };

    document.body.appendChild(script);

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

  // Function to render input fields for each attribute
  const renderAttributeRows = () => {
    const entries = Object.entries(contactAttributes);
    const rows = [];

    for (let i = 0; i < entries.length; i += 3) {
      const rowItems = entries.slice(i, i + 3);
      rows.push(
        <div key={`row-${i}`} className="-mx-3 md:flex mb-2">
          {rowItems.map(([key, attribute]) => (
            <div key={key} className="md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                {attribute.name}
              </label>
              <input
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                type="text"
                placeholder={attribute.value}
                value={attribute.value}
                readOnly
              />
            </div>
          ))}
        </div>
      );
    }

    return rows;
  };

  return (
    <>
    <div className="container flex flex-col border border-sky-500">
        <div className="flex-auto w-auto ml-9 my-5">

        <div className="flex flex-wrap bg-gray-500 ">
            <div className="mt-4 w-full lg:w-6/12 xl:w-3/12 px-5 mb-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-3 xl:mb-0 shadow-lg">
                <div className="flex-auto p-4">
                <div className="flex flex-wrap">
                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                    <h5 className="text-blueGray-400 uppercase font-bold text-xs"> Call Waiting in Queue</h5>
                    <span className="font-semibold text-xl text-blueGray-700">10</span>
                    </div>
                    <div className="relative w-auto pl-4 flex-initial">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-red-500">
                        <i className="fas fa-chart-bar"></i>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>

            <div className=" mt-4 w-full lg:w-6/12 xl:w-3/12 px-5">
            <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-4 xl:mb-0 shadow-lg">
                <div className="flex-auto p-4">
                <div className="flex flex-wrap">
                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                    <h5 className="text-blueGray-400 uppercase font-bold text-xs">Oldest contact in Queue</h5>
                    <span className="font-semibold text-xl text-blueGray-700">1 min 14 sec</span>
                    </div>
                    <div className="relative w-auto pl-4 flex-initial">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-pink-500">
                        <i className="fas fa-chart-pie"></i>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>

            <div className="mt-4 w-full lg:w-6/12 xl:w-3/12 px-5">
            <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                <div className="flex-auto p-4">
                <div className="flex flex-wrap">
                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                    <h5 className="text-blueGray-400 uppercase font-bold text-xs">Contact Missed</h5>
                    <span className="font-semibold text-xl text-blueGray-700">5</span>
                    </div>
                    <div className="relative w-auto pl-4 flex-initial">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-lightBlue-500">
                        <i className="fas fa-users"></i>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>

            <div className="mt-4 w-full lg:w-6/12 xl:w-3/12 px-5">
            <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                <div className="flex-auto p-4">
                <div className="flex flex-wrap">
                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                    <h5 className="text-blueGray-400 uppercase font-bold text-xs">Average Queue Answer Time</h5>
                    <span className="font-semibold text-xl text-blueGray-700">38 Sec </span>
                    </div>
                    <div className="relative w-auto pl-4 flex-initial">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-emerald-500">
                        <i className="fas fa-percent"></i>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>

        </div>
        <div className="container flex">
            <div className="flex-auto ml-9 my-5"> 
                    <div id="ccp-container"></div>
            </div>

            <div className="flex flex-auto ml-9 my-5 w-full border border-sky-500 self-start">
                {/* Tab Navigation */}
                <div role="tablist" className="tabs tabs-lifted w-full">
                    <input
                        type="radio"
                        name="my_tabs_2"
                        role="tab"
                        className="tab "
                        aria-label="Contact Detail"
                        checked={selectedTab === "tab1"}
                        onChange={() => setSelectedTab("tab1")}
                    />
                    <div
                        role="tabpanel"
                        className="tab-content bg-base-100 border-base-300 rounded-box p-6 self-start"
                        style={{ display: selectedTab === "tab1" ? "block" : "none" }}
                        >
                            <div className=" h-max p-6 self-start">                     
                                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
                                    <div className="-mx-3 md:flex mb-6">
                                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-first-name">
                                            Customer Phone Number (เบอร์ลูกค้า)
                                        </label>
                                        <input 
                                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" 
                                            id="customer-phone-number"
                                            type="text"
                                            placeholder="Customer Phone Number"
                                            value={customerPhoneNumber}
                                            readOnly
                                        />
                                        <p className="text-red text-xs italic">Please fill out this field.</p>
                                        </div>
                                        <div className="md:w-1/2 px-3">
                                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-last-name">
                                                Service Number (เบอร์ที่ลูกค้าติดต่อ)
                                            </label>
                                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-last-name" type="text" placeholder="+6620806071" readOnly />
                                        </div>
                                    </div>
                                    <div className="-mx-3 md:flex mb-6">
                                        <div className="md:w-full px-3">
                                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                                                Contact ID 
                                            </label>
                                            <input 
                                                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" 
                                                id="contact-id"
                                                type="text"
                                                placeholder="Contact ID"
                                                value={contactId}
                                                readOnly
                                            />
                                            <p className="text-grey-dark text-xs italic">Make it as long and as crazy as like</p>
                                        </div>
                                    </div>
                                    <div className="-mx-3 md:flex mb-2">
                                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                                                IVR Menu (เมนู IVR)
                                            </label>
                                            <input 
                                                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" 
                                                id="attributes" 
                                                type="text" 
                                                value="Check Order"
                                                readOnly
                                            />
                                        </div>
                                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                                                Initiation method (ช่องทางการติดต่อ)
                                            </label>
                                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-city" type="text" placeholder="Voice Inbound" readOnly/>
                                        </div>
                                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                                                From (ติดต่อมาจาก)
                                            </label>
                                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-zip" type="text" placeholder="Order Contact Page" readOnly />
                                        </div>
                                    </div>
                                    {/* Dynamically rendered attribute rows */}
                                    {renderAttributeRows()}
                                </div>
                            </div>
                            
                    </div>

                    <input
                        type="radio"
                        name="my_tabs_2"
                        role="tab"
                        className="tab"
                        aria-label="Customer Profile"
                        checked={selectedTab === "tab2"}
                        onChange={() => setSelectedTab("tab2")}
                    />
                    <div
                        role="tabpanel"
                        className="tab-content bg-base-100 border-base-300 rounded-box p-6 self-start"
                        style={{ display: selectedTab === "tab2" ? "block" : "none" }}
                    >
                        <div id="customerprofiles-container"></div>
                    </div>

                    <input
                        type="radio"
                        name="my_tabs_2"
                        role="tab"
                        className="tab"
                        aria-label="Agent Step"
                        checked={selectedTab === "tab3"}
                        onChange={() => setSelectedTab("tab3")}
                    />
                    <div
                        role="tabpanel"
                        className="tab-content bg-base-100 border-base-300 rounded-box p-6 self-start"
                        style={{ display: selectedTab === "tab3" ? "block" : "none" }}
                    >
                        step
                    </div>

                </div> 
            </div>

            <div className="flex flex-auto ml-9 my-5 w-full border border-sky-500 self-start">
                <div className="flex-auto ml-9 my-5"> 
                    <div id="customviews-container"></div>
                </div>
            </div>

        </div>
    </div>
    </>
  );
};

export default Page;
