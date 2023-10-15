import React from 'react'
import { Link } from 'react-router-dom'
import img from '../images/2021-hero-image-2.jpg'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DiscountIcon from '@mui/icons-material/Discount';
import RepeatOneIcon from '@mui/icons-material/RepeatOne';
import GppGoodIcon from '@mui/icons-material/GppGood';
import img2 from '../images/ps5 pro.jpg'
import img3 from '../images/vr.png'
import img4 from '../images/pngwing.com.png'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination,Autoplay } from "swiper";


export const Landing = () => {
  return (
    <div className=' '>
        <div className='xl:w-[1200px] mx-auto px-2'> 
            {/* main images */}
            <div className="w-full flex gap-3 relative flex-col lg:flex-row">
                <div className="flex-[2] rounded-xl overflow-hidden relative">
                    <Swiper className='mySwiper w-full h-[300px] sm:h-[550px]'
                    pagination={{ clickable: true }} autoplay={{delay:2000,disableOnInteraction:false}} 
                    modules={[Pagination,Autoplay]}
                    loop={true}
                    >
                        <SwiperSlide>
                            <img src={img2}  alt="" 
                                className='max-w-full  w-full   object-cover  h-full'
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={img}  alt="" 
                                className='max-w-full  w-full   object-cover  h-full'
                            />
                        </SwiperSlide>
                        
                    </Swiper>
                    <div className="absolute top-[50%] translate-y-[-50%] left-8 z-10">
                        <h1 className='font-bold sm:text-3xl text-white text-xl'>30% Discounts</h1>
                        <h1 className='font-bold sm:text-3xl mt-3 text-white text-xl'>All Products</h1>
                        <Link to='/products' className='
                            p-2 rounded-lg bg-white w-fit font-bold text-sm hover:text-white hover:bg-blue-600 transition duration-300
                            mt-6 block
                        '>Shop Now</Link>
                    </div>
                </div>
                <div className=" hidden lg:flex flex-col gap-3 flex-1 w-full h-[550px]">
                    <div className='bg-[#efeff7] flex rounded-xl p-2 h-[50%]'>
                        <div className='flex flex-col justify-between p-4 w-[50%]'>
                            <div className='font-bold text-3xl'>Apple iphone 14 & 14 pro</div>
                            <div className=''>
                                <span className='text-[13px] mb-3 text-gray-400 block'>LIMITED TIME OFFER</span>
                                <div >
                                    <span className='text-[30px] mr-2  text-red-600 font-medium'>$999</span>
                                    <span className='text-gray-600 text-xl  font-medium line-through'>$1200</span>
                                </div>
                            </div>
                        </div>
                        <img src={img4} className=' h-full object-cover w-[50%] ' alt="" />
                    </div>
                    <div className='bg-[#efeff7] flex rounded-xl p-2 h-[50%]'>
                        <div className='flex flex-col justify-between p-4 w-[50%] py-9'>
                            <div>
                                <div className='font-bold text-3xl mb-2'>PS5 VR</div>
                                <p className='text-base font-bold text-gray-400'>PS5 VR Headset and Controller</p>
                            </div>
                            <p className='font-bold text-xl '>
                                Save up to 
                                <span className='text-xl text-green-600 font-medium'> $150</span>
                            </p>
                        </div>
                        <img src={img3} className='h-full object-cover w-[50%]' alt="" />
                    </div>
                </div>
            </div>
            {/* properties grid-cols-1 sm:grid-cols-2 lg:*/}
            <div>
                <div className='mx-auto w-[80%] sm:w-[80%] lg:w-full py-14 grid gap-2 sm:gap-8 px-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
                    <div className="flex gap-4 items-center ml-3 sm:ml-0 lg:justify-center text-[30px] sm:text-[35px]">
                        <div className='h-[60px] w-[60px] rounded-full bg-blue-200 flex justify-center items-center'>
                            <LocalShippingIcon style={{fontSize:'inherit',color:'#0f0f37'}}/>
                        </div>
                        <div className=''>
                            <div className='font-bold text-[13px] sm:text-[15px]'>Free Shipping</div>
                            <div className='text-gray-500 text-[11px] font-bold'>All orders over 200$</div>
                        </div>
                    </div>
                    <div className="flex gap-4 items-center ml-3 sm:ml-0 lg:justify-center text-[30px] sm:text-[35px]">
                        <div className='h-[60px] w-[60px] rounded-full bg-blue-200 flex justify-center items-center'>
                            <RepeatOneIcon style={{fontSize:'inherit',color:'#0f0f37'}}/>
                        </div>
                        <div className=''>
                            <div className='font-bold text-[13px] sm:text-[15px]'>1 & 1 returns</div>
                            <div className='text-gray-500 text-[11px] font-bold'>Cancellation after 1 day</div>
                        </div>
                    </div>
                    <div className="flex gap-4 items-center ml-3 sm:ml-0 lg:justify-center text-[30px] sm:text-[35px]">
                        <div className='h-[60px] w-[60px] rounded-full bg-blue-200 flex justify-center items-center'>
                            <GppGoodIcon style={{fontSize:'inherit',color:'#0f0f37'}}/>
                        </div>
                        <div className=''>
                            <div className='font-bold text-[13px] sm:text-[15px]'>100$ secure payment</div>
                            <div className='text-gray-500 text-[11px] font-bold'>Garuntee secure payment</div>
                        </div>
                    </div>
                    <div className="flex gap-4 items-center ml-3 sm:ml-0 lg:justify-center text-[30px] sm:text-[35px]">
                        <div className='h-[60px] w-[60px] rounded-full bg-blue-200 flex justify-center items-center'>
                            <DiscountIcon style={{fontSize:'inherit',color:'#0f0f37'}}/>
                        </div>
                        <div className=''>
                            <div className='font-bold text-[13px] sm:text-[15px]'>Daily offers</div>
                            <div className='text-gray-500 text-[11px] font-bold'>Discount up to 70%</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

