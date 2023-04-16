import React, { useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode';
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios';

const Bookedroom = () => {
  const [id, setID] = useState('');
  const [room, setRoom] = useState([]);
  const [name, setName] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [role, setRole] = useState('');
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
  const history = useNavigate();
  


  useEffect(() => {
    getBookedRoomById();
    refreshToken();
    
  },[]);
  const refreshToken = async() => {
    try {
      const response = await axios.get('http://localhost:5000/token');
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setID(decoded.userId);
      setName(decoded.fname);
      setLname(decoded.lname);
      setEmail(decoded.email);
      setContact(decoded.contact);
      setRole(decoded.role);
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
      setLname(decoded.lname);
      setEmail(decoded.email);
      setContact(decoded.contact);
      setRole(decoded.role);
      setExpire(decoded.exp);
    }
    return config;
  }, (error) =>{
    return Promise.reject(error);
  });

  const getBookedRoomById = async() => {
    const response = await axiosJWT.get(`http://localhost:5000/book/${id}`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
    });
    console.log(response.data);
    
  }





  return (
    <><button onClick={getBookedRoomById()}>Click</button></>
    
  )
}

export default Bookedroom