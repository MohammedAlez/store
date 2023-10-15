import React, { useState, useEffect } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {FaStar} from 'react-icons/fa'
import { useFetch } from './useFetch';
import { useLocation } from 'react-router';

export const Reviews = ({productId}) => {
    // const [load,setLoad] = useState(1)
    const {pathname} = useLocation()
    const [visibleData,setVisibleData] = useState([])
    // const {data,loading} = useFetch(`/feedbacks?populate=*&[filters][product][id][$eq]=${productId}&pagination[page]=${load}&pagination[pageSize]=6`)
    const {data,loading} = useFetch(`/feedbacks?populate=*&[filters][product][id][$eq]=${productId}`)
    // console.log(data)

    useEffect(()=>{
        setVisibleData(visibleData=>[...data]);
    },[data])
    useEffect(()=>{
        setVisibleData([])
    },[pathname])
    // console.log(visibleData);
  return (
    <div className='xl:max-w-[1200px] max-auto px-2 mt-10'>
        <h1 className='font-bold text-xl p-2  mb-4 text-gray-700 '>Reviews</h1>
        <div className='p-4 sm:mx-6 mx-2 rounded-lg max-h-[700px] overflow-y-auto'>
            {visibleData.length !== 0 && visibleData?.map((e,i)=>{
                const rating = e?.attributes?.rating
                return (<div key={e.id} className='flex flex-col gap-2 mb-4'>
                <div className='flex gap-2 '>
                    <AccountCircleIcon style={{fontSize:30,marginTop:5}}/>
                    <div>
                        <span className='font-bold text-sm text-gray-800'>{e?.attributes?.user?.data?.attributes?.username}</span>
                        <span className="flex ">
                            {[...Array(5)].map((e,i)=>{
                                const current = i + 1;
                                return <FaStar key={i} size={14} color={rating >= current ? '#ebd900' : 'gray'}/>
                            })}
                        </span>
                    </div>
                </div>
                <p className=' p-1 px-2  pb-4 ml-[35px] font-medium text-gray-600 text-[14px] border-b border-b-gray-300'>
                    {e?.attributes?.opinion}
                </p>
            </div>)})}
            {(visibleData.length===0 && !loading) ? <div className='text-center font-medium text-xl'>No Reviews Yet</div> : null}
                            
        </div>
        {/* {data.length!==0 && <span className='font-bold block text-center hover:text-gray-600 cursor-pointer' onClick={(()=>setLoad(load + 1))}>Load more</span>} */}
    </div>

  )
}


