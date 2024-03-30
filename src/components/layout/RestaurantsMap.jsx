import React from 'react'
import Image from 'next/image'

const RestaurantsMap = () => {
    
  return (
    <div className='mt-8 max-w-xl mx-auto'>
       <div className='flex flex-col mx-auto'>
          <div className=' text-gray-500 font-medium flex justify-center'>
            <p className='mx-auto max-w-[300px]'>We currently do not have self-pickup, delivery is carried out by our courier according to the delivery information you provided.</p>
          </div>
          <div>
            <Image className='mx-auto' src={"/delivery.svg"} width={300} height={300} alt='delivery'/>
          </div>
       </div>
    </div>
  )
}

export default RestaurantsMap