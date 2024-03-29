"use client"
import { useState, useEffect } from "react";
import SectionHeaders from "@/components/layout/SectionHeaders";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "../../components/UseProfile";
import {dbReadableTime} from "../../libs/datetime";
import Link from "next/link";


export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(false);
    const {loading, data: profile} = useProfile();

    useEffect(() => {
        fetchOrders();
    }, []);

    function fetchOrders() {
        setLoadingOrders(true);
        fetch('/api/orders').then(res => {
            res.json().then(orders => {
                setOrders(orders.reverse());
                setLoadingOrders(false);
            })
        })
    }


    return (
        <section className="mt-8 max-w-2xl mx-auto">
            <UserTabs isAdmin={profile.admin}/>
            <div className="text-center">
                <SectionHeaders mainHeader={'Orders'}/>
            </div>
            <div className="mt-8">
                {loadingOrders && (
                    <div>Loading orders...</div>
                )}
                {orders?.length > 0 && orders.map((order, index) => (
                    <div key={index} className="bg-gray-200 mb-2 p-4 rounded-lg grid items-center grid-cols-1 md:grid-cols-3 gap-4">
                        
                        <div className="flex gap-2 md:gap-10 items-center">
                        <div className="bg-white rounded-full flex font-semibold items-center px-2">
                            {index + 1}
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className={(order.paid ? 'bg-green-400' : 'bg-red-400') + ' p-2 rounded-md text-white max-w-max'}>
                                {order.paid ? 'Paid' : 'Not paid'}
                            </span>
                            <span className="text-sm font-semibold text-wrap">{order.orderStatus}</span>
                        </div>
                                
                            </div>
                        <div className="flex flex-col grow">
                            <span className="font-semibold">{order.userEmail}</span>
                            <span className="font-semibold text-sm">{dbReadableTime(order.createdAt)}</span>
                            <div className="text-gray-500 text-sm">
                                {order.cartProducts.map(p => p.name).join(', ')}
                            </div>
                        </div>
                        <div className="justify-end flex gap-2 items-center whitespace-nowrap">
                           
                            
                            <Link
                            className="button" 
                            href={'/orders/'+ order._id}
                            >
                                Show order
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}