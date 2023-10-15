import { Fragment, useState, useEffect } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { makeRequest } from './makeRequest'
import CheckIcon from '@mui/icons-material/Check';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function Brands({catg,subCat,setSubCat}) {
    const [selected,setSelected] = useState([])
    const [subCatList, setSubCatList] = useState([])
    useEffect(()=>{
        const fetchSubCatList=async()=>{
        setSubCatList([])
        setSubCat([])
        try{
            if(catg){
            const fetchedData = await makeRequest.get(`/brands?filters[categories][id][$eq]=${catg}`)
            setSubCatList(fetchedData?.data?.data?.map((i)=>({id:i.id,name:i.attributes.name})));
        }
        }catch{
            console.log('errorrrr')
        }
        }
        fetchSubCatList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[catg])
    return (
        <div className="">
            <Listbox value={selected} onChange={(e)=>{
                setSubCat(e.map((e)=>e.id))
                setSelected(e)
            }} multiple>
                <div className="relative mt-1">
                    <Listbox.Button className="relative  cursor-pointer items-center flex gap-1 rounded-2xl bg-gray-100 hover:bg-gray-200  p-[7px] sm:py-2 sm:px-4 text-left text-[13px] shadow-md focus:outline-none  focus-visible:ring-opacity-75 sm:text-sm">
                        <span className="block truncate font-bold text-[14px]">Brands</span>
                        <span className="pointer-events-none  inset-y-0  items-center hidden sm:block">
                            <KeyboardArrowDownIcon />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute z-20 left-[-40px] mt-1 max-h-60 w-[250px] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {catg ? subCatList.map((brand, brandIdx) => (
                            <Listbox.Option
                                key={brandIdx}
                                className={({ selected }) =>
                                    `relative cursor-default select-none py-2 pl-4 pr-4 ${
                                        { selected } ? '' : 'text-gray-900 '
                                    }`
                                }
                                value={brand}
                            >
                            {({ selected }) => (
                                <>
                                    <span
                                        className={`block truncate ${
                                        selected ? 'font-medium text-blue-500' : 'font-normal'
                                        } pl-8`}
                                    >
                                        {brand.name}
                                    </span>
                                    {selected && <span className={`absolute left-0 inset-y-0  flex items-center pl-3 `}>
                                        <CheckIcon className={`h-5 w-5 ${selected ? 'text-blue-500' : ''}`}  />
                                    </span>}
                                </>
                            )}
                            </Listbox.Option>
                        ))
                        : <span className='text-medium text-[13px] text-center block w-full'>Chosse a categorie</span>
                        }
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}
