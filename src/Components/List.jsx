import React, { useEffect , useState } from 'react'
import { Card } from './Card'
import { useFetch } from './useFetch';
import ReactPaginate from  'react-paginate'
import { SpinnerCircular } from 'spinners-react';

export const List = ({catg,priceType,maxPrice,subCat}) => {
  const [page,setPage] = useState(0);
  const {error,loading,data} = useFetch(`/products?populate=*${catg?`&[filters][category][id]=${catg}`: ''}
            ${subCat?.map((i)=>`&[filters][brand][id][$eq]=${i}`)}
            ${priceType ? `&sort=price:${priceType}` : ''}`)
  const [pages,setPages] = useState([])
  const startIndex = (page) * 10;
  const visibleItems = data.slice(startIndex,startIndex + 10)
  
  useEffect(() => {
      setPage(0)
      if (data) {
        const totalPages = Math.ceil(data.length / 10);
        const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
        setPages(pageNumbers);
      }
  }, [data]);
  const handlePaginate=(e)=>{
    setPage(e.selected)
    window.scrollTo({
      top:0,
      behavior:'smooth'
    })
  }
  // console.log(page);
  return (
    <div className='w-full'>
        {loading && <div className='text-bold p-6 flex justify-center w-full flex-[3] mt-16'>
          <SpinnerCircular 
            size={50}   
            thickness={100} 
            speed={100} 
            color="rgba(57, 101, 172, 1)" 
            secondaryColor="rgba(0, 0, 0, 0.44)" />
          </div>}
        <div className='flex-[3] bg-inherit min-h-[100vh] px-2 grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {error && <div className='text-bold p-6'>SomeThing Went Wrong</div>}
          {(!loading && !error) &&  visibleItems?.map((item)=>(
            <Card key={item.id} item={item}/>
          ))}
          {(!loading && visibleItems.length===0 && !error) && <div className='font-bold p-4 mt-4'>There's No Items</div>}
        </div>  
      {/* pagination */}
      <ReactPaginate 
        className='flex gap-2 justify-center mt-8 items-center'
        previousLabel='<'
        nextLabel='>'
        nextLinkClassName='text-[14px] font-bold text-blue-600 bg-white w-[30px] h-[30px]  border-blue-600 border rounded-full flex items-center justify-center'
        previousLinkClassName='text-[14px] font-bold text-blue-600 bg-white w-[30px] h-[30px]  border-blue-600 border rounded-full flex items-center justify-center'
        pageCount={pages.length}
        marginPagesDisplayed={2}
        breakClassName='font-bold text-gray-600 '
        breakLinkClassName='font-bold'
        pageLinkClassName='text-[14px] font-bold  w-[30px] h-[30px] text-blue-600 border border-blue-600 rounded-full flex items-center justify-center'
        activeClassName='rounded-full border border-blue-600 bg-blue-600 '
        activeLinkClassName='text-white'
        onPageChange={handlePaginate}
        forcePage={page}
      />
    </div>
  )
}
