import { Roboto } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {AppProvider} from "@/components/AppContext";
import { Toaster } from 'react-hot-toast';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700', '900'] })

export const metadata = {
  title: 'CrustCraft',
  description: `CrustCraft: Where Artisanal Pies Meet Culinary Mastery. 
  Experience the perfection of handcrafted crusts and gourmet toppings in 
  every bite. A symphony of flavors awaits at your favorite pizza haven.`,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className=''>
      <body className={roboto.className}>
        <main className='max-w-6xl mx-auto p-4'>
          <AppProvider>
            <Toaster/>
            <Header/>
              {children}
            <Footer/>
          </AppProvider>
        </main>
      </body>
    </html>
  )
}
