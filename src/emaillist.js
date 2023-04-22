import './App.css';
import {
  useNavigate
} from "react-router-dom";
import { useEffect, useState } from 'react';
import Input from './components/inputcomp.js';
import logo from './images/logo.jpg'
import bg from './images/bg.jpg'
import woman from './images/woman.png'
import wtm from './images/wtm.webp'
import axios from 'axios';

export default function EmailList() {
  const[msg, setmsg] = useState([]);  
  useEffect(()=>{
    checker()
  },[])
  const checker = async() => {
    try {
        const response = await axios.get('/api/');
        console.log(response.data)
        setmsg(response.data)
    }
    catch (error) {
        console.log(error.response.data)
    }
    }
  
  return (
    <div className="container">
        <div className='topbar'>
            <img src={bg} alt='dare'/>
        </div>
        <div className='form'>
            <div className='formtop'>
                <h2>WTM Ikotun</h2>
                <h1>International Women’s Day 2023</h1>
            </div>
            <div className='type'>Virtual event</div>
            <div className='formtop'>
          <h3>Mailing List</h3>
          <div className='speakers'>
            {
              msg.map(({id, email, full_name, interest, proficiency}, i)=>(
                <div className='wraps'>
                    <div>{i+1}</div>
                    <div>
                        <h4>{full_name}</h4>
                        <p>{email}</p>
                    </div>
                </div>
              ))
            }
          </div>
        </div>
        </div>
        <div className='floater'>
          <img src={woman} alt='dare'/>
        </div>
       
        
      
    </div>
  );
}

// export default App;
