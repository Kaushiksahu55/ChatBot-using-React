import React from 'react'
import classes from "./InputControl.module.css"
function InputControl(props) {
  return (
    <div className={classes.input}>
        {props.lable && <label className={classes.InputControlLabel}>{props.lable}</label>}
        <input className = {classes.InputControlInput} type = "text" {...props} />
    </div>
  )
}

export default InputControl