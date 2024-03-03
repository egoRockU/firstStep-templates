import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import validator from 'validator';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import logo from '../images/logo.png'
import '../Fonts.css'
import BgImage from '../images/signBg.jpg'
import google from '../images/google.png'
import Newnavbar from '../Components/Newnavbar';

function Register() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [inputs, setInputs] = useState([])
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

  useEffect(() => {
    setInputs({'email': email, 'password': password})
  }, [email, password])


  const bgStyle = {
      background: `url(${BgImage}) center/cover no-repeat`,
      height: '100vh',
      fontFamily: 'Montserrat, sans-serif',
    };


  const handleRegister = (e) => {
    e.preventDefault()
    
    if (email !== confirmEmail && email){
      alert ('Email do not match!')
    }
    if (password !== confirmPassword && password){
      alert ('Passwords do not match!')
    }
    if (!email){
      alert ('Please enter an email')
    }
    if (!password){
      alert ('Please enter a password')
    }

    if (validator.isEmail(email)){
      axios.post('/api/localaccounts/create', inputs, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((res)=>{
        alert('Account has been successfully created.')
        navigate('/login')
      }).catch((err)=>{
        if (err.response.data.emailExist){
          alert(err.response.data.error)
        }
        console.log(err.response.data.error)
      })
    } else {
      alert('Email must be a valid email address')
    }
  }

  const handleGoogleRegister = async(credentialResponse) => {
    let credential = jwtDecode(credentialResponse.credential)
    const googleInputs = {
      'email': credential.email,
      'sub': credential.sub
    }

    axios.post('/api/googleaccounts/create', googleInputs, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((res)=>{
      alert('Account has been successfully created.')
      navigate('/login')
    }).catch((err)=>{
      if (err.response.data.emailExist){
        alert(err.response.data.error)
      }
      console.log(err.response.data.error)
    })
  }

    // const [agreeTerms, setAgreeTerms] = useState(false);
    // const handleClick = () => {
    //   if (agreeTerms) {
    //     navigate("/");
    //   } else {
    //     alert("Please agree to the terms and conditions.");
    //   }
    // };

    const clickLogin = () => {
      navigate("/login");
    };

  return (
    <>
      <div style={bgStyle} className='flex flex-col space-y-24'>
        <div>
        <Newnavbar/>
        </div>
        <div className="flex flex-col items-center mt-8 bg-white bg-opacity-75 w-1/3 mx-auto h-4/6">
          <div className='w-full mt-5 mb-2 flex justify-center items-center'>
            <h1 className="text-5xl font-medium mb-5">Create Account</h1>
          </div>
        <form className='w-full mb-4'>
        <div className='flex flex-col w-full h-1/2 mt-5 space-y-6 items-center '>
            <input
            style={{
                backgroundColor:'transparent',
                fontFamily:'Montserrat, sans-serif',
                border:'2px solid black',
              }}
              type="email"
              placeholder="Email"
              className="w-1/2 p-2 border rounded-md custom-input placeholder-black font-semibold"
              onChange={(e)=>setEmail(e.target.value)}
            />
            <input
            style={{
                backgroundColor:'transparent',
                fontFamily:'Montserrat, sans-serif',
                border:'2px solid black',
              }}
              type="email"
              placeholder="Confirm Email"
              className="w-1/2 p-2 border rounded-md custom-input font-semibold placeholder-black"
              onChange={(e)=>setConfirmEmail(e.target.value)}
            />
            <input
            style={{
                backgroundColor:'transparent',
                fontFamily:'Montserrat, sans-serif',
                border:'2px solid black',
              }}
              type="password"
              placeholder="Password"
              className="w-1/2 p-2 mb-4 border rounded-md custom-input font-semibold placeholder-black"
              onChange={(e)=>setPassword(e.target.value)}
            />
            <input
            style={{
                backgroundColor:'transparent',
                fontFamily:'Montserrat, sans-serif',
                border:'2px solid black',
              }}
              type="password"
              placeholder="Confirm Password"
              className="w-1/2 p-2 border rounded-md custom-input font-semibold placeholder-black"
              onChange={(e)=>setConfirmPassword(e.target.value)}
            />
            <button type="submit" className='w-32 text-stone-500 rounded-full bg-white p-2 hover:text-red-500' onClick={handleRegister}>
              Register
            </button>
        </div>
        </form>
        <div className='w-full space-y-4 flex flex-col items-center'>
          {/*
          <div className="form-group">
          <label>
          <input
          type="checkbox"
          onChange={(e) => setAgreeTerms(e.target.checked)}
          checked={agreeTerms}
          />{" "}
          I agree to the terms and conditions
          </label>
          </div>
          */}
          <h1 className='text-lg font-medium'>or</h1>
          <GoogleOAuthProvider clientId={googleClientId}>
            <GoogleLogin
              onSuccess={handleGoogleRegister}
              type="buttton"
              size="medium"
              text="signup_with"
              shape='pill'
              logo_alignment='center'
            />
          </GoogleOAuthProvider>
          <div className='cursor-pointer mt-4' onClick={clickLogin}>
          <h1>Already have an Account?</h1>
        </div>
        </div>
        </div>
      </div>
    </>
    )
}

export default Register