import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

const EditDoctor = () => {
    const token = localStorage.getItem('token');
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [image, setImage] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [email, setEmail] = useState('');
    const [price, setPrice] = useState('');
    const [no_ktp, setKTP] = useState('');
    const [no_phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setPhone('+62');

        const fetchId = async() => {
            try {
                const response = await axios.get(`http://localhost:8000/api/admin/doctor/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const getId = response.data.doctor;
                setName(getId.name);
                setKTP(getId.no_ktp);
                setPhone(getId.no_phone);
                setEmail(getId.email);
                setSpecialist(getId.specialist);
                setPrice(getId.price);
                setDesc(getId.desc);
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
        formData.append('desc', desc);
        formData.append('image', image);
        formData.append('specialist', specialist);
        formData.append('email', email);
        formData.append('price', price);
        formData.append('no_ktp', no_ktp);
        formData.append('no_phone', no_phone);
        formData.append('password', password);

        try {
            const response = await axios.post(`http://localhost:8000/api/admin/doctor/${id}`, formData, {
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
                    <label className='font-poppins1 text-[16px]'>No KTP :</label>
                    <input 
                      type="text" 
                      placeholder='No KTP'
                      value={no_ktp}
                      onChange={(e) => setKTP(e.target.value)}
                      required
                      className='font-poppins1 text-[14px] border-[2px] border-black rounded-md pl-3 w-[260px] lg:w-[400px] h-[50px]'
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className='font-poppins1 text-[16px]'>No Phone :</label>
                    <input 
                      type="text" 
                      placeholder='No Phone'
                      value={no_phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className='font-poppins1 text-[14px] border-[2px] border-black rounded-md pl-3 w-[260px] lg:w-[400px] h-[50px]'
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className='font-poppins1 text-[16px]'>Email :</label>
                    <input 
                      type="email" 
                      placeholder='Email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className='font-poppins1 text-[14px] border-[2px] border-black rounded-md pl-3 w-[260px] lg:w-[400px] h-[50px]'
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className='font-poppins1 text-[16px]'>Specialist :</label>
                    <input 
                      type="text" 
                      placeholder='Specialist'
                      value={specialist}
                      onChange={(e) => setSpecialist(e.target.value)}
                      required
                      className='font-poppins1 text-[14px] border-[2px] border-black rounded-md pl-3 w-[260px] lg:w-[400px] h-[50px]'
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className='font-poppins1 text-[16px]'>Price :</label>
                    <input 
                      type="text" 
                      placeholder='Price'
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                      className='font-poppins1 text-[14px] border-[2px] border-black rounded-md pl-3 w-[260px] lg:w-[400px] h-[50px]'
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className='font-poppins1 text-[16px]'>Description :</label>
                    <textarea 
                      type="text" 
                      placeholder='Description'
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      required
                      className='font-poppins1 pt-3 text-[14px] border-[2px] border-black rounded-md pl-3 w-[260px] lg:w-[400px] h-[150px]'
                    >
                    </textarea>
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
                <a href="/Admin/Doctor">
                    <button className='font-poppins1 text-white bg-blue hover:bg-blueHover w-[260px] lg:w-[400px] h-[50px] rounded-md'>Back</button>
                </a>
            </div>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default EditDoctor