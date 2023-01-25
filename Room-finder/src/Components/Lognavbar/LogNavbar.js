import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars , FaTimes } from 'react-icons/fa'
import './LogNavbar.css'
import Hero from '../Hero/Hero'
import Services from '../service/Services'
import Contact from '../contact/Contact'

const LogNavbar = () => {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
  return (
    <>
    <nav className='Lognavbar'>
            <div className='logo'>
                <h1>RoomFinder</h1>
                
            </div>
            <ul className={click ? 'Lognav-menu active' : 'Lognav-menu'}>
                <li className='nav-items'><Link to='/'>Home</Link> </li>
                <li className='nav-items'><Link to='/'>Rooms</Link> </li>
                <li className='nav-items'><Link to='/'>Contact</Link> </li>
                <li className='nav-items'><Link to='/'>About</Link> </li>
            </ul>
            <div className='Logmenu-icon' onClick={handleClick}>
                {click ? (<FaTimes size={30} style= {{color:"black"}}/>) : (<FaBars size={30} style= {{color:"black"}}/>) }                
            </div>
           <button className='navbar-btn'><Link to='/Login' className='linknavbar-btn'>Login</Link></button>
    </nav>
    <Hero />
    <><Services /></>
    <Contact />
    
    </>
    
  
  )
}

export default LogNavbar