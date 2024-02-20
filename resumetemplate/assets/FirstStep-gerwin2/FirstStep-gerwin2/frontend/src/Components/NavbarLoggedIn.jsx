import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';
import { BsBell, BsPerson } from 'react-icons/bs'; // Import icons for notification and profile
import { useDispatch } from 'react-redux';
import { logoutUser } from '../slices/userSlice';

function NavbarLoggedIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  let userObj = JSON.parse(localStorage.getItem('user'))

  const clickLanding = () => {
    navigate("/");
  };

  const clickLogout = () => {
    dispatch(logoutUser())
    navigate('/')
  }

  const clickProfile = () => {
    let userAccountType = userObj.profileType
    let userAccountId = userObj.profileId

    if (userAccountId && userAccountType) {
      navigate('/editprofile')
    } else {
      navigate('/choose')
    }
  }

  return (
    <nav className='p-1 bg-blue-300'>
      <div className='flex w-full'>
     <div className='flex items-center sm:w-1/2 lg:w-full' onClick={clickLanding}>
      <img src={logo} alt="" className='w-12 h-12 hover:scale-125' />
      <h1 className='text-xl'>FirstStep</h1>
     </div>
     <div className='w-full flex justify-around'>
      <ul className='flex h-full items-center space-x-10'>
        <li className='text-lg font-medium'>Resume Builder</li>
        <li className='text-lg font-medium'>Portfolio Builder</li>
      </ul>
      <div className='flex items-center space-x-5'>
        {/* Notification icon */}
        <BsBell className="text-black duration-500 mx-2 cursor-pointer text-3xl" />
        {/* Profile icon */}
        <BsPerson className="text-black duration-500 mx-2 cursor-pointer text-3xl" onClick={clickProfile}/>

        {/* Logout button */}
        <button className='bg-[#CB8A8A] text-white duration-500 px-3 py-2 mx-2 rounded-lg' onClick={clickLogout}>Logout</button>
      </div>
     </div>
     </div>
    </nav>
  );
}

export default NavbarLoggedIn;
