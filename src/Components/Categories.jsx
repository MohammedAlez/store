import React from 'react'
import { Link } from 'react-router-dom'
import img from '../images/tv.png'
import img2 from '../images/mac.png'
import img3 from '../images/iphone.png'
import img4 from '../images/ps5.png'

export const Categories = () => {
  return (
    <div className='xl:w-[1200px] mx-auto px-2 py-14'>
        <h1 className='text-2xl font-bold text-gray-800'>Browse by Categories</h1>
        <div className="py-8 grid gap-8 grid-cols-2 sm:grid-cols-4 md:grid-cols-6  ">
            <div className='flex flex-col gap-2 items-center'>
                <div className='w-[100px] h-[100px] rounded-full bg-blue-700 flex justify-center items-center text-white font-bold text-sm'>
                    Daily Offers
                </div>
                <Link to='' className='text-sm font-medium hover:underline hover:underline-offset-2'>Today Offers</Link>
            </div>
            <div className='flex flex-col gap-2 items-center'>
                <div className='w-[100px] h-[100px] rounded-full bg-green-400 flex justify-center items-center text-white font-bold text-sm'>
                    Top Deals
                </div>
                <Link to='' className='text-sm font-medium hover:underline hover:underline-offset-2'>Top Deals</Link>
            </div>
            <div className='flex flex-col gap-2 items-center'>
                <div className='p-3 overflow-hidden w-[100px] h-[100px] rounded-full bg-gray-200 flex justify-center items-center text-white font-bold text-sm'>
                    <img src={img} 
                            className='h-[100%] w-[100%]  object-cover'
                            alt="" />
                </div>
                <Link to='' className='text-sm font-medium hover:underline hover:underline-offset-2'>Televisions</Link>
            </div>
            <div className='flex flex-col gap-2 items-center'>
                <div className='p-3 overflow-hidden w-[100px] h-[100px] rounded-full bg-gray-200 flex justify-center items-center text-white font-bold text-sm'>
                    <img src={img2} 
                            className='h-[100%] w-[100%]  object-cover'
                            alt="" />
                </div>
                <Link to='' className='text-sm font-medium hover:underline hover:underline-offset-2'>Laptops & Pc</Link>
            </div>
            <div className='flex flex-col gap-2 items-center'>
                <div className='p-3 overflow-hidden w-[100px] h-[100px] rounded-full bg-gray-200 flex justify-center items-center text-white font-bold text-sm'>
                    <img src={img3} 
                            className='h-[100%] w-[100%]  object-cover'
                            alt="" />
                </div>
                <Link to='' className='text-sm font-medium hover:underline hover:underline-offset-2'>Mobile & Tablets</Link>
            </div>
            <div className='flex flex-col gap-2 items-center'>
                <div className='p-3 overflow-hidden w-[100px] h-[100px] rounded-full bg-gray-200 flex justify-center items-center text-white font-bold text-sm'>
                    <img src={img4} 
                            className='h-[100%] w-[100%]  object-cover'
                            alt="" />
                </div>
                <Link to='' className='text-sm font-medium hover:underline hover:underline-offset-2'>Games & Videos</Link>
            </div>
        </div>
    </div>
  )
}
