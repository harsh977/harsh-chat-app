import React from 'react'
import { useState } from 'react'
import Login from './components/pages/login/login'
import SignUp from './components/pages/signup/signup'
import Sidebar from './components/pages/Sidebar/Sidebar'
import Home from './components/pages/home/Home'


function App() {
  return <div className='p-4 h-screen flex items-center justify-center'>
      <Home />
  </div>
}

export default App
