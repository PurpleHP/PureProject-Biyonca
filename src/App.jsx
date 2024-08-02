import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Home'
import AddItems from './components/AddItems'
import FetchData from './components/FetchData'
import AddData from './components/AddData'

function App() {

  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/additems" element={<AddItems />} />
          <Route path="/fetchData" element={<FetchData />} />
          <Route path="/addData" element={<AddData />} />
        </Routes>
      </div>
        
    </>
  )
}

export default App
