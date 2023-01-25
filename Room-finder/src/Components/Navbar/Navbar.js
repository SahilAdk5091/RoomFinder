import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../Img/Logo.png'
import { FaBars , FaTimes } from 'react-icons/fa'
import './Navbar.css'

const Navbar = () => {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
  return (
    <nav className='navbar'>
            <div className='logo'>
                <img src={Logo} alt= 'logo' />
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                <li className='nav-items'><Link to='/'>Home</Link> </li>
                <li className='nav-items'><Link to='/'>Rooms</Link> </li>
                <li className='nav-items'><Link to='/'>Contact</Link> </li>
                <li className='nav-items'><Link to='/'>About</Link> </li>
            </ul>
            <div className='menu-icon' onClick={handleClick}>
                {click ? (<FaTimes size={30} style= {{color:"black"}}/>) : (<FaBars size={30} style= {{color:"black"}}/>) }
                
                
            </div>
    </nav>
  )
}

export default Navbar