import React, { useEffect, useState } from 'react'
import NavbarBackConsultation from '../../components/Consultation/NavbarBackConsultation'
import axios from 'axios';

const History = () => {
  const [transaction, setTransaction] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTransaction = async()   => {
      try {
        const response = await axios.get('http://localhost:8000/api/user/transaction', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setTransaction(response.data.transaction);
      } catch (error) {
        console.error(error);
      }
    }

    fetchTransaction();
  }, [token]);

  return (
    <div>
        <NavbarBackConsultation/>
        <div className="pt-28 pb-16 lg:px-12 px-6">
          <h1 className='font-poppins text-[20px] lg:text-[28px]'>Appoinment History</h1>
          <div className="flex flex-col gap-4 lg:mt-10 mt-6">
            {transaction.map((transactions) => (
              <div className="bg-[#f0f0f0] flex lg:flex-row flex-col lg:gap-0 gap-8 justify-center lg:justify-between items-center px-8 h-auto rounded-lg py-6 w-full" key={transactions.id}>
                <div className="flex justify-center lg:justify-start gap-5 items-center">
                  <img src={`http://localhost:8000/storage/${transactions.doctor_image}`} className='lg:w-[70px] w-[50px] lg:h-[70px] h-[50px] rounded-full' alt="" />
                  <div className="flex flex-col gap-1">
                    <h1 className='lg:text-[20px] text-[14px] font-poppins1 text-black'>{transactions.doctor_name}</h1>
                    <p className='lg:text-[14px] text-[12px] font-poppins2 text-[#595757]'>{transactions.doctor_specialist}</p>
                  </div>
                </div>
                <div className="flex justify-end gap-8 items-center">
                  <a href={`https://wa.me/${transactions.doctor?.no_phone}`} target='_blank'><i className={`bx bxs-message-rounded-detail text-[40px] text-purple ${transactions.doctor_id === null ? 'hidden' : ''}`}></i></a>
                  <p className={`font-poppins lg:px-8 px-4 lg:py-3 py-2 lg:w-auto w-[120px] mx-auto rounded-md text-[12px] lg:text-[18px] ${transactions.status === 'pending' ? 'bg-[#FFF3E2] text-[#FF9500]' : 'bg-[#93ECB3] text-[#255938]'}`}>{transactions.status === 'accepted' ? 'Consul Again' : transactions.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
    </div>
  )
}

export default History