import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { validName, validEmail, validPassword } from './Regex.js';

const Signup = () => {
    let navigate = useNavigate();
    const [user, setUser] = useState([]);
    const [errors, setErrors] = useState({});

    const inputChange = (e) => {
        // console.log(e.target.value);
        setUser({
            ...user,
            [e.target.name]: e.target.value.trim()
        })
    }

    const signupUserData = (e) => {
        e.preventDefault();

        // Form Validation....
        if (!user.name || user.name === "") {
            setErrors({
                name: "Name must be required*"
            });
            return;
        } else if (!user.name || validName.test(user.name) === false) {
            setErrors({
                name: "Name is not valid(3-20 Char)*"
            });
            return;
        } else if (!user.username || user.username === "") {
            setErrors({
                username: "Username must be required*"
            });
            return;
        } else if (!user.username || validName.test(user.username) === false) {
            setErrors({
                username: "Username is not valid(3-20 Char)*"
            });
            return;
        } else if (!user.email || user.email === "") {
            setErrors({
                email: "Email must be required*"
            });
            return;
        } else if (!user.email || validEmail.test(user.email) === false) {
            setErrors({
                email: "Email is not valid*"
            });
            return;
        } else if (!user.password || user.password === "") {
            setErrors({
                password: "Password must be required*"
            });
            return;
        } else if (!user.password || validPassword.test(user.password) === false) {
            setErrors({
                password: "Password is not valid*"
            });
            return;
        } else {

            // Form Validation is finished....
            let olddata = localStorage.getItem("UserData");
            // console.log("Get Old Items : ", JSON.parse(olddata));
            if (olddata === null) {
                olddata = [];
                olddata.push(user);
                localStorage.setItem("UserData", JSON.stringify(olddata));
                // console.log("Olddata: ", olddata);
            } else {
                let oldArr = JSON.parse(olddata);
                oldArr.push(user);
                localStorage.setItem("UserData", JSON.stringify(oldArr));
                // console.log("OldArr: ", oldArr);
            }
            // console.log("Saved in Local Storage");
            navigate("/login");
        }
    }
   
  return (
    <>
        <div className='container'>
            <h1>SignUp Form</h1>
            <form className='user-form'>
                <input type="text" 
                    name="name" 
                    placeholder='Name' 
                    onChange={e => inputChange(e)}
                />
                { errors.name ? <div className='error'>{errors.name}</div> : <br/> }
                <br/>
                <input type="text" 
                    name="username" 
                    placeholder='Username' 
                    onChange={e => inputChange(e)}
                />
                { errors.username ?  <div className='error'>{errors.username}</div> : <br/> }
                <br/>
                <input type="text" 
                    name="email" 
                    placeholder='Email'
                    onChange={e => inputChange(e)}
                />
                { errors.email ?  <div className='error'>{errors.email}</div> : <br/> }
                <br/>
                <input type="text" 
                    name="password" 
                    placeholder='Password'
                    onChange={e => inputChange(e)}
                />
                { errors.password ?  <div className='error'>{errors.password}</div> : <br/> }
                <br/>
                <button className='btn signup-btn' onClick={e => signupUserData(e)}>Sign Up</button>
                <p>Already SignUp? <Link className='btn already-signup-btn' to={`/login`}>Login</Link></p>
            </form>
        </div>
    </>
  )
}

export default Signup;