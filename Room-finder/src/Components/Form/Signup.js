import React,{useState, useEffect} from 'react'
import {useNavigate, useParams, Link} from 'react-router-dom'
import "./Signup.css"
import axios from 'axios'
import { toast } from 'react-toastify'
import Logpic from '../../Img/signinpic.jpg'

const initialState = {
    fname:"",
    lname: "",
    email: "",
    contact: "",
    password: "",
    cpassword: ""
}

const Signup = () => {
    
    const [state,setState] = useState(initialState);

    const {fname,lname,email,contact,password,cpassword} = state;

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!fname || !lname || !email ||!contact || !password || !cpassword){
            toast.error("Please provide value into each field");
        }else{
            axios.post("http://localhost:5000/api/register",{
                fname,
                lname,
                email,
                contact,
                password,
                cpassword

            }).then(() => {
                setState({fname: "",lname: "", email: "", contact:"",password:"",cpassword:""})
            }).catch((err) => toast.error(err.response.data));
            setTimeout(()=> navigate("/"),500)
        }
    } 
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setState({...state,[name]:value});
    }
    
  return (
    <section className='body'>
     <div className='signupcontainer'>
        <div className='signup-left'>
            <div className='signup-header'>
                <h1>Signup To RoomFinder </h1>
                <p className='linep'></p>
                <p>signup</p>
            </div>
        <form className="signup-form" onSubmit = {handleSubmit}>
            <div className='signup-form-content'>
            <div className='form-content-left'>
            <div className='form-item-left'>
                <label htmlFor='fname'>First Name</label>
                <input
                type="text"
                id = "firstname"
                name= "fname"
                placeholder='Your first name'
                value={fname}
                onChange={handleInputChange}
                />
            </div>
            <div className='form-item-left'>
                <label htmlFor='email'>Email</label>
                <input
                type="email"
                id = "semail"
                name= "email"
                placeholder='Your email'
                value={email}
                onChange={handleInputChange}
                />
            </div>
            <div className='form-item-left'>
            <label htmlFor='password'>Password</label>
            <input
            type="password"
            id = "spassword"
            name= "password"
            placeholder='Your password'
            value={password}
            onChange={handleInputChange}
            />
            </div>
            </div>
            <div className='form-content-rigth'>
            <div className='form-item-right'>
                <label htmlFor='lname'>Last Name</label>
                <input
                type="text"
                id = "lastname"
                name= "lname"
                placeholder='Your Last name'
                value={lname}
                onChange={handleInputChange}
                />
            </div>
            <div className='form-item-right'>
            <label htmlFor='contact'>Contact</label>
            <input
            type="number"
            id = "scontact"
            name= "contact"
            placeholder='Your contact'
            value={contact}
            onChange={handleInputChange}
            />
            </div>    
            <div className='form-item-right'>
            <label htmlFor='cpassword'>Confirm Password</label>
            <input
            type="password"
            id = "cpassword"
            name= "cpassword"
            placeholder='Your confirm password'
            value={cpassword}
            onChange={handleInputChange}
            />
            </div>        
            </div>
            <button type='submit' className='signinbutton'><input type="submit" className='signin-btn' value="Sign In" /></button>
        </div>
        </form>
        <button type='submit' className='cancel'><input type="submit" className='cancel-btn' value="Cancel" /></button>
    </div>
    <div className='signup-right'>
        <img src={Logpic} alt= 'signup' />
        </div>
    </div>
        
    </section>

  )
}

export default Signup