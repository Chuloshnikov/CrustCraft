"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image';
import MenuItem from '../menu/MenuItem';
import SectionHeaders from './SectionHeaders';
import Skeleton from '@mui/material/Skeleton';

const HomeMenu = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(false);

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
        className='xs:hidden md:block absolute -top-[70px] rotate-45 -z-10'
        >
          <Image src={'/hamburger.svg'} width={200} height={200} alt={'sallad'}/>
        </div>
        <div
        className='absolute -top-[70px] right-0 -z-10'
        >
          <Image src={'/pizza.svg'} width={300} height={300} alt={'sallad'}/>
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
      {!bestSellers?.length && (
          <div className='grid grid-cols-1 mdl:grid-cols-3 gap-4 mt-4'>
            <div className='max-w-[360px] h-[380px] flex flex-col items-center justify-center bg-white rounded-lg'>
              <Skeleton  width={200} height={250}/>
              <Skeleton  width={200} height={20}/>
              <Skeleton  width={200} height={20}/>
            </div>
            <div className='max-w-[360px] h-[380px] flex flex-col items-center justify-center bg-white rounded-lg'>
              <Skeleton  width={200} height={250}/>
              <Skeleton  width={200} height={20}/>
              <Skeleton  width={200} height={20}/>
            </div>
            <div className='max-w-[360px] h-[380px] flex flex-col items-center justify-center bg-white rounded-lg'>
              <Skeleton  width={200} height={250}/>
              <Skeleton  width={200} height={20}/>
              <Skeleton  width={200} height={20}/>
            </div>
          </div>
        )}
    </section>
  )
}

export default HomeMenu;