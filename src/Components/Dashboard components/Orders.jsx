import React from 'react'
import { useDashboardContext } from '../../Auth components/Dashboard';
import { OrderItem } from './OrderItem';
import { SpinnerCircular } from 'spinners-react';

export const Orders = () => {
  
  const {orders} = useDashboardContext()
  // console.log(orders);
  return (
    <div className=''>
        <h1 className='font-bold text-xl text-[#02022dd6] relative py-2 mb-6 w-fit
        before:bottom-0 before:absolute before:left-1 before:w-[80%] before:h-[3px] before:rounded-sm before:bg-[#02022dd6]
        before:content-[""]'>Orders</h1>
        
        <div className="">
          {orders?.loading && <div>
            <div className='flex justify-center mt-16'>
              <SpinnerCircular 
                size={40} 
                thickness={100} 
                speed={100} 
                color="#2d2b2b" 
                secondaryColor="rgba(0, 0, 0, 0.44)" 
              />
            </div>
            </div>}
          {orders?.data?.map((order,i)=>
            <OrderItem key={order.id} order={order} i={i}/>
          )
          }
          {(!orders.loading && orders.data.length===0) && <div className='font-bold p-2'>There is no Orders </div>}
        </div>
    </div>
  )
}
