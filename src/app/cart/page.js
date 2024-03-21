"use client"
import { CartContext } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { useContext } from "react";
import { IoTrashOutline } from "react-icons/io5";
import Image from "next/image";

export default function CartPage() {

    const {cartProducts} = useContext(CartContext);

    return (
        <section className="mt-8">
            <div className="text-center">
                <SectionHeaders mainHeader="Cart"/>
            </div>
            
            <div className="mt-4 grid gap-4 grid-cols-2">
                <div>
                    {cartProducts?.length === 0 && (
                        <div>No products in your shopping cart</div>
                    )}
                    {cartProducts?.length > 0 && cartProducts.map((product, index ) => (
                        <div
                        key={index}
                        className="flex gap-4 mb-4 items-center gap-4 mb-4 border-b py-4"
                        >
                            <div className="w-24">
                                <Image width={240} height={240} src={product.image} alt={"product image"}/>
                            </div>
                            <div className="text-gray-700 grow">
                                <h3 className="text-lg font-semibold ">
                                    {product.name}
                                </h3>
                                {product.size && (
                                    <div className="text-sm text-gray-700 font-medium">Size: <span>{product.size.name}</span></div>
                                )}
                                {product.extras?.length > 0 && (
                                    <div>
                                        {product.extras.map(extra => (
                                        <div className="text-sm text-gray-500">Extra: {extra.name}{" "}${extra.price}</div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="text-xl font-semibold">
                                $12
                            </div>
                            <div>
                                <button className="p-1 rounded-md bg-primary text-white border-none"><IoTrashOutline className="w-6 h-6"/></button>
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    right
                </div>
            </div>
        </section>
    )
}