import React,{useState, useEffect} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import axios from 'axios'
import './Login.css'
import contact from '../Img/contact.jpg'

export const Contact = () => {
  return (
    <section className='body' style={{height:"85vh"}}>
    <div className='logincontainer'>
        <div className='login-left'>
            <div className='login-header' style={{marginLeft:'-90px'}}>
                <h1>Contact Us </h1>
                <p className='linep'></p>
                <p>Conteact US with this</p>
            </div>
            <form className="login-form">
                <div className='login-form-content' style={{marginLeft:'-90px'}} >
                    <div className='form-item'>
                        <label>Enter Email</label>
                        <input
                        type="email"
                        id = "contact"
                        name= "email"
                        placeholder='Your Email'
                        
                        />
                    </div>
                    <div className='form-item'>
                        <label>Enter Your Query</label>
                        <input
                        type="text"
                        id = "password"
                        name= "password"
                        placeholder='Your Query'
                        />
                    </div>
                    
                    <button className='log-btn' type='submit'>Submit</button>
                </div>
                
            </form>
        </div>
        <div className='login-right' style={{marginTop:"10px"}}>
        <img src={contact} className="contimg" alt= 'login' />
        </div>
    </div>
    <span className='footer_line'></span>
    </section>
  )
}
export default Contact
