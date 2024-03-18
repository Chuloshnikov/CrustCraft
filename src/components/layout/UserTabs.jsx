"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

const UserTabs = ({ isAdmin }) => {
    const path = usePathname();


    return (
        <div
        className="flex flex-col md:flex-row gap-2 justify-center tabs"
        >
            <Link 
            href={'/profile'} 
            className={path === '/profile' ? 'active' : ''}>
                Profile
            </Link>
            {isAdmin && (
                <>
                    <Link 
                    href={"/categories"}
                    className={path === '/categories' ? 'active' : ''}
                    >
                        Categories
                    </Link>
                    <Link 
                    href={"/menu-items"}
                    className={/menu-item/.test(path) ? 'active' : ''}
                    >
                        Menu Items
                    </Link>
                    <Link 
                    href={'/users'}
                    className={/user/.test(path) ? 'active' : ''}
                    >
                        Users
                    </Link>
                    <Link 
                    href={'/orders'}
                    className={path === '/orders' ? 'active' : ''}
                    >
                        Orders
                    </Link>
                </>
            )}
        </div>
    )
}

export default UserTabs;