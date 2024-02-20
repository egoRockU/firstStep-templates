import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png'
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../slices/userSlice';

function Navbar() {
  const navigate = useNavigate();
  const { user } = useSelector((state)=>state.user)
  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false);


  const clickLogin = () => {
    navigate("/login");
  };

  const clickLogout = () => {
    dispatch(logoutUser())
    navigate('/')
  }

  const clicklanding = () => {
    navigate("/")
  }

  const clickRegister = () => {
    navigate("/register");
  };

  // const clickProfile = () => {
  //   navigate('/choose')
  // }

  return (
    <nav className='p-3 bg-white bg-opacity-75 flex justify-between'>
      <div className="flex justify-between items-center">
        <button
          className="block lg:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
      <div className='w-full'>
        <img src={logo} alt="logo" className='h-12 transition-transform hover:scale-125' onClick={clicklanding}/>
      </div>
      </div>
      <div className='flex justify-end w-full space-x-4'>
      <ul className={`lg:flex lg:items-center  ${isOpen ? 'block' : 'hidden'}`}>
        <li className='my-6 lg:my-0 lg:mx-4 text-xl hover:text-stone-400'>Resume Builder</li>
        <li className='my-6 lg:my-0 lg:mx-4 text-xl hover:text-stone-400'>Portfolio Builder</li>
        <li className='my-6 lg:my-0 lg:mx-4 text-xl hover:text-stone-400'>About us</li>
        <li className='my-6 lg:my-0 lg:mx-4 text-xl hover:text-stone-400'>Employees</li>
      </ul>
        {/* {!user ? 
            <div className='flex'>
              <button className='bg-[#CB8A8A] text-white duration-500 px-3 py-2 mx-2 rounded-lg' onClick={clickLogin}>Login</button>
              <button className='text-[#CB8A8A] bg-white duration-500 px-3 py-2 mx-2 rounded-lg' onClick={clickRegister}>Register</button>
            </div> 
            : 
            <div className='flex'>
            <button className='bg-[#CB8A8A] text-white duration-500 px-3 py-2 mx-2 rounded-lg' onClick={clickLogout}>Logout</button>
            <button className='text-[#CB8A8A] bg-white duration-500 px-3 py-2 mx-2 rounded-lg' onClick={clickProfile}>Profile</button>
          </div>
        } */}
          <div className='flex'>
            <button className='bg-[#CB8A8A] text-white duration-500 px-3 py-2 mx-2 rounded-lg' onClick={clickLogin}>Login</button>
          </div> 
        </div>
    </nav>
  );
}

export default Navbar;