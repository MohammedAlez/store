import React from 'react'
import {Outlet} from 'react-router-dom'
import { Footer } from './Footer'
import { NavBar } from './NavBar'
import { ScrollToTop } from '../ScrollToTop'
export const Main = () => {
  return (
    <div >
        <ScrollToTop />
        <NavBar />
        <div className='w-full  '>
            <Outlet />
        </div>
        <Footer />
    </div>
  )
}