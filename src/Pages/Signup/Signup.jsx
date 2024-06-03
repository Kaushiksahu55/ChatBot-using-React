import React, { useState } from "react";
import classes from "./Signup.module.css";
import InputControl from "../Input/InputControl";
import { Link, redirect, useNavigate } from "react-router-dom";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth"
import { auth } from "../../Firebase";

function Signup() {

  const navigate = useNavigate()

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error , setError] = useState("");
  const [sumbitButtonDisabled , setSumbitButtonDisabled] = useState(false)

  const HandleSignup = async() => {
    if(!values.name || !values.email || !values.password){
      setError("Please Fill All Fields");
      return;
    }

    try{
      setSumbitButtonDisabled(true)
      const response = await createUserWithEmailAndPassword(auth , values.email , values.password)
  
      //console.log(response)
      setSumbitButtonDisabled(false)

      const user = response.user

      await updateProfile(user , {
        displayName: values.name 
      })

      navigate('/home')
    }catch(err){
      setSumbitButtonDisabled(false)
      setError(err.message)
    }
  }
  return (
    <div className={classes.containerBox}>
      <div className={classes.innerBox}>
        <h1 className={classes.innerHeading}>Sign Up</h1>
        <p className= {classes.errorMessage}>{error}</p>
        <InputControl
          lable="Name"
          placeholder="Enter Your Name"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          }
        />
        <InputControl
          lable="Email"
          placeholder="Enter Your Email"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
        />
        <InputControl
          lable="Password"
          placeholder="Enter Your Password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, password: event.target.value }))
          }
        />

        <div className={classes.footer}>
          <button disabled = {sumbitButtonDisabled} onClick={HandleSignup}> {sumbitButtonDisabled ? "Signing In..." : "SIGN UP"}</button>
          <p>
            Already Have a Account ?
            <span>
              <Link to="/">Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
