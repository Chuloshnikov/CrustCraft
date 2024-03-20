import Image from 'next/image';
import { useContext, useState } from 'react';
import {CartContext} from "@/components/AppContext";
import toast from 'react-hot-toast';
import MenuItemBox from "./MenuItemBox";

const MenuItem = (menuItem) => {
  const {
    image,name,description,basePrice,
    sizes, extraIngredientPrices,
  } = menuItem;

  const [showPopup, setShowPopup] = useState(false);
  const {addToCart} = useContext(CartContext);

  function handleAddToCartButtonClick() {
    if (sizes.length === 0 && extraIngredientPrices.length === 0) {
      addToCart({image, name, description, basePrice, sizes, extraIngredientPrices});
      toast.success('Added to cart');
    } else {
      setShowPopup(true);
    }
  }

  return (
    <>
    {showPopup && (
      <div className='fixed inset-0 bg-black/80 flex items-center justify-center'>
        <div className='bg-white p-4 rounded-lg max-w-md'>
          <Image 
          src={image} 
          alt={name} 
          width={300} 
          height={200}
          className='mx-auto'
          />
          <h2 className='text-lg bold text-center'>{name}</h2>
          <p className='text-center text-gray-600 text-sm mb-2'>{description}</p>
          {sizes?.length > 0 && (
            <div className='bg-gray-200 rounded-md p-2'>
              <h3 className='text-center trxt-gray-500'>Pick your size</h3>
              <div className='p-2'>
                {sizes?.map((size, index) => (
                    <label key={index} className='py-1 border flex gap-2'>
                        <input 
                        className='focus:ring-primary text-primary dark:focus:ring-gray-500 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 focus:border-white ring-offset-0'
                        type="radio"
                        /> 
                        <span>{size.name}</span> 
                        <span>${basePrice + size.price}</span>
                    </label>
                ))}
              </div>
            </div>  
          )}
        </div>
      </div>
    )}
    <MenuItemBox onAddToCart={handleAddToCartButtonClick} {...menuItem}/>
    </>
   
  )
}

export default MenuItem