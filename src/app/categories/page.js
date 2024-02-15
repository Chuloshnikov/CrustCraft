"use client"
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "../../components/UseProfile";

export default function CategoriesPage() {
    

    const {loading: profileLoading, data: profileData} = useProfile();

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
            className="mt-8"
            >
                <div className="flex gap-2 items-end">
                    <div
                    className="grow"
                    >
                        <label>New category name:</label>
                        <input type="text"/>
                    </div>
                    <div
                    className="pb-2"
                    >
                        <button type="submit">Create</button>
                    </div>
                </div>
            </form>
        </section>
    )
}