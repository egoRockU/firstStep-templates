import React from 'react'
import logo from '../images/logo.png'
import { useNavigate } from 'react-router-dom'

function Newnavbar() {
  const Navigate = useNavigate();

  const clickLanding = () => {
    Navigate("/");
  };
  return (
    <div className='flex justify-between w-full p-5 bg-transparent'>
        <div className='flex items-center cursor-pointer' onClick={clickLanding}>
            <img src={logo} alt="logo" className='w-16 h-16 hover:scale-125' />
            <h1 className='text-2xl text-white'>FirstStep</h1>
        </div>
    <div className='flex w-full'>
        <ul className='flex items-center w-full justify-end space-x-6 lg:space-x-12'>
            <li className='text-lg md:text-xl text-white cursor-pointer'>Jobs</li>
            <li className='text-lg md:text-xl text-white cursor-pointer'>Portfolio Builder</li>
            <li className='text-lg md:text-xl text-white cursor-pointer'>Find Talents</li>
            <li className='text-lg md:text-xl text-white cursor-pointer'>Resume Builder</li>
        </ul>
    </div>  

    </div>
  )
}

export default Newnavbar