import React, { useState } from 'react'
import { useContextApi } from '../Context'
import { makeRequest } from '../makeRequest';
import { useNavigate } from 'react-router';
import {  toast } from 'react-toastify';


export const Setting = () => {
  const {user,dispatchUser} = useContextApi();
  const navigate = useNavigate();
  const [info,setInfo] = useState({telephone:user.telephone,address:user.address})
  const [isChanged,setIsChanged] = useState(false);
  const [isPut,setIsPut] = useState(false);
  const updateUser=async()=>{
    try{
      const req = await makeRequest.get(`/users/${user.id}?populate=*`)
      dispatchUser({type:'UPDATE_USER',user:req.data})
      toast.success('Information updated', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        setIsPut(false)
      navigate('/my-account/')
    }catch{
      console.log('error')
      setIsPut(false)
    }
  }
  const handleSave=async(e)=>{
      e.preventDefault();
      try{
        setIsPut(true);
        await makeRequest.put(`/users/${user.id}`,{
            'address':`${info.address}`,
            'telephone': `${info.telephone}`
        })
        
        updateUser();

      }catch{
        console.log('errror');
        setIsPut(false);
      }

  }
  const handleChange=async({target})=>{
    setInfo(prevInfo=>{
      return {
        ...prevInfo,
      [target.name]:target.value
    }})
    setIsChanged(
        target.value !== user[target.name] ? true :false
    )
  }
  // const handleUpload=async(e)=>{
  //   console.log(e.target.files[0])
  //   const formData = new FormData();
  //   console.log(formData)
  //   formData.append('asset', e.target.files[0])
  //   console.log(formData)
  //   try{
  //     const req = await makeRequest.post(process.env.REACT_APP_UP_URL + '/upload',{
  //       body: formData
  //     })
  //     console.log(req);
  //   }catch{
  //     console.log('error');
  //   }
  // }
  return (
    <>
      <div className=''>
          <h1 className='font-bold text-xl text-[#02022dd6] relative py-2 mb-6 w-fit
          before:bottom-0 before:absolute before:left-1 before:w-[80%] before:h-[3px] before:rounded-sm before:bg-[#02022dd6]
          before:content-[""]'>Setting</h1>
      </div>
      <form action="" className="flex flex-col"
      >
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <label className='flex flex-col gap-1'>
            <span className='font-medium text-sm ml-1'>Address</span>
            <input  disabled={isPut} type='text' name='address' value={info.address || ''} onChange={handleChange}
              className='border p-1 px-2 rounded-md font-medium'
            />
          </label>
          <label className='flex flex-col gap-1'>
            <span className='font-medium text-sm ml-1'>Telephone</span>
            <input disabled={isPut}  type='tel' name='telephone' value={info.telephone || ''} onChange={handleChange}
              className='border p-1 px-2 rounded-md font-medium'
            />
          </label>
          {/* <label className='flex flex-col gap-1'>
            <span className='font-medium text-sm ml-1'>Upload a photo </span>
            <input type='file'   
              className='p-1 px-2 rounded-md font-medium' onChange={handleUpload}
            />
            <img src="" alt="" />
          </label> */}
        </div>
        <div className="w-full text-right p-2 mt-3">
          <button disabled={(!isChanged || isPut)? true : false}
          className={`${isChanged ? ' bg-blue-600 text-white' : 'text-black bg-gray-200'} p-2 py-1 font-medium text-base rounded-md`}
          onClick={handleSave}
          >save</button>
        </div>
      </form>
    </>
  )
}
