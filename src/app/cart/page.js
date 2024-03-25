"use client"
import { CartContext, cartProductPrice } from "@/components/AppContext";
import SectionHeaders from "@/components/layout/SectionHeaders";
import { useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { IoTrashOutline } from "react-icons/io5";
import Image from "next/image";
import toast from "react-hot-toast";

export default function CartPage() {
    const session = useSession();
    const {status} = session;

    const { cartProducts, removeCartProduct } = useContext(CartContext);
    const [phone, setPhone] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (window.location.href.includes('canceled=1')) {
                toast.error('Payment failed');
            }
        }
    }, [])

    useEffect(() => {
        if (status === 'authenticated') {
            fetch('/api/profile').then(response => {
                response.json().then(data => {
                    setPhone(data.phone);
                    setStreetAddress(data.streetAddress);
                    setPostalCode(data.postalCode);
                    setCity(data.city);
                    setCountry(data.country);
                });
            })
        }

    }, [session, status]);

    let subTotal = 0;
    for (const product of cartProducts) {
        subTotal += cartProductPrice(product);
    }

    async function proceedToCheckout(e) {
        e.preventDefault();
        //address and cart to db
        const address = {streetAddress, phone, postalCode, city, country};

        const promise = new Promise((resolve, reject) => {
            fetch('/api/checkout', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    address,
                    cartProducts,
                }),
            }).then ( async (response) => {
                if (response.ok) {
                    resolve();
                    window.location = await response.json();
                } else {
                    reject();
                }
            });
        });

        await toast.promise(promise, {
            loading: 'Preparing your order...',
            success: 'Redirecting to payment...',
            error: "Something went wrong... Please try again later",
        })
    }

    if (cartProducts.length === 0) {
        return (
            <section className="mt-8 text-center">
                <SectionHeaders mainHeader="Cart"/>
                <p className="mt-4">Your shopping cart is empty</p>
            </section>
        );
    }

    return (
        <section className="mt-8">
            <div className="text-center">
                <SectionHeaders mainHeader="Cart"/>
            </div>
            
            <div className="mt-4 grid gap-4 xs:grid-cols-1 md:grid-cols-2">
                <div>
                    {cartProducts?.length === 0 && (
                        <div>No products in your shopping cart</div>
                    )}
                    {cartProducts?.length > 0 && cartProducts.map((product, index ) => (
                        <div
                        key={index}
                        className="flex gap-4 mb-4 items-center gap-4 mb-4 border-b py-2"
                        >
                            <div className="w-20">
                                <Image className="rounded-xl" width={240} height={240} src={product.image} alt={"product image"}/>
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
                                        <div key={extra._id} className="text-sm text-gray-500">Extra: {extra.name}{" "}${extra.price}</div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="text-xl font-semibold">
                                ${cartProductPrice(product)}
                            </div>
                            <div>
                                <button
                                onClick={() => removeCartProduct(index)} 
                                className="p-1 rounded-md bg-primary text-white border-none"
                                >
                                    <IoTrashOutline className="w-6 h-6"/>
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="mt-4 flex justify-end mr-3 px-2 py-1 pr-5">
                        <div className="py-2 px-4 rounded-xl bg-white text-gray-700 max-w-max">
                            <span className="text-gray-700 text-lg">Subtotal:</span>
                            <span className="text-xl font-semibold pl-2">${subTotal}</span>
                        </div>
                    </div>
                    <div className="-mt-1 flex justify-end mr-3 px-2 py-1 pr-5">
                        <div className="py-2 px-4 rounded-xl bg-white text-gray-700 max-w-max">
                            <span className="text-gray-700 text-lg">Delivery:</span>
                            <span className="text-xl font-semibold pl-2">$4</span>
                        </div>
                    </div>
                    <div className="-mt-1 flex justify-end mr-1 px-4 py-2 pr-7">
                        <div className="py-2 px-4 rounded-xl bg-primary text-white max-w-max">
                            <span className="text-white text-xl">Total:</span>
                            <span className="text-xl font-semibold pl-2">${subTotal + 4}</span>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                    <h2 className="text-lg font-semibold text-gray-700">Checkout</h2>
                    <form onSubmit={proceedToCheckout}>
                    <label>Phone number</label>
                            <input 
                            onChange={e => setPhone(e.target.value)}
                            type="tel" 
                            placeholder="Phone number"
                            value={phone}
                            />
                            <label>Street Address</label>
                            <input 
                            onChange={e => setStreetAddress(e.target.value)}
                            type="text"
                            placeholder="Street address"
                            value={streetAddress}
                            />
                            <div
                            className="flex gap-2"
                            >
                                <div className="w-full">
                                    <label>Postal code</label>
                                    <input 
                                    onChange={e => setPostalCode(e.target.value)}
                                    type="text"
                                    placeholder="Postal code"
                                    value={postalCode}
                                    />
                                </div>
                               <div className="w-full">
                                    <label>City</label>
                                    <input 
                                    onChange={e => setCity(e.target.value)}
                                    type="text"
                                    placeholder="City"
                                    value={city}
                                    />
                               </div>
                            </div>
                            <label>Country</label>
                            <input 
                            onChange={e => setCountry(e.target.value)}
                            type="text"
                            placeholder="Country"
                            value={country}
                            />
                        <button type="submit">Pay ${subTotal + 4}</button>
                    </form>
                </div>
            </div>
        </section>
    )
}