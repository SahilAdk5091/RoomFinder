import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import { FaBars , FaTimes } from 'react-icons/fa'
import './LogNavbar.css'
import Hero from './Hero'
import axios from 'axios';


const UserNavbar = () => {
    // const [click, setClick] = useState(false);
    // const handleClick = () => setClick(!click);
    const history = useNavigate();
  const Logout = async() =>{
    try {
      await axios.delete('http://localhost:5000/logout');
      history('/login');

    } catch (error) {
      console.log(error);  
    }
  }
  return (
    <>
    <nav className='Lognavbar'>
            <div className='logo'>
                <h1 className='logoname'>Room<span className='lastlogo'>Finder</span></h1>
                
            </div>
            {/* className={click ? 'Lognav-menu active' : 'Lognav-menu'} */}
            <ul >
                <li className='nav-items'><Link to='/dashboard'>Home</Link> </li>
                <li className='nav-items'><Link to='/showroobyid'>Rooms</Link> </li>
                <li className='nav-items'><Link to=''>Contact</Link> </li>
                <li className='nav-items'><Link to='/fullabout'>About</Link> </li>
                <li className='nav-items'><Link to='/profile'>Profile</Link> </li>
            </ul>
            {/* <div className='Logmenu-icon' onClick={handleClick}>
                {click ? (<FaTimes size={30} style= {{color:"black"}}/>) : (<FaBars size={30} style= {{color:"black"}}/>) }                
            </div> */}
           <button onClick={Logout} className="logout-btn" style={{cursor:"pointer"}}>
                Log Out
           </button>
    </nav> 
    </>
    
  
  )
}
export default UserNavbar