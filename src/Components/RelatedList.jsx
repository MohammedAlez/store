import React,{useEffect,useState,useRef} from 'react'
import {motion} from 'framer-motion'
import { RelatedCard } from './RelatedCard';
import { useFetch } from './useFetch';

export const RelatedList = ({tags,id}) => {
    const [width,setWidth] = useState()
    const carousel = useRef();
    
    const tagsList = tags?.split(' ').filter((e)=>e!=='')
    // console.log(tagsList);
    const { data } = useFetch(tagsList?.length !== 0 ? `/products?populate=image&${tagsList?.map((tag, index) => `filters[tags][$contains][${index}]=${tag}`).join('&')}` : ' ');
    // console.log(data);
    useEffect(()=>{
        setWidth(carousel?.current?.scrollWidth - carousel?.current?.offsetWidth)
    },[data])
  return (
    <>
        {/* carousel */}
        {data?.length !== 0 && 
        <div className='p-2 '>
            <motion.div className="w-full overflow-hidden cursor-grab " ref={carousel} whileTap={{cursor:'grabbing'}}>
                {/* inner carousel */}
                <motion.div drag='x' dragConstraints={{right:0,left:-width}} className='w-full flex gap-4 '>
                    {data?.map((item)=><RelatedCard key={item.id} item={item}/>)}
                </motion.div>
            </motion.div>
        </div>}
    </>
  )
}
