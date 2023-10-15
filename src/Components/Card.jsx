import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useContextApi } from './Context';
// import AddCircleIcon from '@mui/icons-material/AddCircle';
// import {LazyLoadImage} from 'react-lazy-load-image-component'
// import { Blurhash } from 'react-blurhash';
// import { ImageHashBlur } from './ImageHashBlur';


export const Card = ({item}) => {
    const {dispatch,handleFavList,favorite} = useContextApi();
    const [isFav,setIsFav] = useState(favorite.findIndex((i)=>i.id===item.id) === -1 ? false : true);
    const handleFav=()=>{
        setIsFav(!isFav)
    }
    // console.log(item);
    useEffect(()=>{
        handleFavList(item,isFav)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isFav])
    // console.log(process.env.REACT_APP_UP_URL + item?.attributes?.image2?.data?.attributes?.url)
  return (
    <div className=" p-2 rounded-lg  sm:min-w-[250px] relative h-fit">
            <span 
                className={`${isFav ? 'text-red-600 animate-heartAnimation' : 'text-gray-200'}   absolute right-6 z-[11] top-6  cursor-pointer text-sm `}
                onClick={handleFav}
            ><FavoriteIcon style={{color:"inherit"}}/></span>
            <Link to={`/product/${item.id}`}>
                <div className='w-full h-[120px]  sm:h-[200px] sm:max-h-[250px] relative rounded-md overflow-hidden'>
                    {/* <img className='h-full w-full  object-contain absolute top-0 left-0' src={process.env.REACT_APP_UP_URL + item?.attributes?.image2?.data?.attributes?.url} alt="" /> */}
                    <img className='h-full w-full  object-contain z-10 relative duration-400 transition' src={item.attributes.image.data.attributes.url} alt="" />
                    {/* <LazyLoadImage
                        src={process.env.REACT_APP_UP_URL + item.attributes.image.data.attributes.url}
                        effect='blur'
                        width={'100%'}
                        height={'100%'}
                        placeholderSrc={process.env.REACT_APP_UP_URL + item.attributes.image.data.attributes.url}
                    /> */}
                </div>
                {/* <ImageHashBlur hash={ item?.attributes?.image?.data?.attributes?.hashblur} ss={process.env.REACT_APP_UP_URL + item?.attributes?.image?.data?.attributes?.url} /> */}
                <div className='py-1'>
                    <div className="font-medium text-[12px] text-gray-500">{item?.attributes?.category?.data?.attributes?.name}</div>
                    <div className='font-bold sm:text-sm text-[12px]'>{item.attributes.name}</div>
                    <div className='flex items-end gap-3 '>
                        <span className='text-gray-800 font-medium text-md'>${item.attributes.price}</span>
                        {item.attributes.oldPrice && <span className='text-gray-500 font-medium text-base line-through'>${item.attributes.oldPrice}</span>}
                    </div>
                </div>
            </Link>
            <div className=''>
                <button 
                className='
                p-4 py-1 mx-auto w-fit rounded-sm border border-blue-600
                hover:bg-blue-700 transition hover:text-white
                duration-300 text-blue-600 
                font-bold text-sm
                '
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
            {/* <div 
            onClick={()=>dispatch({type:'add',item:{
                id:item.id,
                img:item.attributes.image.data.attributes.url,
                quantity:1,
                name:item.attributes.name,
                price:item.attributes.price,
                desc:item.attributes.desc
            }})}
            className='text-blue-600 absolute bottom-[15px] right-[15px] cursor-pointer hover:scale-[1.3] transition duration-300'>
                <AddCircleIcon style={{color:'inherit'}}/>
            </div> */}
        </div>
  )
}
