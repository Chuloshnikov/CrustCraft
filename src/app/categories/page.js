"use client"
import {useState, useEffect} from 'react';
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "../../components/UseProfile";
import toast from "react-hot-toast";
import DeleteButton from "../../components/menu/DeleteButton";

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
    

    async function handleCategorySubmit(e) {
        e.preventDefault();
        const creationPromise = new Promise(async (resolve, reject) => {
          const data = {name:categoryName};
          if (editCategory) {
            data._id = editCategory._id;
          }
          const response = await fetch('/api/categories', {
            method: editCategory ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          });
          setCategoryName('');
          fetchCategories();
          setEditCategory(null);
          if (response.ok)
            resolve();
          else
            reject();
        });
        await toast.promise(creationPromise, {
          loading: editCategory
                     ? 'Updating category...'
                     : 'Creating your new category...',
          success: editCategory ? 'Category updated!' : 'Category created!',
          error: 'Error!',
        });
      }

      async function handleDeleteClick(_id) {
        const promise = new Promise(async (resolve, reject) => {
          const response = await fetch('/api/categories?_id='+_id, {
            method: 'DELETE',
          });
          if (response.ok) {
            resolve();
          } else {
            reject();
          }
        });
    
        await toast.promise(promise, {
          loading: 'Deleting...',
          success: 'Deleted',
          error: 'Error',
        });
    
        fetchCategories();
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
            onSubmit={handleCategorySubmit}
            className="mt-8"
            >
                <div className="flex gap-2 items-end">
                    <div
                    className="grow"
                    >
                        <label>
                            {editCategory ? 'Update category' : 'New category name'}
                            {editCategory && (
                                <>:{" "}{editCategory.name}</>
                            )}
                        </label>
                        <input 
                        onChange={e => setCategoryName(e.target.value)}
                        type="text"
                        value={categoryName}
                        />
                    </div>
                    <div
                    className="pb-2 flex gap-2"
                    >
                        <button 
                        className='border border-primary' 
                        type="submit"
                        >
                            {editCategory ? 'Update' : 'Create'}
                        </button>
                        <button
                        type="button"
                        onClick={() => {
                          setEditCategory(null);
                          setCategoryName('');
                        }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
            <div>
                <h2 className='mt-8 text-sm text-gray-500'>Edit category:</h2>
                {categories?.length > 0 && categories.map(category => (
                    <div
                    className='bg-gray-200 rounded-xl py-2 px-4 flex justify-between gap-1 mb-1 items-center'
                    >
                      <span className='w-[50%] text-lg font-semibold text-gray-500'>{category.name}</span>
                      <div
                      className='flex gap-1'
                      >
                        <button 
                          onClick={() => {
                              setEditCategory(category);
                              setCategoryName(category.name);
                          }}
                          className='text-gray-500 max-w-max cursor-pointer'
                          >
                              Edit
                          </button>
                          <DeleteButton
                              label="Delete"
                              onDelete={() => handleDeleteClick(category._id)} 
                              />
                      </div>
                    </div>
                ))}
            </div>
        </section>
    )
}