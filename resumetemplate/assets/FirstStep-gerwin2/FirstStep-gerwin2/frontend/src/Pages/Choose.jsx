import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';
import BgImage from '../images/signBg.jpg';
import job from '../images/job.png';
import talent from '../images/talent.png';
import Navbar from '../Components/Navbar';
import NavbarLoggedIn from '../Components/NavbarLoggedIn';

function Choose() {
  
  const bgStyle = {
    background: `url(${BgImage}) center/cover no-repeat`,
    height: '100vh',
    fontFamily: 'Montserrat, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const navigate = useNavigate();

  const clickapplicant = () => {
    navigate("/create");
  }

  return (
    <>
      <div style={bgStyle}>
        <div style={{ position: 'absolute', top: '0', left: '0', right: '0', zIndex: '100' }}>
          <NavbarLoggedIn />
        </div>
        <div className='w-1/2 h-4/6 flex flex-col items-center text-center bg-white bg-opacity-60'>
          <h1 className='text-5xl text-black mb-2 mt-5'>Create Account</h1>
          <p className='text-lg font-medium mb-2'>I am an...</p>
          <div className='w-3/4 h-3/4 flex justify-center items-center space-x-20'>
            <div style={{ backgroundImage: `url(${job})`, backgroundSize: 'cover', height: '100%', display:'flex', justifyContent:'center', alignItems:'center'}} className='w-1/2 text-center  hover:w-3/4 hover:h-auto transition-all duration-300'>
              <div className='text-3xl text-white' onClick={clickapplicant}>
                Applicant
              </div>
            </div>
            <div style={{ backgroundImage: `url(${talent})`, backgroundSize: 'cover', height: '100%', display:'flex', justifyContent:'center', alignItems:'center' }} className='w-1/2 text-center  hover:w-3/4 hover:h-auto transition-all duration-300'>
              <div className='text-3xl text-white' >Employer</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Choose;
