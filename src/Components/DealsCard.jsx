import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import { useContextApi } from './Context';

export const DealsCard = ({item}) => {
    const {dispatch,handleFavList,favorite} = useContextApi();
    const [isFav,setIsFav] = useState(favorite.findIndex((i)=>i.id===item.id) === -1 ? false : true);
    useEffect(()=>{
        handleFavList(item,isFav)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isFav])
  return (
    <div className="p-4 rounded-lg bg-white min-w-[250px] max-w-[250px]">
    <div className='w-full h-[160px] relative'>
        <span className='absolute left-1 top-1 text-[12px] p-1 bg-red-600 text-white rounded-lg'>{item?.attributes?.discount}% OFF</span>
        <span className={`absolute right-1 top-1 cursor-pointer text-sm hover:text-red-700 ${isFav?'text-red-600 animate-heartAnimation':'text-gray-400'}`}
                onClick={()=>setIsFav(!isFav)}
        >
            <FavoriteIcon style={{color:'inherit'}}/>
        </span>
        <img className='pointer-events-none h-[150px] w-full object-contain' src={item?.attributes?.image?.data?.attributes?.url} alt="" />
    </div>
    <div className='py-1'>
        <Link to={`/product/${item?.id}`} className='font-medium'>{item?.attributes?.name}</Link>
        <div className='flex gap-[1px] items-center'>
            <StarIcon style={{fontSize:17,color:'#ebd900'}}/>
            <StarIcon style={{fontSize:17,color:'#ebd900'}}/>
            <StarIcon style={{fontSize:17,color:'#ebd900'}}/>
            <StarIcon style={{fontSize:17,color:'#ebd900'}}/>
            <StarIcon style={{fontSize:17,color:'#ebd900'}}/>
            {/* product salles */}
            <span className='font-medium ml-1 text-blue-400'></span>
        </div>
        <div className='flex items-end gap-3 pb-4'>
            <span className='text-red-600 font-bold text-lg'>${parseInt((item?.attributes?.price * ((100 - item?.attributes?.discount) / 100)))}</span>
            <span className='text-gray-500 font-medium text-base line-through'>${item?.attributes?.price}</span>
        </div>
    </div>
    <div className=''>
        <button 
        className='
        p-4 py-2 w-full rounded-lg hover:bg-blue-600 
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
