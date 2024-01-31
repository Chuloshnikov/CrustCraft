"use client"
import { useSession } from "next-auth/react";
import {redirect} from "next/navigation";
import Image from "next/image";
import userImg from "../../../public/images/userImg.png";

export default function ProfilePage() {
    const session = useSession();
    const {status} = session;

    if (status === "loading") {
        return 'loading...';
    }

    if (status === "unauthenticated") {
        return redirect('/login');
    }

    const userImage = session.data.user.image;
    return (
        <section className="mt-8">
                <h1
                className='text-center text-primary text-4xl mb-4 font-medium'>
                    Profile
                </h1>
                <form 
                className="max-w-md mx-auto"
                >
                    <div
                    className="flex gap-4 items-center"
                    >
                        <div
                        className="p-2 rounded-lg relative"
                        >
                            <Image className="rounded-lg w-full h-full mb-1" src={userImage ? userImage : userImg} width={250} height={250} alt={'avatar'} />
                            <button type="button">Change avatar</button>
                        </div>
                        <div className="grow">
                            <input type="text" placeholder="First and last name"/>
                            <input type="email" disabled={true} value={session.data.user.email}/>
                            <button type="submit">Save</button>
                        </div>
                    </div>
                </form>
        </section>
    );
}