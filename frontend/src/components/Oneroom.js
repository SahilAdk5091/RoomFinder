import React, {useState, useEffect} from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode';
import { useParams, useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
 

const Oneroom = () => {
    const { id } = useParams();
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [uid, setID] = useState('');
    const [room, setRoom] = useState([]);
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [service, setService] = useState('');
    const [contact, setContact] = useState('');
    const [userid, setUserId] = useState('');
    const [roomid, setRoomId] = useState('');

  const [msg, setMsg] = useState('');
  const history = useNavigate();

    useEffect(() => {
        refreshToken();
        findRoom();
      }, []);
      ///////////////////////////////////////////////////////////
      const refreshToken = async() => {
        try {
          const response = await axios.get('http://localhost:5000/token');
          setToken(response.data.accessToken);
          const decoded = jwt_decode(response.data.accessToken);
          setID(decoded.userId);
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
          setExpire(decoded.exp);
        }
        return config;
      }, (error) =>{
        return Promise.reject(error);
      });
    



    
      
    /////////////////////////////////////////////////////////////
    const findRoom = async () => {
        const response = await axios.get(`http://localhost:5000/findroom/${id}`);
        setLocation(response.data[0].location);
        setPrice(response.data[0].price);
        setService(response.data[0].service);
        setContact(response.data[0].contact);
        setUserId(response.data[0].userid);
        setRoomId(id);
        console.log(response.data);
        setRoom(response.data);
      };


    const booked = async(e) =>{
      try {
        await axios.post('http://localhost:5000/booked', {
          name:name,
          location:location,
          price:price,
          service:service,
          contact:contact,
          buserid:uid,
          roomid:roomid,
          userid:userid
        });
        toast.success("Booked Sucessfull")
        
      } catch (error) {
          if(error.response){
            setMsg(error.response.data.msg);
          }
      }
  }


  return (
    <div className='usershowroom_body'>
        <h1 style={{fontSize:"26px", marginLeft:"55px"}}>Book Your Room</h1>
        <label>{room.userid}</label>
        <div className="container mt-5">
      <div className="columns is-multiline mt-2">
        {room.map((room) => (
            <div className='' style={{width:"100%",height:"500px",marginLeft:"10px",display:"flex"}}>
            <img src={room.url} alt="Image" className='' style={{width:'500px',height:'400px',border:'8px solid green'}} />
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",alignContent:"center",width:"100%",flexDirection:"column"}}> 
            <h1 style={{fontWeight:"bold",padding:"0px 40px 5px 40px",fontSize:"23px"}}>This room belongs to {room.name}. It is located in {room.location}.The price of the room is {room.price}.Services this room have is {room.service}. </h1>
            <p className='linep' style={{width:"90%"}}></p>
            <h1 style={{fontSize:"22px",marginLeft:"-490px"}}>RoomID:{room.id}</h1> 
            <h1  style={{fontSize:"22px",marginLeft:"-505px"}}>UserID:{room.userid}</h1>
            <h1 style={{fontSize:"22px",marginLeft:"-290px"}}>Room Location:{room.location}</h1>  
            <h1 style={{fontSize:"22px",marginLeft:"-380px"}}>Landlord Name:{room.name}</h1> 
            <h1 style={{fontSize:"22px",marginLeft:"-345px"}}>Contact Info:{room.contact}</h1> 
            <h1 style={{fontSize:"22px",marginLeft:"-420px"}}>Room Price:{room.price}</h1> 
            <button onClick={()=> booked()}style={{alignItems:"center",justifyContent:"center",display:"flex",marginLeft:"70px",background:"#38d39f",border:'none',width:'200px',height:'40px',color:'white',fontWeight:'bold',cursor:'pointer'}}>Book</button>
            </div>
            </div>
            
        ))}
      </div>
    </div>


        </div>
    
  )
}

export default Oneroom