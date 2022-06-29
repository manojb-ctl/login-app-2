import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { validEmail, validPassword } from './Regex.js';

const Login = () => {
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
    const loginUserData = (e) => {
        e.preventDefault();

        // Form Validation....
        if (!user.email || user.email === "") {
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

            // Form Validation is finished then check UseData with Localstorage data....
            setErrors({});
            let getData = localStorage.getItem("UserData");
            let myData = JSON.parse(getData);
            // console.log("Local Storage Data: ", myData);

            const foundUser = myData.find((element) => (
                element.email === user.email && element.password === user.password
            ));
            // console.log("foundUser: ", foundUser);
            if (foundUser) {
                // console.log("working");
                navigate("/home", {state:{name:foundUser.name}});
            } else {
                // console.log("not working");
                alert("Enter valid credentials!");
            }
        }
    }

  return (
    <>
        <div className='container'>
            <h1>Login Form</h1>
            <form className='user-form'>
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
                <button className='btn signup-btn' onClick={e => loginUserData(e)}>Login</button>
                <p>Not a member? <Link className='btn already-signup-btn' to={`/`}>Sign Up</Link></p>
            </form>
        </div>
    </>
  )
}

export default Login;