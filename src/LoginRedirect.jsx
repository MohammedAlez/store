
import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { makeRequest } from './Components/makeRequest'
import {  toast } from 'react-toastify';
import { SpinnerCircular } from 'spinners-react';
import { useContextApi } from './Components/Context';

// const backendUrl = process.env.REACT_APP_BACKEND_URL;

const LoginRedirect = () => {
    const location = useLocation();
    const [loading,setLoading] = useState(false);
    const {dispatchUser} = useContextApi()
    const navigate = useNavigate()
    // console.log(location)
    const handleGoogle=async(e)=>{
        e.preventDefault();
        try{
            
            setLoading(true);
            const res = await makeRequest.get(`${process.env.REACT_APP_API_URL}/api/auth/google/callback${location.search}`)
            console.log(res)
            dispatchUser({type:'ADD_USER',user:res.data.user})
                        // console.log(res1)
                        toast.success('Welcome ', {
                            position: "top-center",
                            autoClose: 1000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
            setLoading(false);
            navigate('/',{replace:true})
        }catch(err){
                setLoading(false);
            console.log(err);
        }
        }
// }
    

    return (
        <div className='bg-gray-100 py-8  xl:w-[1000px] mx-auto'>
            <div className='rounded-xl mx-auto p-4 max-w-[400px] bg-white min-h-[496px]'>
                
                {<form className='p-3 rounded-lg relative '>
                    <div className='mb-6'>
                        {/* <h1 className='font-bold text-3xl text-gray-800'>Sign in</h1><p className='font-medium text-gray-500 text-sm mt-3'>Welcome back </p> */}
                    </div>
                    {loading && <div className=' flex justify-center items-center top-0 left-0 w-full h-[350px]'>
                            <div className=' '>
                            <SpinnerCircular 
                                size={40} 
                                thickness={100} 
                                speed={100} 
                                color="blue" 
                                secondaryColor="rgba(0, 0, 0, 0.44)" 
                            />
                            </div>
                    </div>}
                    {!loading && 
                    <div className='text-center'>
                        <button className='font-medium p-2 px-4 rounded-lg bg-blue-950 text-white'
                            onClick={handleGoogle}
                        >Continue with Google</button>
                    </div>
                    }
                </form>}
            </div>
        </div>
    )
};

export default LoginRedirect;