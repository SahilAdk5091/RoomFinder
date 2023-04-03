import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// import { FaBars , FaTimes } from 'react-icons/fa'
import './LogNavbar.css'
import Hero from './Hero'
import Footer from './Footer'
import About from './About'
import Contact from './Contact'
import ShowRoom from './ShowRoom'


const LogNavbar = () => {
    // const [click, setClick] = useState(false);
    // const handleClick = () => setClick(!click);
  return (
    <>
    <nav className='Lognavbar'>
            <div className='logo'>
                <h1 className='logoname'>Room<span className='lastlogo'>Finder</span></h1>
                
            </div>
            {/* className={click ? 'Lognav-menu active' : 'Lognav-menu'} */}
            <ul >
                <li className='nav-items'><Link to='/'>Home</Link> </li>
                <li className='nav-items'><Link to='/'>Rooms</Link> </li>
                <li className='nav-items'><Link to='/'>Contact</Link> </li>
                <li className='nav-items'><Link to='/'>About</Link> </li>
            </ul>
            {/* <div className='Logmenu-icon' onClick={handleClick}>
                {click ? (<FaTimes size={30} style= {{color:"black"}}/>) : (<FaBars size={30} style= {{color:"black"}}/>) }                
            </div> */}
           <button className='navbar-btn'><Link to='/login' className='linknavbar-btn'>Login</Link></button>
    </nav>
    <Hero />  
    <Contact/>
    <ShowRoom/>
    <About />
    <Footer />
      
    </>
    
  
  )
}

export default LogNavbar