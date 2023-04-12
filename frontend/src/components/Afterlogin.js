import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from 'jwt-decode';
import { Link,useNavigate } from 'react-router-dom'
const Afterlogin = () => {
    const [room, setRoom] = useState([]);
    const [id, setID] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');

    useEffect(() => {
        refreshToken();
        getRoomById();
      }, []);
      const refreshToken = async() => {
        try {
          const response = await axios.get('http://localhost:5000/token');
          setToken(response.data.accessToken);
          const decoded = jwt_decode(response.data.accessToken);
          setID(decoded.userId);
          setExpire(decoded.exp);
        } catch (error) {
            if(error.response){
              
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
          setExpire(decoded.exp);
        }
        return config;
      }, (error) =>{
        return Promise.reject(error);
      });

      const getRoomById=async()=>{
        const response = await axios.get(`http://localhost:5000/rooms/1`)
        console.log(response.data);
        setRoom(response.data);
      }

  return (
   <div>
    <label>{getRoomById()}</label>
   </div>
    
  )
}

export default Afterlogin