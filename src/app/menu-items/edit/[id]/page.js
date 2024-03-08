"use client"
import EditableImage from '@/components/layout/EditableImage';
import UserTabs from '../../../../components/layout/UserTabs';
import {useProfile} from '../../../../components/UseProfile';
import { HiOutlineArrowCircleLeft } from "react-icons/hi";
import { BsPlusLg } from "react-icons/bs";
import { PiTrash } from "react-icons/pi";
import {useState, useEffect} from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { redirect, useParams } from 'next/navigation';

export default function EditMenuItemPage() {
    
    const {id} = useParams();

    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [basePrice, setBasePrice] = useState('');
    const [sizes, setSizes] = useState([]);

    const [redirectToItems, setRedirectToItems] = useState(false);
    const {loading, data} = useProfile();

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(items => {
                const item = items.find(item => item._id === id);
                setImage(item.image);
                setName(item.name);
                setDescription(item.description);
                setBasePrice(item.basePrice);
            });
        })
    }, []);

    async function handleFormSubmit(e) {
        e.preventDefault();
        const data = {image, name, description, basePrice, _id: id};
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/menu-items', {
                method: 'PUT',
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

    {/*sizes scripts start*/}

    function addSize() {
        setSizes(oldSizes => {
            return [...oldSizes, {name: '', price: 0}]
        });
    }

    function editSize(e, index, prop) {
        const newValue = e.target.value;
        setSizes(prevSizes => {
            const newSizes = [...prevSizes];
            newSizes[index][prop] = newValue;
            return newSizes;
        })
    }

    function removeSize(indexToRemove) {
        setSizes(prev => prev.filter((value, index) => index !== indexToRemove))
    }

    {/*sizes scripts end*/}

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
                    <div
                    className='bg-gray-200 p-2 rounded-md mb-2'
                    >
                        <label>Sizes</label>
                        {sizes?.length > 0 && sizes.map((size, index) => (
                            <div
                            key={index}
                            className='flex items-end gap-2'
                            >
                                <div>
                                    <label>Size name</label>
                                    <input 
                                    onChange={e => editSize(e, index, 'name')}
                                    type="text" 
                                    placeholder="Size name" 
                                    value={size.name}
                                    />
                                </div>
                                <div>
                                    <label>Extra price</label>
                                    <input
                                    onChange={e => editSize(e, index, 'price')} 
                                    type="text" 
                                    placeholder='Extra price' 
                                    value={size.price}
                                    />
                                </div>
                                <div>
                                    <button 
                                    onClick={() => removeSize(index)}
                                    type='button' 
                                    className='bg-white mb-[9px] px-2'>
                                        <PiTrash className='w-6 h-6'/>
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button 
                        type='button'
                        onClick={addSize}
                        className='bg-white flex gap-1 items-center'
                        >
                            <BsPlusLg className='w-4 h-4'/>
                            <span>Add item size</span>
                        </button>
                    </div>
                    <button type='submit'>Save</button>
                </div>
            </div>
        </form>
    </section>
    )
}