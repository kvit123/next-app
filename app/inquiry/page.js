'use client'

import React from 'react'
import Script from 'next/script';
import { useState } from 'react';

export default function Page() {

    const [customerName, setCustomerName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [feedback, setFeedback] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if all fields are filled
        if (!customerName || !email || !phoneNumber) {
            alert("Please fill all the fields.");
            return;
        }

        // Perform any API calls or validation here
        loadAmazonConnectScript(customerName, email, phoneNumber);
    };

    // Function to dynamically update the Amazon Connect script
    const loadAmazonConnectScript = (name, email, phone) => {
        // Remove existing script if it exists
        const existingScript = document.getElementById("amazon-connect-script");
        if (existingScript) {
            existingScript.remove();
        }

        // Create a new script element
        const script = document.createElement("script");
        script.id = "amazon-connect-script";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = `
            (function(w, d, x, id){
                var s=d.createElement('script');
                s.src='https://d3pdo5aouiodr4.cloudfront.net/amazon-connect-chat-interface-client.js';
                s.async=1;
                s.id=id;
                d.getElementsByTagName('head')[0].appendChild(s);
                w[x] = w[x] || function() { (w[x].ac = w[x].ac || []).push(arguments) };
            })(window, document, 'amazon_connect', '88709218-998f-4d7d-b7ff-20a794de3ec0');

            amazon_connect('styles', { 
                iconType: 'CHAT_VOICE', 
                openChat: { color: '#ffffff', backgroundColor: '#d4563a' }, 
                closeChat: { color: '#ffffff', backgroundColor: '#eb5e0b'} 
            });

            amazon_connect('snippetId', 'QVFJREFIZ3piM1lKbU1ObnJsR2doajhNZWNuZzlOV1Q3N3JBQTBqVEcwRnJ1bXArUHdHTndPMjM0ZUZaejJhUWlYMVJ2eTFWQUFBQWJqQnNCZ2txaGtpRzl3MEJCd2FnWHpCZEFnRUFNRmdHQ1NxR1NJYjNEUUVIQVRBZUJnbGdoa2dCWlFNRUFTNHdFUVFNMmcxRUJjSCt3WU1vaGZIZUFnRVFnQ3RBcUZyRjR0T0RSRFd6cDIwS3VPdEgrRnFKaU5qVDYyM1plakFiR011UDRqRVdwdmlyNjQ5dStzWlY6OitDZE14Q0dnMHEwdFNpbTNMNXdpU01OVS9HQXRqZzJNb1ZFN2tDeW5xZHJqR2VqL3VhbFNmeitucSt4Y0ZUUENEZzFTcE5ZY2VZMDhVRWlCamMzNEYrQzN0WUp6aGtTUkV5S0V3S2E1L1ZRS0d3MTdmNjVZRVFWYzVvSFY4TTJrSVQ1bE5TMjlrKzB4VzlkWUtueSsyTHY2Tk5ZR3VvYz0=');
            amazon_connect('supportedMessagingContentTypes', [ 'text/plain', 'text/markdown' ]);

            amazon_connect('customizationObject', {
                transcript: {
                    hideDisplayNames: false,
                    eventNames: {
                        customer: '${name}', 
                        email: '${email}',
                        phone: '${phone}',
                        agent: 'THCONNECT SERVICE'
                    }
                }
            });

            amazon_connect('customLaunchBehavior', {
                skipIconButtonAndAutoLaunch: true,
                alwaysHideWidgetButton: true,
                programmaticLaunch: function(launchCallback) {
                    var launchWidgetBtn = document.getElementById('launch-widget-btn'); // Using updated ID
                    if (launchWidgetBtn) {
                        launchWidgetBtn.addEventListener('click', launchCallback);
                        window.onunload = function() {
                            launchWidgetBtn.removeEventListener('click', launchCallback);
                        }
                    }
                }
            });

        `;

        // Append the new script to the document
        document.head.appendChild(script);
    };

    // useEffect(() => {
    //     // You can also load the initial Amazon Connect script here
    // }, []);

  return (
        <>

        {/* <Script id="amazon-connect-script" strategy="afterInteractive">
            {`
            (function(w, d, x, id){
                var s=d.createElement('script');
                s.src='https://d3pdo5aouiodr4.cloudfront.net/amazon-connect-chat-interface-client.js';
                s.async=1;
                s.id=id;
                d.getElementsByTagName('head')[0].appendChild(s);
                w[x] =  w[x] || function() { (w[x].ac = w[x].ac || []).push(arguments) };
            })(window, document, 'amazon_connect', '88709218-998f-4d7d-b7ff-20a794de3ec0');

            amazon_connect('styles', { 
                iconType: 'CHAT_VOICE', 
                openChat: { color: '#ffffff', backgroundColor: '#d4563a' }, 
                closeChat: { color: '#ffffff', backgroundColor: '#eb5e0b'} 
            });

            amazon_connect('snippetId', 'QVFJREFIZ3piM1lKbU1ObnJsR2doajhNZWNuZzlOV1Q3N3JBQTBqVEcwRnJ1bXArUHdHTndPMjM0ZUZaejJhUWlYMVJ2eTFWQUFBQWJqQnNCZ2txaGtpRzl3MEJCd2FnWHpCZEFnRUFNRmdHQ1NxR1NJYjNEUUVIQVRBZUJnbGdoa2dCWlFNRUFTNHdFUVFNMmcxRUJjSCt3WU1vaGZIZUFnRVFnQ3RBcUZyRjR0T0RSRFd6cDIwS3VPdEgrRnFKaU5qVDYyM1plakFiR011UDRqRVdwdmlyNjQ5dStzWlY6OitDZE14Q0dnMHEwdFNpbTNMNXdpU01OVS9HQXRqZzJNb1ZFN2tDeW5xZHJqR2VqL3VhbFNmeitucSt4Y0ZUUENEZzFTcE5ZY2VZMDhVRWlCamMzNEYrQzN0WUp6aGtTUkV5S0V3S2E1L1ZRS0d3MTdmNjVZRVFWYzVvSFY4TTJrSVQ1bE5TMjlrKzB4VzlkWUtueSsyTHY2Tk5ZR3VvYz0=');
            amazon_connect('supportedMessagingContentTypes', [ 'text/plain', 'text/markdown' ]);
            amazon_connect('customizationObject', {
                transcript: {
                  hideDisplayNames: true,
                  eventNames: {
                    customer: 'ASDF',
                    agent: 'Amazon Employee'
                  }
                }
              });

            `}
        </Script> */}

        <div className="relative flex items-top justify-center min-h-screen bg-white dark:bg-gray-900 sm:items-center sm:pt-0">
            <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                <div className="mt-8 overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="p-6 mr-2 bg-gray-100 dark:bg-gray-800 sm:rounded-lg">
                            <h1 className="text-4xl sm:text-5xl text-gray-800 dark:text-white font-extrabold tracking-tight">
                                Get in touch
                            </h1>
                            <p className="text-normal text-lg sm:text-2xl font-medium text-gray-600 dark:text-gray-400 mt-2">
                                Fill in the form to start a conversation
                            </p>
    
                            <div className="flex items-center mt-8 text-gray-600 dark:text-gray-400">
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" className="w-8 h-8 text-gray-500">
                                    <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                    <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                </svg>
                                <div className="ml-4 text-md tracking-wide font-semibold w-40">
                                    <a target="_blank" href="https://goo.gl/maps/QcWzYETAh4FS3KTD7">10300 BKK Thailand</a>
                                </div>
                            </div>
    
                            <div className="flex items-center mt-4 text-gray-600 dark:text-gray-400">
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" className="w-8 h-8 text-gray-500">
                                    <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                </svg>
                                <div className="ml-4 text-md tracking-wide font-semibold w-40">
                                    <a href="tel:+6620806071">+662-080-6071</a>
                                </div>
                            </div>
    
                            <div className="flex items-center mt-2 text-gray-600 dark:text-gray-400">
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" className="w-8 h-8 text-gray-500">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                </svg>
                                <div className="ml-4 text-md tracking-wide font-semibold w-40">
                                <a href = "mailto: contact@thconnect.co">contact@thconnect.co</a>
                                </div>
                            </div>
                        </div>
    
                        <form className="p-6 flex flex-col justify-center" id="feedbackForm" onSubmit={handleSubmit}>
                            <div className="flex flex-col">
                                <label for="name" className="hidden">Full Name</label>
                                <input 
                                    className="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none" 
                                    type="text"
                                    name="customerName"
                                    id="customerName"
                                    placeholder="Enter your name"
                                    style={{ transition: 'all 0.15s ease 0s' }}
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    required
                                    />
                            </div>
    
                            <div className="flex flex-col mt-2">
                                <label for="email" className="hidden">Email</label>
                                <input 
                                    className="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none" 
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Enter your email "
                                    style={{ transition: 'all 0.15s ease 0s' }}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    />
                            </div>
    
                            <div className="flex flex-col mt-2">
                                <label for="tel" className="hidden">Number</label>
                                <input 
                                    className="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none" 
                                    type="tel" // Use 'tel' type for phone numbers
                                    name="phoneNumber"
                                    id="phoneNumber"
                                    placeholder="Enter your phone number"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    required
                                />
                            </div>
    
                            <button id="launch-widget-btn" type="submit" className="md:w-32 bg-indigo-600 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-indigo-500 transition ease-in-out duration-300">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

       </>

  )
}
