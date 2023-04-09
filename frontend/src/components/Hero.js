import React from 'react'
import {Link} from 'react-router-dom'

import './Hero.css'

const Hero = () => {
  return (
    <section className='header'>
      <div className='hero-container'>
        <img className='hero' src='/image/pic.jpg'/>
        <h1>Find the desire room</h1>
        <p>Sign up now</p>
        <Link to="./register"><button style={{backgroundColor:"white",width:"200px",height:"40px",border:"none",fontWeight:"bold",fontSize:"16px",cursor:"pointer",marginTop:"40px",borderRadius:"8px"}}>Signup</button></Link>
      </div>
    </section>
  )
}

export default Hero