import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'


const Oneroom = () => {
    const { id } = useParams();
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
        findRoom();
      }, []);
      
    
    const findRoom = async () => {
        const response = await axios.get(`http://localhost:5000/findroom/${id}`);
        setName(response.data[0].name);
        setLocation(response.data[0].location);
        setPrice(response.data[0].price);
        setService(response.data[0].service);
        setContact(response.data[0].contact);
        setUserId(response.data[0].userid);
        setRoomId(id);
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
          userid:userid,
          roomid:roomid
        });
        alert("Booked sucessfull")
        
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
            <img src={room.url} alt="Image" className='' />
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",alignContent:"center",width:"100%",flexDirection:"column"}}> 
            <h1 style={{fontWeight:"bold",padding:"0px 40px 5px 40px",fontSize:"23px"}}>This room belongs to {room.name}. It is located in {room.location}.The price of the room is {room.price}.Services this room have is {room.service}. </h1>
            <p className='linep' style={{width:"90%"}}></p>
            <h1 style={{fontSize:"22px",marginLeft:"-490px"}}>RoomID:{room.id}</h1> 
            <h1  style={{fontSize:"22px",marginLeft:"-505px"}}>UserID:{room.userid}</h1>
            <h1 style={{fontSize:"22px",marginLeft:"-390px"}}>Room Location:{room.location}</h1>  
            <h1 style={{fontSize:"22px",marginLeft:"-380px"}}>Landlord Name:{room.name}</h1> 
            <h1 style={{fontSize:"22px",marginLeft:"-345px"}}>Contact Info:{room.contact}</h1> 
            <h1 style={{fontSize:"22px",marginLeft:"-420px"}}>Room Price:{room.price}</h1> 
            <button onClick={()=> booked()}>Book</button>
            </div>
            </div>
            
        ))}
      </div>
    </div>


        </div>
    
  )
}

export default Oneroom