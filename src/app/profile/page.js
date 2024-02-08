"use client"
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {redirect} from "next/navigation";
import Image from "next/image";
import userImg from "../../../public/images/userImg.png";

export default function ProfilePage() {
    const session = useSession();
    const [userName, setUserName] = useState(session.data?.user?.name || '');
    const [image, setImage] = useState('');
    const [saved, setSaved] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const {status} = session;
    
    useEffect(() => {
        if (status === 'authenticated') {
            setUserName(session.data.user.name);
            setImage(session.data.user.image);
        }

    }, [session, status]);


    const handleProfileInfoUpdate = async (e) => {
        e.preventDefault();
        setSaved(false);
        setIsSaving(true);
        const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({name: userName})
            });
            setIsSaving(false);
        if (response.ok) {
            setSaved(true);
        }
    }

    const handleFileChange = async (e) => {
        const files = e?.target.files; 
        if (files?.length === 1) {
            const data = new FormData;
            data.set('files', files[0]);
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: data,
            });
            const link = await response.json();
            setImage(link);
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
                {saved && (
                    <h2
                    className="text-center bg-green-200 p-4 max-w-md mx-auto border-2 border-green-500 rounded-lg"
                    >
                        Profile saved!
                    </h2>
                )}
                {isSaving && (
                    <h2
                    className="text-center bg-blue-100 p-4 max-w-md mx-auto border-2 border-blue-300 rounded-lg"
                    >
                        Saving...
                    </h2>
                )}
                <form 
                onSubmit={handleProfileInfoUpdate}
                className="max-w-md mx-auto"
                >
                    <div
                    className="flex gap-4 items-center"
                    >
                        <div
                        className="p-2 rounded-lg relative"
                        >
                            <div
                            className="w-[100px] h-[100px]"
                            >
                                {image.length ? (
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
                            <input 
                            onChange={e => setUserName(e.target.value)}
                            type="text" 
                            placeholder={userName} 
                            value={userName} 
                            />
                            <input 
                            type="email" 
                            disabled={true} 
                            value={session.data.user.email}
                            />
                            <button type="submit">Save</button>
                        </div>
                    </div>
                </form>
        </section>
    );
}