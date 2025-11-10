import React from 'react'
import Header from './components/Header'
import Navbar from './components/Navbar'
import About from './components/About'
import Visimisi from './components/Visimisi'
import CompanyStructure from './components/Company_structure'
import Company from './components/Company'
import Footer from './components/Footer'

function App() {
  return (
    <div className='w-full overflow-hidden'>
      <Navbar/>
      <Header/>
      <About/>
      <Visimisi/>
      <CompanyStructure/>
      <Company/>
      <Footer/>

    </div>
  )
}

export default App
