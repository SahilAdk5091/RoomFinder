import React,{useState, useEffect} from 'react'
import {useNavigate, useParams, Link} from 'react-router-dom'
import "./Signup.css"
import axios from 'axios'
import Logpic from '../Img/signinpic.jpg'



const Register = () => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [confpassword, setConfPassword] = useState('');
  const [location, setLocation] = useState('');
  const [msg, setMsg] = useState('');
  const history = useNavigate();

  const Register = async(e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/users', {
        fname:fname,
        lname:lname,
        email:email,
        contact:contact,
        role:role,
        password:password,
        confpassword:confpassword,
        location:location
      
      });
      history("/login");
      
    } catch (error) {
        if(error.response){
          setMsg(error.response.data.msg);
        }
    }
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
        <form className="signup-form" onSubmit={ Register }>
            <div className='signup-form-content'>
            <div className='form-content-left'>
            <div className='form-item-left'>
                <label htmlFor='fname'>First Name</label>
                <input
                type="text"
                id = "firstname"
                name= "fname"
                placeholder='Your first name'
                value={fname} onChange={(e) => setFname(e.target.value)}
                />
            </div>
            <div className='form-item-left'>
                <label htmlFor='email'>Email</label>
                <input
                type="email"
                id = "semail"
                name= "email"
                placeholder='Your email'
                value={email} onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className='form-item-left'>
            <label htmlFor='password'>Password</label>
            <input
            type="password"
            id = "spassword"
            name= "password"
            placeholder='Your password'
            value={password} onChange={(e) => setPassword(e.target.value)}
            
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
                value={lname} onChange={(e) => setLname(e.target.value)}
                />
            </div>
            <div className='form-item-right'>
            <label htmlFor='contact'>Contact</label>
            <input
            type="number"
            id = "scontact"
            name= "contact"
            placeholder='Your contact'
            value={contact} onChange={(e) => setContact(e.target.value)}
            />
            </div>   
            <div className='form-item-right'>
            <div className='r1'>
            <label>Role</label>
            <select c value={role} onChange={(e) => setRole(e.target.value)}>
                      <option>--SELECT--</option>
                      <option>Tenant</option>
                      <option>Landlord</option>
            </select>
            </div>
            
            </div>  
            <div className='form-item-right'>
            <div className='c1'>
              <label htmlFor='cpassword'>Confirm Password</label>
              <input
              type="password"
              id = "cpassword"
              name= "cpassword"
              placeholder='Your confirm password'
              value={confpassword} onChange={(e) => setConfPassword(e.target.value)}
            />
            </div>
            <div className='l1'>
              <label htmlFor='cpassword'>Location</label>
              <input
              type="text"
              id = "cpassword"
              name= "cpassword"
              placeholder='Your Location'
              value={location} onChange={(e) => setLocation(e.target.value)}
            />
            </div>
            </div>   
            <div className='b1'><button type='submit' className='reg-btn'>Register</button></div>  
            </div>
            
            
            {/* className='signinbutton' */}
        </div>
        </form>
        {/* <button type='submit' className='cancel'>Cancel</button> */}
    </div>
    <div className='signup-right'>
        <img src={Logpic} alt= 'signup' />
        </div>
    </div>
        
    </section>

  )
}

export default Register