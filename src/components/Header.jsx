import React from 'react'
import Navbar from './Navbar'
const Header = () => {
  return (
    <div className='min-h-screen mb-4 bg-cover bg-center flex items-center w-full overflow-hidden'style={{backgroundImage: "url('/bgheader.jpg')"}} id='Header'>
                <div className='z-10 container text-center mx-auto py-4 px-6 md:px-20 lg:px-32 text-white'>
                    <h2 className='text-5xl sm:text-6xl md:text-[82px] inline-block max-w-3xl font-semibold pt-20'> Lorem Ipsum Dolor sit amet </h2>
                </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent"></div>     
    </div>
  )
}

export default Header
