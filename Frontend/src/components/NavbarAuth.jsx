import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '/image/logo/logo.png';
import list from '/image/list.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './CSS/Navbar.css';
import { toast, ToastContainer } from 'react-toastify';

const NavbarAuth = () => {
    const location = useLocation();
    const [user, setUser] = useState([]);
    const isMobile = window.matchMedia('(max-width: 1024px)').matches;
    const token = localStorage.getItem('token');
    const [isOpen, setIsOpen] = useState(false);
    const [invisible, setInvisible] = useState(!isMobile);
    const navigate = useNavigate();

    useEffect(() => {
      const handleSize = () => {
        const isMobile = window.matchMedia('(max-width: 1024px)').matches;
        setInvisible(!isMobile);
      }

      const fetchUser = async() => {
        try {
            const response = await axios.get('http://localhost:8000/api/getuser', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUser([response.data.user]);
        } catch (error) {
            console.error(error);
        }
      }

      fetchUser();

      window.addEventListener('resize', handleSize);
      return () => {
        window.removeEventListener('resize', handleSize);
      }
    },[token]);

    const toggleList = () => {
        setInvisible(!invisible);
    }
    const LogoutVisibility = isOpen ? 'animate-fadeIn' : 'animate-fadeOut';

    const toggleLogout = () => {
        setIsOpen(!isOpen);
    }

    const handleLogout = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.delete('http://localhost:8000/api/logout', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(response.data.message);
            toast.success(response.data.message, {
                theme: 'colored',
                autoClose: 2000
            });

            localStorage.removeItem('token');
            setTimeout(() => {
                navigate('/Login');
            }, 3000);
        } catch (error) {
            toast.error(error.response.data.message, {
                theme: 'colored',
                autoClose: 2000
            });
        }
    }

    const ulClass = 'lg:items-center items-start font-poppins flex lg:gap-16 lg:mt-0 text-[18px] lg:w-full lg:pl-0 lg:h-0 pl-10 lg:pt-0 lg:relative absolute lg:flex-row flex-col gap-10 top-0 right-0 w-[200px] h-[100vh] lg:bg-none bg-white cursor-pointer lg:justify-end justify-center';
    const visibilityClass = invisible ? 'animate-moveRight' : 'animate-moveLeft';

  return (
    <div className='flex justify-between items-center bg-white w-full h-[12vh] lg:h-[16vh] lg:px-12 px-6 fixed'>
        <a href="#">
          <img src={logo} alt="" className='lg:w-[65px] w-[45px] h-auto'/>
        </a>
        <ul className={`${ulClass} ${visibilityClass}`}>
            <Link to="/"><li className={`hover:scale-95 lg:text-[20px] hover:text-purple transition-all ${location.pathname === '/'  ? 'text-purple' : ''}`}>Home</li></Link>
            <Link to="/Information"><li className={`hover:scale-95 lg:text-[20px] hover:text-purple transition-all ${location.pathname === '/Information'  ? 'text-purple' : ''}`}>Information</li></Link>
            <Link to='/Contacts'><li className={`hover:scale-95 lg:text-[20px] hover:text-purple transition-all ${location.pathname === '/Contacts'  ? 'text-purple' : ''}`}>Contact</li></Link>
            <Link to='/Satybot'><li className={`hover:scale-95 lg:text-[20px] hover:text-purple transition-all ${location.pathname === '/Satybot'  ? 'text-purple' : ''}`}>Satybot</li></Link>
            {user.map((users) => (
                <div className="" key={users}>
                    <div className="cursor-default flex justify-center items-center gap-3 group">
                        <i className='bx bxs-user text-[28px] transition-all duration-200 group-hover:text-purple'></i>
                        <p className='font-poppins1 text-[18px] transition-all duration-200 group-hover:text-purple'>{users.name}</p>
                        <i onClick={toggleLogout} className='bx bx-chevron-down transition-all duration-200 text-[26px] group-hover:text-purple cursor-pointer'></i>
                    </div>
                    {isOpen && (
                        <div className={`absolute z-30 w-[123px] h-[60px] flex flex-col mt-3 justify-center items-center bg-white hover:bg-gray transition-all rounded-b-lg ${LogoutVisibility}`}>
                            <button onClick={handleLogout} className='font-poppins text-[16px]'>Logout</button>
                        </div>
                    )}  
                </div>
            ))}
            <Link to='/Downloads'><li><button className='font-poppins2 border-2 lg:mt-0 mt-10 rounded-2xl lg:px-8 lg:py-2 px-3 py-2 hover:scale-90 transition-all'>Download</button></li></Link>
        </ul>
        <img src={list} alt="" className='lg:w-[20px] ml-auto lg:ml-0 h-auto w-[16px] relative z-20 cursor-pointer icon' onClick={toggleList}/>
        <ToastContainer/>
    </div>
  )
}

export default NavbarAuth;
