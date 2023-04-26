import React,{useState, useEffect} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import axios from 'axios'
import wave from '../Img/wave.png'
import bg from '../Img/bg2.svg'
import avatar from "../Img/avatar.svg"
import './Newlogin.css'
import { toast } from 'react-toastify';


const Newlogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const history = useNavigate();

  const Auth = async(e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/login', {
        email:email,
        password:password
      });
      toast.success("Login SucessFull")
      history("/dashboard");
      
    } catch (error) {
        if(error.response){
          toast.error("Error");
          alert(error.response.data.msg);
        }
    }
  }
  return (
    <>
    <img className='wave' src={wave}/>
    <div className='container_login'>
      <div className='login_back'>
      <img className='login_bg' src={bg}/>
      </div>
      <div className='login-content'>
        <form onSubmit={Auth}>
        <img className='avatar' src={avatar}/>
        <h2 class="title">Welcome</h2>
        <div className='input-div one'>
          <div className='i'>
          <i class="fas fa-user"></i>
          </div>
          <div className="div">
           		   		{/* <h5>Username</h5> */}
           		   		<input type="text"
                    className="input"
                    required='true'
                    placeholder='Email'
                    value={email} onChange = {e =>(setEmail(e.target.value))} />
          </div>
        </div>
        <div className='input-div pass'>
          <div className='i'>
          <i class="fas fa-lock"></i>
          </div>
          <div className="div">
           		   		{/* <h5>Password</h5> */}
           		   		<input type="password" 
                    className="input"
                    placeholder='Password'
                    value={password} onChange = {e =>(setPassword(e.target.value))} />
          </div>
        </div>
        <label>Forgot password</label>
        <h3>Don`t have an account? <Link to='/register' style={{marginTop:'-22px',marginright:'50px'}}>Signup</Link></h3>
        <input type="submit" class="btn" value="Login"/>
        </form>
      </div>

    </div>
    </>
  )
}

export default Newlogin