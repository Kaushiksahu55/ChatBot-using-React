import React from 'react'
import userIcon from "../assets/user-icon.png"
import logoImage from "../assets/chatgptLogo.svg"
import classes from "../Pages/Home/HomePage.module.css"

function ResponseMessage(props) {
  return (
    <div key={props.index} className={props.isBot ? `${classes.chat} ${classes.bot}` : classes.chat}>
        <img className={classes.chatImage} src={ props.isBot ? logoImage : userIcon} alt=""/>
        <p className={classes.text}>{props.message}</p>
    </div>
  )
}

export default ResponseMessage;