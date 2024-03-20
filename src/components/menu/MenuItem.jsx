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

  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const {addToCart} = useContext(CartContext);

  async function handleAddToCartButtonClick() {
    console.log('add to cart');
    const hasOptions = sizes.length > 0 || extraIngredientPrices.length > 0;
    if (hasOptions && !showPopup) {
      setShowPopup(true);
      return;
    }
    addToCart(menuItem, selectedSize, selectedExtras);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('hiding popup');
    setShowPopup(false);
  }


  const handleExtraClick = (e, extra) => {
    const checked = e.target.checked;

    if (checked) {
      setSelectedExtras(prev => [...prev, extra]);
    } else {
      setSelectedExtras(prev => {
        return prev.filter(e => e.name !== extra.name);
      })
    }
  }


  let selectedPrice = basePrice;
  if (selectedSize) {
    selectedPrice += selectedSize.price
  }

  if (selectedExtras?.length > 0) {
    for (const extra of selectedExtras) {
      selectedPrice += extra.price;
    }
  }

  return (
    <>
    {showPopup && (
      <div 
      onClick={() => setShowPopup(false)}
      className='fixed inset-0 bg-black/80 flex items-center justify-center'
      >
        <div
        onClick={e => e.stopPropagation()}
         className='bg-white p-2 rounded-lg max-w-md'>
          <div className='overflow-y-scroll p-2' style={{maxHeight: 'calc(100vh - 100px'}}>
              <Image 
              src={image} 
              alt={name} 
              width={300} 
              height={200}
              className='mx-auto'
              />
              <h2 className='text-lg font-bold text-center'>{name}</h2>
              <p className='text-center text-gray-600 text-sm mb-2'>{description}</p>
              {sizes?.length > 0 && (
                <div className='bg-gray-200 rounded-md p-2'>
                  <h3 className='text-center text-gray-500'>Pick your size</h3>
                  <div className='py-2'>
                    {sizes?.map((size, index) => (
                        <label key={index} className='py-1 border flex gap-2'>
                            <input 
                            onClick={() => setSelectedSize(size)}
                            checked={selectedSize?.name === size.name}
                            className='focus:ring-primary text-primary focus:text-primary dark:focus:ring-gray-500 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 focus:border-white ring-offset-0'
                            type="radio"
                            /> 
                            <span>{size.name}</span> 
                            <span>${basePrice + size.price}</span>
                        </label>
                    ))}
                  </div>
                </div>  
              )}
              {sizes?.length > 0 && (
              <div className='bg-gray-200 rounded-md p-2 mt-2'>
                  <h3 className='text-center text-gray-500'>Any extras?</h3>
                  <div className='py-2'>
                    {extraIngredientPrices?.map((extra, index) => (
                        <label key={index} className='py-1 border flex gap-2'>
                            <input 
                            onClick={e => handleExtraClick(e, extra)}
                            className='focus:ring-primary text-primary focus:text-primary dark:focus:ring-gray-500 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 focus:border-white ring-offset-0'
                            type="checkbox"
                            name={extra.name}
                            /> 
                            <span>{extra.name}</span> 
                            <span>${extra.price}</span>
                        </label>
                    ))}
                  </div>
                </div>  
                )}
                <button 
                onClick={handleAddToCartButtonClick}
                className='primary sticky bottom-2' 
                type="button"
                >
                  Add to cart ${selectedPrice}
                </button>
                <button 
                className='mt-2'
                onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>
          </div>
        </div>
      </div>
    )}
    <MenuItemBox onAddToCart={handleAddToCartButtonClick} {...menuItem}/>
    </>
   
  )
}

export default MenuItem