"use client"
import { useState } from "react";
import Image from "next/image";
import {signIn, useSession } from "next-auth/react";
import { redirect } from 'next/navigation'

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginInProgress, setLoginInProgress] = useState(false);
    const session = useSession();

    if (session.status === "authenticated") {
        redirect('/');
    }



    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoginInProgress(true);
        await signIn('credentials', {redirect: false, email, password, callbackUrl: '/'});
        setLoginInProgress(false);
        setEmail('');
        setPassword('');
    }
  return (
    <section
    className="mt-8"
    >
         <h1
        
        className='text-center text-primary text-4xl mb-4 font-medium'>
            Login
        </h1>
        <form
        className="max-w-xs mx-auto"
        onSubmit={handleFormSubmit}
        >
        <input 
            type="email" 
            placeholder="email" 
            value={email} 
            name={email}
            onChange={e => setEmail(e.target.value)}
            disabled={loginInProgress}
            />
            <input 
            type="password" 
            placeholder="password" 
            value={password} 
            name={password}
            onChange={e => setPassword(e.target.value)}
            disabled={loginInProgress}
            />
            <button 
            onClick={handleFormSubmit}
            disabled={loginInProgress}
            type="submit">
                Login
            </button>
            <div
            className='my-4 text-center text-gray-500'
            >
                or login with provider
            </div>
            <button
            type="button"
            onClick={() => signIn('google', {callbackUrl: '/'})}
            className='flex gap-4 justify-center'
            
            >
                <Image src={"/google.png"} alt={'google'} width={24} height={24}/>
                Login with google
            </button>
        </form>
    </section>
  )
}
