import Link from "next/link";
import { IoIosCloseCircle } from "react-icons/io";
import { signOut, useSession } from 'next-auth/react';


const BurderMenu = ({ menuClose }) => {
    const session = useSession();
    const status = session?.status;

  return (
    <nav
    className="z-50 fixed inset-0  bg-white flex flex-col gap-4 px-6 py-4 border-b-primary overflow-clip font-semibold"
    >
        <div className="w-full flex justify-end items-end">
            <IoIosCloseCircle 
            onClick={menuClose}
            className="h-12 w-12 text-primary"
            />
        </div>
            <Link
            href={'/'}
            >
                Home
            </Link>
            <Link
            href={'/menu'}
            >
                Menu
            </Link>
            <Link 
            href={'/#about'}
            >
                About
            </Link>
            <Link 
            href={'/#contact'}
            >
                Contact
            </Link>
            {status === 'authenticated' && (
                <span
                onClick={() => signOut()}
                >
                    Log out
                </span>
            )}
             {status === 'unauthenticated' && (
                <Link href={'/login'}>Login</Link>
            )}
    </nav>
  )
}

export default BurderMenu;