import React from 'react'
import { useContextApi } from '../Context'
import FavoriteIcon from '@mui/icons-material/Favorite';
import {Link} from 'react-router-dom'

export const Favorite = () => {
  const {favorite,handleFavList} = useContextApi();
  // console.log(favorite)
  return (
    <>
      <div className=''>
          <h1 className='font-bold text-xl text-[#02022dd6] relative py-2 mb-6 w-fit
          before:bottom-0 before:absolute before:left-1 before:w-[80%] before:h-[3px] before:rounded-sm before:bg-[#02022dd6]
          before:content-[""]'>Favorite</h1>
      </div>
      <div className='grid grid-cols-2 gap-2 md:grid-cols-3 '>{
          favorite.length!==0 &&
          favorite.map((item)=>
            <div key={item.id} className=" p-2 rounded-lg  md:min-w-[240px] relative h-fit">
              <span 
                  className={`text-red-600 absolute right-6 z-[111] top-6  cursor-pointer text-sm  hover:text-red-600`}
                  onClick={()=>handleFavList(item,false)}
              >
                <FavoriteIcon style={{color:"inherit"}}/>
              </span>
              <Link to={`/product/${item.id}`}>
                  <div className='w-full h-[120px]  sm:h-[200px] sm:max-h-[250px] relative rounded-md overflow-hidden'>
                      <img className='h-full w-full  object-cover  z-10 relative ' src={item.attributes.image.data.attributes.url} alt="" />
                  </div>
                  <div className='py-1'>
                      <div className="font-medium text-[12px] text-gray-500">{item?.attributes?.category?.data?.attributes?.name}</div>
                      <div className='font-bold sm:text-sm text-[12px]'>{item.attributes.name}</div>
                      <div className='flex items-end gap-3 '>
                          <span className='text-gray-800 font-medium text-md'>${item.attributes.price}</span>
                          {item.attributes.oldPrice && <span className='text-gray-500 font-medium text-base line-through'>${item.attributes.oldPrice}</span>}
                      </div>
                  </div>
              </Link>
            </div>
          )
      }</div>
      {favorite.length===0 && <div className='font-bold p-2'>There is no favorite products</div>}
    </>
  )
}
