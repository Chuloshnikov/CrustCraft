"use client"
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {redirect} from "next/navigation";
import Image from "next/image";
import userImg from "../../../public/images/userImg.png";
import toast from "react-hot-toast";

export default function ProfilePage() {
    const session = useSession();
    const [userName, setUserName] = useState(session.data?.user?.name || '');
    const [image, setImage] = useState('');
    const [phone, setPhone] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
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

    const handleFileChange = async (e) => {
        const files = e?.target.files; 
        if (files?.length === 1) {
            const data = new FormData;
            data.set('file', files[0]);
            

            
            const uploadPromise = fetch('/api/upload', {
                    method: 'POST',
                    body: data
                }).then(response => {
                    if (response.ok) {
                    return response.json().then(link => {
                            setImage(link);
                        })
                    } 
                    throw new Error('Some thing went wrong')
            });
            
            await toast.promise(uploadPromise, {
                loading: 'Uploading...',
                success: 'Upload complete',
                error: 'Upload error',
            })
        }   
    }

    if (status === "loading") {
        return 'loading...';
    }

    if (status === "unauthenticated") {
        return redirect('/login');
    }

    
    return (
        <section className="mt-8">
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
                            <div
                            className="w-[100px] h-[100px] mt-2"
                            >
                                {image?.length ? (
                                    <Image className="rounded-lg w-full h-full mb-1" src={image} width={250} height={250}  alt={'avatar'} />
                                ) : (
                                    <Image className="rounded-lg w-full h-full mb-1" src={userImg} width={250} height={250} alt={'avatar'} />
                                )}
                            </div>
                            <label>
                                <input type="file" className="hidden" onChange={handleFileChange}/>
                                <span className="block border border-gray-300 rounded-lg p-[4px] text-center cursor-pointer mt-2">Edit</span>
                            </label>
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