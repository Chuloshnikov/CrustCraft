"use client"
import EditableImage from '@/components/layout/EditableImage';
import UserTabs from '../../../../components/layout/UserTabs';
import MenuItemPriceProps from '../../../../components/layout/MenuItemPriceProps';
import {useProfile} from '../../../../components/UseProfile';
import { HiOutlineArrowCircleLeft } from "react-icons/hi";
import {useState, useEffect} from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { redirect, useParams } from 'next/navigation';
import DeleteButton from '@/components/menu/DeleteButton';

export default function EditMenuItemPage() {
    
    const {id} = useParams();

    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [basePrice, setBasePrice] = useState('');
    const [sizes, setSizes] = useState([]);
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [extraIngredientPrices, setExtraIngredientPrices] = useState([]);

    const [redirectToItems, setRedirectToItems] = useState(false);
    const {loading, data} = useProfile();

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(items => {
                const item = items.find(item => item._id === id);
                setImage(item.image);
                setName(item.name);
                setDescription(item.description);
                setCategory(item.category);
                setBasePrice(item.basePrice);
                setSizes(item.sizes);
                setExtraIngredientPrices(item.extraIngredientPrices);
            });
        });

        fetch('/api/categories').then(res => {
            res.json().then(categories => {
                setCategories(categories);
            })
        });
    }, [id]);



    async function handleFormSubmit(e) {
        e.preventDefault();
        const data = {image, name, description, basePrice, sizes, extraIngredientPrices, category, _id: id};
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

    async function handleDeleteClick() {
        const promise = new Promise(async (resolve, reject) => {
            const res = await fetch('/api/menu-items?_id=' + id, {
                method: 'DELETE',
            });
            if (res.ok) {
                resolve();
            } else {
                reject();
            }
        })
        
        toast.promise(promise, {
            loading: 'Deleting...',
            success: 'Deleted',
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
        <h1
        className='text-center text-primary text-4xl mt-4 mb-4 font-medium'>
            Edit item
        </h1>
        <div
        className='max-w-xl mx-auto mt-8'
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
        className='mt-8 max-w-xl mx-auto'
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
                    <label>Category</label>
                    <select value={category} onChange={e => setCategory(e.target.value)}>
                        {categories?.length > 0 && categories.map(cat => (
                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))}
                    </select>
                    <label>Base Price</label>
                    <input
                    onChange={e => setBasePrice(e.target.value)}
                    value={basePrice}
                    type="text"
                    />
                    <MenuItemPriceProps 
                    name={'Sizes'} 
                    titleLabel={'Size name'}
                    priceLabel={'Extra price'}
                    addLabel={'Add items size'}
                    props={sizes} 
                    setProps={setSizes}
                    />
                    <MenuItemPriceProps 
                    name={'Extra ingredients'}
                    titleLabel={'Name'}
                    priceLabel={'Price'}
                    addLabel={'Add ingredients prices'}
                    props={extraIngredientPrices}
                    setProps={setExtraIngredientPrices}
                    />
                    <button type='submit'>Save</button>
                </div>
            </div>
        </form>
            <div
            className='max-w-xl mx-auto mt-2'
            >
                <DeleteButton 
                label="Delete this menu item"
                onDelete={handleDeleteClick}
                />
            </div>
    </section>
    )
}