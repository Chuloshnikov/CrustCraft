import { CartContext } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { useContext } from "react";

export default function CartPage() {

    const {cartProducts} = useContext(CartContext);

    return (
        <section className="mt-8">
            <div className="text-center">
                <SectionHeaders mainHeader="Cart"/>
            </div>
            
            <div className="mt-4 grid gap-4 grid-cols-2">
                <div>
                    products
                </div>
                <div>
                    right
                </div>
            </div>
        </section>
    )
}