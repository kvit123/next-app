require('dotenv').config();
import { Inter } from 'next/font/google';
import "./../globals.css"
import HeaderBar from '../component/HeaderBar';
import Footer from '../component/Footer';
import Script from 'next/script';


const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
    return (   
      <html lang="en">
                    <Script 
                src="https://amazon-connect.github.io/amazon-connect-streams/release/connect-streams.js" 

            />
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