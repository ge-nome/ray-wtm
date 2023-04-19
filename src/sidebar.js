import './App.css';
import {
  useNavigate,
  Link
} from "react-router-dom";
import { useState, useContext } from 'react';
import Input from './components/inputcomp.js';
import logo from './images/logo.jpg'
import {UserContext} from './auth/usercontext';

export default function Sidebar() {
    const {details:{authlev, name,  staffid}} = useContext(UserContext)

    return (
            <div className='sidebar'>
                <p><Link to={'/home'}>Home</Link></p>
                <p><Link to={'/register'}>Register student</Link></p>
                <p><Link to={'/home'}>Upload</Link></p>
            </div>
    );
}
