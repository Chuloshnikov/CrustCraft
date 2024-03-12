"use client"
import UserTabs from '../../../components/layout/UserTabs';
import {useProfile} from '../../../components/UseProfile';

export default function EditUserPage() {
    const {loading, data} = useProfile();

    if (loading) {
        return "loading user profile...";
    }

    if (!data.admin) {
        return "Not an admin";
    }
    return (
        <section className="mt-8 mx-auto max-w-2xl">
            <UserTabs isAdmin={true}/>
        </section>
    )
}