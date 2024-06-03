import React from 'react'
import messageIcon from "../assets/message.svg"
import classes from "../Pages/Home/HomePage.module.css"

function ChatHistory(props) {
  return (
    <div>
        <button className={classes.queryButton} onClick={props.generateResponse}>
            <img src={messageIcon} className= {classes.queryImg}/>
            
           {props.question}
        </button>
    </div>
  )
}

export default ChatHistory