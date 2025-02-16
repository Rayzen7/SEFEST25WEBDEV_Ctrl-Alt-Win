import React from 'react'
import logo from '/image/logo/logo.png';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const NavbarDoctor = () => {
    const [admin, setAdmin] = useState([]);
    const token = localStorage.getItem('token');
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!token) {
            navigate('/');
        }

        const fetchAdmin= async() => {
            try {
                const response = await axios.get('http://localhost:8000/api/getuser', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setAdmin(response.data.user);
                const doctorRole = response.data.user.role_id;
                if (doctorRole === 3) {
                    return;
                } else {
                    localStorage.removeItem('token');
                    navigate('/Login');
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchAdmin();
    }, [token, navigate]);

    const handleLogout = async() => {
        try {
            const response = await axios.delete('http://localhost:8000/api/logout', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            localStorage.removeItem('token');
            setTimeout(() => {
                navigate('/Login');
            }, 3000);

            toast.success(response.data.message, {
                theme: 'colored',
                autoClose: 2000
            });
        } catch (error) {
            toast.error(error.response.data.message, {
                theme: 'colored',
                autoClose: 2000
            });
        }
    }

  return (
    <div>
        <i className='bx bx-list-ul absolute top-8 left-8 z-10 bg-white text-[20px] lg:text-[32px] p-3 rounded-full cursor-pointer' onClick={() => setOpen(true)}></i>
        <div className={`w-[280px] fixed h-[100vh] z-20 transition-all duration-700 overflow-hidden bg-white ${open ? "translate-x-0" : "-translate-x-[100%]"}`}>
            <div className="flex flex-col justify-between items-center h-full py-7">
                <div onClick={() => setOpen(false)} className="flex justify-center items-center gap-4 cursor-pointer">
                    <img src={logo} alt="" className='w-[25px] h-auto' />
                    <h1 className='font-poppins text-purple text-[18px]'>SatyGuard</h1>
                </div>
                <div className="flex justify-center flex-col items-center gap-4">
                    <i className='bx bxs-user text-[25px] bg-purple text-white p-4 rounded-full'></i>
                    <div className="text-center">
                        <h1 className='font-poppins text-[#353535] text-[18px]'>{admin.name}</h1>
                        <h1 className='font-poppins1 text-[14px] text-[#737373]'>{admin.email}</h1>
                    </div>
                    <hr className='bg-[#757575] outline-none border-none h-[3px] w-[200px] rounded-full' />
                </div>
                <div className="flex flex-col w-full">
                    <Link to='/Doctor/Dashboard'>
                        <div className={`flex justify-between items-center px-8 group transition-all duration-200 hover:bg-purple h-[65px] cursor-pointer ${location.pathname === '/Doctor/Dashboard' ? 'bg-purple' : ''}`}>
                            <i className={`bx bxs-conversation group-hover:text-white text-purple text-[20px] ${location.pathname === '/Doctor/Dashboard' ? 'text-white' : ''}`}></i>
                            <p className={`font-poppins text-purple text-[16px] group-hover:text-white ${location.pathname === '/Doctor/Dashboard' ? 'text-white' : ''}`}>Consultation</p>
                            <i className={`bx bx-chevron-right text-[25px] text-purple group-hover:text-white ${location.pathname === '/Doctor/Dashboard' ? 'text-white' : ''}`}></i>
                        </div>
                    </Link>
                    <Link to='/Doctor/Profile'>
                        <div className={`flex justify-between items-center px-8 group transition-all duration-200 hover:bg-purple h-[65px] cursor-pointer ${location.pathname === '/Doctor/Profile' ? 'bg-purple' : ''}`}>
                            <i className={`bx bxs-user-detail group-hover:text-white text-purple text-[20px] ${location.pathname === '/Doctor/Profile' ? 'text-white' : ''}`}></i>
                            <p className={`font-poppins text-purple text-[16px] group-hover:text-white ${location.pathname === '/Doctor/Profile' ? 'text-white' : ''}`}>Profile</p>
                            <i className={`bx bx-chevron-right text-[25px] text-purple group-hover:text-white ${location.pathname === '/Doctor/Profile' ? 'text-white' : ''}`}></i>
                        </div>
                    </Link>
                </div>
                <button onClick={handleLogout} className='font-poppins1 text-[14px] bg-purple text-white px-8 py-3 hover:bg-white hover:text-purple transition-all duration-150 border-2 border-purple rounded-full'>Logout</button>
            </div>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default NavbarDoctor