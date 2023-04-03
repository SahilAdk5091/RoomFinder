import React from 'react'

import './Hero.css'

const Hero = () => {
  return (
    <section className='header'>
      <div className='hero-container'>
        <img className='hero' src='/image/pic.jpg'/>
        <h1>Find the desire room</h1>
        <p>Sign up now</p>
      </div>
    </section>
  )
}

export default Hero