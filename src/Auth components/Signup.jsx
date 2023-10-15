import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { makeRequest } from '../Components/makeRequest';
import { useContextApi } from '../Components/Context';
import {  toast } from 'react-toastify';
import { SpinnerCircular } from 'spinners-react';



const initialUser = {password:"",username:"",email:""}
export const Signup = () => {
    const [user,setUser] = useState(initialUser);
    const [save,setSaveUser] = useState(false)
    const {dispatchUser} = useContextApi();
    const [confirmedPassword,setConfirmedPassword] = useState('')
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate()
    const handleUser=(e)=>{
        setUser(prevUser => ({
            ...prevUser,
            [e.target.name] : e.target.value
        }))
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(user.email && user.username && user.password && confirmedPassword){
            if(user.password !== confirmedPassword){
                alert("password doesn't match")
            }else {
                try{
                        setLoading(true);
                        const res = await makeRequest.post('/auth/local/register',user)
                        // console.log(res);
                        if(res.data.jwt){
                            dispatchUser({type:'ADD_USER',user:res.data.user,save})
                            toast.success('Welcome to our Store', {
                                position: "top-center",
                                autoClose: 1000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                                });
                            setLoading(false);
                            navigate('/',{replace:true})
                        }
                }catch(e){
                    // console.log(e.response.data.error)
                    toast.error(e?.response?.data?.error?.message, {
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
                    setUser(initialUser)
                    setConfirmedPassword('')
                    setLoading(false);
                }
            }
        }
    }
    return (
        <div className='bg-gray-100 py-8  xl:w-[1000px] mx-auto'>
            <div className='rounded-xl mx-auto p-4 max-w-[400px] bg-white'>
                <form method='GET' className='p-3 rounded-lg ' >
                    <div className='mb-6'>
                        <h1 className='font-bold text-3xl text-gray-800'>Sign up</h1><p className='font-medium text-gray-500 text-sm mt-3'>Welcome back </p>
                    </div>
                    {!loading && <div>
                        <label className='flex flex-col gap-2 mb-2'>
                            <span className='font-medium text-[14px]'>Username</span>
                            <input required name='username' onChange={handleUser}
                            className='bg-blue-100 p-2 rounded-xl px-3 outline-none font-medium'
                            type="text" />
                        </label>
                        <label className='flex flex-col gap-2 mb-2'>
                            <span className='font-medium text-[14px]'>Email</span>
                            <input required name='email' onChange={handleUser}
                            className='bg-blue-100 p-2 rounded-xl px-3 outline-none font-medium'
                            type="email" />
                        </label>
                        <label className='flex flex-col gap-2 mb-2'>
                            <span className='font-medium text-[14px]'>Password</span>
                            <input required name='password' onChange={handleUser}
                            className='bg-blue-100 p-2 rounded-xl px-3 outline-none font-medium'
                            type="password" />
                        </label>
                        <label className='flex flex-col gap-2 mb-2'>
                            <span className='font-medium text-[14px]'>Confirm Password</span>
                            <input required name='password'
                            className='bg-blue-100 p-2 rounded-xl px-3 outline-none font-medium'
                            type="password" value={confirmedPassword} onChange={(e)=>setConfirmedPassword(e.target.value)}/>
                        </label>
                        <label className='flex gap-2 items-center cursor-pointer'>
                            <input type="checkbox" className='hidden' onChange={(e)=>{setSaveUser(e.target.checked)}} />
                            <span className='w-[16px] h-[16px] block rounded-full border border-gray-300'
                                style={{background:save ? 'green' : ''}}
                            ></span>
                            <span className='font-medium text-sm'>remember me</span>
                        </label>
                        <button
                        onClick={handleSubmit}
                        className='mt-4 rounded-xl w-full p-2 bg-blue-600 text-white font-bold hover:bg-blue-700' >Create Account</button>
                        {/* <Link to="https://strapi-demo-app-7v79.onrender.com/api/connect/google" className='block text-center mt-4 rounded-xl w-full p-2 text-blue-950 hover:text-white hover:bg-blue-950 transition duration-200  font-bold border ' >Sign up with Google</Link> */}
                        <Link to='/login' className='font-medium text-gray-500 text-sm mt-6 block text-center'>have an Account Sign in</Link>
                    </div>}
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
                </form>
            </div>
        </div>
    )
}
