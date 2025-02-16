import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../views/Home.jsx';
import Information from '../views/Information.jsx';
import Downloads from '../views/Downloads.jsx';
import Contacts from '../views/Contacts.jsx';
import ScrollTop from '../components/ScrollTop.jsx';
import Login from '../views/auth/Login.jsx';
import Register from '../views/auth/Register.jsx';
import Satybot from '../views/Satybot.jsx';
import MoodDetection from '../views/mood-detection/MoodDetection.jsx';
import { ResultMood } from '../views/mood-detection/ResultMood.jsx';
import DashboardVideo from '../views/admin/DashboardVideo.jsx';
import AddVideo from '../views/admin/AddVideo.jsx';
import EditVideo from '../views/admin/EditVideo.jsx';
import DashboardMessage from '../views/admin/DashboardMessage.jsx';
import DashboardCategory from '../views/admin/DashboardCategory.jsx';
import AddCategory from '../views/admin/AddCategory.jsx';
import DashboardArticle from '../views/admin/DashboardArticle.jsx';
import AddArticle from '../views/admin/AddArticle.jsx';
import EditArticle from '../views/admin/EditArticle.jsx';
import Consultation from '../views/consultation/Consultation.jsx';
import DoctorID from '../views/consultation/DoctorID.jsx';
import History from '../views/consultation/History.jsx';
import DashboardDoctor from '../views/admin/DashboardDoctor.jsx';
import AddDoctor from '../views/admin/AddDoctor.jsx';
import EditDoctor from '../views/admin/EditDoctor.jsx';

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
            <Route path='/Satybot' element={<Satybot/>}/>
            <Route path='/Mood-Detection' element={<MoodDetection/>}/>
            <Route path='/Result' element={<ResultMood/>}/>
            <Route path='/Consultation' element={<Consultation/>}/>
            <Route path='/Consultation/Doctor/:id' element={<DoctorID/>}/>
            <Route path='/History' element={<History/>}/>

            {/* Admin */}
            <Route path='/Admin/Education' element={<DashboardVideo/>}/>
            <Route path='/Admin/Education/Add' element={<AddVideo/>}/>
            <Route path='/Admin/Education/Edit/:id' element={<EditVideo/>}/>
            <Route path='/Admin/Message' element={<DashboardMessage/>}/>
            <Route path='/Admin/Category' element={<DashboardCategory/>}/>
            <Route path='/Admin/Category/Add' element={<AddCategory/>}/>
            <Route path='/Admin/Article' element={<DashboardArticle/>}/>
            <Route path='/Admin/Article/Add' element={<AddArticle/>}/>
            <Route path='/Admin/Article/Edit/:id' element={<EditArticle/>}/>
            <Route path='/Admin/Doctor' element={<DashboardDoctor/>}/>
            <Route path='/Admin/Doctor/Add' element={<AddDoctor/>}/>
            <Route path='/Admin/Doctor/Edit/:id' element={<EditDoctor/>}/>

            {/* Auth */}
            <Route path='/Login' element={<Login/>}/>
            <Route path='/Register' element={<Register/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default Router