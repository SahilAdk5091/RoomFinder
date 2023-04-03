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
        const response = await axios.get(`http://localhost:5000/rooms/${2}`)
        console.log(response.data);
        setRoom(response.data);
      }

  return (
    <div className='' style={{backgroundColor:"white"}}>
        
        <h1 style={{fontSize:"26px", marginLeft:"55px"}}>Rooms</h1>
        <label>{room.userid}</label>
        <label>{id}</label>
        <div className="container mt-5">
      <div className="columns is-multiline mt-2">
        {room.map((room) => (
          <div className="column is-one-quarter" key={room.id}>
            <div className="card">
              <div className="card-image">
                <figure className="image is-4by3">
                  <img src={room.url} alt="Image" />
                </figure>
              </div>
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-6">Location:{room.location}</p>
                    <p className="title is-6">Contact:{room.contact}</p>
                    <p className="title is-6">UserID:{room.userid}</p>
                  </div>
                </div>
              </div>

              <footer className="card-footer">
              <button style={{alignItems:"center",justifyContent:"center",display:"flex",marginLeft:"70px",backgroundColor:"blue",width:"140px",border:"none",marginBottom:"8px",marginTop:"4px",height:"35px"}}>
                <Link  style={{color:"white",fontSize:"15px"}}>Book</Link>
                </button>
                
              </footer>
            </div>
          </div>
        ))}
      </div>
    </div>


        </div>
    
  )
}

export default Afterlogin