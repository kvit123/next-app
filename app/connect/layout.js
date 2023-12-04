"use client"
require('dotenv').config();
import { Inter } from 'next/font/google';
import "./../globals.css"
import HeaderBar from '../component/HeaderBar';
import Footer from '../component/Footer';
import Script from 'next/script';
import React, { useEffect, useRef } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {

    const containerDivRef = useRef(null);
    const instanceURL = "https://thconnect.my.connect.aws/ccp-v2/";

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://connect-cdn.amazonaws.com/connect-streams-min.js';
        script.async = true;
        script.onload = () => {
            initCCP();
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const initCCP = () => {
        if (containerDivRef.current) {
            window.connect.core.initCCP(containerDivRef.current, {
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
    };

    return (   
      <html lang="en">
            {/* <Script 
                src="https://amazon-connect.github.io/amazon-connect-streams/release/connect-streams.js" 
            /> */}
        <body className={inter.className}>
            <div>
                <HeaderBar />
                <div ref={containerDivRef} style={{ width: '400px', height: '800px' }}>
            {/* CCP will be loaded into this div */}
        </div>
                <div className='flex-cols mt-4 mb-4'>{children}</div>
                <Footer />
            </div>
        </body>
      </html>
    )
  }