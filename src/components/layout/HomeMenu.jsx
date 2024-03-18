"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image';
import MenuItem from '../menu/MenuItem';
import SectionHeaders from './SectionHeaders';

const HomeMenu = () => {
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    fetch('/api/menu-items').then(res => {
      res.json().then(menuItems => {
        setBestSellers(menuItems.slice(2, 5));
      })
    })
  }, [])

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
        <SectionHeaders subHeader={'check out'} mainHeader={'Our Best Sellers'}/>
      </div>
      <div
      className='grid grid-cols-1 mdl:grid-cols-3 gap-4 mt-4'
      >
        {bestSellers?.length > 0 && bestSellers.map(item => (
          <MenuItem key={item._id} {...item}/>
        ))}
      </div>
    </section>
  )
}

export default HomeMenu;