import React, { createContext, useContext } from 'react'
import { Outlet } from 'react-router'
import { NavLink } from 'react-router-dom'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useContextApi } from '../Components/Context';
import { useFetch } from '../Components/useFetch';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const dashboardContext = createContext(null)

export const Dashboard = () => {
    const {user} = useContextApi();
    const orders = useFetch(`/orders?[filters][user][id][$eq]=${user.id}`)
    const activeStyle=({isActive})=>{
        return {
            background:isActive ? '#80808036' : 'white',
            color: isActive ? '#02022dd6' :''
        }
    }
    // console.log(user);
  return (
    <div className="">
        {/* header */}
        <div className='font-bold text-2xl md:text-3xl bg-gray-100 text-[#07074f] p-2 border-b '>
            <h1 className='font-bold text-2xl md:text-3xl text-[#04040f] xl:w-[1200px] mx-auto p-2'>My Account</h1>
        </div>
        <div className="xl:w-[1200px] mx-auto px-2 min-h-[100vh] my-8 flex flex-col lg:flex-row">
            {/* left side */}
            <div className=' border-r sm:px-6 lg:flex-[1]'>
                {/* account info */}
                <div className='flex gap-2 '>
                        <div className='flex items-center justify-center  w-[40px] h-[40px] rounded-full text-blue-700 border-2 border-blue-600'>
                            <PersonOutlineIcon style={{ fontSize: 30 }}/>
                        </div>
                    <p className=''>
                        <span className='block font-bold text-[14px] md:text-base'>{user.username}</span>
                        <span className='block font-medium text-[11px] md:text-sm text-gray-500 '>{user.email}</span>
                    </p>
                </div>
                {/* links */}
                <div  className="flex lg:flex-col mt-8 justify-center lg:justify-start">
                    <NavLink to='/my-account/' style={activeStyle}
                        className=' py-3 px-3 sm:px-3 flex-col items-center sm:flex-row text-base font-bold  flex gap-3  rounded-[20px]  text-gray-600  hover:bg-gray-100 transition   '
                    ><ShoppingBasketIcon /><span className='text-sm'>Orders</span></NavLink>
                    <NavLink to='/my-account/favorite' style={activeStyle}
                        className=' py-3 px-3 sm:px-3 flex-col items-center sm:flex-row text-base font-bold   flex gap-3 rounded-[20px]   text-gray-600  hover:bg-gray-100 transition   '
                    ><FavoriteBorderIcon /><span className='text-sm'>Favorite</span></NavLink>
                    <NavLink to='/my-account/setting' style={activeStyle}
                        className=' py-3 px-3 sm:px-3 flex-col items-center sm:flex-row text-base font-bold  flex gap-3  rounded-[20px]   text-gray-600  hover:bg-gray-100 transition   '
                    ><SettingsIcon /><span className='text-sm'>Setting</span></NavLink>
                    <NavLink to='/my-account/log-out' style={activeStyle}
                        className=' py-3 px-3 sm:px-3 flex-col items-center sm:flex-row text-base font-bold   flex gap-3 rounded-[20px]   text-gray-600  hover:bg-gray-100 transition   '
                    ><LogoutIcon /><span className='text-sm'>Log out</span></NavLink>
                </div>
            </div>
            {/* right side */}
            <div className='p-2 w-full lg:flex-[3]'>
                <dashboardContext.Provider value={{user,orders}}>
                    <Outlet />
                </dashboardContext.Provider>
                    
            </div>
        </div>
    </div>
  )
}

export const useDashboardContext=()=>{
    const values = useContext(dashboardContext)
    return {...values}
}