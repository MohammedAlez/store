import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { useContextApi } from './Context';


export const CartShoppingCard = ({item}) => {

    const {dispatch} = useContextApi()
    // console.log(cartItems)
    // console.log(item);
    return (
    <div className='p-4 first-line:flex flex-col gap-3'>
                <div className='flex gap-3 justify-around'>
                    {/* image */}
                    <div className=''>
                        <img src={item.img} className="w-[80px] h-[80px] object-contain rounded-md" alt="" />
                    </div>
                    {/* info */}
                    <div className="flex justify-between w-full max-w-[800px] flex-col sm:flex-row gap-4">
                        <div className="flex justify-between gap-1 sm:justify-center sm:flex-col flex-1">
                            <h1 className='font-bold text-base md:text-lg '>
                                {item.name}
                            </h1>
                            <p className='font-medium text-red-600'>${item.price}</p>
                            
                        </div>
                        <div className="flex sm:justify-around justify-between flex-[2]">
                            <div className=" flex gap-4 items-center">
                                <button onClick={()=>{
                                    if(item?.quantity !== 1){
                                        dispatch({type:'update',
                                        item:{...item,
                                        quantity:item?.quantity-1}})
                                        }}
                                    }
                                    className='rounded-full w-[30px] h-[30px] bg-gray-300 flex justify-center items-center ' >-</button>
                                <span className="font-medium">{item?.quantity}</span>
                                <button onClick={()=>{
                                        dispatch({type:'update',item:{...item,quantity:item?.quantity+1}})
                                    }} 
                                    className='rounded-full w-[30px] h-[30px] bg-gray-300 flex justify-center items-center ' >+</button>
                            </div>
                            <div className="flex flex-col justify-center">
                                <button 
                                    onClick={()=>dispatch({type:'remove',item:{id:item?.id}})}
                                    className='gap-1 flex items-center hover:text-red-600'>
                                    <span className="font-medium">remove</span> <DeleteIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  )
}
