import React, {  useState } from 'react'
import { List } from './List'
import { useFetch } from './useFetch'
// import CloseIcon from '@mui/icons-material/Close';
// import FilterListIcon from '@mui/icons-material/FilterList';
import Brands from './Brands';
import CategoriesFilter from './CategoriesFilter';
import PriceFilter from './PriceFilter';
import PriceRange from './PriceRange';


export const Products = () => {
  const [maxPrice,setMaxPrice] = useState({max:'',min:''})
  const [priceType,setPriceType] = useState()
  const [catg,setCatg] = useState(null)
  const {data} = useFetch('/categories')
  // const [display,setDisplay] = useState(window.innerWidth >= 1024 ? true : false)
  // for filter
  const [subCat,setSubCat] = useState([])

  // useEffect(()=>{
  //   const handleResize = () => {
  //     if (window.innerWidth >= 1024) {
  //       setDisplay(true);
  //     } else {
  //       setDisplay(false);
  //     }
  //   };
  //   window.addEventListener('resize', handleResize);
  //   // Cleanup function to remove the event listener
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // },[])
  
      
  return (
    <div className='  w-full py-9'>
      <div className="xl:w-[1200px] mx-auto px-2  ">
          <div className=''>
              <img src="" alt="" />
          </div>
          <h1 className='font-bold text-3xl mb-8 flex justify-between cursor-pointer '>
            <span>Shopping</span>
            {/* <button className='flex gap-1 text-base lg:hidden items-center px-2 rounded-lg hover:bg-gray-100'
            onClick={()=>setDisplay(true)}
            ><FilterListIcon style={{fontSize:25}}/> filter</button> */}
          </h1>
          <div className="flex flex-col gap-8   ">
            {/* filters */}
            {<div className='  flex flex-col justify-between sm:items-center sm:flex-row flex-1 p-2 gap-4  max-h-[100vh] w-full' >
              <div className='flex gap-3'>
                <CategoriesFilter categories={data} setCatg={setCatg}/>
                <Brands setSubCat={setSubCat} catg={catg}  subCat={subCat} />
                <PriceFilter setPriceType={setPriceType}/>
                <PriceRange setMaxPrice={setMaxPrice}/>
              </div>
              <div className="">
                <button onClick={()=>{
                  setCatg('')
                  setMaxPrice(1000)
                  setSubCat([])
                  setPriceType('')
                }} 
                className='font-bold p-1 px-2 rounded-md hover:bg-blue-700 text-white transition duration-200 bg-blue-600 text-sm'
                >Reset Filters</button>
              </div>
            </div>}
            {/* overLay */}
            {/* {display &&  <div>
              <div className="lg:hidden fixed top-0 left-0 w-full h-[100vh] bg-black opacity-[0.6] z-[111111]"></div>
              <div className='lg:hidden fixed z-[111111]  top-6 right-6 text-white cursor-pointer'
                onClick={()=>setDisplay(false)}
              >
                  <CloseIcon style={{color:'inherit',fontSize:35}} />
              </div>  
            </div>} */}
            {/* products */}
              <List maxPrice={maxPrice} priceType={priceType} catg={catg} subCat={subCat}/>
          </div>
      </div>
    </div>
  )
}
