"use client"
import SectionHeaders from "@/components/layout/SectionHeaders";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "@/components/AppContext";
import { useParams } from "next/navigation";
import OrderInputs from "../../../components/layout/OrderInputs"
import CartProduct from "@/components/menu/CartProduct";

export default function OrderPage() {
    const {clearCart} = useContext(CartContext);
    const [order, setOrder] = useState();
    const {id} = useParams();

    useEffect(() => {
        if (typeof window.console !== "undefined") {
            if (window.location.href.includes('clear-cart=1')) {
                clearCart();
            }
        }
        if (id) {
            fetch('/api/orders?_id=' + id).then(res => {
                res.json().then(orderData => {
                    setOrder(orderData);
                })
            })
        }
    },[]);

    return (
        <section className="max-w-2xl mx-auto mt-8">
            <div className="text-center">
                <SectionHeaders mainHeader="Your order"/>
                <div className="my-4 text-md font-medium">
                    <p>Thanks for your order.</p>
                    <p>We will call you when order will be on the way</p>
                </div>
            </div>
            {order && (
                <div className="grid grid-cols-2 gap-16">
                    <div>
                        {order.cartProducts.map(product => (
                            <CartProduct key={product._id} product={product}/>
                        ))}
                        <div className="mt-4 flex justify-end px-2 py-1">
                            <div className="py-2 px-4 rounded-xl bg-white text-gray-700 max-w-max">
                                <span className="text-gray-700 text-lg">Subtotal:</span>
                                <span className="text-xl font-semibold pl-2">$15</span>
                            </div>
                        </div>
                        <div className="-mt-1 flex justify-end px-2 py-1">
                            <div className="py-2 px-4 rounded-xl bg-white text-gray-700 max-w-max">
                                <span className="text-gray-700 text-lg">Delivery:</span>
                                <span className="text-xl font-semibold pl-2">$4</span>
                            </div>
                        </div>
                        <div className="-mt-1 flex justify-end px-4 py-2 -mr-2">
                        <div className="py-2 px-4 rounded-xl bg-primary text-white max-w-max">
                            <span className="text-white text-xl">Total:</span>
                            <span className="text-xl font-semibold pl-2">${16}</span>
                        </div>
                    </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl">
                        <OrderInputs disabled={true} addressProps={order}/>
                    </div>
                </div>
            )}
        </section>
    )
}