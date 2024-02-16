"use client"
import {useState, useEffect} from 'react';
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "../../components/UseProfile";
import toast from "react-hot-toast";

export default function CategoriesPage() {
    
    const {loading: profileLoading, data: profileData} = useProfile();
    const [categoryName, setCategoryName] = useState('');
    const [categories, setCategories] = useState('');
    const [editCategory, setEditCategory] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    function fetchCategories() {
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
                setCategories(categories);
            });
        });
    }
    

    async function handleNewCategorySubmit(e) {
        e.preventDefault();
        const creationPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/categories', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name: categoryName})
            });
            setCategoryName('');
            fetchCategories();
            if (response.ok) {
                resolve();
            } else {
                reject();
            }
        });
        await toast.promise(creationPromise, {
            loading: 'Creating your new category...',
            success: 'Ctegory created!',
            error: 'Error!'
        })
    }

    if (profileLoading) {
        return 'Loading user info...';
    }

    if (!profileData.admin) {
        return 'Not an admin';
    }

    return (
        <section
        className="mt-8 max-w-md mx-auto"
        >
            <UserTabs isAdmin={true}/>
            <form
            onSubmit={handleNewCategorySubmit}
            className="mt-8"
            >
                <div className="flex gap-2 items-end">
                    <div
                    className="grow"
                    >
                        <label>
                            {editCategory ? 'Update category' : 'New category name'}
                            {editCategory && (
                                <>:{editCategory.name}</>
                            )}
                        </label>
                        <input 
                        onChange={e => setCategoryName(e.target.value)}
                        type="text"
                        value={categoryName}
                        />
                    </div>
                    <div
                    className="pb-2"
                    >
                        <button className='border border-primary' type="submit">
                            {editCategory ? 'Update' : 'Create'}
                        </button>
                    </div>
                </div>
            </form>
            <div>
                <h2 className='mt-8 text-sm text-gray-500'>Edit category:</h2>
                {categories?.length > 0 && categories.map(category => (
                    <button
                    onClick={() => setEditCategory(category)}
                    className='bg-gray-200 rounded-xl py-2 px-4 flex gap-1 cursor-pointer mb-1'
                    >
                        <span className='text-gray-500'>edit category:</span>
                        <span>{category.name}</span>
                    </button>
                ))}
            </div>
        </section>
    )
}