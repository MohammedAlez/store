import React from 'react'
import img from '../images/—Pngtree—special offer png_6960764.png'
import img1 from '../images/—Pngtree—new product in banner style_8366873.png'

export const Properties = () => {
  return (
    <div className='mx-auto xl:w-[1200px] p-2'>
        <div className='flex flex-col md:flex-row gap-4'>
            <div className=" bg-[#efeff7] flex-1 rounded-lg flex items-center">
                <div className='p-3  flex-[2]'>
                    <h1 className='font-bold text-xl text-gray-950 mb-3'>Weekly Discounts</h1>
                    <p className='text-gray-700 text-sm'>lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem </p>
                </div>
                <div className='p-3 flex-1'>
                    <img src={img} className='animate-scaleAnimation  mx-auto  w-[100px]  h-[100px]' alt="" />
                </div>
            </div>
            <div className=" bg-[#efeff7] flex-1 rounded-lg flex items-center">
                <div className='p-3  flex-[2]'>
                    <h1 className='font-bold text-xl text-gray-950 mb-3'>New Weekly</h1>
                    <p className='text-gray-700 text-sm'>lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem </p>
                </div>
                <div className='p-3 flex-1'>
                    <img src={img1} className='animate-scaleAnimation mx-auto  w-[100px]  h-[100px]' alt="" />
                </div>
            </div>
            
            
        </div>
    </div>
  )
}
