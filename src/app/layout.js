import { Roboto } from 'next/font/google'
import './globals.css'

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700', '900'] })

export const metadata = {
  title: 'CrustCraft',
  description: `CrustCraft: Where Artisanal Pies Meet Culinary Mastery. 
  Experience the perfection of handcrafted crusts and gourmet toppings in 
  every bite. A symphony of flavors awaits at your favorite pizza haven.`,
  icons: {
    icon: '/icon.svg',
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <main className='max-w-6xl mx-auto p-4'>
          {children}
        </main>
      </body>
    </html>
  )
}
