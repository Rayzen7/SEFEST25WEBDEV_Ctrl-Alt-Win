import React, { useEffect, useState } from 'react'
import NavbarBackConsultation from '../../components/Consultation/NavbarBackConsultation'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import glow from '/image/glow.svg';
import patients from '/image/doctor/icon/patients.svg'
import rating from '/image/doctor/icon/rating.svg'
import experience from '/image/doctor/icon/experience.svg'
import icon1 from '/image/doctor/icon/icon1.svg'
import icon2 from '/image/doctor/icon/icon2.svg'
import icon3 from '/image/doctor/icon/icon3.svg'
import { ToastContainer, toast } from 'react-toastify'
import Swal from 'sweetalert2'

const DoctorID = () => {
  const [doctor, setDoctor] = useState([]);
  const [user, setUser] = useState([]);
  const token = localStorage.getItem('token');
  const [payment, setPayment] = useState(false);
  const { id } = useParams();
  const [disease_complaints, setDisease] = useState('');
  const [no_phone, setPhone] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctor = async() => {
      try {
        const response = await axios.get(`http://localhost:8000/api/user/doctor/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setDoctor(response.data.doctor);
      } catch (error) {
        console.error(error);
      }
    }

    const fetchUser = async() => {
      try {
        const response = await axios.get('http://localhost:8000/api/getuser', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUser(response.data.user);
      } catch (error) {
        console.error(error);
      }
    }

    setPhone('+62');

    fetchUser();
    fetchDoctor();
  }, [token, id]);

  const rupiahFormat = (number) => {
    return new Intl.NumberFormat('id-ID').format(number);
  };

  const showPayment = () => {
    window.scrollTo({ top: 150, behavior: 'smooth' });
    setPayment(true)
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/user/transaction', {
        doctor_id: doctor.id,
        user_id: user.id,
        doctor_name: doctor.name,
        user_name: user.name,
        doctor_image: doctor.image,
        doctor_specialist: doctor.specialist,
        disease_complaints,
        no_phone,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      Swal.fire({
        icon: 'success',
        title: response.data.message,
        text: 'You will be directed to the main page',
        confirmButtonColor: '#C305FF'
      });

      setTimeout(() => {
        navigate('/Consultation')
      }, 3000);

    } catch (error) {
      toast.error(error.response.data.message, {
        theme: 'colored',
        autoClose: 2000
      });
    }
  }

  return (
    <div className='pb-10' data-aos="fade-up" data-aos-duration="800">
        <NavbarBackConsultation/>
        <div className="pt-24">
          <img src={glow} alt="" className='absolute -z-20 w-[700px] h-auto top-[15%] left-1/2 -translate-x-1/2' />
          <div className="flex flex-col justify-center items-center">
            <img src={`http://localhost:8000/storage/${doctor.image}`} alt="" className='w-[100px] h-[100px] rounded-full' />
            <div className="text-center">
              <h1 className='font-poppins1 text-[28px] pt-4'>{doctor.name}</h1>
              <p className='font-poppins2 text-[16px] pt-1'>Specialist {doctor.specialist}</p>
            </div>
            <div className="flex justify-center items-center mt-4">
              <img src={patients} className='w-[140px]' alt="" />
              <img src={experience} className='w-[140px]' alt="" />
              <img src={rating} className='w-[140px]' alt="" />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-start px-24 mt-8">
          <div className="flex flex-col justify-center items-start gap-8 w-[600px]">
            <div className="flex flex-col gap-2 justify-center items-start">
              <h1 className='font-poppins text-[26px]'>About Doctor</h1>
              <p className='font-poppins2 text-justify'>{doctor.desc}</p>
            </div>
            <div className="flex flex-col justify-center items-start gap-2">
              <h1 className='font-poppins text-[26px]'>Working Time</h1>
              <p className='font-poppins2 text-justify'>Mon - Sat (08.30 AM - 09.00 PM)</p>
            </div>
            <div className="flex flex-col justify-center items-start gap-2">
              <h1 className='font-poppins text-[26px]'>Price</h1>
              <p className='font-poppins2 text-justify'>Rp. {rupiahFormat(doctor.price)}</p>
            </div>
          </div>
          <div className="flex flex-col justify-center w-[400px] items-start gap-4">
            <h1 className='font-poppins text-[26px]'>Communication</h1>
            <div className="flex flex-col justify-center items-start gap-8">
              <div className="flex justify-center gap-4 items-center">
                <img src={icon1} alt="" />
                <div className='flex flex-col'>
                  <h1 className='font-poppins1 text-[18px]'>Video Call</h1>
                  <p className='font-poppins2 text-[#5F5F5F] text-[14px]'>See your doctor live</p>
                </div>
              </div>
              <div className="flex justify-center gap-4 items-center">
                <img src={icon2} alt="" />
                <div className='flex flex-col'>
                  <h1 className='font-poppins1 text-[18px]'>Audio Call</h1>
                  <p className='font-poppins2 text-[#5F5F5F] text-[14px]'>Call your doctor directly</p>
                </div>
              </div>
              <div className="flex justify-center gap-4 items-center">
                <img src={icon3} alt="" />
                <div className='flex flex-col'>
                  <h1 className='font-poppins1 text-[18px]'>Messaging</h1>
                  <p className='font-poppins2 text-[#5F5F5F] text-[14px]'>Chat me up</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <button 
            onClick={showPayment}
            className='font-poppins1 mt-14 text-white bg-purple flex justify-center items-center w-[300px] mx-auto px-8 py-3 hover:bg-white transition-all duration-300 hover:text-purple border-2 border-purple rounded-full gap-3 lg:text-[14px] text-[12px]'>
             <i className='bx bxl-whatsapp text-[18px] lg:text-[24px]'></i>
             Book an appointment
         </button>
        </div>
        <div className={`bg-[#00000072] w-full h-[150vh] flex justify-center items-center absolute transition-all duration-200 top-0 ${payment ? 'opacity-100 z-20' : 'opacity-0 -z-10'}`}>
          <div className="bg-white w-[500px] h-[500px] rounded-lg flex flex-col justify-start p-12 items-center">
            <div className="flex items-center w-full">
              <div className="flex-grow text-center">
                <h1 className="font-poppins text-[28px]">Payment</h1>
              </div>
              <i onClick={() => setPayment(false)} className="bx bx-x font-poppins -mt-12 -mr-4 text-[32px] cursor-pointer"></i>
            </div>
            <div className="mt-8 flex flex-col gap-5">
              <input 
                type="text" 
                required
                value={no_phone}
                onChange={(e) => setPhone(e.target.value)}
                className='bg-[#DEDEDE] font-poppins1 text-[14px] border-none outline-none w-[400px] px-6 h-[50px] rounded-lg'
                placeholder='No. Phone'
              />
              <textarea 
                type="text" 
                required
                value={disease_complaints}
                onChange={(e) => setDisease(e.target.value)}
                className='bg-[#DEDEDE] font-poppins1 text-[14px] border-none outline-none pt-4 w-[400px] px-6 h-[120px] rounded-lg'
                placeholder='Disease Complaints'
              />
            </div>
            <button onClick={handleSubmit} className='mt-16 text-white bg-purple w-full font-poppins h-[55px] cursor-pointer transition-all duration-200 hover:bg-white hover:text-purple border-2 rounded-lg'>Book</button>
          </div>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default DoctorID