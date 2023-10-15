import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import CheckIcon from '@mui/icons-material/Check';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


export default function PriceFilter({setPriceType}) {
    const [selected, setSelected] = useState([])

    return (
        <div className="">
        <Listbox value={selected} onChange={(e)=>{
            setSelected(e)
            setPriceType(e)
        }}>
            <div className="relative mt-1">
            <Listbox.Button className="relative  cursor-pointer items-center flex gap-1 rounded-2xl bg-gray-100 hover:bg-gray-200 p-[7px] sm:py-2 sm:px-4 text-left text-[13px]  sm:text-sm">
                <span className="block truncate font-bold text-[14px]">Sort by</span>
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
                <Listbox.Options className="z-20 absolute mt-1 right-[-25px] max-h-60 w-[250px] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                
                    <Listbox.Option
                    className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 `
                    }
                    value={'asc'}
                    >
                    {({ selected }) => (
                        <>
                        <span
                            className={`block truncate ${
                            selected ? 'font-medium text-blue-500' : 'font-normal text-gray-900'
                            }`}
                        >
                            Lower to Higher
                        </span>
                        {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 ">
                            <CheckIcon className="h-5 w-5 text-blue-500"  />
                            </span>
                        ) : null}
                        </>
                    )}
                    </Listbox.Option>
                    <Listbox.Option
                    className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 `
                    }
                    value={'desc'}
                    >
                    {({ selected }) => (
                        <>
                        <span
                            className={`block truncate ${
                            selected ? 'font-medium text-blue-500' : 'font-normal text-gray-900'
                            }`}
                        >
                            Higher to Lower
                        </span>
                        {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 ">
                            <CheckIcon className="h-5 w-5 text-blue-500"  />
                            </span>
                        ) : null}
                        </>
                    )}
                    </Listbox.Option>
                </Listbox.Options>
            </Transition>
            </div>
        </Listbox>
        </div>
    )
}
