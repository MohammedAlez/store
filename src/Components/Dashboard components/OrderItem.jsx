import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Disclosure } from '@headlessui/react'
import { makeRequest } from '../makeRequest';
import {  toast } from 'react-toastify';


export const OrderItem = ({order,i}) => {

    const [isFetched,setIsFetched] = useState(false);
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const handleClick=async()=>{
        if(!isFetched){
            setLoading(true)
            try{    
                const res = await makeRequest.get(`/order-items?populate=*&[filters][order][id][$eq]=${order.id}`)
                // console.log(res.data.data);
                setData(res.data.data);
                setIsFetched(true);
            }catch{
                toast.error('Some Thing went wrong!', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }
        }
        setLoading(false)
    }
    return (
        <Disclosure>
            {({ open }) => (
                <>
                    <div className="mt-2 rounded-lg  p-4 py-2 bg-gray-100 w-full flex justify-between items-center">
                        <span className="font-medium">{i+1}</span>
                        <span className="font-medium text-green-700">${order.attributes.totalPrice}</span>
                        <span className="font-medium"
                        style={{color: order.attributes.state==='On Delivery' ? 'orange' : (order.attributes.state==='On Demand' ? 'red' : 'green') }}  
                        >{order.attributes.state}</span>
                        <div className="font-medium text-[13px] flex items-center text-gray-700"><Disclosure.Button onClick={handleClick}>Preview <NavigateNextIcon style={{fontSize:17}}/></Disclosure.Button></div>
                    </div>
                    <Disclosure.Panel className="p-2">
                        {data?.map((i)=>
                            <div key={i.id} className='p-2 px-4 mb-1 bg-blue-100 rounded-xl w-full grid grid-cols-3'>
                                <span className="text-sm">name : <span className='font-medium'>{i.attributes.product.data.attributes.name}</span></span>
                                <span className="text-sm">quantity : <span className='font-bold'>{i.attributes.quantity}</span></span>
                                <span className="text-sm">price : <span className='font-medium'>${i.attributes.product.data.attributes.price}</span></span>
                            </div>
                        )}
                        {loading && <span className='text-sm'>Loading...</span>}
                    </Disclosure.Panel> 
                </>
            )}
        </Disclosure>
        
    )
}
