import Image from "next/image";
import {cartProductPrice} from "@/components/AppContext";
import { IoTrashOutline } from "react-icons/io5";

export default function CartProduct({ product, index, onRemove }) {
    return (
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
                {!!onRemove && (
                    <button
                    onClick={() => removeCartProduct(index)} 
                    className="p-1 rounded-md bg-primary text-white border-none"
                    >
                        <IoTrashOutline className="w-6 h-6"/>
                    </button>
                )}
                
            </div>
        </div>
    )
}