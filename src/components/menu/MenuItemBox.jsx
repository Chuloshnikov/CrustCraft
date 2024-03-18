import Image from 'next/image';

const MenuItemBox = ({onAddToCart, ...item}) => {
  const {image, description, name, basePrice} = item;

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
        <button
        onClick={onAddToCart}
        className='bg-primary text-white rounded-full px-8 py-2 mt-4'
        >
          Add to cart ${basePrice}
        </button>
    </div>
  )
}

export default MenuItemBox;