import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {motion} from 'framer-motion'
import { DealsCard } from './DealsCard';
import {useFetch} from './useFetch'
import { Timer } from './Timer';

export const Deals = () => {
    const [width,setWidth] = useState()
    const carousel = useRef();
    const {data} = useFetch(`/products?populate=*&[filters][dateExpiration][$null]`)
    const [data2,setData2] = useState([])
    const [discount,setDiscount] = useState(null)
    useEffect(()=>{
        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
        const filterData=()=>{
            const currentDate = new Date();
            setData2(data.filter((i)=>
                (new Date(i.attributes.dateExpiration) > currentDate && i.attributes.discount)
            ))
        }
        filterData();
    },[data])
    useEffect(()=>{
        setDiscount(data2[0]?.attributes?.dateExpiration)
    },[data2])
    // console.log(data);

    // console.log(`${data2[0]?.attributes?.dateExpiration}`)
    // console.log(data2);
  return (
    <div id='discount' className='xl:w-[1200px] mx-auto  p-8 bg-[#072783] rounded-xl mb-8'>
        <div className='flex justify-between  items-center mb-10'>
            <div className='flex sm:gap-8 gap-4 sm:items-center flex-col sm:flex-row'>
                <h1 className='font-bold text-white text-lg'>Deals Of The Week</h1>
                <div className='p-2 py-1  font-bold   bg-[#ebd900] flex gap-2 rounded-lg items-center'>
                    <AccessTimeIcon style={{fontSize:18}}/>
                    {discount ? <Timer date={discount}/>
                    :<div  className='text-[12px] flex gap-4'><span>EXPIRES IN: </span> 00D : 00H : 00M : 00S</div>}
                </div>
            </div>
            <Link to='' className='text-sm hidden sm:block text-white hover:underline'>All products</Link>
        </div>
        {/* offers */}
        <div className=''>
           {/* carousel */}
            <motion.div className="w-full overflow-hidden cursor-grab" ref={carousel} whileTap={{cursor:'grabbing'}}>
                {/* inner carousel */}
                <motion.div drag='x' dragConstraints={{right:0,left:-width}} className='w-full flex gap-4 '>
                    {data2.map((i)=>(
                        <DealsCard key={i.id} item={i}/>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    </div>
  )
}
