import React from 'react'
import './About.css'
const About = () => {
  return (
    <div className='aboutmain' style={{backgroundColor:"#292f36"}}>
      <div className='aboutus_header'>
        <h1 className='about_us_head' style={{color:"white"}}>About US</h1>
        <h3 className='about_us_para'>Lorem ipsum dolor sit amet, 
        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h3>
      </div>
      <div className='aboutus_details'></div>
    </div>
  )
}

export default About