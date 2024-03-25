"use client"
import SectionHeaders from "@/components/layout/SectionHeaders";
import { useEffect, useContext } from "react";
import { CartContext } from "@/components/AppContext";

export default function OrderPage() {
    const {clearCart} = useContext(CartContext);

    useEffect(() => {
        if (typeof window.console !== "undefined") {
            if (window.location.href.includes('clear-cart=1')) {
                clearCart();
            }
        }
    },[])
    return (
        <section className="max-w-2xl mx-auto mt-8">
            <div className="text-center">
                <SectionHeaders mainHeader="Your order"/>
                <div className="my-4 text-md font-medium">
                    <p>Thanks for your order.</p>
                    <p>We will call you when order will be on the way</p>
                </div>
            </div>
            
            
        </section>
    )
}