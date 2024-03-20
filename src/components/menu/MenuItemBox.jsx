import Image from 'next/image';
import AddToCartButton from "@/components/menu/AddToCartButton";

const MenuItemBox = ({onAddToCart, ...item}) => {
  const {image, description, name, basePrice, sizes, extraIngredientPrices,} = item;

  const hasSizesOrExtras = sizes?.length > 0 || extraIngredientPrices?.length > 0;
  
  return (
    <div
      className='bg-white p-4 rounded-lg text-center hover:shadow-lg hover:shadow-black/25 duration-200'
      >
        <div
        className='flex justify-center items-center h-[200px] w-[200px] mx-auto'
        >
            <Image className='overflow-hidden' src={image} width={200} height={200} alt="menu-item"/>
        </div>
        <h4
        className='font-semibold my-3'
        >
          {name}
        </h4>
        <p
        className='text-gray-500 text-sm max-h-16 overflow-y-clip overflow-ellipsis'
        >
          {description.slice(0, 80)} 
        </p>
        <AddToCartButton
        image={image}
        hasSizesOrExtras={hasSizesOrExtras}
        onClick={onAddToCart}
        basePrice={basePrice}
      />
    </div>
  )
}

export default MenuItemBox;