import React,{useState} from 'react'
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import { Link, useNavigate } from 'react-router-dom';
import { CartShoppingCard } from './CartShoppingCard';
import { useContextApi } from './Context';
import {makeRequest} from './makeRequest.js'
import {  toast } from 'react-toastify';

export const ShoppingCart = () => {
    const {cartItems,user,dispatch} = useContextApi();
    const navigate = useNavigate()
    const [info,setInfo] = useState({telephone:user?.telephone,address:user?.address,name:user?.username})
    const [isPut,setIsPut] = useState(false);
    const totalPrice = cartItems.reduce((acc,current)=>{
        return acc + parseInt(current.quantity)*parseFloat(current.price);
    },0)
    const handleInfo=(e)=>{
        setInfo(prevInfo=>({
            ...prevInfo,
            [e.target.name]:e.target.value
        }))
        // console.log(info)
    }
    const handleOrderItems=async(orderId)=>{
        // cartItems.map(async(item)=>{
            try{
                for(let item of cartItems){
                    await makeRequest.post('/order-items',{
                    data:{
                        order:orderId,
                        product:item.id,
                        quantity:item.quantity
                    }
                })
                // console.log(req);
                }
                setIsPut(false);
                dispatch({type:'reset'})
            }catch{
                setIsPut(false);
                console.log("post order items error")
            }
        // })
    }
    const handleOrder=async(e)=>{
        e.preventDefault();
        if(!user.username){
            toast.warn('Please Sign in First!', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }else{
            const resolveWithSomeData = new Promise(async(resolve,rejected) => {
                try{
                    setIsPut(true);
                    const order = await makeRequest.post('/orders',{
                        data:{
                            totalPrice,
                            user:user.id,
                            state:'On Demand',
                            ...info
                        }
                    })
                    await handleOrderItems(order.data.data.id);
                    navigate('/my-account/')
                    resolve('Your Order Placed Successfully')
                }catch{
                    setIsPut(false);
                    rejected('Some Thing Went Wrong')
                }
            });
            toast.promise(resolveWithSomeData,{
                pending: {
                    render(){
                    return "Placing you order"
                    },
                    icon: true,
                },
                success: {
                    render({data}){
                    return `${data}`
                    },
                    icon: false,
                },
                error: {
                    render({data}){
                    return data
                    }
                }
        })
        }
    }
  return (
    <div className='xl:w-[1200px] mx-auto px-2'>
        <h1 className='font-bold text-xl p-4'>Shopping Cart</h1>
        <div className="min-h-[50vh] pb-16">
            {/* if there's no items */}
            {(cartItems.length===0) ? <div className="text-center">
                <h1 className='font-bold text-3xl p-4  '>Your Cart is empty</h1>
                <Link to='/products' className='p-2 px-4 text-blue-700 text-xl font-bold hover:underline'>
                    <SubdirectoryArrowRightIcon style={{fontSize:20,marginRight:'8px'}}/>
                    Let's Shop
                    </Link>
            </div>
            :
            <div className='flex flex-col lg:flex-row gap-4'>
                <div className={`${user.username ? 'flex-[2]' : 'flex-1'}`}>
                    {!user.username && <h1 className='text-medium my-5 mx-3 text-yellow-600 font-bold'>Sign in to place your order!</h1>}
                    {/* products */}
                    {cartItems?.map((item)=>(
                        <CartShoppingCard key={item.id} item={item}/>
                    ))}
                    {/* total */}
                    {(cartItems.length!==0) && <div className="p-2 border-t border-gray-300 flex justify-between  items-center" >
                        <div className='flex items-center gap-4 '>
                            <p className='flex flex-col '>
                                <span className='font-bold text-gray-800 text-[14px]'>Total Price</span>
                                <span className='text-sm text-gray-600'>{cartItems.length} items</span>
                            </p>
                            <p className='text-3xl font-medium text-green-600'>${totalPrice}</p>
                        </div>
                        {/* <Link to='' className='w-fit hover:bg-blue-700 text-sm bg-blue-600 font-bold p-1 px-4 text-white rounded-3xl'>CheckOut</Link> */}
                        </div>}
                        
                </div>
                {user.username && <div className='flex-[1]'>
                    <form action="" className='p-4  border border-gray-300 rounded-lg lg:max-w-full max-w-[350px]'>
                        <h1 className='mb-6 font-bold text-base text-gray-600'>Enter Your Information</h1>
                        <label className='mb-3 block'>
                            <span className='font-medium text-sm block mb-1 ml-2 text-gray-700'>Name*</span>
                            <input type="text" placeholder='Enter your Name' value={info.name} name='name'
                            onChange={handleInfo} required={true}
                            className='p-2 px-4 outline-none bg-gray-100 w-full rounded-lg font-medium border-2 border-transparent focus:border-blue-600 '/>
                        </label>
                        <label className='mb-3 block'>
                            <span className='font-medium text-sm block mb-1 ml-2 text-gray-700'>Address*</span>
                            <input type="text" placeholder='Enter your Address' value={info.address} name='address'
                            onChange={handleInfo} required={true}
                            className='p-2 px-4 outline-none bg-gray-100 w-full rounded-lg font-medium border-2 border-transparent focus:border-blue-600'/>
                        </label>
                        <label className='mb-3 block'>
                            <span className='font-medium text-sm block mb-1 ml-2 text-gray-700'>Phone Number*</span>
                            <input type="text" placeholder='Enter your Phone Number' value={info.telephone} name='telephone'
                            onChange={handleInfo} required
                            className='p-2 px-4 outline-none bg-gray-100 w-full rounded-lg font-medium border-2 border-transparent focus:border-blue-600'/>
                        </label>
                        <button disabled={isPut} onClick={handleOrder} className='w-full mt-2 hover:bg-blue-700 text-sm bg-blue-600 font-bold py-2 px-4 text-white rounded-lg'>Place Order</button>
                    </form>
                </div>}
            </div>
            }
            
        </div>
    </div>
  )
}
