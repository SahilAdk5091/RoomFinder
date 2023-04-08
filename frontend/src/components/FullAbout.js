import React from 'react'
import Footer from './Footer'
import LogNavbar from './LogNavbar'
import UserNavbar from './UserNavbar'

const FullAbout = () => {
  return (
    <>
    <div style={{height:"40px",width:"100%",backgroundColor:"#F7F7F7"}}></div>
    <div  style={{marginBottom:"150px"}}>
        <div className='fullabout_us_header'>
            <h1 className='full_about' style={{backgroundColor:"#F7F7F7",width:"100%",height:"150px",padding:"25px",paddingLeft:"60px",paddingTop:"40px",fontSize:"40px",fontWeight:""}}>About US</h1>
        </div>
        <div className='fullabout_details'>
            <h3 style={{padding:"20px 150px 4px 150px",fontSize:"19px"}}>Foodmandu is the first company in Nepal that delivers food from hundreds of popular restaurants. As a pioneer food delivery service provider, we are making life easier through online ordering.</h3>
            <h3 style={{padding:"10px 150px 4px 150px",fontSize:"17px"}}>We know that your time is valuable and sometimes every minute in the day counts. That’s why we deliver! So you can spend more time doing the things you love. You can get anything from Indian food to high French cuisine by placing a simple order online through our website, mobile app or over the phone. Then just sit back, relax, and wait for your order to arrive.</h3>
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default FullAbout