import React, { useRef , useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useContextApi } from './Context'
import { SpinnerCircular } from 'spinners-react';


export const SearchList = ({data,setData,loading}) => {
    const {dispatch} = useContextApi();
    const ref = useRef()
    useEffect(()=>{
        const clickFunc = (e)=>{
            if(e.target.id !== '1'){
                ref?.current?.classList?.add('hidden')
            }else{
                ref?.current?.classList?.remove('hidden')
            }
        }
        document.addEventListener('click',clickFunc);
        return ()=>{
            document.removeEventListener('click',clickFunc)
        }
    },[])
    return (
        <div ref={ref} className="absolute  bg-gray-100 z-[11111] left-0 top-[100%] w-full max-h-[300px] overflow-auto">
            {loading && <div className='text-bold p-4 flex justify-center w-full flex-[3] '>
                <SpinnerCircular 
                    size={30}   
                    thickness={100} 
                    speed={100} 
                    color="rgba(57, 101, 172, 1)" 
                    secondaryColor="rgba(0, 0, 0, 0.44)" />
            </div>}
            { 
                data?.map((item)=>(
                    // item
                    <div  key={item.id} id='1' className="p-2 hover:bg-gray-200  flex justify-between items-center">
                        <Link id='1' key={item.id} to={`/product/${item.id}`} onClick={()=>setData([])} 
                                className="flex gap-4 ">
                            {/* image */}
                            <img 
                            src={item?.attributes?.image?.data?.attributes?.url} alt="" 
                            className='w-[60px] h-[60px] object-cover rounded-md'
                            />
                            {/* info */}
                            <div className='flex flex-col '>
                                <span className='font-md text-sm '>{item?.attributes?.name}</span>
                                <span className='text-green-700 text-sm font-bold'>${item?.attributes?.price}</span>
                            </div>
                        </Link>
                        <button id='1' className="p-1 px-2 bg-blue-700 hover:bg-blue-800 rounded-md text-[11px] text-white font-bold"
                        onClick={()=>dispatch({type:'add',item:{
                            id:item.id,
                            img:item.attributes.image.data.attributes.url,
                            quantity:1,
                            name:item.attributes.name,
                            price:item.attributes.price,
                            desc:item.attributes.desc
                        }})}
                        >
                            Add To Cart
                        </button>
                    </div>
                ))
            }
        </div>
    )
}
