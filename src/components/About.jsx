import React from 'react'
import amazink_logo_blue from '../assets/amazink_logo_blue.svg'

function About() {
  return (
    <div
      className='relative bg-gradient-to-b from-gray-50 to-white py-20 px-6 md:px-20 lg:px-32 w-full overflow-hidden'
      id='About'
    >
      {/* Decorative elements */}
      <div className='absolute top-0 right-0 w-72 h-72 bg-blue-100 rounded-full filter blur-3xl opacity-30 -z-10'></div>
      <div className='absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full filter blur-3xl opacity-40 -z-10'></div>

      <div className='max-w-6xl mx-auto'>
        <div className='flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16'>
          {/* Logo Section */}
          <div className='flex-shrink-0 transform hover:scale-105 transition-transform duration-300'>
            <div className='bg-white p-8 rounded-2xl shadow-lg border border-gray-100'>
              <img 
                src={amazink_logo_blue} 
                alt="Amazink Logo Blue" 
                className="w-32 sm:w-40 lg:w-48" 
              />
            </div>
          </div>

          {/* Content Section */}
          <div className='flex flex-col text-center lg:text-left space-y-6 flex-1'>
            {/* Badge */}
            <div className='inline-flex items-center justify-center lg:justify-start'>
              <span className='inline-block px-4 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-full border border-blue-100'>
                Tentang Kami
              </span>
            </div>

            {/* Heading */}
            <div className='space-y-2'>
              <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight'>
                <span className='bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500 bg-clip-text text-transparent'>
                  Amazink People Group
                </span>
              </h1>
              <div className='w-20 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto lg:mx-0 rounded-full'></div>
            </div>

            {/* Description */}
            <div className='space-y-4'>
              <p className='text-gray-600 text-base sm:text-lg leading-relaxed'>
                Amazink People Group adalah perusahaan holding yang bergerak di bidang <span className='font-semibold text-gray-700'>retail, distribusi, manufaktur,</span> dan <span className='font-semibold text-gray-700'>makanan & minuman (F&B)</span>.
              </p>
              
              <p className='text-gray-600 text-base sm:text-lg leading-relaxed'>
                Saat ini, Amazink People Group telah memiliki beberapa brand yang beroperasi di berbagai sektor industri. Berkantor pusat di <span className='font-semibold text-gray-700'>Salatiga</span>, Amazink People Group memiliki tujuan untuk membentuk Sumber Daya Manusia (SDM) yang sholih dan kompeten, agar dapat memberikan manfaat yang berkelanjutan untuk masa depan.
              </p>
            </div>

            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 pt-6'>
                <div className='bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow'>
                  <div className='text-2xl font-bold text-yellow-400'>4+</div>
                  <div className='text-xs text-gray-500 mt-1'>Sektor Bisnis</div>
                </div>
                <div className='bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow'>
                  <div className='text-2xl font-bold text-yellow-400'>8</div>
                  <div className='text-xs text-gray-500 mt-1'>Brand</div>
                </div>
                <div className='bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow'>
                  <div className='text-2xl font-bold text-yellow-400'>1</div>
                  <div className='text-xs text-gray-500 mt-1'>Kantor Pusat</div>
                </div>
                <div className='bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow'>
                  <div className='text-2xl font-bold text-yellow-400'>100%</div>
                  <div className='text-xs text-gray-500 mt-1'>Komitmen</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About