import React from 'react'
import PublicLayout from './layouts/public_layout.jsx'
import Dashboard from './features/admin/pages/dashboard.jsx'
import HeaderLandingPage from './features/admin/admin-layouts/cms/header_landing_page.jsx'
import NewsUploadPage from './features/admin/admin-layouts/cms/custom_news.jsx'
import UserManagementPage from './features/admin/admin-layouts/cms/user_management.jsx'

function App() {
  return (
       // <PublicLayout />
       //<Dashboard />
      // <HeaderLandingPage />
       // <NewsUploadPage />
      <UserManagementPage/>
    )
  }
  export default App
