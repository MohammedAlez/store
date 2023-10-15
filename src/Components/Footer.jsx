import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MailIcon from '@mui/icons-material/Mail';
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import img from '../images/payment.png'


export const Footer = () => {
  return (
    <div className=' bg-[#0F2F89]'>
        <div className="xl:w-[1200px] mx-auto px-2 ">
            <div className=' border-t border-b border-gray-300 p-2 gap-4 grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
                {/* info */}
                <div className='flex flex-col gap-3 p-2 items-center sm:items-start'>
                  <h1 className='font-bold text-lg text-white'>Shop Best Online Shopping Platform</h1>
                  <p className='text-gray-400 w-full text-sm font-medium py-2 text-center sm:text-left'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium, soluta impedit et at officia quos dol</p>
                  <div className='w-full flex flex-col items-center sm:items-start'>
                    <div className='flex items-center gap-2 '>
                      <HomeIcon style={{color:"#AFAAAA",fontSize:17}}/>
                      <span className='text-gray-400 text-[13px]'>789 Mkhadma Oouargla,Algeria</span>
                    </div>
                    <div className='flex items-start gap-2 my-2 '>
                      <LocalPhoneIcon style={{color:"#AFAAAA",fontSize:17}}/>
                      <div className="flex flex-col gap-1">
                        <span className='text-gray-400 text-[13px]'>24/7 Support:</span>
                        <h1 className='text-sm font-medium text-gray-400'>(+213) 658005590</h1>
                      </div>
                    </div>
                    <div className='flex items-center gap-2 '>
                      <MailIcon style={{color:"#AFAAAA",fontSize:17}}/>
                      <span className='text-gray-400 text-[13px]'>example@shop.com</span>
                    </div>
                  </div>
                </div>
                {/* links */}
                <div className='flex flex-col gap-3 p-2 items-center sm:items-start'>
                  <h1 className='font-bold text-lg text-white'>Links</h1>
                  <div className="w-full flex flex-col gap-2 items-center sm:items-start">
                    <Link className='hover:text-white transtiion duration-200 font-medium text-gray-500' to=''>About us</Link>
                    <Link className='hover:text-white transtiion duration-200 font-medium text-gray-500' to=''>Contact</Link>
                    <Link className='hover:text-white transtiion duration-200 font-medium text-gray-500' to=''>Help Center</Link>
                    <Link className='hover:text-white transtiion duration-200 font-medium text-gray-500' to=''>Policy</Link>
                    <Link className='hover:text-white transtiion duration-200 font-medium text-gray-500' to=''>Sitemap</Link>
                  </div>
                </div>
                {/* help */}
                <div className="flex flex-col gap-3 p-2 items-center sm:items-start">
                  <h1 className='font-bold text-lg text-white'>Customer Service</h1>
                  <div className="w-full flex flex-col gap-2 items-center sm:items-start">
                    <Link className='hover:text-white transtiion duration-200 font-medium text-gray-500' to=''>Payment</Link>
                    <Link className='hover:text-white transtiion duration-200 font-medium text-gray-500' to=''>Shipping</Link>
                    <Link className='hover:text-white transtiion duration-200 font-medium text-gray-500' to=''>Products returns</Link>
                    <Link className='hover:text-white transtiion duration-200 font-medium text-gray-500' to=''>FAQ</Link>
                    <Link className='hover:text-white transtiion duration-200 font-medium text-gray-500' to=''>CheckOut</Link>
                    <Link className='hover:text-white transtiion duration-200 font-medium text-gray-500' to=''>Other issues</Link>
                  </div>
                </div>
                {/* newsLetter */}
                <div className="flex flex-col gap-3 p-2 items-center sm:items-start order-[-1] xl:order-4">
                  <h1 className='font-bold text-lg text-white'>NewsLetter</h1>
                  <p className="text-gray-400 text-sm font-bold text-center sm:text-left">
                    Subscribing to get updates on promostion and coupons
                  </p>
                  <form className='flex '>
                    <input type="email" className='p-2  py-1 border text-sm focus:outline-none border-gray-200 border-r-transparent rounded-l-md' />
                    <input type="submit" className='p-2 cursor-pointer py-1 text-sm font-bold bg-blue-700 text-white rounded-r-md' value="Sbuscribe" />
                  </form>
                  <span className='text-sm text-gray-400'>By Subscribing you accepted our <Link to='' className='hover:underline font-bold text-gray-300' >policy</Link></span>
                </div>
            </div>
            <div className='p-2 items-center gap-2 sm:gap-0 flex flex-col md:flex-row sm:justify-between'>
              <div className='p-1 flex gap-1 items-center'>
                  <span className='font-bold text-sm text-gray-300'>Follow us: </span>
                  <Link to='' className=' hover:text-blue-700 text-white'><FacebookIcon style={{fontSize:23,color:'inherit'}}/></Link>
                  <Link to='' className='hover:text-[#386af1]  text-white'><TwitterIcon style={{fontSize:23,color:'inherit'}}/></Link>
                  <Link to='' className='hover:text-red-700  text-white'><YouTubeIcon style={{fontSize:23,color:'inherit'}}/></Link>
                  <Link to='' className='hover:text-red-400  text-white'><InstagramIcon style={{fontSize:23,color:'inherit'}}/></Link>
              </div>
              <div className='p-1 bg-white rounded-xl'>
                <img src={img} className='max-w-[250px]' alt="" />
              </div>
              <div className='p-1 text-sm text-white'>
                &copy; 2023 <span className='font-bold'>Shop</span> All rights reserved
              </div>
            </div>
        </div>
    </div>
  )
}
