"use client"
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {redirect} from "next/navigation";
import toast from "react-hot-toast";

import UserTabs from "../../components/layout/UserTabs";
import EditableImage from "../../components/layout/EditableImage"

export default function ProfilePage() {
    const session = useSession();
    const [userName, setUserName] = useState(session.data?.user?.name || '');
    const [image, setImage] = useState('');
    const [phone, setPhone] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [profileFetched, setProfileFetched] = useState(false);
    const {status} = session;
    
    useEffect(() => {
        if (status === 'authenticated') {
            setUserName(session.data.user.name);
            setImage(session.data.user.image);
            fetch('/api/profile').then(response => {
                response.json().then(data => {
                    setUserName(data.name);
                    setImage(data.image);
                    setPhone(data.phone);
                    setStreetAddress(data.streetAddress);
                    setPostalCode(data.postalCode);
                    setCity(data.city);
                    setCountry(data.country);
                    setIsAdmin(data.admin);
                    setProfileFetched(true);
                })
            })
        }

    }, [session, status]);


    const handleProfileInfoUpdate = async (e) => {
        e.preventDefault();
        const savingPromise = new Promise( async (resolve, reject) => {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    name: userName, 
                    image,
                    streetAddress,
                    phone,
                    postalCode,
                    city,
                    country

                })
            });
            if (response.ok) {
                resolve() 
            } else {
                reject();
            }
        });

        await toast.promise(savingPromise, {
            loading: 'Saving...',
            success: 'Profile saved!',
            error: 'Error',
        });
    }


    if (status === "loading" || !profileFetched) {
        return 'loading...';
    }

    if (status === "unauthenticated") {
        return redirect('/login');
    }

    
    return (
        <section className="mt-8">
                <UserTabs isAdmin={isAdmin}/>
                <h1
                className='text-center text-primary text-4xl mb-4 font-medium'>
                    Profile
                </h1>
                <form 
                onSubmit={handleProfileInfoUpdate}
                className="max-w-md mx-auto"
                >
                    <div
                    className="flex gap-4"
                    >
                        <div
                        className="p-2 rounded-lg relative"
                        >
                           <EditableImage link={image} setLink={setImage}/>
                        </div>
                        <div
                        className="grow"
                        >
                            <label>First and last name</label>
                            <input 
                            onChange={e => setUserName(e.target.value)}
                            type="text" 
                            placeholder="First and last name" 
                            value={userName} 
                            />
                            <label>Email</label>
                            <input 
                            type="email" 
                            disabled={true} 
                            value={session.data.user.email}
                            />
                            <label>Phone number</label>
                            <input 
                            onChange={e => setPhone(e.target.value)}
                            type="tel" 
                            placeholder="Phone number"
                            value={phone}
                            />
                            <label>Street Address</label>
                            <input 
                            onChange={e => setStreetAddress(e.target.value)}
                            type="text"
                            placeholder="Street address"
                            value={streetAddress}
                            />
                            <div
                            className="flex gap-2"
                            >
                                <div>
                                    <label>Postal code</label>
                                    <input 
                                    onChange={e => setPostalCode(e.target.value)}
                                    type="text"
                                    placeholder="Postal code"
                                    value={postalCode}
                                    />
                                </div>
                               <div>
                                    <label>City</label>
                                    <input 
                                    onChange={e => setCity(e.target.value)}
                                    type="text"
                                    placeholder="City"
                                    value={city}
                                    />
                               </div>
                            </div>
                            <label>Country</label>
                            <input 
                            onChange={e => setCountry(e.target.value)}
                            type="text"
                            placeholder="Country"
                            value={country}
                            />
                            <button type="submit">Save</button>
                        </div>
                    </div>
                </form>
        </section>
    );
}