import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import {assets} from '../../assets/assets'

const AllAppointments = () => {
  const {aToken,appointments,getAllAppointments,cancelAppointment}=useContext(AdminContext)
  const {slotDateFormat,currency}=useContext(AppContext)

  useEffect(()=>{
    if(aToken){
      getAllAppointments()
    }
  },[aToken])
  return (
    <div className='w-full m-5 max-w-5xl'>
      <p className='font-medium text-lg mb-4'>All Appointments</p>
      <div className='border border-gray-200 rounded text-sm overflow-y-scroll bg-white max-h-[75vh] min-h-[60vh]'>
        <div className='sm:grid grid-cols-[0.5fr_3fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b border-gray-300'>
          <p>#</p>
          <p>Patient</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {appointments.map((item,index)=>(
          <div key={index}>
            
            <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b border-gray-200'>
              <p className='max-sm:hidden'>{index+1}</p>
              <div className='flex items-center gap-2'>
                <img className='w-8' src={item.userData.image} alt="" />
                <p>{item.userData.name}</p>
              </div>
              <p>{item.slotTime}, {slotDateFormat(item.slotDate)}</p>
              <div className='flex items-center gap-2'>
                
                <p>{item.docData.name}</p>
              </div>
              <p>{currency}{item.amount}</p>
              {
                item.cancelled
                ? <p className='text-red-400 text-xs'>Cancelled</p>
                : item.isCompleted
                  ? <p className='text-green-500 text-xs font-medium'>Completed</p>
                  : <img onClick={()=>cancelAppointment(item._id)} className='w-9 cursor-pointer' src={assets.cancel_icon} alt="" />
              }
              
            </div>
            
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllAppointments
