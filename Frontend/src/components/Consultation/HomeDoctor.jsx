import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const HomeDoctor = () => {
    const [doctor, setDoctor] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            Swal.fire({
                icon: 'error',
                title: "You are not logged in yet",
                text: "You must log in to use this feature",
                confirmButtonText: 'Login',
                confirmButtonColor: '#C305FF'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/Login');
                }
            });
            return;
        }

        const fetchDoctor = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/user/doctor', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setDoctor(response.data.doctor);
            } catch (error) {
                console.error(error);
            }
        };

        fetchDoctor();
    }, [token, navigate]);

    const handleGetId = (id) => {
        navigate(`/Consultation/Doctor/${id}`);
    };

    const filteredDoctors = Array.isArray(doctor) ? doctor.filter((d) =>
        d.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];

    return (
        <div className='w-full min-h-[100vh] pb-16 pt-28' data-aos="fade-up" data-aos-duration="800">
            <div className="bg-[#F0F0F0] flex justify-start items-center w-[700px] gap-3 px-8 h-[65px] mx-auto rounded-xl">
                <i className='bx bx-search-alt-2 text-[#231F20] text-[28px]'></i>
                <input
                    type="text"
                    placeholder='Search for Doctors'
                    className='bg-[#F0F0F0] placeholder:text-black border-none outline-none font-poppins2 text-[16px] w-full'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="mt-20 flex justify-center flex-wrap items-start gap-10">
                {filteredDoctors.length > 0 ? (
                    filteredDoctors.map((doctors) => (
                        <div className="bg-[#f0f0f0] p-6 rounded-xl w-[350px] flex justify-center items-start flex-col" key={doctors.id}>
                            <img src={`http://localhost:8000/storage/${doctors.image}`} alt="" className='w-[300px] h-[300px] rounded-md' />
                            <div className="mt-4">
                                <h1 className='font-poppins1 text-[22px]'>{doctors.name}</h1>
                                <p className='font-poppins2 pt-1 text-[12px] text-justify text-[#6C87AE]'>{doctors.desc}</p>
                            </div>
                            <button 
                                onClick={() => handleGetId(doctors.id)} 
                                className='font-poppins1 mt-7 text-white bg-purple flex justify-center items-center w-full px-8 py-3 hover:bg-white transition-all duration-300 hover:text-purple border-2 border-purple rounded-full gap-3 lg:text-[14px] text-[12px]'>
                                <i className='bx bxl-whatsapp text-[18px] lg:text-[24px]'></i>
                                Book an appointment
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="font-poppins2 text-lg">No Doctors Found</p>
                )}
            </div>
        </div>
    );
};

export default HomeDoctor;
