"use client"
import { useEffect, useState } from 'react'
import Link from "next/link";
import { signOut, useSession } from 'next-auth/react';
import { FaHamburger } from "react-icons/fa";
import BurgerMenu from "./BurderMenu"

const Header = () => {
    const [openBurgerMenu, setOpenBurgerMenu] = useState(false);
    const session = useSession();
    const status = session?.status;
    const userData = session.data?.user;
    let userName = userData?.name || userData?.email;
    if (userName && userName.includes(" ")) {
        userName = userName.split(' ')[0];
    }
    
    const gmailCredentials = userData?.email.indexOf("gmail");

    useEffect(() => {
      if (gmailCredentials) {
        fetch('/api/profile', {
          method: 'POST',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({
              email: userData.email,
              name: userData.name,
              image: userData.image,
          }),
      });
      }
    },[gmailCredentials]);

    const handleMenuToggle = () => {
        setOpenBurgerMenu(!openBurgerMenu);
    }
  return (
    <header className="flex items-center justify-between">
        
        <nav className="flex items-center gap-8 text-gray-500 font-semibold">
            <Link 
            href={"/"}
            className="text-primary font-black text-4xl"
            >
            C<span className='hidden md:inline'>RUST</span>C<span className='hidden md:inline'>RAFT</span>
            </Link>
            <Link
            className='hidden lg:block' 
            href={'/'}
            >
                Home
            </Link>
            <Link
            className='hidden lg:block'  
            href={'/menu'}
            >
                Menu
            </Link>
            <Link 
            className='hidden lg:block'  
            href={'/#about'}
            >
                About
            </Link>
            <Link 
            className='hidden lg:block' 
            href={'/#contact'}
            >
                Contact
            </Link>
        </nav>
        <nav
        className='flex items-center gap-8 text gray-500 font-semibold'
        >
            {status === 'authenticated' && (
                <>
                <Link 
                href={'/profile'} 
                className='whitespace-nowrap'
                >
                    Hello, {userName}
                </Link>
                    <button
                        onClick={() => signOut()}
                        className="bg-primary border-0 text-white px-4 mdl:px-8 py-2 rounded-full"
                        >
                        Logout
                    </button>
                </>
                 
            )}
            {status === 'unauthenticated' && (
                <>
                    <Link href={'/login'}>Login</Link>
                    <Link 
                    href={'/register'}
                    className="bg-primary text-white px-8 py-2 rounded-full"
                    >
                        Register
                    </Link>
                </>
            )}
            {status === 'loading' && (
                <>
                <Link href={'/login'}>Login</Link>
                <Link 
                href={'/register'}
                className="bg-primary text-white px-8 py-2 rounded-full"
                >
                    Register
                </Link>
            </>
            )}
            <div
            className='max-w-max bg-primary text-white p-3 rounded-full -ml-6 lg:hidden cursor-pointer'
            onClick={handleMenuToggle}
            >
                <FaHamburger/>
            </div>
        </nav>
        {openBurgerMenu && <BurgerMenu menuClose={handleMenuToggle}/>}
 </header>
  )
}

export default Header