import React from 'react'
import { Landing } from './Landing'
import { Categories } from './Categories'
import { Deals } from './Deals'
import { Properties } from './Properties'
import { MostSelling } from './MostSelling'
import { BrandsSection } from './BrandsSection'

export const Home = () => {
  return (
    <div className='min-h-[100vh]  w-full my-8'>
      <Landing />
      <Categories />
      <Deals />
      <Properties />
      <MostSelling />
      <BrandsSection />
    </div>
  )
}
