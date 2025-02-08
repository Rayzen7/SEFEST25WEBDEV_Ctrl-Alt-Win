import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../views/Home.jsx';
import Information from '../views/Information.jsx';
import Downloads from '../views/Downloads.jsx';
import Contacts from '../views/Contacts.jsx';
import ScrollTop from '../components/ScrollTop.jsx';
import Login from '../views/auth/Login.jsx';
import Register from '../views/auth/Register.jsx';

const Router = () => {
  return (
    <BrowserRouter>
      <ScrollTop/>
        <Routes>
            {/* User */}
            <Route path='/' element={<Home/>}/>
            <Route path='/Information' element={<Information/>}/>
            <Route path='/Downloads' element={<Downloads/>}/>
            <Route path='/Contacts' element={<Contacts/>}/>

            {/* Auth */}
            <Route path='/Login' element={<Login/>}/>
            <Route path='/Register' element={<Register/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default Router