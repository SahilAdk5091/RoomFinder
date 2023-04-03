import React from 'react'
import "./Footer.css"

const Footer = () => {
  return (
    <section className='footer_section' style={{borderTop:"1px solid black"}}>
        <div className='Details_container'>
        <div className='About_details'>
            <h2 style={{marginBottom:"10px", fontWeight: "bold", color:"white"}}>WE`RE ROOFINDER</h2>
            <h3 style={{marginBottom:"10px",color:"white"}}>About Us</h3>
            <h3 style={{marginBottom:"10px",color:"white"}}>Available Areas</h3>
        </div>
        <div className='Get_Help'>
            <h2 style={{marginBottom:"10px", fontWeight: "bold", color:"white"}}>How to book?</h2>
            <h3 style={{marginBottom:"10px",color:"white"}}>FAQs</h3>
            <h3 style={{marginBottom:"10px",color:"white"}}>Contact Us</h3>
        </div>
        <div className='Contact_Us'>
            <h2 style={{marginBottom:"10px",fontWeight: "bold", color:"white" }}>CALL US</h2>
            <h3 style={{marginBottom:"10px",color:"white"}}>Kathmandu: 4412234, 1223389</h3>
            
        </div>
        <div className='Connect_With_Us'>
        <h2 style={{marginBottom:"10px", fontWeight: "bold", color:"white"}}>Connect With Us</h2>
            <h2 style={{marginBottom:"10px",color:"white"}}>Facebook Logo</h2>
            <h3 style={{marginBottom:"10px",color:"white"}}>Insta Logo</h3>
            <h3 style={{marginBottom:"10px",color:"white"}}>Twitter Logo</h3>
        </div>
    </div>
    <div className='Service_hour'>
        <h1 style={{color:"white"}}><span className='hour' style={{fontWeight: "bold", marginLeft: "1px", color:"white"}}>Service Hour</span> 8:00 AM to 9:00 PM (NST)</h1>
    </div>
    <span className='footer_line'></span>
    <div className='Terms_footer'>
        <h2 style={{color:"white"}}>Terms of Usages | Privacy Policy</h2>
        <h2 style={{color:"white"}}>© 2023 ROOFINDER Pvt. Ltd. All Rights Reserved.</h2>
    </div>
    </section>
  )
}

export default Footer