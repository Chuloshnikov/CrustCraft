"use client"
import React from 'react'
import Link from "next/link";
import { signOut, useSession } from 'next-auth/react';

const Header = () => {
    const session = useSession();
    const status = session?.status;
    const userData = session.data?.user;
    let userName = userData?.name || userData?.email;
    if (userName && userName.includes(" ")) {
        userName = userName.split(' ')[0];
    }

  return (
    <header className="flex items-center justify-between">
        
        <nav className="flex items-center gap-8 text-gray-500 font-semibold">
            <Link 
            href={"/"}
            className="text-primary font-black text-2xl"
            >
            CRUSTCRAFT
            </Link>
            <Link 
            href={'/'}
            >
                Home
            </Link>
            <Link 
            href={'/'}
            >
                Menu
            </Link>
            <Link 
            href={'/'}
            >
                About
            </Link>
            <Link 
            href={'/'}
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
                        className="bg-primary border-0 text-white px-8 py-2 rounded-full"
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
           
        </nav>
 </header>
  )
}

export default Header