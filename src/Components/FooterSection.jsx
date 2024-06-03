import React from 'react'
import sendButton from "../assets/send.svg"
import classes from "../Pages/Home/HomePage.module.css"

function FooterSection(props) {
  return (
    <div className={classes.chatFooter}>
        <div className={classes.input}>
            <input type="text" name="" id="" placeholder='Message Coder Connect ...' onChange={props.onChange} value={props.value} onKeyDown={props.onKeyDown}/>
              <button className={classes.send} onClick={props.onClick}>
                <img src={sendButton} alt="send"/>
              </button>
        </div>
        <p>Coder Connect may produce inaccurate information about people , or facts . Coder Connect Novermber Version </p>
    </div>
  )
}

export default FooterSection