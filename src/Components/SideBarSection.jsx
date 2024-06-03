import React, { useEffect, useState } from "react";
import BrandLogo from "../assets/chatgpt.svg";
import addButton from "../assets/add-30.png";
import ChatHistory from "./ChatHistory";
import classes from "../Pages/Home/HomePage.module.css";
import LogoutButton from "../assets/log-out.png";
import { auth } from "../Firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import Avatar from "../assets/user.png"

function SideBarSection(props) {
  const navigate = useNavigate();

  const [userName , setUserName] = useState("");

  const [userPhoto , setUserPhoto] = useState(null)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user) {
        setUserName(user.displayName)
        setUserPhoto(user)

        console.log(userPhoto)
      }
      else{
        setUserName("Unknown")
      }
    })
  })

  const [chatHistory, setChatHistory] = useState([
    {
      question: "What is Programming ?",
    },
    {
      question: "What is async await in Javascript?",
    },
    {
      question: "Perform DFS Traversal in C++",
    },
  ]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Log Out Successfully");
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className={classes.sideBar}>
      <div className={classes.upperSide}>
        <div className={classes.upperSideTop}>
          <img src={BrandLogo} alt="" className={classes.logo} />
          <span className={classes.brand}>Coder Connect AI</span>
        </div>

        <button className={classes.midButton} onClick={props.onClick}>
          <img src={addButton} alt="" className={classes.addButton} />
          New Chat
        </button>

        <div className={classes.upperSideButton}>
          {chatHistory.map((chat) => {
            return (
              <ChatHistory
                question={chat.question}
                generateResponse={() => props.ResponseOne(chat.question)}
              />
            );
          })}

        </div>
      </div>
      <div className={classes.lowerSide}>


        <div className={classes.listItems}>
          <button >
            <img src={Avatar} className={classes.avatar} />
            <span className={classes.userName} >{userName}</span>
          </button>
        </div>

        <div className={classes.listItems}>
          <button onClick={handleLogout}>
            <img src={LogoutButton} />
            <span className={classes.buttonText}>Log Out</span>
          </button>
        </div>

        {/* <div className={classes.listItems}>
          <img src={Home} alt="" className={classes.listItemImg} />
          Home
        </div>
        <div className={classes.listItems}>
          <img src={Saved} alt="" className={classes.listItemImg} />
          Saved
        </div>
        <div className={classes.listItems}>
          <img src={Rocket} alt="" className={classes.listItemImg} />
          Upgrade To Pro
        </div> */}
      </div>
    </div>
  );
}

export default SideBarSection;
