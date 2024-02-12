'use client'

require('dotenv').config();
import "./../../app/globals.css"
import { Inter } from 'next/font/google';
import HeaderBar from '../component/HeaderBar';



const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body className={inter.className}>
            <div>
                <HeaderBar />

                <div className='flex-cols mt-4 mb-4'>{children}</div>

            </div>
        </body>
      </html>
    )
  }