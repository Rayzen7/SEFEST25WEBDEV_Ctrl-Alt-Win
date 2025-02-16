import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateDoctor = () => {
    const token = localStorage.getItem('token');
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [password, setPassword] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchId = async() => {
            try {
                const response = await axios.get(`http://localhost:8000/api/doctor/profile/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const getId = response.data.doctor;
                setName(getId.name);
            } catch (error) {
                console.error(error);
            }
        }

        fetchId();
    }, [token, id]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', image);
        formData.append('password', password);

        try {
            const response = await axios.post(`http://localhost:8000/api/doctor/profile/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            toast.success(response.data.message, {
                theme: 'colored',
                autoClose: 2000
            });

            setTimeout(() => {
                navigate('/Admin/Doctor');
            }, 3000);

        } catch (error) {
            toast.error(error.response.data.message, {
                theme: 'colored',
                autoClose: 2000
            });
        }
    }

  return (
    <div className='bg-[#EEEEEE] w-full min-h-[100vh] flex flex-col justify-center items-center'>
        <div className="bg-white w-[320px] lg:w-[600px] min-h-[530px] my-12 rounded-lg p-8 flex flex-col justify-center items-center">
            <h1 className='font-poppins text-purple text-[30px]'>Edit Doctor</h1>
            <div className="mt-12 flex flex-col gap-8">
                <div className="flex flex-col gap-1">
                    <label className='font-poppins1 text-[16px]'>Name :</label>
                    <input 
                      type="text" 
                      placeholder='Doctor Name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className='font-poppins1 text-[14px] border-[2px] border-black rounded-md pl-3 w-[260px] lg:w-[400px] h-[50px]'
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className='font-poppins1 text-[16px]'>Password :</label>
                    <input 
                      type="password" 
                      placeholder='Password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className='font-poppins1 text-[14px] border-[2px] border-black rounded-md pl-3 w-[260px] lg:w-[400px] h-[50px]'
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className='font-poppins1 text-[16px]'>Image :</label>
                    <input 
                      type="file" 
                      placeholder='Created By'
                      onChange={(e) => setImage(e.target.files[0])}
                      required
                      className='font-poppins1 text-[14px] mt-2 w-[260px] lg:w-[400px] h-[50px]'
                    />
                </div>                
            </div>
            <div className="flex flex-col gap-4 mt-12">
                <button onClick={handleSubmit} className='font-poppins1 text-white bg-green hover:bg-greenHover w-[260px] lg:w-[400px] h-[50px] rounded-md'>Edit</button>
                <a href="/Doctor/Profile">
                    <button className='font-poppins1 text-white bg-blue hover:bg-blueHover w-[260px] lg:w-[400px] h-[50px] rounded-md'>Back</button>
                </a>
            </div>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default UpdateDoctor