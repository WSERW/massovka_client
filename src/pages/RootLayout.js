import React from 'react'
import { Outlet } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext';

import Header from '../components/Header'

const RootLayout = () => {
  return (
    <div>
        <AuthProvider>
          <Header/>
          <Outlet/>
        </AuthProvider>
    </div>
  )
}

export default RootLayout