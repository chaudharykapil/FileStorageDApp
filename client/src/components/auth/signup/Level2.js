

import React from "react";

import Navbar from "../../Navbar";
import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import "../../Secondfile.css";

const Level2 = () => {
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
    const createpassword = (val)=>{
      setPassword(password+val)
    }
    const storePassword = ()=>{
        window.localStorage.setItem("temp_password2",password)
        navigate("/auth/signup/level3")

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
        <div style={{display:"flex",flexDirection:"column", rowGap:"1rem", width:"40%"}}>
          <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
            <div onClick={()=>createpassword("red")} style={{borderRadius:"6rem",backgroundColor:"red",width:"4rem",height:"4rem"}}></div>
            <div onClick={()=>createpassword("orange")} style={{borderRadius:"6rem",backgroundColor:"orange",width:"4rem",height:"4rem"}}></div>
            <div onClick={()=>createpassword("Green")} style={{borderRadius:"6rem",backgroundColor:"Green",width:"4rem",height:"4rem"}}></div>
          </div>
          <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
            <div onClick={()=>createpassword("blue")} style={{borderRadius:"6rem",backgroundColor:"blue",width:"4rem",height:"4rem"}}></div>
            <div onClick={()=>createpassword("indigo")} style={{borderRadius:"6rem",backgroundColor:"indigo",width:"4rem",height:"4rem"}}></div>
            <div onClick={()=>createpassword("yellow")} style={{borderRadius:"6rem",backgroundColor:"yellow",width:"4rem",height:"4rem"}}></div>
          </div>
          <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
            <div onClick={()=>createpassword("white")} style={{borderRadius:"6rem",backgroundColor:"white",width:"4rem",height:"4rem"}}></div>
            <div onClick={()=>createpassword("skyblue")} style={{borderRadius:"6rem",backgroundColor:"skyblue",width:"4rem",height:"4rem"}}></div>
            <div onClick={()=>createpassword("teal")} style={{borderRadius:"6rem",backgroundColor:"teal",width:"4rem",height:"4rem"}}></div>
          </div>
        </div>
        <div>
          <input type="password" value={password} style={{color: "white",border: "2px solid #8707ff",borderRadius: "10px",padding: "10px 25px",background: "transparent",width: "30rem"}} />
        </div>
        <div>
            <input type="button" onClick={storePassword} style={{backgroundColor:"#8707ff",padding:"10px 20px",border:"none",borderColor:"#8707ff", borderRadius:"10px"}} value={"Next"}/>
          </div>
      </div>
      

      
    </>
  );
};

export default Level2;

