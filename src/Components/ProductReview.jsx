import React, { useState,useEffect } from 'react'
import StarIcon from '@mui/icons-material/Star';
import { useParams } from 'react-router';
import { useFetch } from './useFetch';
import { useContextApi } from './Context';
import { RelatedList } from './RelatedList';
import { Reviews } from './Reviews';
import AddReview from './AddReview';



export const ProductReview = () => {
    const [quantity,setQuantity] = useState(1)
    const params = useParams();
    const { data, loading } = useFetch(`/products/${params.id}?populate=*`);

    const dis = data?.attributes?.discount;
    const price = data?.attributes?.price
    const [mainImage,setMainImage] = useState(null);
    const {dispatch,user} = useContextApi()
    // console.log(cartItems);
    useEffect(()=>{
        setMainImage(data?.attributes?.image?.data?.attributes?.url)
        // console.log(data?.attributes?.image)
    },[data])
    // console.log(data);
  return ( 
    <div className='xl:w-[1200px] mx-auto px-2 py-20'>
        {!loading ? 
        <div className="flex flex-col md:flex-row gap-2 md:gap-8">
            {/* images */}
            <div className='flex items-center flex-col gap-4 flex-1'>
                {/* mainImage */}
                <div className='w-full'>
                    <img src={mainImage} className='rounded-lg w-full h-[400px] p-6 object-contain' alt="" />
                </div>
                {/* otherImages */}
                <div className="flex gap-1 mx-3 overflow-x-auto">
                    <img src={data?.attributes?.image?.data?.attributes?.url}  
                        className='cursor-pointer w-[80px] rounded-lg h-[80px]  object-cover' 
                        onClick={()=>setMainImage(data?.attributes?.image?.data?.attributes?.url)}
                        alt="" />
                    {data?.attributes?.images?.data?.map((i)=>(
                        <img src={i?.attributes?.url} 
                        key={i?.id} 
                        className='cursor-pointer w-[80px] h-[80px]  object-contain' 
                        onClick={()=>setMainImage(i?.attributes?.url)}
                        alt="" />
                    ))}
                </div>
            </div>
            {/* info */}
            <div className="flex-1 px-8 py-2 flex-col justify-between ">
                <div className=''>
                    <h1 className='font-bold mb-2'>{data?.attributes?.name}</h1>
                    <div className='py-2 font-bold border-black border-t-2 w-fit px-2 '>
                        <span className='mr-2 text-red-600 font-bold text-lg'>${dis ? (price - (dis / 100 * price)) : price}</span>
                        {dis && <span className='text-gray-500 font-medium text-base line-through'>${price}</span>}
                    </div>
                    <div className='flex gap-[1px] items-center'>
                                    <StarIcon style={{fontSize:17,color:'#ebd900'}}/>
                                    <StarIcon style={{fontSize:17,color:'#ebd900'}}/>
                                    <StarIcon style={{fontSize:17,color:'#ebd900'}}/>
                                    <StarIcon style={{fontSize:17,color:'#ebd900'}}/>
                                    <StarIcon style={{fontSize:17,color:'#ebd900'}}/>
                                    {/* product salles */}
                                    <span className='font-medium ml-1 text-black'></span>
                    </div>
                    <p className='text-gray-600 font-medium py-6'>{data?.attributes?.desc}</p>
                    <div className='items-center flex gap-4'>
                        <button className='flex items-center justify-center w-[30px] h-[30px] bg-gray-200 rounded-full text-xl font-bold' onClick={()=>setQuantity(quantity===1?1:quantity-1)}>-</button>
                        <span className='font-bold text-2xl'>{quantity}</span>
                        <button className='flex items-center justify-center w-[30px] h-[30px] bg-gray-200 rounded-full text-xl font-bold' onClick={()=>setQuantity(quantity+1)}>+</button>
                    </div>
                </div>
                <div className='flex gap-3 items-center mt-12'>
                    <button className='border text-sm border-blue-600 p-2 px-4  font-bold rounded-lg text-blue-600 hover:bg-blue-600 hover:text-white'
                        onClick={()=>dispatch({type:'add',
                        item:{
                            id:data?.id,
                            quantity,
                            price:data?.attributes?.price,
                            name:data?.attributes?.name,
                            img:data?.attributes?.image?.data?.attributes?.url
                        }})}
                    >Add to Cart</button>
                    <AddReview userId={user?.id} productId={data?.id}/>
                </div>
            </div>
        </div>
        : 
        <div class="animate-pulse flex flex-col md:flex-row gap-2 md:gap-8 space-x-4">
            {/* images */}
            <div className='flex items-center flex-col gap-4 flex-1'>
                {/* mainImage */}
                <div className='w-full p-10'>
                    <div  className=' w-full h-[300px] bg-gray-200 rounded-lg object-contain' ></div>
                </div>
                {/* otherImages */}
                <div className="flex gap-1 mx-3 overflow-x-auto">
                    <div className='cursor-pointer w-[80px] h-[80px] rounded-lg object-cover bg-gray-200'></div>
                    <div className='cursor-pointer w-[80px] h-[80px] rounded-lg object-cover bg-gray-200' ></div>
                    
                </div>
            </div>
            {/* info */}
            <div className="flex-1 px-8 py-2 flex-col justify-between ">
                <div className='py-10'>
                    <div className='font-bold mb-2 w-20 py-3 bg-gray-200 rounded-lg'></div>
                    <div className='py-2 font-bold  w-fit  '>
                        <span className='inline-block  text-red-600 font-bold text-lg bg-gray-200 w-20 rounded-lg py-2 ' ></span>
                        <span className='inline-block text-gray-500 font-medium text-base line-through bg-gray-200 w-20 rounded-lg py-2 mx-2'></span>
                    </div>
                    <div className='flex gap-[1px] items-center w-28 rounded-lg h-4 bg-gray-200'>
                    </div>
                    <p className='text-gray-600 font-medium py-6'>
                        <div className="w-[250px] rounded-lg py-2 my-[8px] bg-gray-200"></div>
                        <div className="w-[250px] rounded-lg py-2 my-[8px] bg-gray-200"></div>
                        <div className="w-[240px] rounded-lg py-2 my-[8px] bg-gray-200"></div>
                        <div className="w-[200px] rounded-lg py-2 my-[8px] bg-gray-200"></div>
                        <div className="w-[150px] rounded-lg py-2 my-[8px] bg-gray-200"></div>
                    </p>
                </div>
                <div className='flex gap-3 items-center mt-12'>
                    <div className='rounded-lg bg-gray-200 w-[100px] h-8'></div>
                    <div className='rounded-lg bg-gray-200 w-[100px] h-8'></div>
                </div>
            </div>
        </div>}
        {/* Reviews */}
        <Reviews item={data} productId={params.id}/>
        {/* related items */}
        <div className="p-3 mt-12">
            <h1 className='font-bold text-xl p-2  mb-4 text-gray-700 '>Related Products</h1>
            <RelatedList tags={data?.attributes?.tags} id={params.id}/>
        </div>

    </div>
  )
}
