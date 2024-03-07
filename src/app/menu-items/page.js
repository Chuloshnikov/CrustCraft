'use client'
import { useState, useEffect } from 'react';
import UserTabs from '@/components/layout/UserTabs';
import { useProfile } from '../../components/UseProfile';
import Link from 'next/link';
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import Image from 'next/image';

export default function MenuItemsPage() {
    const [menuItems, setMenuItems] = useState([]);
    const {loading, data} = useProfile();

    useEffect(() => {
        fetch('api/menu-items').then(res => {
            res.json().then(menuItems => {
                setMenuItems(menuItems);
            })
        })
    }, [])

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
        <div>
            <h2 className='text-sm text-gray-500 mt-8'>Edit menu item:</h2>
            <div className='grid grid-cols-3 gap-2'>
                {menuItems?.length > 0 && menuItems.map(item => (
                    <Link 
                    href={'/menu-items/edit/' + item._id}
                    className='bg-gray-200 rounded-lg p-4'>
                        <div className='relative'>
                            <Image src={item.image} alt="item image" width={200} height={200}/>
                        </div>
                        <div className='text-center'>
                            {item.name}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    </section>
    )
}