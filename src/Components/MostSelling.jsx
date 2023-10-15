import React, { useEffect, useRef, useState } from 'react'
import {motion} from 'framer-motion'
import {useFetch} from './useFetch'
import { MostSellingCard } from './MostSellingCard';

export const MostSelling = () => {
    const [width,setWidth] = useState()
    const carousel = useRef();
    const {data} = useFetch(`/products?populate=*&[filters][salles][$null]&sort=salles:desc`)
    useEffect(()=>{
        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
    },[data])
    // console.log(data);

    // console.log(`${data2[0]?.attributes?.dateExpiration}`)
    // console.log(data2);
  return (
    <div id='discount' className='xl:w-[1200px] mx-3 xl:mx-auto  py-14  mt-14 border-t border-t-gray-300  mb-8'>
        <div className='flex justify-between  items-center mb-10'>
            <div className='flex sm:gap-8 gap-4 sm:items-center flex-col sm:flex-row'>
                <h1 className='font-bold text-gray-950 text-2xl'>Best Seller Items</h1>
            </div>
        </div>
        {/* offers */}
        <div className=''>
           {/* carousel */}
            <motion.div className="w-full overflow-hidden cursor-grab" ref={carousel} whileTap={{cursor:'grabbing'}}>
                {/* inner carousel */}
                <motion.div drag='x' dragConstraints={{right:0,left:-width}} className='w-full flex gap-4 '>
                    {data.map((i)=>(
                        <MostSellingCard key={i.id} item={i}/>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    </div>
  )
}
