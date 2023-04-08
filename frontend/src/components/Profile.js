import React, { useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode';
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios';
import './profile.css';
import UserNavbar from './UserNavbar';
const Profile = () => {
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

  const getUsersById = async() => {
    const response = await axiosJWT.get(`http://localhost:5000/users/${id}`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
    });
    setRoom(response.data);
    console.log(response.data);
  }

  
  const Logout = async() =>{
    try {
      await axios.delete('http://localhost:5000/logout');
      history('/login');

    } catch (error) {
      console.log(error);  
    }
  }
  return (


    <div className='main-body'>

    {/* <Navbar/> */}
    <UserNavbar/>
    {/* <section className='profile_section'> */}
    <div className='at-left'>
    <div className='box-prof'>
        <label className='p1'>Profile</label>
    </div>
    <div className='box-prof'>
        <label className='p1'><Link to='/addroom' className='add-det' >Add Room Details</Link></label>
    </div>
    <div className='box-prof'>
        <label className='p1'><Link to='/showroobyid' className='add-det' >Show Room Details</Link></label>
    </div>
    <div className='box-prof1'>
        <label className='p1' onClick={Logout}>Logout</label>
    </div>
    
    

    </div>
    <div className='at-right'>
        {/* <div className='inside-left'>

        </div> */}
        <div className='inside-right'>
            <h1 style={{marginLeft:"75px"}}><b>User Detail</b></h1>
            <label>UserID: {id}</label>
            <label>First name: {name}</label>
            <label style={{marginTop:"8px"}}>Last name: {lname}</label>
            <label style={{marginTop:"8px"}}>Email:{email}</label>
            <label style={{marginTop:"8px"}}>Role:{role}</label>            
        </div>
    </div>

    {/* </section> */}
        

    </div>
  )
}

export default Profile