/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'

const Article = () => {
    const [article, setArticle] = useState([]);
    
    useEffect(() => {
        const fetchArticle = async() => {
            try {
                const response = await axios.get('http://localhost:8000/api/user/article');
                setArticle(response.data.article);
                console.log(response.data.article);
            } catch (error) {
                console.error(error);
            }
        }

        fetchArticle();
    }, []);

  return (
    <div className='pb-32' data-aos="fade-up" data-aos-duration="800">
        <div className="text-center">
            <h1 className="font-poppins text-[24px] lg:text-[32px] flex items-start justify-center gap-3">
                Something's  
                <span className="relative inline-block">
                    Happening
                    <span className="block h-[18px] -translate-y-6 lg:-translate-y-7 rounded-full -z-10 relative bg-pink mt-[5px] w-full"></span>
                </span>
            </h1>
        </div>
        <div className="flex lg:flex-row flex-col justify-center items-center mt-5 lg:flex-wrap gap-10">
            {article.map((articles) => (
                <a href={articles.link} target='_blank' className="" key={articles}>
                    <div className="bg-gray1 w-[300px] lg:w-[450px] hover:-translate-y-4 transition-all duration-300 h-auto lg:min-h-[520px] lg:py-6 py-6 p-3 flex flex-col gap-4 items-center justify-start rounded-xl cursor-pointer" >
                        <img className='lg:w-[410px] w-[270px] rounded-md lg:h-[250px]' src={`http://localhost:8000/storage/${articles.image}`} alt="" />
                        <div className="flex flex-col gap-3">
                            <h1 className='px-3 font-poppins1 text-[16px] lg:text-[20px]'>{articles.title}</h1>
                            <p className='px-3 font-poppins2 text-[12px] lg:text-[14px] text-justify'>{articles.desc}</p>
                            <div className="px-3 font-poppins2 text-[14px] flex items-center gap-4">
                                {articles.category.map((category) => (
                                    <div className="bg-white px-1 lg:px-3 py-2 rounded-md" key={category}>
                                        <p className='font-poppins1 text-[10px] lg:text-[12px]'>{category.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </a>
            ))}
        </div>
    </div>
  )
}

export default Article