import simage from '../stud3.webp'
import React from 'react';
import {Link} from 'react-router-dom';
function Signup() {
  return (
    <div className='App'>
        <div className="main-container">
            <div className="img">
                <img src={simage} alt="" />
            </div>
            <div className="form">
                <div>
                    <h1>Sign Up</h1>
                    <form className='sforms'>
                        <div>
                            <input type="text" placeholder="Email"></input>
                            <input type="text" placeholder="Staff ID"></input>
                            <input type="text" placeholder="Password"></input>
                            <input type="text" placeholder="Confirm Password"></input>
                            <button className='signin'>Login</button>
                            <p>OR</p>

                            <Link to='/' className='signup' >Sign in</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Signup;
