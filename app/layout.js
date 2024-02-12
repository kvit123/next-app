require('dotenv').config();
import "./globals.css"
import { Inter } from 'next/font/google';
import HeaderBar from './component/HeaderBar';
import Footer from './component/Footer';


const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body className={inter.className}>
            <div>
                <HeaderBar />

                <div className='flex-cols w-100% justify-center mt-4 mb-4'>{children}</div>

                <Footer />
            </div>
        </body>
      </html>
    )
  }