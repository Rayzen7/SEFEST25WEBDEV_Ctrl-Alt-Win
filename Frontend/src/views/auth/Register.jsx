/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import logo from '/image/logo/logo-2.png'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { useState } from 'react'
import '../Style.css'
import { useNavigate } from 'react-router-dom'
import { NavbarUser } from './NavbarUser'

const Register = () => {
    const [email, setEmail] =useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/register', {
                email, 
                name,
                password
            });

            toast.success(response.data.message, {
                theme: 'colored',
                autoClose: 2000
            });

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
  return (
    <div>
        <NavbarUser/>
        <div className='flex w-full h-[100vh] justify-center items-center lg:pt-16 gap-32' data-aos="fade-up" data-aos-duration="800">
            <div className="flex flex-col gap-16">
                <div className="text-black lg:text-start text-center">
                    <h1 className='lg:text-[42px] text-[24px] font-poppins'>Welcome to <span className='text-purple'>Satyguard</span></h1>
                    <p className='lg:text-[16px] text-[14px] lg:px-0 px-12 font-poppins1'>Please enter your name and password correctly</p>
                </div>
                <div className="flex flex-col lg:items-start items-center gap-10">
                    <div className="group">
                        <div className="flex justify-start items-center gap-3">
                            <i className='bx bx-envelope text-[26px] lg:text-[30px] group-focus-within:text-purple'></i>
                            <input 
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required 
                              placeholder='Email'
                              className='border-none w-[250px] lg:w-[350px] outline-none font-poppins2 lg:text-[18px] text-[14px]'
                            />
                        </div>
                        <hr className='lg:w-[450px] w-[300px] bg-black outline-none border-none h-[2px] lg:h-[3px] mt-2 group-focus-within:bg-purple' />
                    </div>
                    <div className="group">
                        <div className="flex justify-start items-center gap-3">
                            <i className='bx bx-user text-[26px] lg:text-[30px] group-focus-within:text-purple'></i>
                            <input 
                              type="text"
                              required 
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder='Name'
                              className='border-none w-[250px] lg:w-[350px] outline-none font-poppins2 lg:text-[18px] text-[14px]'
                            />
                        </div>
                        <hr className='lg:w-[450px] w-[300px] bg-black outline-none border-none h-[2px] lg:h-[3px] mt-2 group-focus-within:bg-purple' />
                    </div>
                    <div className="group">
                        <div className="flex justify-start items-center gap-3">
                            <i className='bx bxs-key text-[26px] lg:text-[30px] group-focus-within:text-purple'></i>
                            <input 
                              type="password"
                              required 
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder='Password'
                              className='border-none w-[250px] lg:w-[350px] outline-none font-poppins2 lg:text-[18px] text-[14px]'
                            />
                        </div>
                        <hr className='lg:w-[450px] w-[300px] bg-black outline-none border-none h-[2px] lg:h-[3px] mt-2 group-focus-within:bg-purple' />
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <button onClick={handleSubmit} className='bg-purple px-12 w-[160px] lg:mx-0 mx-auto lg:w-[200px] py-3 font-poppins1 text-[14px] lg:text-[16px] rounded-full cursor-pointer text-white transition-all duration-200 hover:bg-white hover:text-purple border-2 border-purple'>Sign Up</button>
                    <p className='lg:text-[16px] text-[14px] lg:text-start text-center font-poppins1'>Already Have an Account? <a href="/Login" className='underline italic text-purple'>Login Here</a></p>
                </div>
            </div>
            <div className="image">
                <img src={logo} alt="" className='w-[350px] animate-move h-auto' />
            </div>
        </div>
        <ToastContainer/>
    </div>
  )
}
export default Register