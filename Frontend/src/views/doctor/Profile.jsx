import React, { useEffect, useState } from 'react'
import axios from 'axios';
import NavbarDoctor from './NavbarDoctor';
import { useNavigate } from 'react-router-dom';

const DoctorProfile = () => {
    const [doctor, setDoctor] = useState([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctor = async() => {
            try {
                const response = await axios.get('http://localhost:8000/api/doctor/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setDoctor([response.data.doctor]);
            } catch (error) {
                console.error(error);
            }
        }

        fetchDoctor();
    }, [token]);

    const handleEdit = (id) => {
        navigate(`/Doctor/Profile/${id}`);
    }

  return (
    <div className='bg-[#EEEEEE] w-full min-h-[100vh] flex justify-between items-start'>
        <NavbarDoctor/>
        <div className="bg-white w-full lg:overflow-visible overflow-x-scroll lg:w-[55%] mx-5 lg:mx-36 lg:mt-12 mt-28 my-12 p-16 rounded-xl min-h-[100vh]">
            {doctor.map((doctors) => (
                <div className="flex flex-col justify-center items-center gap-6" key={doctors.id}>
                    <img src={`http://localhost:8000/storage/${doctors.image}`} alt="" className='w-[110px] h-[110px] rounded-full' />
                    <div className="text-center">
                        <h1 className='font-poppins1 text-[24px]'>{doctors.name}</h1>
                        <p className='font-poppins2 text-[16px] pt-1'>Specialist {doctors.specialist}</p>
                    </div>
                    <h1 className='bg-gray1 font-poppins1 py-3 px-7 rounded-md'>No KTP: {doctors.no_ktp}</h1>
                    <div className="flex justify-center items-center gap-8">
                        <h1 className='bg-gray1 font-poppins1 py-3 px-7 rounded-md'>Email: {doctors.email}</h1>
                        <h1 className='bg-gray1 font-poppins1 py-3 px-7 rounded-md'>Phone: {doctors.no_phone}</h1>
                    </div>
                    <h1 className='bg-gray1 font-poppins2 w-[530px] text-justify py-3 px-7 rounded-md'>About: {doctors.desc}</h1>
                    <button onClick={() => handleEdit(doctors.id)} className='bg-blue hover:bg-blueHover w-[530px] text-white px-7 rounded-md py-4 font-poppins1 text-[16px]'>Edit Profile</button>
                </div>
            ))}
        </div>
    </div>
  )
}

export default DoctorProfile