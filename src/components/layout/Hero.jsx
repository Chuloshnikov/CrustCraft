import Image from 'next/image';
import React from 'react';
import { HiOutlineArrowCircleRight } from "react-icons/hi";

const Hero = () => {
  return (
    <section
    className='hero'
    >
        <div
        className='py-12'
        >
            <h1
            className='text-4xl font-semibold'
            >
                Everything<br/> is better<br/> with a&nbsp;
                <span className='text-primary'>Pizza</span>
            </h1>
            <p
            className='my-4 text-gray-500 text-sm'
            >
                Pizza is the missing piece that makes every day complete, a simple yet delicious joy in life
            </p>
            <div
            className='flex gap-4'
            >
                <button
                className='bg-primary text-white px-4 py-2 rounded-full flex gap-2 items-center uppercase'
                >
                    Order now
                    <HiOutlineArrowCircleRight className='w-6 h-6'/>
                </button>
                <button
                className='flex gap-2 py-2 items-center text-gray-400 font-semibold'
                >
                    Learn more
                    <HiOutlineArrowCircleRight className='w-6 h-6'/>
                </button>
            </div>
        </div>
        <div
        className='relative'
        >
            <Image src={'/pizza.png'} layout={'fill'} objectFit={'contain'} alt={'pizza'}/>
        </div>
    </section>
  )
}

export default Hero