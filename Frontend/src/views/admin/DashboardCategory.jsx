import React, { useEffect, useState } from 'react'
import NavbarAdmin from '../../components/Admin/NavbarAdmin'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const DashboardCategory = () => {
    const [category, setCategory] = useState([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategory = async() => {
            try {
                const response = await axios.get('http://localhost:8000/api/category', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setCategory(response.data.category);
            } catch (error) {
                console.error(error);
            }
        }

        fetchCategory();
    }, [token]);

    const handleAdd = () => {
        navigate('/Admin/Category/Add');
    }

    const handleDelete = async(id) => {
        try {
            const respose = await axios.delete(`http://localhost:8000/api/category/${id}`, {
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
                <h1 className='font-poppins text-[30px]'>Category</h1>
                <button onClick={handleAdd} className='font-poppins1 bg-green hover:bg-greenHover text-white text-[12px] lg:text-[14px] cursor-pointer px-8 py-4 rounded-md'>Add Category</button>
            </div>
            <div className="mt-12">
                <table className='border-collapse mx-auto'>
                    <thead>
                        <tr>
                            <td className='font-poppins text-[20px] text-center pb-3 border-b-2 border-black px-[85px]'>No</td>
                            <td className='font-poppins text-[20px] text-center pb-3 border-b-2 border-black px-[85px]'>Name</td>
                            <td className='font-poppins text-[20px] text-center pb-3 border-b-2 border-black px-[85px]'>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {category.map((categorys, index) => (
                            <tr key={index}>
                                <td className='font-poppins1 py-8 text-[16px] px-[85px]'>{index + 1}</td>
                                <td className='font-poppins1 py-8 text-[16px] px-[85px]'>{categorys.name}</td>
                                <td className='flex py-[35px] justify-center px-[85px] items-center gap-5'>
                                    <button onClick={() => handleDelete(categorys.id)} className='bg-red hover:bg-redHover text-white px-7 rounded-md py-3 font-poppins1 text-[12px]'>Delete</button>
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

export default DashboardCategory