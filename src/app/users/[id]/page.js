"use client"
import {useState, useEffect} from 'react';
import UserTabs from '../../../components/layout/UserTabs';
import {useProfile} from '../../../components/UseProfile';
import EditableImage from "../../../components/layout/EditableImage";
import { redirect, useParams } from 'next/navigation';
import { HiOutlineArrowCircleLeft } from "react-icons/hi";
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function EditUserPage() {
    const {id} = useParams();
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState('');
    const [phone, setPhone] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');

    const [redirectToUsers, setRedirectToUsers] = useState(false);
    const {loading, data} = useProfile();
    

    useEffect(() => {
            fetch('/api/users').then(response => {
                response.json().then(data => {
                    const user = data.find(users => users._id === id);
                    setUserName(user.name);
                    setEmail(user.email);
                    setImage(user.image);
                    setPhone(user.phone);
                    setStreetAddress(user.streetAddress);
                    setPostalCode(user.postalCode);
                    setCity(user.city);
                    setCountry(user.country);
                });
            });
    }, [id]);

    const handleUserInfoUpdate = async (e) => {
        e.preventDefault();
        const savingPromise = new Promise( async (resolve, reject) => {
            const data = {
                _id: id,
                name: userName,
                email,
                image,
                phone,
                streetAddress,
                postalCode,
                city,
                country
            };
            const response = await fetch('/api/users', {
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

        await toast.promise(savingPromise, {
            loading: 'Updating this user',
            success: 'Updated!',
            error: 'Error',
        });

        setRedirectToUsers(true);
    }

    if (redirectToUsers) {
        return redirect('/users');
    }

    if (loading) {
        return "loading user profile...";
    }

    if (!data.admin) {
        return "Not an admin";
    }
    return (
        <section className="mt-8 mx-auto max-w-xl">
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
                href={'/users'}
                >
                    <span>Show all users</span>
                    <HiOutlineArrowCircleLeft className='w-5 h-5'/>
                </Link>
            </div>
            <div className='mt-8'>
                <form 
                onSubmit={handleUserInfoUpdate}
                className="max-w-xl mx-auto"
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
                            onChange={e => setEmail(e.target.value)}
                            type="email" 
                            placeholder='Email'
                            value={email}
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
                                <div className="w-full">
                                    <label>Postal code</label>
                                    <input 
                                    onChange={e => setPostalCode(e.target.value)}
                                    type="text"
                                    placeholder="Postal code"
                                    value={postalCode}
                                    />
                                </div>
                            <div className="w-full">
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
            </div>
        </section>
    )
}