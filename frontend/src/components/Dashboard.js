import React, { useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import UserNavbar from './UserNavbar';
import './Dashboard.css'
import Hero from './Hero';
import Afterlogin from './Afterlogin';
import ShowRoomByID from './ShowRoomByID';
import Contact from './Contact';
import Footer from './Footer';
import About from './About';
import UserHero from './Userhero';



const Dashboard = () => {

  const [name, setName] = useState('');
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
  const history = useNavigate();


  useEffect(() => {
    refreshToken();
  },[]);
  const refreshToken = async() => {
    try {
      const response = await axios.get('http://localhost:5000/token');
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setName(decoded.fname);
      setExpire(decoded.exp);
    } catch (error) {
        if(error.response){
          history("/");
        }
    }
  }

  const axiosJWT = axios.create();


  axiosJWT.interceptors.request.use(async(config) =>{
    const currentDate = new Date();
    if(expire * 1000 < currentDate.getTime()){
      const response = await axios.get('http://localhost:5000/token');
      config.headers.Authorization = `Bearer ${response.data.accessToken}`;
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setName(decoded.fname);
      setExpire(decoded.exp);
    }
    return config;
  }, (error) =>{
    return Promise.reject(error);
  });

  const getUsers = async() => {
    const response = await axiosJWT.get('http://localhost:5000/users',{
        headers:{
          Authorization: `Bearer ${token}`
        }
    });
    console.log(response.data);
  }
  return (
    <div>
    {/* <Navbar/> */}
    <UserNavbar/>
    <UserHero />
    <ShowRoomByID/>
    <Contact />
    <About />
    <Footer />
    </div>
  )
}

export default Dashboard