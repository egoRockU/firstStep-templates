import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import validator from 'validator'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import logo from '../images/logo.png'
import '../Fonts.css'
import BgImage from '../images/signBg.jpg'
import google from '../images/google.png'
import Newnavbar from '../Components/Newnavbar'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, loginGoogle } from '../slices/userSlice';


function Login() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [inputs, setInputs] = useState([])
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

  const dispatch = useDispatch()
  const {loading, error} = useSelector((state)=>state.user)

  useEffect(() => {
    setInputs({'email': email, 'password': password})
  }, [email, password])

  const bgStyle = {
    background: `url(${BgImage}) center/cover no-repeat`,
    height: '100vh',
    fontFamily: 'Montserrat, sans-serif',
  };

  const login = (e) => {
    e.preventDefault()
    if (validator.isEmail(email)){
      dispatch(loginUser(inputs))
      .then((res)=> {
        if (res.error){
          alert(res.error.message)
        } else {
          navigate('/')
        }
      })
    } else {
      alert('Email must be a valid email address')
    }

  };

  const handleGoogleLogin = (credentialResponse) => {
    let credential = jwtDecode(credentialResponse.credential)
    const googleInputs = {
      'email': credential.email,
      'sub': credential.sub
    }
    dispatch(loginGoogle(googleInputs)).then((result)=>{
      if (result.error){
        navigate('/register')
      }
    })
    navigate('/')
  }

  const clickRegister = () => {
    navigate("/register");
  };
  return (

    <>
    <div style={bgStyle} className='flex flex-col space-y-20'>
      <div>
      <Newnavbar/>
      </div>
      <div className="flex flex-col bg-white bg-opacity-75 w-1/3 mx-auto h-4/6">
        <div className='py-4 w-full mt-5 mb-2 flex justify-center items-center'>
          <h1 className="text-5xl font-medium mb-5">Welcome back!</h1>
        </div>
        <form>
        <div className='flex flex-col w-full h-1/2 mt-5 space-y-3 items-center p-4'>
          <input
          style={{
            backgroundColor:'transparent',
            fontFamily:'Montserrat, sans-serif',
            border:'2px solid black',
          }}
            type="email"
            placeholder="Email"
            className="w-1/2 p-2 mb-4 border rounded-md custom-input placeholder-black font-semibold"
            onChange={(e) =>setEmail(e.target.value)}
            required
          />
          <input
            style={{
              backgroundColor:'transparent',
              fontFamily:'Montserrat, sans-serif',
              border:'2px solid black',
            }}
            type="password"
            placeholder="Password"
            className="w-1/2 p-2 mb-4 border rounded-md custom-input placeholder-black font-semibold"
            onChange={(e) =>setPassword(e.target.value)}
            required
          />
          <div>
          <button type="button" className='w-46 mt-5 text-stone-500 rounded-full bg-transparent p-2'>Forgot Password?</button>
        </div>
        <button style={{backgroundColor:'#FFA1A1'}} 
          className="w-32 text-stone-500 p-2 rounded-full hover:text-white hover:bg-red-500 transition-colors duration-300"
          type='submit'
          onClick={login}
          >
            Log In
          </button>
          </div>
        </form>
        <div className='flex flex-col h-1/2 w-full space-y-3 items-center'>
          <h1 className='text-lg'>OR</h1>
          <GoogleOAuthProvider clientId={googleClientId}>
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              type="buttton"
              size="medium"
              text="signin_with"
              shape='pill'
            />
          </GoogleOAuthProvider>
          <div className='cursor-pointer mt-4' onClick={clickRegister}>
          <h1>Need to Register?</h1>
        </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default Login