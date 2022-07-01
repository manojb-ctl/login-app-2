import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { validName, validEmail, validPassword } from "./Regex.js";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const signupUserData = (userData) => {
    // console.log("FormData: ", userData);
    let olddata = localStorage.getItem("UserData");

    if (olddata === null) {
      olddata = [];
      olddata.push(userData);
      localStorage.setItem("UserData", JSON.stringify(olddata));
    } else {
      let oldArr = JSON.parse(olddata);
      oldArr.push(userData);
      localStorage.setItem("UserData", JSON.stringify(oldArr));
    }

    toast.success("Successfully SignUp");
    navigate("/login");
  };

  return (
    <>
      <div className="container">
        <h1>SignUp Form</h1>

        <form className="user-form" onSubmit={handleSubmit(signupUserData)}>
          <input
            placeholder="Name"
            {...register("name", {
              required: true,
              pattern: validName,
            })}
          />
          <br />
          {errors?.name?.type === "required" && (
            <div className="error">Name must be required*</div>
          )}
          {errors?.name?.type === "pattern" && (
            <div className="error">Name is not valid(3-20 Char)*</div>
          )}
          <br />

          <input
            placeholder="Username"
            {...register("username", {
              required: true,
              pattern: validName,
            })}
          />
          <br />
          {errors?.username?.type === "required" && (
            <div className="error">Username must be required*</div>
          )}
          {errors?.username?.type === "pattern" && (
            <div className="error">Userame is not valid(3-20 Char)*</div>
          )}
          <br />

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

          <input type="submit" className="btn signup-btn" value="Sign Up" />
          <p>
            Already SignUp?{" "}
            <Link className="btn already-signup-btn" to={`/login`}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Signup;
