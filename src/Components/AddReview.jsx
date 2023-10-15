import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import {FaStar} from 'react-icons/fa'
import { makeRequest } from './makeRequest'
import {  toast } from 'react-toastify';


export default function AddReview({productId,userId}) {
    let [isOpen, setIsOpen] = useState(false)
    const [rating,setRating] = useState(null)
    const [hover,setHover] = useState(null)
    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }
    const [opinion,setOpinion] = useState('')

    const handleFeedBack=async()=>{
        if(opinion && rating){
            try{
                closeModal()
                await makeRequest.post('/feedbacks',{
                    data:{
                        product:productId,
                        user:userId,
                        opinion,
                        rating
                    }
                })
                toast.success('Thanks for your feedback', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                    
            }catch{
                console.log('error')
            }
        }
    }
    return (
        <>
        <div className=" flex items-center ">
            <button
            type="button"
            onClick={openModal}
            className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white "
            >
            Add feedback
            </button>
        </div>

        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[1111]" onClose={closeModal}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                    >
                        Adding Your Feedback
                    </Dialog.Title>
                    {userId ?
                    <div>
                        <div className="mt-2">
                            <div className="text-sm  flex flex-col gap-3">
                                <div>
                                    <span className='text-sm font-bold text-gray-800'>Rating</span>
                                    <div className='flex mt-2'>
                                        {[...Array(5)].map((e,i)=>{
                                            const current = i + 1 
                                            return (<label key={i}>
                                                <input type="radio" name="rating"  value={current}
                                                    onClick={()=>setRating(current)}
                                                    className='hidden'
                                                />
                                                <FaStar 
                                                    size={25}
                                                    onMouseEnter={()=>setHover(current)}
                                                    onMouseLeave={()=>setHover(null)}
                                                    color={current<=(hover || rating) ? '#ebd900' : 'gray'}
                                                    
                                                />
                                            </label>)
                                        })}
                                    </div>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <span className='text-sm font-bold text-gray-800'>Opinion</span>
                                    <textarea className='outline-none p-2 bg-gray-200 rounded-md' value={opinion} onChange={(e)=>setOpinion(e.target.value)}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 flex gap-2 justify-end">
                            <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 "
                            onClick={closeModal}
                            >
                            cancel
                            </button>
                            <button
                                type="button"
                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                onClick={handleFeedBack}
                            >
                            send
                            </button>
                        </div>
                    </div>
                    :<div className='mt-4'>Please Sign In to put Your FeedBack</div>}
                    </Dialog.Panel>
                </Transition.Child>
                </div>
            </div>
            </Dialog>
        </Transition>
        </>
    )
}
