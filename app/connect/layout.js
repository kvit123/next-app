"use client"
require('dotenv').config();
import { Inter } from 'next/font/google';
import "./../globals.css"
import HeaderBar from '../component/HeaderBar';
import Footer from '../component/Footer';
import React, { useEffect, useRef } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
            {/* <Script 
                src="https://amazon-connect.github.io/amazon-connect-streams/release/connect-streams.js" 
            /> */}
    return (   
      <html lang="en">

        <body className={inter.className}>
            <div>
                <HeaderBar />

                <div className='flex-cols mt-4 mb-4'>{children}</div>
                
                <Footer />
            </div>
        </body>
      </html>
    )
  }