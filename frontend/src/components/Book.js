import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './Book.css'

const Book = () => {
    const [room, setRoom] = useState([]);
    const [contact,setContact]= useState("");

useEffect(() => {
  getRoom();
}, []);

const getRoom = async () => {
  const response = await axios.get("http://localhost:5000/rooms");
  setRoom(response.data);
  setContact(response.data.contact);
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
    <div className='book_body'>
        <div className='book_left'>
        <p>{contact}</p>
        </div>
        
    </div>
  )
}

export default Book