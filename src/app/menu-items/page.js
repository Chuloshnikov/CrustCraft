'use client'
import UserTabs from '@/components/layout/UserTabs';
import { useProfile } from '../../components/UseProfile';
import Link from 'next/link';
import { HiOutlineArrowCircleRight } from "react-icons/hi";

export default function MenuItemsPage() {
    const {loading, data} = useProfile();

    if (loading) {
        return 'Loading user info...';
    }

    if (!data.admin) {
        return 'Not an admin.';
    }

    return (
    <section className='mt-8 max-w-md mx-auto'>
        <UserTabs isAdmin={true}/>
        <div
        className='mt-8'
        >
            <Link 
            className='button items-center justify-between'
            href={'/menu-items/new'}
            >
                <span>Create new menu item</span>
                <HiOutlineArrowCircleRight className='w-5 h-5'/>
            </Link>
        </div>
        
    </section>
    )
}