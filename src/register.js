import './App.css';
import {
  useNavigate
} from "react-router-dom";
import { useState, useContext } from 'react';
import Input from './components/inputcomp.js';
import logo from './images/logo.jpg'
import {UserContext} from './auth/usercontext';
import Sidebar from './sidebar';
import axios from 'axios';

export default function Register() {
    const {details:{authlev, name,  staffid}} = useContext(UserContext)
    const [student, setstudent] = useState({
        class:'',
        surname:'',
        firstname:'',
        gender:'',
    })
    const [stats, setstats] = useState('')
    const [error, seterror] = useState('')
    const [show, setshow] = useState(false)
    const classes = [
        {
            'name':'Kindergarten'
        },
        {
            'name':'Nursery 1'
        },
        {
            'name':'Nursery 2'
        },
        {
            'name':'Primary 1'
        },
        {
            'name':'Primary 2'
        },
        {
            'name':'Primary 3'
        },
        {
            'name':'Primary 4'
        },
        {
            'name':'Primary 5'
        },
        {
            'name':'JSS 1'
        },
        {
            'name':'JSS 2'
        },
        {
            'name':'JSS 3'
        },
        {
            'name':'SSS 1'
        },
        {
            'name':'SSS 2'
        },
        {
            'name':'SSS 3'
        },
    ]
    const submit = async(e)=>{
        e.preventDefault()
        const data = student
        try {
            const response = await axios.post('http://192.168.0.102:8000/api/student', data);
            console.log(response.data)
            setstats(response.data)
            seterror('')
            setTimeout(() => {
                setstats('')
            }, 2000);
          } catch (error) {
            console.log(error)
            seterror('The form is not correctly filled')
          }
    }
    return (
        <div className='dashboard'>
            <div className='topbar'>
                <div className='logo'>
                    <img src={logo} alt="logo"></img>
                </div>
                <div className='schName'>
                    <h1>PRECIOUS GIFT INTERNATIONAL SCHOOL</h1>
                    <p>MARARABA, NASARAWA STATE</p>
                </div>
            </div>
            <div className='mainbody'>
                {
                    show === true ?
                        <Sidebar/>
                        :
                        ''
                }
                
                <div className='right'>
                    <div>
                        <form>
                            {
                                error.length >= 1 ?
                                <div className='errors'>
                                    {error}
                                </div>
                                :
                                ''
                            }
                            <div className='label'>Select Class</div>
                            <select placeholder='Select Class' onChange={(e)=>setstudent({...student, class:e.target.value})}>
                                <option>Select Class</option>
                                {
                                    classes.map(({name})=>(
                                        <option value={name}>{name}</option>
                                    ))
                                }
                            </select>

                            <div className='label'>Surname</div>
                            <input type="text" placeholder='Surname' onChange={(e)=>setstudent({...student, surname:e.target.value})}/>

                            <div className='label'>First name</div>
                            <input type="text" placeholder='First name'onChange={(e)=>setstudent({...student, firstname:e.target.value})}/>

                            <div className='label'>Gender</div>
                            <select placeholder='Select Gender' onChange={(e)=>setstudent({...student, gender:e.target.value})}>
                                <option>Select Gender</option>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                            </select>
                            <button onClick={submit}>Register</button> <span>{stats}</span>
                        </form>
                    </div>
                </div>
                
            </div>
            <div className='menupop' onClick={(e)=>setshow(!show)}>
                <p></p>
                <p></p>
                <p></p>
            </div>
        </div>
    );
}
