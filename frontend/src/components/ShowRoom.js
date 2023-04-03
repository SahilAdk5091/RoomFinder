import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './ShowRoom.css'

const ShowRoom = () => {
    const [room, setRoom] = useState([]);

  useEffect(() => {
    getRoom();
  }, []);

  const getRoom = async () => {
    const response = await axios.get("http://localhost:5000/rooms");
    setRoom(response.data);
  };

  const deleteProduct = async (roomId) => {
    try {
      await axios.delete(`http://localhost:5000/products/${roomId}`);
      getRoom();
    } catch (error) {
      console.log(error);
    }
  };
  return (
        <div className='showroom_body'>
        <h1 style={{fontSize:"26px"}}>Rooms</h1>
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
                  </div>
                </div>
              </div>

              <footer className="card-footer">
                
                <button style={{alignItems:"center",justifyContent:"center",display:"flex",marginLeft:"70px",backgroundColor:"blue",width:"140px",border:"none",marginBottom:"8px",marginTop:"4px",height:"35px"}}>
                <Link to="/login" style={{color:"white",fontSize:"15px"}}>Book</Link>
  
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

export default ShowRoom