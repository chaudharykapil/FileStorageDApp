

import React from "react";

import Navbar from "../../Navbar";
import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import "../../Secondfile.css";

const Level1 = () => {
    const navigate = useNavigate()
    const [currentWallet,setCurrentWallet] = useState(null)
    const [password,setPassword] = useState("")
    const getConnectedWallet = async ()=>{
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        console.log(accounts[0])
        setCurrentWallet(accounts[0])
    }
    getConnectedWallet()
    const storePassword = ()=>{
        window.localStorage.setItem("temp_password1",password)
        navigate("/auth/signup/level2")
    }
  return (
    <>
      {/* Navbar section */}
      <div className="navbar-section">
        <Navbar />
      </div>

      <div className="file-container" style={{height:"100vh",display:"flex",rowGap:"2rem",flexDirection:"column",justifyContent:"center", alignItems:"center"}}>
            <div style={{textAlign:"center",marginBottom:"3rem"}}>
                <h2 style={{color:"white"}}>Enter the Password for your Account</h2>
            </div>
            <div>
                <div style={{color:"white",marginBottom:"10px"}}><lable for = "username">Username</lable></div>
                <input id="username" value={currentWallet} disabled style={{color: "white",border: "2px solid #8707ff",borderRadius: "10px",padding: "10px 25px",background: "transparent",width: "30rem"}} />
            </div>
            <div>
                <div style={{color:"white",marginBottom:"10px"}}><lable for = "username">Password</lable></div>
                <input type="password" value={password} onChange={(ev)=>{setPassword(ev.target.value)}} style={{color: "white",border: "2px solid #8707ff",borderRadius: "10px",padding: "10px 25px",background: "transparent",width: "30rem"}} />
            </div>
            <div>
                <input type="button" onClick={storePassword} style={{backgroundColor:"#8707ff",padding:"10px 20px",border:"none",borderColor:"#8707ff", borderRadius:"10px"}} value={"Next"}/>
            </div>
      </div>
      

      
    </>
  );
};

export default Level1;
