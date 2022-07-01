import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { validEmail, validPassword } from "./Regex.js";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = (props) => {
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginUserData = (userData) => {
    // check UseData with Localstorage data....
    let getData = localStorage.getItem("UserData");
    let myData = JSON.parse(getData);
    // console.log("Local Storage Data: ", myData);

    const foundUser = myData.find(
      (element) =>
        element.email === userData.email &&
        element.password === userData.password
    );
    // console.log("foundUser: ", foundUser);
    if (foundUser) {
      toast.success("Successfully Login!");
      props.setUser(true);
      navigate("/home", { state: { name: foundUser.name } });
    } else {
      toast.error("Enter valid credentials!");
    }
  };

  return (
    <>
      <div className="container">
        <h1>Login Form</h1>
        <form className="user-form" onSubmit={handleSubmit(loginUserData)}>
          <input
            placeholder="Email"
            {...register("email", {
              required: true,
              pattern: validEmail,
            })}
          />
          <br />
          {errors?.email?.type === "required" && (
            <div className="error">Email must be required*</div>
          )}
          {errors?.email?.type === "pattern" && (
            <div className="error">Email is not valid*</div>
          )}
          <br />

          <input
            placeholder="Password"
            {...register("password", {
              required: true,
              pattern: validPassword,
            })}
          />
          <br />
          {errors?.password?.type === "required" && (
            <div className="error">Password must be required*</div>
          )}
          {errors?.password?.type === "pattern" && (
            <div className="error">Password is not valid*</div>
          )}
          <br />

          <input type="submit" className="btn signup-btn" value="Login" />
          <p>
            Not a member?{" "}
            <Link className="btn already-signup-btn" to={`/`}>
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
