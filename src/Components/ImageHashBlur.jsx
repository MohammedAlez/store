import React, { useState, useEffect  } from 'react'
import { Blurhash } from 'react-blurhash';


export const ImageHashBlur = ({ss,hash}) => {
    const [isLoaded,setIsLoaded] = useState(false);
    useEffect(()=>{
        const img = new Image();
        img.onload =()=>{
            setIsLoaded(true);
        }
        img.src= ss
    },[ss])
    // console.log(ss)
    return (
        <>
        {!isLoaded ? 
            <Blurhash
                hash={'LLG+Bmxu4.iv~pxuogMx4oxt%MNG'}
                width={225}
                height={120}
                resolutionX={32}
                resolutionY={32}
                punch={1}
                />
            :<div className='w-full h-[120px]  sm:h-[200px] sm:max-h-[250px] relative rounded-md overflow-hidden'>
            <img className='h-full w-full  object-cover absolute top-0 left-0' src={ss} alt="" />
            <img className='h-full w-full  object-cover hover:opacity-0 z-10 relative duration-400 transition' src={process.env.REACT_APP_UP_URL + ss} alt="" />
        </div>}
        </>
    )
}
