"use client"
import EditableImage from '@/components/layout/EditableImage';
import UserTabs from '../../../components/layout/UserTabs';
import {useProfile} from '../../../components/UseProfile';
import { HiOutlineArrowCircleLeft } from "react-icons/hi";
import {useState, useEffect} from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';
import MenuItemForm from '../../../components/layout/MenuItemForm';

export default function NewMenuItemPage() {

    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [basePrice, setBasePrice] = useState('');

    const [redirectToItems, setRedirectToItems] = useState(false);
    const {loading, data} = useProfile();

    async function handleFormSubmit(e) {
        e.preventDefault();

        const data = {image, name, description, basePrice};
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {'Content-Type': 'application/json'}
            });
        
            if (response.ok) {
                resolve();
            } else {
                reject();
            }
        });

        await toast.promise(savingPromise, {
            loading: 'Saving this item',
            success: 'Saved!',
            error: 'Error',
        });

        setRedirectToItems(true);
    }

    if (redirectToItems) {
        return redirect('/menu-items');
    }

    if (loading) {
        return 'Loading user info...';
    }

    if (!data.admin) {
        return "Not an admin.";
    }
    return (
        <section className="mt-8">
        <UserTabs isAdmin={true}/>
        <div
        className='max-w-md mx-auto mt-8'
        >
            <Link 
            className='button items-center justify-between'
            href={'/menu-items'}
            >
                <span>Show all menu items</span>
                <HiOutlineArrowCircleLeft className='w-5 h-5'/>
            </Link>
        </div>
        <form
        onSubmit={handleFormSubmit} 
        className='mt-8 max-w-md mx-auto'
        >
            <div className='flex items-start gap-4'>
                <div>
                    <EditableImage link={image} setLink={setImage}/>
                </div>
                <div className='grow'>
                    <label>Item name</label>
                    <input 
                    onChange={e => setName(e.target.value)}
                    value={name}
                    type="text"
                    />
                    <label>Description</label>
                    <input 
                    onChange={e => setDescription(e.target.value)}
                    value={description}
                    type="text"
                    />
                    <label>Base Price</label>
                    <input
                    onChange={e => setBasePrice(e.target.value)}
                    value={basePrice}
                    type="text"
                    />
                    <button type='submit'>Save</button>
                </div>
            </div>
        </form>
    </section>
    )
}