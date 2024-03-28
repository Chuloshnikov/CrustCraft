"use client"
import { useState, useEffect } from "react";
import SectionHeaders from "@/components/layout/SectionHeaders";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "../../components/UseProfile";


export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const {loading, data: profile} = useProfile();

    useEffect(() => {
        fetch('/api/orders').then(res => {
            res.json().then(orders => {
                setOrders(orders);
            })
        })
    }, []);


    return (
        <section className="mt-8 max-w-2xl mx-auto">
            <UserTabs isAdmin={profile.admin}/>
            <div className="text-center">
                <SectionHeaders mainHeader={'Orders'}/>
            </div>
            <div className="mt-8">
                {orders?.length > 0 && orders.map(order => (
                    <div className="bg-gray-200 mb-2 p-4 rounded-lg grid grid-cols-3">
                        <div className="text-gray-500">
                            {order.userEmail}
                        </div>
                        <div className="text-center">
                            <span className={(order.paid ? 'bg-green-400' : 'bg-red-400') + ' p-2 rounded-md text-white'}>
                                {order.paid ? 'Paid' : 'Not paid'}
                            </span>
                        </div>
                        <div>
                            {order.createdAt}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}