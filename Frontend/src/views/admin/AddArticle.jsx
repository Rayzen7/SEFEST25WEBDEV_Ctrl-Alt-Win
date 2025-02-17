import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const AddArticle = () => {
    const token = localStorage.getItem('token');
    const [link, setLink] = useState('');
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [image, setImage] = useState('');
    const [category_id, setCategoryId] = useState([]);
    const [category, setCategory] = useState([]);
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

    const handleCategory = (e) => {
        const selectedCategories = Array.from(e.target.selectedOptions, option => option.value);
        setCategoryId(selectedCategories);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('link', link);
        formData.append('title', title);
        formData.append('desc', desc);
        formData.append('image', image);
        category_id.forEach((id, index) => {
            formData.append(`category_id[${index}]`, id);
        });

        try {
            const response = await axios.post('http://localhost:8000/api/article', formData, {
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
                navigate('/Admin/Article');
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
            <h1 className='font-poppins text-purple text-[30px]'>Add Article</h1>
            <div className="mt-12 flex flex-col gap-8">
                <div className="flex flex-col gap-1">
                    <label className='font-poppins1 text-[16px]'>Link Article :</label>
                    <input 
                      type="text" 
                      placeholder='Link Article'
                      required
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      className='font-poppins1 text-[14px] border-[2px] border-black rounded-md pl-3 w-[260px] lg:w-[400px] h-[50px]'
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className='font-poppins1 text-[16px]'>Title :</label>
                    <input 
                      type="text" 
                      placeholder='Title'
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
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
                <div className="flex justify-between items-center gap-1">
                    <label className='font-poppins1 text-[16px]'>Category :</label>
                    <select className='font-poppins2 text-[16px] cursor-pointer' 
                      value={category_id} 
                      multiple
                      onChange={handleCategory}
                    >
                        {category.map((categories) => (
                            <option value={categories.id} key={categories.id}> {categories.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="flex flex-col gap-4 mt-12">
                <button onClick={handleSubmit} className='font-poppins1 text-white bg-green hover:bg-greenHover w-[260px] lg:w-[400px] h-[50px] rounded-md'>Add</button>
                <a href="/Admin/Article">
                    <button className='font-poppins1 text-white bg-blue hover:bg-blueHover w-[260px] lg:w-[400px] h-[50px] rounded-md'>Back</button>
                </a>
            </div>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default AddArticle