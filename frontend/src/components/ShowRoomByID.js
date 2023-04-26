import React, { useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode';
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios';
import './profile.css';
import UserNavbar from './UserNavbar';
const ShowRoomByID = () => {
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
    getUsersById();
    refreshToken();
    getRoom();
    
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
    try {
      const response = await axiosJWT.get(`http://localhost:5000/iduser/${id}`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
    });
    setRoom(response.data);
      
    } catch (error) {
      console.log(error);
      
    }
    
    
  }
  const getRoom = async () => {
    try {
      const response = await axios.get("http://localhost:5000/rooms");
      setRoom(response.data);
      
    } catch (error) {
      console.log(error);
    }
    
  };

  const deleteProduct = async (roomId) => {
    try {
      await axios.delete(`http://localhost:5000/rooms/${roomId}`);
      getUsersById();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <div className='usershowroom_body' style={{backgroundColor:"#F7F7F7", paddingBottom:"20px"}}>    
        <h1 style={{fontSize:"26px", marginLeft:"55px"}}>Rooms</h1>
        {role === "Landlord"?<button onClick={getUsersById()} className='getroom_btn' style={{height:"40px", border:"none", marginTop:"5px"} }>Get Room</button>:<button onClick={getRoom()} className='getroom_btn' style={{height:"40px", border:"none", marginTop:"5px"} }>Get Room</button>}
        
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
                  <p className="title is-6">RoomID:{room.id}</p>
                    <p className="title is-6">Location:{room.location}</p>
                    <p className="title is-6">Contact:{room.contact}</p>
                    <p className="title is-6">UserID:{room.userid}</p>
                  </div>
                </div>
              </div>
              {role === "Landlord"?
              <footer className="card-footer">
                 <Link to={`edit/${room.id}`} className="card-footer-item">
                  Edit
                </Link> 
                <a
                onClick={()=> deleteProduct(room.id)}
                className='card-footer-item'
                >Delete</a>
                
              </footer>
              :<footer className="card-footer">
                
                <button style={{alignItems:"center",justifyContent:"center",display:"flex",marginLeft:"70px",background:'#38d39f',width:"140px",border:"none",marginBottom:"8px",marginTop:"4px",height:"35px"}}>
                <Link to={`find/${room.id}`} style={{color:"white",fontSize:"15px"}}>Book</Link>
  
                </button>
                
              </footer>}
            </div>
          </div>
        ))}
      </div>
    </div>
        </div>
        </>
  )
}

export default ShowRoomByID