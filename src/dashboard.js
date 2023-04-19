import './App.css';
import {
  useNavigate
} from "react-router-dom";
import { useState, useContext, useRef } from 'react';
import Input from './components/inputcomp.js';
import logo from './images/logo.jpg'
import {UserContext} from './auth/usercontext';
import Sidebar from './sidebar';
import axios from 'axios';
import { useEffect } from 'react';

export default function Dashboard() {
    const inputs = useRef('')
    const {details:{authlev, name,  staffid}} = useContext(UserContext)
    const [record, setrecord] = useState({
        class:'',
        student:'',
        acad:'',
        term:'',
        subject:'',
        first:'bdb',
        second:'sddsfds',
        third:'sdfsf',
        exam:'',
        staff:"STA-777",
    })
    const sec = [
        {
            id:1,
            label:'First C. A',
            placeholder:'First C. A',
            max:'10',
            set:'first'
        },
        {
            id:2,
            label:'Second C. A',
            placeholder:'Second C. A',
            max:'10',
            set:'second'
        },
        {
            id:3,
            label:'Third C. A',
            placeholder:'Third C. A',
            max:'10',
            set:'third'
        },
        {
            id:4,
            label:'Exam',
            placeholder:'Exam',
            max:'70',
            set:'exam'
        }
    ]
    const prim = [
        {
            id:1,
            label:'First C. A',
            placeholder:'First C. A',
            max:'20',
            set:'first',
        },
        {
            id:2,
            label:'Second C. A',
            placeholder:'Second C. A',
            max:'20',
            set:'second'
        },
        {
            id:3,
            label:'Exam',
            placeholder:'Exam',
            max:'60',
            set:'exam'
        },
    ]
    const [remove, setremove] = useState(true)
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
    const [error, seterror] = useState({})
    const [msg, setmsg] = useState('')
    const [show, setshow] = useState(false)
    const [student, setstudent] = useState([])
    const [subject, setsubject] = useState([])
    const [secondary, setsecondary] = useState('')
    const [styles, setstyles] = useState('')
    const submit = async(e)=>{
        e.preventDefault()
        console.log(record)
        console.log(error)
        var data = {}
        
        if(secondary === 1){
            data = {
                class:record.class,
                student:record.student,
                acad:record.acad,
                term:record.term,
                subject:record.subject,
                first:record.first,
                second:record.second,
                third:record.third,
                exam:record.exam,
                staff:"STA-777",
            }
        }
        else{
            data = {
                class:record.class,
                student:record.student,
                acad:record.acad,
                term:record.term,
                subject:record.subject,
                first:record.first,
                second:record.second,
                third:'zero',
                exam:record.exam,
                staff:"STA-777",
            }
        }
        console.log(data)
        console.log(Object.values(data).every(x => !!x))
        if(Object.values(data).every(x => !!x)===false || Object.values(error).length > 0){
            seterror({...error, submit:'Kindly complete the form correctly'})
        }
        else{
            seterror(current => {
                const {submit, ...rest} = current;
                return rest;
              });
              console.log(Object.values(error).length)
                try {
                    const response = await axios.post('http://192.168.0.102:8000/api/result', data);
                    console.log(response.data)
                    setmsg(response.data)
                    setrecord({...record,
                        first:'',
                        second:'',
                        third:'',
                        exam:'',

                    })
                    setTimeout(() => {
                        setmsg('')
                    }, 2000);
                    
                } catch (error) {
                    console.log(error.response.data.errors)
                }
            }
        }
        
    const fetchstuds = async(value)=>{
        try {
            const response = await axios.get('http://192.168.0.102:8000/api/students/'+value);
            const response01 = await axios.get('http://192.168.0.102:8000/api/subjects/'+value);
            // console.log(response01.data)
            setstudent(response.data)
            setsubject(response01.data)
          } catch (error) {
            console.log(error)
          }
    }
    const handlechange = (value) =>{
        const splitone = value.split(' ')[0]
        setrecord({...record, class:value})
        splitone === 'JSS' || splitone === 'SSS' ? setsecondary(1):setsecondary(2)
        fetchstuds(value)
        console.log(value)
    }
    const handler = (value, payload) =>{
        const {label, max, set} = payload
        console.log(error)
        if(value < 0 || isNaN(parseInt(value))){
            seterror({...error, [set]:'Only numbers are allowed'})
            setrecord({...record, [set]:''})
        }
        else if(parseInt(value) > parseInt(max)){
           seterror({...error, [set]:'The value of '+label+' is greater than '+max})
        }
        else{
            setrecord({...record, [set]:value})
            seterror(current => {
                const {[set]:value, ...rest} = current;
                return rest;
              });
              seterror(current => {
                const {submit, ...rest} = current;
                return rest;
              });
        }
    }   
    // console.log(record)
    // console.log(error)

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
                        <h2>Upload Results</h2>
                        <form>
                            <div className='label'>Select Class</div>
                            <select placeholder='Select Class' onChange={(e)=>{handlechange(e.target.value)}}>
                                <option>Select Class</option>
                                {
                                    classes.map(({name},i)=>(
                                        <option key={i} value={name}>{name}</option>
                                    ))
                                }
                            </select>
                            <div className='half'>
                                    <div>
                                        <div className='label'>Session</div>
                                        <select placeholder='Select session' onChange={(e)=>setrecord({...record, acad:e.target.value})}>
                                            <option>Select session</option>
                                            <option value='2022/2023'>2022/2023</option>
                                        </select> 
                                    </div>
                                
                                    <div>
                                        <div className='label'>Term</div>
                                        <select placeholder='Select term' onChange={(e)=>setrecord({...record, term:e.target.value})}>
                                            <option>Select term</option>
                                            <option value='1st'>1st</option>
                                            <option value='2nd'>2nd</option>
                                            <option value='3rd'>3rd</option>
                                        </select>
                                    </div>
                                    
                                </div>
                            <div>
                                <div className='label'>Select Student</div>
                                <select placeholder='Select Student' onChange={(e)=>setrecord({...record, student:e.target.value})}>
                                    <option>Select Student</option>
                                    {
                                        student.map(({pre_sname, pre_fname, pre_adm_no}, i)=>(
                                            <option key={i} value={pre_adm_no}>{pre_sname+' '+pre_fname+'   '+pre_adm_no}</option>
                                        ))
                                    }
                                </select>

                                <div className='label'>Select Subject</div>
                                <select placeholder='Select Subject' onChange={(e)=>setrecord({...record, subject:e.target.value})}>
                                    <option>Select Subject</option>
                                    {
                                        subject.map(({pre_subject})=>(
                                            <option value={pre_subject}>{pre_subject}</option>
                                        ))
                                    }
                                </select>

                                
                                    
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
                                            ''
                                        }
                                    
                                {
                                    secondary === 1 ?
                                    sec.map((sec)=>(
                                        <div key={sec.id}>
                                            <div className='label'>{sec.label}</div>
                                            <input type="number" placeholder={sec.placeholder} onChange={(e)=>{handler(e.target.value, sec)}}/>
                                        </div>
                                    ))
                                    : 
                                    secondary === 2 ?
                                    prim.map((prim)=>(
                                        <div key={prim.id}>
                                            <div className='label'>{prim.label}</div>
                                            <input type="number" style={{border:styles}} placeholder={prim.placeholder}  onChange={(e)=>{handler(e.target.value, prim)}}/>
                                        </div>
                                    ))
                                    :
                                    ''
                                }
                                
                                <button onClick={submit} >Upload</button><span>{msg}</span>
                            </div>
                              
                            
                        </form>
                    </div>
                </div>
                
            </div>
        </div>
    );
}
