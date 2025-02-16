import React, { useEffect, useState } from 'react'
import NavbarAdmin from '../../components/Admin/NavbarAdmin'
import axios from 'axios';

const DashboardMessage = () => {
    const [message, setMessage] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchMessage = async() => {
            try {
                const response = await axios.get('http://localhost:8000/api/message', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setMessage(response.data.message);
            } catch (error) {
                console.error(error);
            }
        }

        fetchMessage();
    }, [token]);

  return (
    <div className='bg-[#EEEEEE] w-full min-h-[100vh] flex justify-between items-start'>
        <NavbarAdmin/>
        <div className="bg-white w-full lg:overflow-visible overflow-x-scroll lg:w-[75%] mx-5 lg:mx-8 lg:mt-12 mt-28 my-12 p-12 rounded-xl min-h-[100vh]">
            <div className="flex justify-between lg:w-auto w-[800px] items-center">
                <h1 className='font-poppins text-[30px]'>Message</h1>
            </div>
            <div className="mt-12">
                <table className='border-collapse mx-auto'>
                    <thead>
                        <tr>
                            <td className='font-poppins text-[20px] text-center pb-3 border-b-2 border-black px-[35px]'>No</td>
                            <td className='font-poppins text-[20px] text-center pb-3 border-b-2 border-black px-[35px]'>Name</td>
                            <td className='font-poppins text-[20px] text-center pb-3 border-b-2 border-black px-[35px]'>Email</td>
                            <td className='font-poppins text-[20px] text-center pb-3 border-b-2 border-black px-[35px]'>Message</td>
                        </tr>
                    </thead>
                    <tbody>
                        {message.map((messages, index) => (
                            <tr key={index}>
                                <td className='font-poppins1 py-8 text-[14px] px-[35px]'>{index + 1}</td>
                                <td className='font-poppins1 py-8 text-[14px] px-[35px]'>{messages.name}</td>
                                <td className='font-poppins1 py-8 text-[14px] px-[35px]'>{messages.email}</td>
                                <td className='font-poppins1 py-8 text-[14px] px-[35px]'>{messages.message}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default DashboardMessage