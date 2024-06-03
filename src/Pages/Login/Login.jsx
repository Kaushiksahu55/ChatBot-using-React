import React, { useState } from "react";
import classes from "./Login.module.css";
import InputControl from "../Input/InputControl";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../Firebase";

function Login() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const [disabled, setDisabled] = useState(false);

  const handleLogin = async () => {

    console.log("Clicked")
    if (!values.email && !values.password) {
      setError("Fill All Fields");
      return;
    }

    try {
      setDisabled(true);
      const response = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      setDisabled(false);

      const user = response.user;

      await updateProfile(user, {
        displayName: values.name,
      });

      navigate("/home");
    } catch (err) {
      setDisabled(false);
      setError(err.message);
    }
  };

  return (
    <div className={classes.containerBox}>
      <div className={classes.innerBox}>
        <h1 className={classes.innerHeading}>Login</h1>
        <p className={classes.errorMessage}>{error}</p>

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
          <button disabled={disabled} onClick={handleLogin}>
            {disabled ? "Loging in..." : "LOGIN"}
          </button>
          <p>
            Create Account
            <span>
              <Link to="/signup">SignUp</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

