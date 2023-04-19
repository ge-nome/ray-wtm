import './App.css';
import {
  useNavigate
} from "react-router-dom";
import { useState } from 'react';
import Input from './components/inputcomp.js';
import logo from './images/logo.jpg'
import bg from './images/bg.jpg'
import woman from './images/woman.png'
import wtm from './images/wtm.webp'
import axios from 'axios';

export default function Home() {
  const[details, setdetails] = useState({
    name:'',
    email:'',
    area:'',
    proficiency:''
  });
  const[showe, setshowe] = useState(false);  
  const[error, seterror] = useState({});  
  const[msg, setmsg] = useState('');  

  var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  var formatem = /[ `!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;

  const nav = useNavigate()
  const checker = async(e) => {
    e.preventDefault();
    console.log(Object.values(details).every(x => !!x))
    if(Object.values(details).every(x => !!x)===false){
      seterror({...error, submit:'Kindly complete all the fields correctly'})
    }
    else{
      console.log('fire submission')
      console.log(details)
      seterror(current => {
        const {submit, ...rest} = current;
        return rest;
      });
      try {
        const response = await axios.post('/api/', details);
        console.log(response.data)
        setmsg(response.data.msg)
        setdetails({...details,
          name:'',
          email:'',
          area:'',
          proficiency:''

        })
        setTimeout(() => {
            setmsg('')
            window.location.reload(false);
        }, 7000);
        
    } catch (error) {
        console.log(error.response.data)
    }
    }
  }
  const showextra = (val)=>{
    if (val === '0') {
      setshowe(true)
    }
    else{
      console.log('added')
      setshowe(false)
      setdetails({...details, area:val})
    }
  }
  
  return (
    <div className="container">
      <div className='topbar'>
          <img src={bg} alt='dare'/>
      </div>
      <div className='form'>
        <div className='formtop'>
          <img src={wtm} alt='dare'/>
          <h1>Fill the form below to participate</h1>
        </div>
        {
          Object.values(error).length >= 1 ?
          <div className='errors'>
          {
              Object.values(error).map((a, i)=>(
                  <p>{a}</p>
              ))
          }
          </div>
          :
          msg ?
          <div className='success'>
            {msg}
          </div>
          :
          ''
        }
        <form>
          <div>
            <p>Full name *</p>
            <input onChange={(e)=>{
                if(format.test(e.target.value) === false){
                  setdetails({...details, name:e.target.value})
                  seterror(current => {
                    const {name, submit, ...rest} = current;
                    return rest;
                  });
                }
                else{
                  seterror({...error, name:'Kindly provide a valid name'})
                }
                
              }} 
              type="text" 
              value={details.name}
              placeholder="Full name"/>
          </div>
          <div>
            <p>Email *</p>
            <input onChange={(e)=>{
              if(formatem.test(e.target.value) === false){
                setdetails({...details, email:e.target.value})
                seterror(current => {
                  const {email:value, ...rest} = current;
                  return rest;
                });
              }else{
                seterror({...error, email:'Kindly provide a valid email address'})
              }
            
            }} 
            type="text" 
            value={details.email}
            placeholder="Email"/>
          </div>
          <div>
            <p>Area of interest *</p>
          <select onChange={(e)=>showextra(e.target.value)}>
              <option value=''>Area of interest</option>
              <option value='Design'>Design</option>
              <option value='Web'>Web</option>
              <option value='Data Analytics'>Data Analytics</option>
              <option value='0'>Others</option>
          </select>
          {
            showe === true ?
            <input  type="text" onChange={(e)=>setdetails({...details, area:e.target.value})} placeholder="Name of area"/>
            :''
          }</div>
          <div>
            <p>Proficiency level *</p>
            <select onChange={(e)=>setdetails({...details, proficiency:e.target.value})}>
                <option>Proficiency level</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Expert</option>
            </select>
          </div><input onClick={checker} type="submit" />
        </form>
        
        <div className='floater'>
          <img src={woman} alt='dare'/>
        </div>
        </div>
      
    </div>
  );
}

// export default App;
