import React from 'react'
import {Link} from 'react-router-dom'

import './Hero.css'

const UserHero = () => {
  return (
    <section className='header'>
      <div className='hero-container'>
        <img className='hero' src='/image/pic.jpg'/>
        <h1 style={{marginTop:"70px"}}>Find the desire room</h1>
        <h2 style={{color:"white",fontSize:"46px"}}>Book Your Room</h2>
      </div>
    </section>
  )
}

export default UserHero