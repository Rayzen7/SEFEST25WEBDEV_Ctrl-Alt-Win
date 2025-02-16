import React, { useEffect, useState } from 'react'
import axios from 'axios';
import NavbarDoctor from './NavbarDoctor';

const DoctorDashboard = () => {
    const [consultation, setConsultation] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchConsultation = async() => {
            try {
                const response = await axios.get('http://localhost:8000/api/doctor/transaction', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setConsultation(response.data.transaction);
            } catch (error) {
                console.error(error);
            }
        }

        fetchConsultation();
    }, [token]);

    const handleChat = async(id) => {
        try {
            const response = await axios.put(`http://localhost:8000/api/doctor/transaction/${id}`, {
                status: 'accepted'
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const transaction = consultation.find(item => item.id === id);
            if (transaction) {
                window.open(`https://wa.me/${transaction.no_phone}`, '_blank')
            }

            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <div className='bg-[#EEEEEE] w-full min-h-[100vh] flex justify-between items-start'>
        <NavbarDoctor/>
        <div className="bg-white w-full lg:overflow-visible overflow-x-scroll lg:w-[75%] mx-5 lg:mx-8 lg:mt-12 mt-28 my-12 p-12 rounded-xl min-h-[100vh]">
            <div className="flex justify-between lg:w-auto w-[800px] items-center">
                <h1 className='font-poppins text-[30px]'>Consultaton List</h1>
            </div>
            <div className="mt-12">
                <table className='border-collapse mx-auto'>
                    <thead>
                        <tr>
                            <td className='font-poppins text-[16px] text-center pb-3 border-b-2 border-black px-[15px]'>No</td>
                            <td className='font-poppins text-[16px] text-center pb-3 border-b-2 border-black px-[15px]'>Name</td>
                            <td className='font-poppins text-[16px] text-center pb-3 border-b-2 border-black px-[15px]'>Diesease Complaint</td>
                            <td className='font-poppins text-[16px] text-center pb-3 border-b-2 border-black px-[15px]'>No Phone</td>
                            <td className='font-poppins text-[16px] text-center pb-3 border-b-2 border-black px-[15px]'>Status</td>
                            <td className='font-poppins text-[16px] text-center pb-3 border-b-2 border-black px-[15px]'>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {consultation.map((consultations, index) => (
                            <tr key={index} className='h-auto'>
                                <td className='font-poppins1 py-8 text-[12px] px-[15px]'>{index + 1}</td>                               
                                <td className='font-poppins1 py-8 text-[12px] px-[15px]'>{consultations.user_name}</td>
                                <td className='font-poppins1 py-8 text-[12px] px-[15px] text-justify'>{consultations.disease_complaints}</td>
                                <td className='font-poppins1 py-8 text-[12px] px-[15px]'>{consultations.no_phone}</td>
                                <td className='font-poppins1 py-8 text-[12px] px-[15px]'>
                                    <p className={`font-poppins px-6 py-3 rounded-md text-[12px] ${consultations.status === 'pending' ? 'bg-[#FFF3E2] text-[#FF9500]' : 'bg-[#93ECB3] text-[#255938]'}`}>{consultations.status}</p>
                                </td>
                                <td className='align-middle h-full px-[15px]'>
                                    <div className="inline-flex">
                                        <button onClick={() => handleChat(consultations.id)} className='bg-green hover:bg-greenHover text-white px-7 w-[120px] rounded-md py-3 font-poppins1 text-[12px]'>Chat User</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default DoctorDashboard