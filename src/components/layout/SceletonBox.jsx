import React from 'react';
import Skeleton from '@mui/material/Skeleton';

const SceletonBox = () => {
  return (
    <>
     <div className='max-w-[360px] h-[380px] flex flex-col items-center bg-white rounded-lg'>
        <Skeleton  width={200} height={270}/>
        <Skeleton  width={200} height={20}/>
        <Skeleton  width={200} height={20}/>
    </div>
    <div className='max-w-[360px] h-[380px] flex flex-col items-center bg-white rounded-lg'>
        <Skeleton  width={200} height={270}/>
        <Skeleton  width={200} height={20}/>
        <Skeleton  width={200} height={20}/>
    </div>
    <div className='max-w-[360px] h-[380px] flex flex-col items-center bg-white rounded-lg'>
        <Skeleton  width={200} height={270}/>
        <Skeleton  width={200} height={20}/>
        <Skeleton  width={200} height={20}/>
    </div>
    </>
  )
}

export default SceletonBox;