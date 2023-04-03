import React,{useState, useEffect} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import axios from 'axios'
import './Login.css'
import Logpic from '../Img/Logpic.jpg'



const Login = () => {
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
      history("/dashboard");
      
    } catch (error) {
        if(error.response){
          alert(error.response.data.msg);
        }
    }
  }

  return (
    <section className='body'>
    <div className='logincontainer'>
        <div className='login-left'>
            <div className='login-header'>
                <h1>Welcome To RoomFinder </h1>
                <p className='linep'></p>
                <p>Login</p>
            </div>
            <form className="login-form" onSubmit={Auth}>
                <div className='login-form-content'>
                    <div className='form-item'>
                        <label>Enter Email</label>
                        <input
                        type="email"
                        id = "contact"
                        name= "email"
                        placeholder='Your Email'
                        value={email} onChange = {e =>(setEmail(e.target.value))}
                        />
                    </div>
                    <div className='form-item'>
                        <label>Enter Password</label>
                        <input
                        type="password"
                        id = "password"
                        name= "password"
                        placeholder='Your Password'
                        value={password} onChange = {e =>(setPassword(e.target.value))}
                        />
                    </div>
                    <div className='form-item'>
                       <div className='checkbox'>
                        <input type="checkbox" id='remembermecheckbox' />
                        <label style={{marginLeft:"10px"}}>Remember me</label>
                       </div>  
                    </div>
                    <button className='log-btn' type='submit'>Login</button>
                </div>
                <div className='login-form-footer'>
               
                    <Link to= '/register'>Signup</Link>
                    <Link>Google</Link>

                </div>
            </form>
        </div>
        <div className='login-right'>
        <img src={Logpic} alt= 'login' />
        </div>
    </div>
    </section>
  )
}
export default Login