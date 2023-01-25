import React,{useState, useEffect} from 'react'
import {useNavigate, useParams, Link} from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import './Login.css'
import Logpic from '../../Img/Logpic.jpg'


const initialState = {
    email:"",
    password: "",
}



const Login = () => {

    const [state,setState] = useState(initialState);

    const {email,password} = state;

    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        if(!email || !password){
            toast.error("Please provide value into each field");
        }else{
            axios.post("http://localhost:5000/api/post",{
                email,
                password

            }).then(() => {
                setState({email: "", password: ""})
            }).catch((err) => toast.error(err.response.data));
            
        }
    } 
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setState({...state,[name]:value});
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
            <form className="login-form" onSubmit = {handleSubmit}>
                <div className='login-form-content'>
                    <div className='form-item'>
                        <label>Enter Email</label>
                        <input
                        type="email"
                        id = "contact"
                        name= "email"
                        placeholder='Your Email'
                        value={email}
                        onChange={handleInputChange}
                        />
                    </div>
                    <div className='form-item'>
                        <label>Enter Password</label>
                        <input
                        type="password"
                        id = "password"
                        name= "password"
                        placeholder='Your Password'
                        value={password}
                        onChange={handleInputChange}
                        />
                    </div>
                    <div className='form-item'>
                       <div className='checkbox'>
                        <input type="checkbox" id='remembermecheckbox' />
                        <label>Remember me</label>
                       </div>  
                    </div>
                    <button type='submit'><input type="submit" className='login-btn' value="Log In" /></button>
                </div>
                <div className='login-form-footer'>
               
                    <Link to= '/signup'>Signup</Link>
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