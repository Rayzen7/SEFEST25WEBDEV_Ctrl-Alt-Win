import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Video = () => {
    const [video, setVideo] = useState([]);

    useEffect(() => {
        const fetchVideo = async() => {
            try {
                const response = await axios.get('http://localhost:8000/api/user/video');
                setVideo(response.data.video);
            } catch (error) {
                console.error(error);
            }
        }

        fetchVideo();
    }, []);
  return (
    <div className='pb-32'>
        <div className="text-center">
            <h1 className="font-poppins text-[24px] lg:text-[32px] flex items-start justify-center gap-3">
                #Saty
                <span className="relative inline-block">
                    Always on Your Side 
                    <span className="block h-[18px] -translate-y-6 lg:-translate-y-7 rounded-full -z-10 relative bg-pink mt-[5px] w-full"></span>
                </span>
            </h1>
        </div>
        <div className="flex lg:flex-row flex-col justify-center items-start mt-5 lg:flex-wrap gap-10">
            {video.map((videos) => (
                <div key={videos.id} className="bg-gray1 w-[300px] lg:w-[450px] hover:-translate-y-4 transition-all duration-300 h-auto py-6 p-3 flex flex-col gap-4 items-center justify-center rounded-xl cursor-pointer" >
                    <iframe className='lg:w-[410px] w-[270px] lg:h-[250px] h-[200px] rounded-lg' src={videos.video} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    <div className="flex flex-col gap-3">
                        <h1 className='px-3 font-poppins1 text-[16px] lg:text-[20px]'>{videos.title}</h1>
                        <p className='px-3 font-poppins2 text-[12px] lg:text-[14px] text-justify'>{videos.desc}</p>
                    </div>
                    <p className='font-poppins justify-start mt-2 flex text-[12px] bg-white p-3 rounded-xl'>Created By: {videos.created_by}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Video