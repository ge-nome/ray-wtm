import './App.css';
import {
  useNavigate
} from "react-router-dom";
import { useState, useContext } from 'react';
import Input from './components/inputcomp.js';
import logo from './images/logo.jpg'
import {UserContext} from './auth/usercontext';
import axios from 'axios';


export default function Login() {
  const {details:{authlev, name,  email, location}, details, setDetails} = useContext(UserContext)
  const[username, setusername] = useState("");
  const[password, setpassword] = useState("");
  const navigate = useNavigate();

  
  const checker = async(e) => {
    e.preventDefault();
    const data = {
        'username' : username,
        'password' : password,
    };

    console.log(data)
    console.log(details)
    try {
      const response = await axios.get('http://ip-api.com/json/');
      const {lat, lon, city} = response.data
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className='login container'>
        <div className='topbar'>
            <div className='logo'>
                <img src={logo} alt="logo"></img>
            </div>
            <div className='schName'>
                <h1>PRECIOUS GIFT INTERNATIONAL SCHOOL</h1>
                <p>MARARABA, NASARAWA STATE</p>
            </div>
        </div>
        <form>
            <div>
                <h1>Login</h1>
            </div>
            <div className='label'>Username</div>
            <Input click={setusername} type="text" placehold="Username"/>
            <div className='label'>Password</div>
            <Input click={setpassword} type="password" placehold="Password"/>
            <input onClick={checker} type="submit" label=""/>
        </form>
    </div>
  );
}
