import React from 'react'
import logo from '/image/logo/logo.png'

const NavbarBackConsultation = () => {
  return (
    <div className='w-full bg-white flex justify-between h-[11vh] lg:h-[14vh] items-center lg:px-[30px] px-6 fixed'>
        <a href='/Consultation' className="flex justify-center gap-1 cursor-pointer items-center">
            <i className='bx bx-chevron-left text-[24px] lg:text-[36px]'></i>
            <h1 className='font-poppins text-[18px] lg:text-[22px]'>Back</h1>
        </a>
        <img src={logo} alt="" className='lg:w-[60px] w-[40px] h-auto' />
    </div>
  )
}

export default NavbarBackConsultation