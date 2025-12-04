import React from 'react'
import { BrowserRouter, Routes } from 'react-router-dom'
import PublicRoutes from './app/routes/PublicRouters.jsx'
import AdminRoutes from './app/routes/AdminRouters.jsx'
import HrRoutes from './app/routes/HrRoutes.jsx'

function App() {
  return (
    <BrowserRouter>
        <Routes>
          {PublicRoutes()}
          {AdminRoutes()}
          {HrRoutes()}
        </Routes>
    </BrowserRouter>
    )
  }
  export default App
