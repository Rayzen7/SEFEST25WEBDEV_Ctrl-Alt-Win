/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import axios from 'axios'
import NavbarBack from './NavbarBack'
import { useEffect, useState } from 'react'
import logo from '/image/mood/bad/logo.png'
import icon1 from '/image/mood/bad/icon-1.svg'
import icon2 from '/image/mood/bad/icon-2.svg'
import icon3 from '/image/mood/bad/icon-3.svg'

const Bad = () => {
    const [message, setMessage] = useState([]);

    useEffect(() => {
        const fetchResponse = async() => {
            try {
                const response = await axios.get('http://localhost:7001/result');
                setMessage(response.data.mood.probability);
            } catch (error) {
                console.error(error);
            }
        }

        fetchResponse();
    }, []);
  return (
    <div>
        <NavbarBack/>
        <div className="w-full h-[100vh] flex flex-col justify-center items-center lg:pt-12 pt-32 lg:mb-0 mb-20" data-aos="fade-up" data-aos-duration="800">
            <div className="bg-[#e6e6e6] p-8 w-[320px] lg:w-[900px] h-auto lg:h-[500px] rounded-lg">
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                        <h1 className='text-purple font-poppins text-[20px] lg:text-[24px]'>Current Mood</h1>
                        <p className='font-pobad text-[17px] lg:text-[20px] text-purple'>{message}%</p>
                    </div>
                    <div className="w-full h-[10px] lg:h-[16px] bg-white rounded-full">
                        <div className="bg-[#FF5757] h-[10px] lg:h-[16px] rounded-full transition-all duration-150 animate-moveIn w-0" style={{width: `${message}%`}}></div>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center mt-8">
                    <img src={logo} alt="" className='w-[80px] lg:w-[120px] h-auto' />
                    <h1 className='font-poppins text-[14px] lg:text-[20px] pt-3 text-center'>You seem a bit down. Try some mindfulness exercises or talk to someone.</h1>
                    <div className="flex flex-col lg:flex-row justify-center items-center gap-6 mt-7">
                        <div className="bg-white py-4 px-8 rounded-xl flex flex-col justify-center items-center gap-2">
                            <img src={icon1} alt="" className='lg:w-[25px] w-[15px] h-auto' />
                            <p className='text-center font-poppins1 text-[10px] lg:text-[14px]'>go for a nature walk</p>
                        </div>
                        <div className="bg-white py-4 px-8 rounded-xl flex flex-col justify-center items-center gap-2">
                            <img src={icon2} alt="" className='lg:w-[25px] w-[15px] h-auto' />
                            <p className='text-center font-poppins1 text-[10px] lg:text-[14px]'>do something creative</p>
                        </div>
                        <div className="bg-white py-4 px-8 rounded-xl flex flex-col justify-center items-center gap-2">
                            <img src={icon3} alt="" className='lg:w-[25px] w-[15px] h-auto' />
                            <p className='text-center font-poppins1 text-[10px] lg:text-[14px]'>share your happiness</p>
                        </div>
                    </div>
                    <p className='text-center font-poppins text-[16px] lg:text-[20px] mt-6'>You are<span className='text-purple'> not alone</span> Take it one step at a time and <span className='text-purple'>be kind to yourself.</span></p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Bad