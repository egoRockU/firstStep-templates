import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import '../Fonts.css'
import Navbar from '../Components/Navbar';
import BgImage from '../images/hero1bg.png';
import logo from '../images/logo.png';
import lady from '../images/herolady.png';
import men from '../images/hero2menwhite.png';
import group from '../images/hero2nig.png';
import tommy from '../images/tommy.png';
import resume from '../images/resume.png'
import portfolio from '../images/portfolio.png'
import applicants from '../images/applicants.png'
import say from '../images/say.png'
import Footer from '../Components/Footer';
import NavbarLoggedIn from '../Components/NavbarLoggedIn';


function Landing() {

  const {user} = useSelector((state)=>state.user)

  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdown((prevIndex) => (prevIndex === index ? null : index));
  };


  const landingStyle = {
    background: `url(${BgImage}) center/cover no-repeat`,
    height: '100vh',
    fontFamily: 'Montserrat, sans-serif',
  };
  

  return (
    <>

  {/* first section */}
      <div style={landingStyle}>
        {user ? <NavbarLoggedIn/> : <Navbar />}
        <div className="flex justify-end  mr-32">
          <div className="w-1/2 mt-40 mr-5">
            <div className='flex items-center justify-center mr-20'>
              <img src={logo} alt="logo" />
              <h1 className='text-8xl font-medium'>FirstStep</h1>
            </div>
            <div className='flex flex-col items-center'>
              <p className='text-2xl'>Craft Your Tomorrow, Shape Your Dreams - Explore the Future with Us!</p>
              <button style={{ backgroundColor: '#CB8A8A' }} className='mt-5 w-34 h-11 px-5 text-lg text-white rounded-lg hover:text-stone-500'>Join Today</button>
            </div>
          </div>
        </div>
      </div>

      {/* Second section */}
      <div className="py-20 bg-[#282727]">
        <div className="container mx-auto flex justify-center items-center">

          <div className="grid grid-cols-2 gap-8">
            <div className="relative bg-gray-700 rounded-md overflow-hidden" style={{ width: '250px', height: '300px' }}>
              <img src={lady} alt="Image 1" className="object-cover w-full h-full" />
            </div>
            <div className="relative bg-gray-700 rounded-md overflow-hidden" style={{ width: '300px', height: '180px ', top:'100px', right:'50px' }}>
              <img src={men} alt="Image 2" className="object-cover w-full h-full" />
            </div>
            <div className="relative bg-gray-700 rounded-md overflow-hidden" style={{ width: '300px', height: '180px' }}>
              <img src={group} alt="Image 3" className="object-cover w-full h-full" />
            </div>
            <div className="relative bg-gray-700 rounded-md overflow-hidden" style={{ width: '180px', height: '250px' }}>
              <img src={tommy} alt="Image 4" className="object-cover w-full h-full" />
            </div>
          </div>

            <div className="w-1/2 space-y-10 ml-8 flex flex-col justify-center items-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              <h1 className="text-4xl font-semibold mb-4 text-white">Explore Potential Hires Today!</h1>
              <p className="text-xl mb-4 text-white leading-loose">
                Explore a hub of top-tier talent, meticulously showcased in diverse portfolios. Simplify your hiring journey by
                connecting effortlessly with standout applicants ready to elevate your team.Your next exceptional hire is just a 
                click away – discover, connect, and transform your workforce with ease.</p>
              <button style={{ backgroundColor: '#CB8A8A' }} className="w-36 h-12 text-lg text-white rounded-lg hover:text-stone-500">Join Today</button>            </div>
          </div>
      </div>

      {/* Third section */}
      <div className='h-screen'>
        <div className='container mx-auto mt-12  h-5/6'>
          <h1 className='text-5xl font-bold mb-4'>Nemo ipsim enim</h1>
          <p className='text-xl font-semibold mb-4'>nemo ipsim niram</p>

          <div className="flex justify-center space-x-4 h-3/4">
          <div className="w-1/4 h-full bg-cover bg-center relative hover:w-1/3 hover:h-auto transition-all duration-300" style={{ backgroundImage: `url(${resume})` }}>
          <h1 className='text-4xl text-white mt-6 ml-6'>Resume</h1>
          </div>

            <div className="w-1/4 h-full bg-cover bg-center relative hover:w-1/3 hover:h-auto transition-all duration-300" style={{ backgroundImage: `url(${portfolio})` }}>
              <h1 className='text-4xl text-white mt-4 ml-6'>Portfolio</h1>
            </div>
            <div className="w-1/4 h-full bg-cover bg-center relative hover:w-1/3 hover:h-auto transition-all duration-300" style={{ backgroundImage: `url(${applicants})` }}>
              <h1 className='text-4xl text-white mt-4 ml-6'>Applicants</h1>
            </div>
          </div>
        </div>
      </div>

      {/* fourth section */}
      <div className="main-container flex w-3/5 mx-auto space-x-40">
        <div className="text-container flex-grow p-4 items-center text-center space-y-7">
          <h1 className="text-4xl font-bold">Say Goodbye To Unemployment</h1>
          <h4 className="text-xl font-semibold">Nemo enim ipsam</h4>
          <p className="text-gray-600">Consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
          Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam.</p>
          <button className="border border-blue-400 text-blue-400 px-4 py-2 mt-4 rounded-lg hover:bg-blue-100">Learn More</button>
        </div>
        <div className="image-container flex-none w-2/5">
          <img src={say} alt="Image Alt Text" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Fifth section */}
      <div className="space-y-16 w-3/5 mx-auto flex flex-col mt-40 ">
        <h1 className="text-4xl font-bold">FAQ</h1>
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className="relative flex">
            <div className="flex items-center">
              <p className="text-2xl font-semibold">Nemo enim ipsam</p>
            </div>
            <div
              className={`${
                openDropdown === index ? 'block' : 'hidden'
              } absolute mt-10 space-y-2 bg-white border border-gray-200 rounded-md shadow-md`}
            >
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt obcaecati atque autem est voluptate iusto tenetur iure veritatis alias ipsam?</p>
            </div>
            <button
              onClick={() => toggleDropdown(index)}
              className="cursor-pointer text-2xl font-semibold focus:outline-none ml-auto"
            >
              !
            </button>
          </div>
        ))}
      </div>
      
      <Footer/>
    </>
  );
}

export default Landing;
