import React from 'react'
import Image from 'next/image';
import MenuItem from '../menu/MenuItem';

const HomeMenu = () => {
  return (
    <section
    className=''
    >
      <div
      className='absolute h-120 left-0 right-0 w-full justify-start'
      >
        <div
        className='absolute -top-[70px] -z-10'
        >
          <Image src={'/sallad1.png'} width={109} height={189} alt={'sallad'}/>
        </div>
        <div
        className='absolute -top-[100px] right-0 -z-10'
        >
          <Image src={'/sallad2.png'} width={107} height={195} alt={'sallad'}/>
        </div>
      </div>
      <div
      className='text-center'
      >
        <h3
        className='uppercase text-gray-600 font-semibold leading-4'
        >
          Check out
        </h3>
        <h2
        className='text-primary font-bold text-4xl italic'
        >
          Menu
        </h2>
      </div>
      <div
      className='grid grid-cols-3 gap-4 mt-4'
      >
        <MenuItem/>
        <MenuItem/>
        <MenuItem/>
        <MenuItem/>
        <MenuItem/>
        <MenuItem/>
      </div>
    </section>
  )
}

export default HomeMenu;