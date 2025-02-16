import React from 'react'
import { dataMental } from '../../assets/Data.js'
import './CSS/About.css'
import robot3 from '/image/logo/robot-3.png'

const About = () => {
  return (
    <div className='lg:mt-12 mt-16'>
        <div className="">
            <div className='text-center bg-gray p-7 w-[300px] lg:w-[1000px] rounded-xl mx-auto' data-aos="fade-up" data-aos-duration="800">
                <p className='font-poppins1 lg:text-[22px] text-[14px]'>Why?</p>
                <h1 className='font-poppins lg:text-[40px] lg:pt-5 pt-2 text-[14px]'>Why Our Mental Health Consultants are <br className='lg:block hidden'/> the Best Choice</h1>
            </div>
            <img src={robot3} alt="" className='lg:w-[150px] w-0 h-auto absolute right-0 top-[280%]' data-aos="fade-up" data-aos-duration="800" />
        </div>
        <div className='lg:mt-[160px] mt-[100px]'>
            <div className='flex lg:flex-row flex-col lg:space-y-0 space-y-24 lg:px-20 justify-around items-center' data-aos="fade-up" data-aos-duration="800">
                { dataMental.map((item) => (
                    <div key={item.id} className='flex flex-col items-center space-y-2 border-purple border-[2px] p-5 rounded-3xl cursor-pointer dataMap lg:w-[350px] lg:h-[410px] w-[280px] h-[380px]'>
                        <img src={item.img} alt="" className='w-[100px] outline-none border-none h-auto transition-all'/>
                        <h1 className='text-[22px] pt-2 font-poppins'>{item.head}</h1>
                        <p className='lg:w-[300px] text-center pt-4 font-poppins2 lg:text-[15px] text-[12px] lg:px-0 px-[10px]'>{item.text}</p>
                    </div>
                )) }   
            </div>
        </div>
    </div>
  )
}

export default About