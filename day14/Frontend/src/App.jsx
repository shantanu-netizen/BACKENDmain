import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Home from './pages/Home'
export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}