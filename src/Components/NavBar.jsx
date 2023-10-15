import React, {  useEffect , useRef, useState } from 'react'
import {Link, NavLink} from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { useContextApi } from './Context';
import { SearchList } from './SearchList';
import { makeRequest } from './makeRequest';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PersonIcon from '@mui/icons-material/Person';


export const NavBar = () => {
    const [menu,setMenu] = useState(window.innerWidth>=768 ? true : false)
    const [search,setSearch] = useState('')
    const {cartItems,user} = useContextApi()
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false);
    const ref= useRef()
    const totalPrice = cartItems.reduce((acc,current)=>{
        return acc + parseInt(current.quantity)*parseFloat(current.price);
    },0)
    useEffect(()=>{
        const handleResize=()=>{
            setMenu(window.innerWidth>=768 ? true : false)
        }
        window.addEventListener('resize',handleResize)
        return ()=>{
            window.removeEventListener('resize',handleResize);
        }
    },[])
    useEffect(()=>{
        const fetchSearchData=async()=>{
            if(search.length>=3){
                try{
                    setLoading(true);
                    setData([])
                    const searchData = await makeRequest.get(`/products?populate=*&[filters][$or][0][name][$contains]=${search}&[filters][$or][1][desc][$contains]=${search}`)
                    setData(searchData.data.data)
                    setLoading(false);
                }catch{
                    console.log('someThing wentWrong')
                    setLoading(false);
                }
            }else{
                setData([])
            }
        }
        fetchSearchData();
    },[search])
  return (
    <div className="w-full">
        <div className="mx-auto xl:max-w-[1200px] px-2 ">
            {/* top nav bar */}
            <div className='px-[10px] py-1 m-[10px] rounded-2xl bg-[#e0e5f55b]   relative flex justify-between  items-center'>
                {/* burger icon */}
                <div className='hover:bg-gray-200 rounded-full transition duration-300 md:hidden cursor-pointer p-2'
                    onClick={()=>setMenu(true)}
                >
                    <MenuIcon style={{fontSize:25}}/>
                </div>
                {/* Logo */}
                <Link to={'/'} className='flex gap-[5px] font-bold text-2xl items-center'>
                    <span className='h-6 mr-1 w-6 rounded-full bg-blue-700 flex justify-center items-center'>
                        <span className='block rounded-full w-[16px] h-[16px] bg-sky-400'></span >
                    </span>
                    Shop
                </Link >
                {/* account and cart */}
                <div className='flex items-center '>
                    {user?.username ? <Link to='/my-account/'>
                        <div className='md:flex hidden text-blue-700 ml-4'>
                            <PersonOutlineIcon style={{ fontSize: 35 }}/>
                            {/* <span className='text-gray-500 font-bold text-[13px] '>Account</span> */}
                        </div>  
                    </Link> : 
                    <div className="  gap-1 border-r-gray-300 border-r hidden md:flex">
                        <div className='flex items-center text-blue-700 ml-4'>
                            <PersonOutlineIcon style={{ fontSize: 30 }}/>
                        </div>
                        <div className='flex flex-col justify-between mr-4'>
                            <span className='text-[#888] text-sm'>Account</span>
                            <Link to='/login' className='text-sm font-bold'>Sign in</Link>
                        </div>
                    </div>}
                    <Link to={'/shopping-cart'} className=" flex gap-1 cursor-pointer  py-1">
                        <div className='flex items-center text-blue-700 relative ml-4'>
                            <ShoppingCartCheckoutIcon style={{ fontSize: 30 }}/>
                            <span className='absolute w-[15px] h-[15px] rounded-full text-[12px] font-bold text-white top-[0px] right-[-2px] bg-blue-700 flex justify-center items-center'>
                            {cartItems.length}
                            </span>
                        </div>
                        <div className='flex flex-col justify-between mr-4'>
                            <span className='text-gray-400 font-bold text-[13px]'>Cart</span>
                            <span className='text-[14px] font-bold text-green-600'>{totalPrice}{totalPrice===0 ? '.00' : ''}$</span>
                        </div>
                    </Link>
                </div>
            </div>
            {/*  */}
            {/*  search and links  */}
            <div className='fixed w-[300px] h-[100vh] bg-gray-200 md:bg-transparent top-0   md:left-0  z-[1111]  md:relative md:w-full md:h-fit' style={{left: menu   ? '0px' : '-300px',transition:'0.3s'}}>
                <div className='mb-[30px] flex justify-end p-2 md:hidden'> 
                    <button className='p-1  transition duration-300 hover:bg-white rounded-full' onClick={()=>setMenu(false)}>
                        <CloseIcon />
                    </button>
                </div>
                
                <div className="h-full md:border-t-gray-100 md:border-t-2 flex flex-col md:flex-row-reverse md:justify-between">
                    {/* search */}
                    <div className=" items-center md:flex">
                        <div className='flex  relative w-[250px] mx-auto md:w-full'>
                            <input ref={ref} id='1'
                            value={search} onChange={(e)=>setSearch(e.target.value) }
                            className='rounded-l-md flex-grow border border-grey border-1  focus:outline-none block px-4 py-1  lg:w-[350px]  md:w-[250px] bg-white  font-medium text-sm' 
                            type="text"   placeholder='Search for...' />
                            <div id='1' className='rounded-r-md p-1 bg-blue-600 text-white cursor-pointer'>
                            <SearchIcon />
                            </div>
                            {/* search result */}
                            <SearchList data={data} setData={setData} loading={loading}/>
                        </div>
                        
                    </div> 
                    <nav className='flex flex-col p-4 md:p-0  md:px-3 md:flex-row md:gap-2'>
                        <NavLink style={({isActive})=>({color:isActive?'#2563EB':'',borderTopColor:isActive?'#2563EB':''})} to='/' className='text-gray-700 p-1 gap-1 flex items-center font-medium text-sm my-1 md:my-0 md:py-4  hover:ml-2 duration-300 md:border-t-2 border-transparent top-[-2px] relative  md:hover:ml-0  md:px-1  md:hover:border-t-blue-600 md:hover:text-blue-600 '>
                            <HomeIcon style={{fontSize:17}}/>
                            Home
                        </NavLink>
                        <NavLink style={({isActive})=>({color:isActive?'#2563EB':'',borderTopColor:isActive?'#2563EB':''})} to='/products' className='text-gray-700 p-1 gap-1 flex items-center font-medium text-sm my-1 md:my-0 md:py-4  hover:ml-2 duration-300 md:border-t-2 border-transparent top-[-2px] relative  md:hover:ml-0  md:px-1  md:hover:border-t-blue-600 md:hover:text-blue-600 '>
                            <ShoppingBasketIcon style={{fontSize:17}}/>
                            Shop
                        </NavLink>
                        <NavLink style={({isActive})=>({color:isActive?'#2563EB':'',borderTopColor:isActive?'#2563EB':''})} to='/contact' className='text-gray-700 p-1 gap-1 flex items-center font-medium text-sm my-1 md:my-0 md:py-4  hover:ml-2 duration-300 md:border-t-2 border-transparent top-[-2px] relative  md:hover:ml-0  md:px-1  md:hover:border-t-blue-600 md:hover:text-blue-600 '>
                            <ContactPageIcon style={{fontSize:17}}/>
                            Contact
                        </NavLink>
                        <NavLink style={({isActive})=>({color:isActive?'#2563EB':'',borderTopColor:isActive?'#2563EB':''})} to='/my-account/' className='text-gray-700 p-1 gap-1 flex items-center font-medium text-sm my-1 md:my-0 md:py-4  hover:ml-2 duration-300 md:border-t-2 border-transparent top-[-2px] relative  md:hover:ml-0  md:px-1  md:hover:border-t-blue-600 md:hover:text-blue-600 '>
                            <PersonIcon style={{fontSize:17}}/>
                            Account
                        </NavLink>
                        <NavLink style={({isActive})=>({color:isActive?'#2563EB':'',borderTopColor:isActive?'#2563EB':''})} to='/discount'  className='text-gray-700 p-1 gap-1 flex items-center font-medium text-sm my-1 md:my-0 md:py-4  hover:ml-2 duration-300 md:border-t-2 border-transparent top-[-2px] relative  md:hover:ml-0  md:px-1  md:hover:border-t-blue-600 md:hover:text-blue-600 '>
                            <LocalOfferIcon style={{fontSize:17}}/>
                            Discount
                        </NavLink>
                    </nav>
                    <div className='h-[50%] md:hidden items-end flex'>
                        <div className="flex gap-3 p-3 items-center mb-4">
                            <div className='flex items-center text-blue-700 ml-4'>
                                <PersonOutlineIcon style={{ fontSize: 30 }}/>
                            </div>
                            {!user.username ? <div className='flex flex-col justify-between mr-4'>
                                <span className='text-[#888] text-sm'>Account</span>
                                <Link to='/login' className='text-sm font-bold'>Sign in</Link>
                            </div>
                            : <div className='flex-col'>
                                <Link to='/my-account/' className='block font-bold text-[14px] md:text-base '>{user.username}</Link>
                                <Link to='/my-account/' className='block font-medium text-[11px] md:text-sm  text-gray-500'>{user.email}</Link>
                            </div>}
                        </div>
                    </div>
                </div>


            </div> 
        </div>
        {/* overlay */}
        {menu && <div className='fixed top-0 left-0 w-full h-[100vh] z-[112] bg-[#000000b5] md:hidden' onClick={()=>setMenu(false)}></div>}
    </div>
  )
}
