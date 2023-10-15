import React, { useEffect, useState } from 'react'

export const Timer = ({date}) => {
    const [timer,setTimer] = useState(new Date(date) - new Date())
    // console.log(Math.floor((timer / 1000) % 60))
    // console.log(Math.floor((timer / 1000 / 60) % 60 ))
    // console.log(Math.floor((timer / 1000 / 60 / 60) % 24))
    // console.log(Math.floor((timer / 1000 / 60 / 60 / 24)))

    // console.log( Math.floor(timer / (1000 * 60 * 60 * 24)));
    // console.log(Math.floor((timer % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    // console.log( Math.floor((timer % (1000 * 60 * 60)) / (1000 * 60)));
    // console.log(Math.floor((timer % (1000 * 60)) / 1000));

    useEffect(()=>{
        // console.log('effect')
        const counter = setInterval(()=>{
            setTimer(prevTimer => prevTimer - 1000)
        },1000)
        return ()=>clearInterval(counter)
    },[])
        
  return (
    <div className='text-[12px] flex gap-4'>
        <span>EXPIRES IN: </span>
        {Math.floor((timer / 1000 / 60 / 60 / 24))}D :  {Math.floor((timer / 1000 / 60 / 60) % 24)}H :  {Math.floor((timer / 1000 / 60) % 60 )}M :  {Math.floor((timer / 1000) % 60)}S</div>
  )
}
