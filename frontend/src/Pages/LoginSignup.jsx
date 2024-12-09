import React, { useState } from 'react'
import './CSS/LoginSignup.css'

const LoginSignup = () => {

    const [state,setState] = useState("Login");

    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state==="Sign Up"?<input type="text" placeholder='Your Name' />:<></>}
                    <input type="text" placeholder='Email Address' />
                    <input type="text" placeholder='Password' />
                </div>
                <button>Continue</button>
                {state==="Sign Up"
                ?<p className="loginsignup-login">Already have an account? <span onClick={()=>{setState("Login")}}>Login here!</span></p>
                :<p className="loginsignup-login">Don't have an account? <span onClick={()=>{setState("Sign Up")}}>Sign up here!</span></p>
                }
                <div className="loginsignup-agree">
                    <input type="checkbox" name='' id='' />
                    <p>By continuing, i agree to the terms of use & privacy policy.</p>
                </div>
            </div>
        </div>
    )
}

export default LoginSignup