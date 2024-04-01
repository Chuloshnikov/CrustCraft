"use client";
import {useState} from "react";
import toast from 'react-hot-toast';
import { redirect, useParams } from 'next/navigation';

export default function OrderStatusSwitcher({ status }) {
    const [orderStatus, setOrderStatus] = useState(status || "");
    const [redirectToOrders, setRedirectToOrders] = useState(false);
    const {id} = useParams();

    async function handleStatusChange(e) {
        e.preventDefault();
        const data = { orderStatus, _id: id};
        const savingPromise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/order-status', {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {'Content-Type': 'application/json'}
            });
        
            if (response.ok) {
                resolve();
            } else {
                reject();
            }
        });

        await toast.promise(savingPromise, {
            loading: 'Changing status',
            success: 'Status changed!',
            error: 'Error',
        });

        setRedirectToOrders(true);
    }

    if (redirectToOrders) {
        return redirect('/orders');
    }


    return (
        <div>
            <form onSubmit={handleStatusChange}>
            <label>Status change</label>
                    <select value={orderStatus} onChange={e => setOrderStatus(e.target.value)}>
                        
                            <option value="Payment verification">Payment verification</option>
                            <option value="Declined">Declined</option>
                            <option value="In progress">In progress</option>
                            <option value="Preparing">Preparing</option>
                            <option value="On delivery">On delivery</option>
                            <option value="Delivered">Delivered</option>
                            
                    </select>
                <button type="submit">Change status</button>
            </form>
        </div>
    )
}