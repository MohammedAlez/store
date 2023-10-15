import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite';

import { useContextApi } from './Context';

export const RelatedCard = ({item}) => {
    const dis = item?.attributes?.discount;
    const price = item?.attributes?.price
    const {dispatch,handleFavList,favorite} = useContextApi();
    const [isFav,setIsFav] = useState(favorite.findIndex((i)=>i.id===item.id) === -1 ? false : true);
    
    useEffect(()=>{
        handleFavList(item,isFav)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isFav])
  return (
    <div className="p-2 px-4 rounded-lg bg-white md:min-w-[230px] max-w-[230px] min-w-[200px] h-full ">
            <div className='w-full md:h-[250px] h-[200px] relative'>
                <span  className={`${isFav ? 'text-red-600 animate-heartAnimation' : 'text-gray-200'}  absolute right-3  top-3  cursor-pointer text-sm  `}
                    onClick={()=>setIsFav(!isFav)}
                ><FavoriteIcon style={{color:'inherit'}}/></span>
                <img className='h-full max-w-full  object-contain pointer-events-none rounded-lg' src={item?.attributes?.image?.data?.attributes?.url} alt="" />
            </div>
            <div className='py-1'>
                <Link to={`/product/${item.id}`} className='font-medium text-[14px]'>{item?.attributes?.name}</Link>
                <div className='flex items-end gap-3 py-1'>
                    <span className='text-red-600 font-bold text-lg'>${dis ? (price - (dis / 100 * price)) : price}</span>
                    {dis && <span className='text-gray-500 font-medium text-base line-through'>${price}</span>}
                </div>
            </div>
            <div className=''>
                <button 
                onClick={()=>dispatch({type:'add',item:{
                    id:item.id,
                    img:item.attributes.image.data.attributes.url,
                    quantity:1,
                    name:item.attributes.name,
                    price:item.attributes.price,
                    desc:item.attributes.desc
                }})}
                className='
                p-4 py-2 w-full rounded-lg border border-blue-600
                hover:bg-blue-700 transition hover:text-white
                duration-300 text-blue-600 
                font-bold text-sm
                '>Add To Cart</button>
            </div>
        </div>
  )
}
