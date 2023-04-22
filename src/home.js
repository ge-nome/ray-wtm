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
  const[rsvp, setrsvp] = useState(false)
  const org = [
    {
      id:1,
      img:'./iwd (1).jpg',
      name:'Motunrayo Jacob',
      port:'WTM Ambassador, Organizer',
    },
  ]
  const speak = [
    {
      id:1,
      img:'./iwd (4).jpg',
      name:'Umme Faatimah-Iz-Zaahra Mujore',
      port:'Google WTM Ambassador, Software Developer',
    },
    {
      id:2,
      img:'./iwd (3).jpg',
      name:'Sumaiya Nalukwago',
      port:'Tech Content Creator, Women TechMakers Ambassador-Mbarara',
    },
    {
      id:3,
      img:'./iwd (5).jpg',
      name:'Augusta Egesi',
      port:'Product designer @ Nerdbug',
    },
    {
      id:4,
      img:'./iwd (6).jpg',
      name:'Abra Oghenekeno',
      port:'UX designer',
    },
    {
      id:5,
      img:'./iwd (2).jpg',
      name:'Ogechukwu Aina',
      port:'Technical Writer, WTM Ambassador',
    }
  ]
  const[showe, setshowe] = useState(false);  
  const[error, seterror] = useState({});  
  const[msg, setmsg] = useState('');  

  var format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
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
        }, 2000);
        
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
          <h2>WTM Ikotun</h2>
          <h1>International Women’s Day 2023</h1>
          {/* <div className='img'>
            <img src={wtm} alt='dare'/>
          </div> */}
          <h3>About this event</h3>
          <div className='statement'>
            <p>The International Women’s Day event is an annual campaign held to connect, educate, inspire, train and as well as accelerate the gender gap in the technology world.</p>
            <p>It is also a moment to celebrate and provide visibility for the incredible contributions of women around the world. </p>
            <p>We implore you all to join us in what promises to be an unconventional, inspiring and motivational event.</p>
            <p>Our diverse speakers will share stories of how they have dared to be in both their daily life routines and their careers and we would be having hands-on training session on design.</p> 
            <p>Don’t miss this 😍🥰</p>
          </div>
          <div className='type'>Virtual event</div>
          <div className='date'>Date: 29th April, 2023</div>
          
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
        {
          rsvp === true ?
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
        :
        <div className='rsvp' onClick={(e)=>setrsvp(!rsvp)}>RSVP</div>
        }
        <div className='floater'>
          <img src={woman} alt='dare'/>
        </div>

        <div className='formtop'>
          <h3>Organizer</h3>
          <div className='speakers'>
            {
              org.map(({id, img, name, port})=>(
                <div className='wrap'>
                  <div className='img'>
                    <img src={img} alt='dare'/>
                  </div>
                  <h4>{name}</h4>
                  <p>{port}</p>
                </div>
              ))
            }
          </div>
          <h3>Speakers</h3>
          <div className='speakers'>
            {
              speak.map(({id, img, name, port})=>(
                <div className='wrap'>
                  <div className='img'>
                    <img src={img} alt='dare'/>
                  </div>
                  <h4>{name}</h4>
                    <p>{port}</p>
                </div>
              ))
            }
          </div>
          
        </div>
        </div>
      
    </div>
  );
}

// export default App;
