import React from 'react'
import img1 from '../images/logos/img1.png'
import img2 from '../images/logos/img2.png'
import img3 from '../images/logos/img3.png'
import img4 from '../images/logos/img4.png'
import img5 from '../images/logos/img5.png'
export const BrandsSection = () => {
  return (
    <div className='xl:w-[1200px] mx-auto p-2'>
        <div className='flex justify-center gap-4 md:gap-16'>
            <img src={img1} className='md:w-[100px] w-[50px] md:h-[100px] h-[50px] object-contain hover:scale-110 transition duration-200' alt="" />
            <img src={img2} className='md:w-[100px] w-[50px] md:h-[100px] h-[50px] object-contain hover:scale-110 transition duration-200' alt="" />
            <img src={img3} className='md:w-[100px] w-[50px] md:h-[100px] h-[50px] object-contain hover:scale-110 transition duration-200' alt="" />
            <img src={img4} className='md:w-[100px] w-[50px] md:h-[100px] h-[50px] object-contain hover:scale-110 transition duration-200' alt="" />
            <img src={img5} className='md:w-[100px] w-[50px] md:h-[100px] h-[50px] object-contain hover:scale-110 transition duration-200' alt="" />
        </div>
    </div>
  )
}
