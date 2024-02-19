'use client'
import EditableImage from '@/components/layout/EditableImage';
import UserTabs from '../../components/layout/UserTabs';
import { useProfile } from '../../components/UseProfile';
import {useState, useEffect} from 'react';
import toast from 'react-hot-toast';

export default function MenuItemsPage() {
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [basePrice, setBasePrice] = useState('');
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
    }

    if (loading) {
        return 'Loading user info...';
    }

    if (!data.admin) {
        return 'Not an admin.';
    }

    return (
        <section className="mt-8">
            <UserTabs isAdmin={true}/>
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