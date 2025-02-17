import React, { useEffect, useState } from 'react'
import NavbarAdmin from '../../components/Admin/NavbarAdmin'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const DashboardDoctor = () => {
    const [doctor, setDoctor] = useState([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctor = async() => {
            try {
                const response = await axios.get('http://localhost:8000/api/admin/doctor', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setDoctor(response.data.doctor);
            } catch (error) {
                console.error(error);
            }
        }

        fetchDoctor();
    }, [token]);

    const handleAdd = () => {
        navigate('/Admin/Doctor/Add');
    }

    const handleEdit = (id) => {
        navigate(`/Admin/Doctor/Edit/${id}`);
    }

    const handleDelete = async(id) => {
        try {
            const respose = await axios.delete(`http://localhost:8000/api/admin/doctor/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success(respose.data.message, {
                theme: 'colored',
                autoClose: 2000
            });

            setTimeout(() => {
                location.reload();
            }, 3000);
        } catch (error) {
            toast.error(error.response.data.message, {
                theme: 'colored',
                'autoClose': 2000
            });
        }
    }

  return (
    <div className='bg-[#EEEEEE] w-full min-h-[100vh] flex justify-between items-start'>
        <NavbarAdmin/>
        <div className="bg-white w-full lg:overflow-visible overflow-x-scroll lg:w-[75%] mx-5 lg:mx-8 lg:mt-12 mt-28 my-12 p-12 rounded-xl min-h-[100vh]">
            <div className="flex justify-between lg:w-auto w-[800px] items-center">
                <h1 className='font-poppins text-[30px]'>Doctor</h1>
                <button onClick={handleAdd} className='font-poppins1 bg-green hover:bg-greenHover text-white text-[12px] lg:text-[14px] cursor-pointer px-8 py-4 rounded-md'>Add Doctor</button>
            </div>
            <div className="mt-12">
                <table className='border-collapse mx-auto'>
                    <thead>
                        <tr>
                            <td className='font-poppins text-[16px] text-center pb-3 border-b-2 border-black px-[10px]'>No</td>
                            <td className='font-poppins text-[16px] text-center pb-3 border-b-2 border-black px-[10px]'>Image</td>
                            <td className='font-poppins text-[16px] text-center pb-3 border-b-2 border-black px-[10px]'>Name</td>
                            <td className='font-poppins text-[16px] text-center pb-3 border-b-2 border-black px-[10px]'>Specialist</td>
                            <td className='font-poppins text-[16px] text-center pb-3 border-b-2 border-black px-[10px]'>Email</td>
                            <td className='font-poppins text-[16px] text-center pb-3 border-b-2 border-black px-[10px]'>No. Phone</td>
                            <td className='font-poppins text-[16px] text-center pb-3 border-b-2 border-black px-[10px]'>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {doctor.map((doctors, index) => (
                            <tr key={index}>
                                <td className='font-poppins1 py-8 text-[12px] px-[10px]'>{index + 1}</td>
                                <td className='font-poppins1 py-8 px-[10px]'>
                                    <img src={`http://localhost:8000/storage/${doctors.image}`} alt="" className='h-auto w-[100px]' />
                                </td>                                
                                <td className='font-poppins1 py-8 text-[12px] px-[10px]'>{doctors.name}</td>
                                <td className='font-poppins1 py-8 text-[12px] px-[10px]'>{doctors.specialist}</td>
                                <td className='font-poppins1 py-8 text-[12px] px-[10px]'>{doctors.email}</td>
                                <td className='font-poppins1 py-8 text-[12px] px-[10px]'>{doctors.no_phone}</td>
                                <td className='align-middle px-[15px] items-center gap-5'>
                                    <div className="inline-flex gap-4">
                                        <button onClick={() => handleEdit(doctors.id)} className='bg-blue hover:bg-blueHover text-white px-7 rounded-md py-3 font-poppins1 text-[12px]'>Edit</button>
                                        <button onClick={() => handleDelete(doctors.id)} className='bg-red hover:bg-redHover text-white px-7 rounded-md py-3 font-poppins1 text-[12px]'>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ToastContainer/>
        </div>
    </div>
  )
}

export default DashboardDoctor