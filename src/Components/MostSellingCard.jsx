import React from 'react'
import { Link } from 'react-router-dom'
import StarIcon from '@mui/icons-material/Star';
import { useContextApi } from './Context';

export const MostSellingCard = ({item}) => {
    const {dispatch} = useContextApi();
    
  return (
    <div className="p-4 rounded-sm bg-white min-w-[250px] max-w-[250px] transition border hover:border-gray-200 border-transparent">
        <div className='w-full h-[160px] relative'>
            {item?.attributes?.discount && <span className='absolute left-1 top-1 text-[12px] p-1 bg-red-600 text-white rounded-lg'>{item?.attributes?.discount}% OFF</span>}
            
            <img className='pointer-events-none h-[150px] w-full object-contain' src={item?.attributes?.image?.data?.attributes?.url} alt="" />
        </div>
        <div className='py-1'>
            <div className="font-medium text-[12px] text-gray-500">{item?.attributes?.category?.data?.attributes?.name}</div>
            <Link to={`/product/${item?.id}`} className='font-medium text-sm text-blue-600 hover:underline'>{item?.attributes?.name}</Link>
            <div className='flex gap-[1px] items-center my-1'>
                <StarIcon style={{fontSize:15,color:'#ebd900'}}/>
                <StarIcon style={{fontSize:15,color:'#ebd900'}}/>
                <StarIcon style={{fontSize:15,color:'#ebd900'}}/>
                <StarIcon style={{fontSize:15,color:'#ebd900'}}/>
                <StarIcon style={{fontSize:15,color:'#ebd900'}}/>
                {/* product salles */}
                <span className='font-medium ml-1 text-blue-400'>({item?.attributes?.salles})</span>
            </div>
            <div className='flex items-end gap-3 pb-4'>
                {<span className='text-red-600 font-bold text-lg'>${parseInt((item?.attributes?.price * ((100 - item?.attributes?.discount) / 100)))}</span>}
                {item?.attributes?.discount && <span className='text-gray-500 font-medium text-base line-through'>${item?.attributes?.price}</span>}
            </div>
        </div>
        <div className=''>
            <button 
            className='
            p-4 py-2 w-full rounded-sm hover:bg-blue-600 
            transition text-blue-600 border border-blue-600
            duration-300 hover:text-white bg-white
            font-bold text-sm'
            onClick={()=>dispatch({type:'add',item:{
                id:item.id,
                img:item.attributes.image.data.attributes.url,
                quantity:1,
                name:item.attributes.name,
                price:item.attributes.price,
                desc:item.attributes.desc
            }})}
            >Add To Cart</button>
        </div>
    </div>
  )
}
