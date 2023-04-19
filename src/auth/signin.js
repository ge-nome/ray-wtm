import simage from '../stud3.webp'
import {Link, useNavigate} from 'react-router-dom'
import {useState, useEffect, useContext} from 'react'
import {UserContext} from '../auth/usercontext'
import Details from '../main/details'


function Signin() {
    // states
    const [success, setsuccess] = useState('Log in')
    const [clicked, setclicked] = useState(0)
    const nav = new useNavigate()
    const {details, setDetails} = useContext(UserContext) 
    useEffect(() => {
        // localStorage.setItem('logs', JSON.stringify(details))
        const truth = localStorage.getItem('logs');
        if(truth){
            const kept = JSON.parse(localStorage.getItem('logs'))
            const {credentials:{name, idnumber, level}} = kept
            const{ token } = kept
            console.log(name)
            console.log(token)
            setDetails({
                name:name,
                authlev:parseInt(level),
                idnumber: idnumber
            })
            if(level === undefined || level === '0'){
                nav('/')
            }
        }
    }, [])
    const log =  (e) => {
        e.preventDefault()
        setsuccess('Signing in')
        setclicked(1)
        var axios = require('axios');
        var qs = require('qs');
        var data = qs.stringify(pack);
        var config = {
        method: 'post',
        url: 'http://geo.vensle.com/api/login',
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
        };

        axios(config)
        .then(function (response) {
            
            const {name, idnumber, level} = response.data.credentials
            setDetails(...details, {
                name:name,
                authlev:level,
                idnumber: idnumber,
            })
            // localStorage.setItem('logs', 'kkkk')
            console.log(JSON.stringify(response.data));
                if(level === undefined || level === '0'){
                    setsuccess('You have not yet been approved')
                }
                else{
                    nav('/dashboard')
                    console.log('success')
                }
                
        })
        .catch(function (error) {
            setsuccess('Invalid email or password')
            setclicked(1)
        console.log(error);
        });
    }
    const [pack, setpack] = useState('')
  return (
    <div className='App'>
        <div className="main-container">
            <div className="img">
                <img src={simage} alt="" />
            </div>
            <div className="form">
                <div>
                    <h1>USIMS</h1>
                    <h2>Sign In</h2>
                    <p>Sign in to your account</p>
                    <form className='sforms'>
                        <div>
                            <input type="text" placeholder="Staff ID" onChange={(e)=>{setpack({...pack, idnumber:e.target.value}); console.log(pack.email)}}></input>
                            <input type="password" placeholder="Password" onChange={(e)=>{setpack({...pack, password: e.target.value}); console.log(pack.password)}}></input>
                            <button className='signin' onClick={log}>{success}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Signin;
