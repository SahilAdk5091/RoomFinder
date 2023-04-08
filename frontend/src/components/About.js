import React from 'react'
import './About.css'
import { Link } from 'react-router-dom'
const About = () => {
  return (
    <div className='aboutmain' style={{backgroundColor:"#292f36",paddingTop:"40px"}}>
      <div className='aboutus_header'>
        <h1 className='about_us_head' style={{color:"white",marginTop:"-100px"}}>About US</h1>
        <h3 className='about_us_para'>RoomFinder is the fastest, easiest and most convenient way to find room online with convinent  
        </h3>
        <h3 className='about_us_para_sec' style={{marginLeft:"270px"}}>easily by just sitting from home.</h3>
        <h3 className='about_us_para'>We know that your time is valuable and sometimes every minute in the day counts. That’s why we 
        </h3>
        <h3 className='about_us_para_sec' style={{marginLeft:"270px"}}>help you find room sitting within your comfort.</h3>  
        <div style={{width:"100%",marginTop:"25px",marginBottom:"-15px",display:"flex", alignItems:"center",justifyContent:"center"}}>
        <Link to="./fullabout"><button style={{backgroundColor:"white",width:"150px",height:"40px",border:"none",fontWeight:"bold",fontSize:"16px",cursor:"pointer"}}>Learn More</button></Link>
        </div>
      </div>
    </div>
  )
}

export default About