"use client"
import {useState, useEffect} from 'react';
import UserForm from '../../../components/layout/UserForm';
import UserTabs from '../../../components/layout/UserTabs';
import {useProfile} from '../../../components/UseProfile';
import { redirect, useParams } from 'next/navigation';

export default function EditUserPage() {
    const {id} = useParams();
    const {loading, data} = useProfile();
    const [user, setUser] = useState(null);

    useEffect(() => {
            fetch('/api/users').then(response => {
                response.json().then(data => {
                    const user = data.find(user => user._id === id);
                    setUser(user);
                });
            });
    }, [id]);

    const handleUserInfoUpdate = async (e, data) => {
        e.preventDefault();
        const savingPromise = new Promise( async (resolve, reject) => {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(data),
            });
            if (response.ok) {
                resolve() 
            } else {
                reject();
            }
        });
    }

    if (loading) {
        return "loading user profile...";
    }

    if (!data.admin) {
        return "Not an admin";
    }
    return (
        <section className="mt-8 mx-auto max-w-2xl">
            <UserTabs isAdmin={true}/>
            <div className='mt-8'>
                <UserForm user={user} onSave={handleUserInfoUpdate}/>
            </div>
        </section>
    )
}