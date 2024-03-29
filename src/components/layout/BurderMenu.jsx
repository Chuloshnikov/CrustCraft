import Link from "next/link";
import { IoIosCloseCircle } from "react-icons/io";
import { signOut, useSession } from 'next-auth/react';


const BurderMenu = ({ menuClose }) => {
    const session = useSession();
    const status = session?.status;

  return (
    <nav
    onClick={menuClose}
    className="z-50 fixed inset-0  bg-white flex flex-col gap-4 px-6 py-4 border-b-primary overflow-clip font-semibold"
    >
        <div className="w-full flex justify-end items-end">
            <IoIosCloseCircle 
            onClick={menuClose}
            className="h-12 w-12 text-primary"
            />
        </div>
            <Link
            className="max-w-max"
            href={'/'}
            >
                Home
            </Link>
            <Link
            className="max-w-max"
            href={'/menu'}
            >
                Menu
            </Link>
            <Link 
            className="max-w-max"
            href={'/#about'}
            >
                About
            </Link>
            <Link 
            className="max-w-max"
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
                <Link className="max-w-max" href={'/login'}>Login</Link>
            )}
    </nav>
  )
}

export default BurderMenu;