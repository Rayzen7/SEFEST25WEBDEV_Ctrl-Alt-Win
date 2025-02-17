import React, { useEffect, useState } from 'react'
import NavbarAdmin from '../../components/Admin/NavbarAdmin'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const DashboardArticle = () => {
    const [article, setArticle] = useState([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArticle = async() => {
            try {
                const response = await axios.get('http://localhost:8000/api/article', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setArticle(response.data.article);
            } catch (error) {
                console.error(error);
            }
        }

        fetchArticle();
    }, [token]);

    const handleAdd = () => {
        navigate('/Admin/Article/Add');
    }

    const handleEdit = (id) => {
        navigate(`/Admin/Article/Edit/${id}`);
    }

    const handleDelete = async(id) => {
        try {
            const respose = await axios.delete(`http://localhost:8000/api/article/${id}`, {
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
                <h1 className='font-poppins text-[30px]'>Article</h1>
                <button onClick={handleAdd} className='font-poppins1 bg-green hover:bg-greenHover text-white text-[12px] lg:text-[14px] cursor-pointer px-8 py-4 rounded-md'>Add Article</button>
            </div>
            <div className="mt-12">
                <table className='border-collapse mx-auto'>
                    <thead>
                        <tr>
                            <td className='font-poppins text-[16px] text-center pb-3 border-b-2 border-black px-[15px]'>No</td>
                            <td className='font-poppins text-[16px] text-center pb-3 border-b-2 border-black px-[15px]'>Image</td>
                            <td className='font-poppins text-[16px] text-center pb-3 border-b-2 border-black px-[15px]'>Title</td>
                            <td className='font-poppins text-[16px] text-center pb-3 border-b-2 border-black px-[15px]'>Category</td>
                            <td className='font-poppins text-[16px] text-center pb-3 border-b-2 border-black px-[15px]'>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {article.map((articles, index) => (
                            <tr key={index}>
                                <td className='font-poppins1 py-8 text-[12px] px-[15px]'>{index + 1}</td>
                                <td className='font-poppins1 py-8 px-[15px]'>
                                    <img src={`http://localhost:8000/storage/${articles.image}`} alt="" className='h-[110px] w-[300px] rounded-md' />
                                </td>                                
                                <td className='font-poppins1 py-8 text-[12px] px-[15px]'>{articles.title}</td>
                                <td className='font-poppins1 py-8 text-[12px] px-[15px]' >
                                    {articles.category.map((categorys) => (
                                        <div className="flex" key={categorys}>
                                            <p>{categorys.name}</p>
                                        </div>
                                    ))}
                                </td>
                                <td className='align-middle px-[15px] items-center gap-5'>
                                    <div className="inline-flex gap-4">
                                        <button onClick={() => handleEdit(articles.id)} className='bg-blue hover:bg-blueHover text-white px-7 rounded-md py-3 font-poppins1 text-[12px]'>Edit</button>
                                        <button onClick={() => handleDelete(articles.id)} className='bg-red hover:bg-redHover text-white px-7 rounded-md py-3 font-poppins1 text-[12px]'>Delete</button>
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

export default DashboardArticle