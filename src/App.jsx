import React from 'react'
import { BrowserRouter, Routes } from 'react-router-dom'
import PublicRoutes from './app/routes/PublicRouters.jsx'
import AdminRoutes from './app/routes/AdminRouters.jsx'
import HrRoutes from './app/routes/HrRoutes.jsx'
import TalentRoutes from './app/routes/TalentRoutes.jsx'

function App() {
  return (
    <BrowserRouter>
        <Routes>
          {PublicRoutes()}
          {AdminRoutes()}
          {HrRoutes()}
          {TalentRoutes()}
        </Routes>
    </BrowserRouter>
    )
  }
  export default App
