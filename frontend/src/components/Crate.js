import React, { useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode';
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios';

const Crate = () => {
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
    getCrateId();
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

  const getCrateId = async() => {
    const response = await axiosJWT.get(`http://localhost:5000/crate/${id}`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
    });
    setRoom(response.data);
    console.log(response.data);
    
  }





  return (
    <div className='container mt -5'>
    <h1>Booked Info</h1>
    <button onClick={getCrateId}>Get Booked Room</button>
    <table className='table is-striped is-fullwidth'>
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Location</th>
          <th>Price</th>
          <th>Service</th>
          <th>Contact</th>
          <th>BoookedUserID</th>
          <th>RoomID</th>
        </tr>
      </thead>
      <tbody>
        {room.map((rooms,index)=>(
          <tr key={rooms.id}>
            <td>{index+1}</td>
            <td>{rooms.name}</td>
            <td>{rooms.location}</td>
            <td>{rooms.price}</td>
            <td>{rooms.service}</td>
            <td>{rooms.contact}</td>
            <td>{rooms.buserid}</td>
            <td>{rooms.roomid}</td>

          </tr>
        ))}
      </tbody>
    </table>
    </div>
    
  )
}

export default Crate