import React, { useState } from 'react'
import { makeRequest } from '../Components/makeRequest'
import {  useNavigate } from 'react-router'
import { useContextApi } from '../Components/Context'
import { Link } from 'react-router-dom'
import {  toast } from 'react-toastify';
import { SpinnerCircular } from 'spinners-react';

const initialUser = {identifier:'',password:""}

export const Login = () => {
    const [user,setUser] = useState(initialUser)
    const [save,setSaveUser] = useState(false)
    const {dispatchUser} = useContextApi();
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate()
    const handleUser=({target})=>{
        setUser(prevUser=>({
            ...prevUser,
            [target.name]:target.value
        }))
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        
        try{
            if(user.identifier && user.password){
                setLoading(true);
                const res = await makeRequest.post('/auth/local?populate=*',user)
                // console.log(res)
                if(res.data.jwt){
                    const res1 = await makeRequest.get(`/users/${res.data.user.id}?populate=photo`)
                    dispatchUser({type:'ADD_USER',user:res1.data,save})
                    // console.log(res1)
                    toast.success('Welcome Back', {
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
                    navigate(-1,{replace:true})
                }
                
            }
        }catch(e){
            toast.error('Incorrect Username or password!', {
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
        }
    }
  return (
    <div className='bg-gray-100 py-8  xl:w-[1000px] mx-auto'>
        <div className='rounded-xl mx-auto p-4 max-w-[400px] bg-white min-h-[496px]'>
            
            {<form className='p-3 rounded-lg relative '>
                <div className='mb-6'>
                    <h1 className='font-bold text-3xl text-gray-800'>Sign in</h1><p className='font-medium text-gray-500 text-sm mt-3'>Welcome back </p>
                </div>
                {!loading && <div>
                    <label className='flex flex-col gap-2 mb-3'>
                        <span className='font-medium text-[14px]'>Email or Username</span>
                        <input onChange={handleUser} name='identifier'
                        className='bg-blue-100 p-2 rounded-xl px-3 outline-none font-medium'
                        type="text" />
                    </label>
                    <label className='flex flex-col gap-2 mb-3'>
                        <span className='font-medium text-[14px]'>Password</span>
                        <input onChange={handleUser} name='password'
                        className='bg-blue-100 p-2 rounded-xl px-3 outline-none font-medium'
                        type="password" />
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
                    className='mt-6 rounded-xl w-full p-2 bg-blue-600 text-white font-bold hover:bg-blue-700' >Sign in</button>
                    <Link to="https://strapi-demo-app-7v79.onrender.com/api/connect/google" className='block text-center mt-4 rounded-xl w-full p-2 text-blue-950 hover:text-white hover:bg-blue-950 transition duration-200  font-bold border' >Sign with Google</Link>
                    <Link to='/sign-up' className='font-medium text-gray-500 text-sm mt-6 block text-center'>Dont have an Account ?</Link>
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
            </form>}
        </div>
    </div>
  )
}
