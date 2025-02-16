import React from 'react'
import Pics from '/image/hero.png';
import consultation from '/image/consultation.png'
import { Link } from 'react-router-dom';
import Boarding from '../Boarding';
import moodDetection from '/image/mood-detection.png'

const Hero = () => {
  return (
    <div className='lg:pb-14 pb-0'>
      <div className='relative z-50'>
        <Boarding/>
      </div>
      <div className='pt-[25%] h-[100vh] lg:px-[55px] lg:pt-[3%] flex justify-around items-center lg:flex-row flex-col-reverse relative' data-aos="fade-up" data-aos-duration="800">
          <div className='flex flex-col lg:space-y-5 space-y-2 lg:items-start items-center'>
              <h1 className='font-poppins lg:text-[60px] text-[35px] lg:mt-0 mt-5'>SatyGuard</h1>
              <p className='lg:w-[550px] w-full lg:text-left text-center lg:px-0 px-[30px] lg:text-[17px] text-[13px] lg:pb-[50px] pb-[40px] font-poppins1'>Experience peace of mind at all times with Satyguard. An app specially designed to protect women and girls from harm. With one touch, help is on the way. Dont let fear stand in your way, Satyguard is always ready to keep you safe.
              </p>
              <Link to="/Information"><button className='bg-purple text-white font-poppins1 text-[15px] px-[45px] py-[15px] rounded-full cursor-pointer
              hover:border-purple hover:bg-white border-2 hover:text-purple duration-300 hover:opacity-[80%] transition-all'>Get Started</button></Link>
          </div>
          <img src={Pics} alt="" className='lg:w-[450px] h-auto w-[230px]'/>
      </div>
      <div className="flex justify-center items-center overflow-hidden">
        <Link to='/Mood-Detection' className='' data-aos="fade-up" data-aos-duration="800">
          <div className='hover:scale-[95%] hover:opacity-80 duration-500 transition-all h-full cursor-pointer lg:w-full w-[550px] lg:mt-0 mt-12 lg:mb-0 mb-8'>
            <img src={moodDetection} alt="" className='w-full animate-move'/>
          </div>
        </Link>
      </div>
      <div className="flex lg:flex-row flex-col-reverse justify-center gap-8 items-center" data-aos="fade-up" data-aos-duration="800">
        <div className="flex flex-col gap-12 lg:items-start items-center">
          <h1 className='font-poppins text-[18px] lg:text-[40px] w-auto lg:text-start text-center lg:px-0 px-8 lg:w-[500px]'>Are you having a bad day? A dedicated doctor you can trust</h1>
          <Link to='/Consultation'>
            <button className='font-poppins1 text-white bg-purple flex justify-center items-center px-8 py-3 hover:bg-white transition-all duration-300 hover:text-purple border-2 border-purple rounded-full gap-3 lg:text-[16px] text-[12px]'>
              <i className='bx bx-chat text-[16px] lg:text-[24px]'></i>
              Book an appointment
            </button>
          </Link>
        </div>
        <img src={consultation} alt="" className='lg:w-[500px] w-[260px] h-auto' />
      </div>
    </div>
  )
}

export default Hero