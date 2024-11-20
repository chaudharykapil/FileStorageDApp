
import Upload from "../../artifacts/contracts/Upload.sol/Upload.json";
import React from "react";
import { ethers } from "ethers";
import Navbar from "../../Navbar";
import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import "../../Secondfile.css";
import "../level3.css"
import img1 from "../../images/auth/android.png"
import img2 from "../../images/auth/C.png"
import img3 from "../../images/auth/cpp.png"
import img4 from "../../images/auth/dart.png"
import img5 from "../../images/auth/java.png"
import img6 from "../../images/auth/javascript.png"
import img7 from "../../images/auth/python.png"
import img8 from "../../images/auth/R.png"
import img9 from "../../images/auth/ruby.png"
import img10 from "../../images/auth/tensorflow.png"
import {contract_address} from "../../../CONSTANT"


const Level3 = () => {
    const navigate = useNavigate()
    const pass1 = window.localStorage.getItem("temp_password1")
    const pass2 = window.localStorage.getItem("temp_password2")

    if(!pass1){
      navigate("/auth/signup/level1")
    }

    if(!pass2){
      navigate("/auth/signup/level2")
    }

    const [currentWallet,setCurrentWallet] = useState(null)
    const [password,setPassword] = useState("")
    const [contract, setContract] = useState(null);
    const [provider, setProvider] = useState(null);
    const getConnectedWallet = async ()=>{
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        console.log(accounts[0])
        setCurrentWallet(accounts[0])
    }
    
    const [grid, setGrid] = useState(
      Array(16).fill(null) // Initialize a 4x4 grid with nulls
    );
    // Define images
    const images = [
      { id: "1",value:"android", src: img1 },
      { id: "2",value:"c", src: img2 },
      { id: "3",value:"cpp", src: img3 },
      { id: "4",value:"dart", src: img4 },
      { id: "5",value:"java", src: img5},
      { id: "6",value:"javascript", src: img6 },
      { id: "7",value:"python", src: img7 },
      { id: "8",value:"r", src: img8 },
      { id: "9",value:"ruby", src: img9},
      { id: "10",value:"tensorflow", src: img10 }
    ];

    useEffect(() => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      let isRequestingAccounts = false;
      const loadProvider = async () => {
        if (provider) {
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });
  
          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });
  
          if (!isRequestingAccounts) {
            isRequestingAccounts = true;
            try {
              // await provider.send("eth_requestAccounts", []);
              const signer = provider.getSigner();
              const address = await signer.getAddress();
              setCurrentWallet(address) 
              let contractAddress = contract_address;
              const contract = new ethers.Contract(contractAddress, Upload.abi, signer);
              setContract(contract);
              setProvider(provider);
            } catch (error) {
              console.error("Error requesting accounts:", error);
            } finally {
              isRequestingAccounts = false;
            }
          }
        } else {
          console.error("Metamask is not installed");
        }
      };
  
      provider && loadProvider();
    }, []);
  
    // Randomly place images in the grid
    React.useEffect(() => {
      getConnectedWallet()
      const randomizedGrid = [...grid];
      const availableIndices = [...Array(16).keys()]; // [0, 1, 2, ..., 15]
      console.log(randomizedGrid)
      images.forEach((image) => {
        const randomIndex = Math.floor(Math.random() * availableIndices.length);
        const cellIndex = availableIndices.splice(randomIndex, 1)[0];
        console.log(cellIndex)
        randomizedGrid[cellIndex] = image;
      });
      setPassword(createPassword(randomizedGrid))
      setGrid(randomizedGrid);
    }, []); // Run only once on component mount
  
    const handleDragStart = (e, index) => {
      e.dataTransfer.setData("draggedIndex", index);
    };
  
    const handleDrop = (e, index) => {
      const draggedIndex = parseInt(e.dataTransfer.getData("draggedIndex"), 10);
  
      if (draggedIndex !== index) {
        const updatedGrid = [...grid];
        [updatedGrid[draggedIndex], updatedGrid[index]] = [
          updatedGrid[index],
          updatedGrid[draggedIndex]
        ];
        setGrid(updatedGrid);
        const t = createPassword(updatedGrid)
        setPassword(t)
        console.log(updatedGrid)
      }
    };
    
    const handleDragOver = (e) => {
      e.preventDefault();
    };
    const createPassword = (data)=>{
      let t = ""
      data.forEach((val,idx)=>{
        if(val){
          console.log(val.value)
          t += val.value
        }
      })
      return t
    }
    const storePassword  = ()=>{
      
    }
    const signup = ()=>{
      const signer = contract.connect(provider.getSigner());
      const res = signer.register(pass1,pass2,password);
      res.then(v=>{
        navigate("/auth/signin/level1")
      },err=>{
        console.log(err)
      })
    }
  return (
    <>
      {/* Navbar section */}
      <div className="navbar-section">
        <Navbar />
      </div>

      <div className="file-container" style={{height:"100vh",width:"100vw",display:"flex",rowGap:"2rem",flexDirection:"column",justifyContent:"center", alignItems:"center"}}>
        <div className="grid-container">
          {grid.map((cell, index) => (
            <div
              key={index}
              className="grid-cell"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
            >
              {cell && (
                <img
                  src={cell.src}
                  alt={`Image ${cell.id}`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                />
              )}
            </div>
          ))}
        </div>
        <div>
          <input type="password" disabled value={password} style={{color: "white",border: "2px solid #8707ff",borderRadius: "10px",padding: "10px 25px",background: "transparent",width: "30rem"}} />
        </div>
        <div>
            <input type="button" onClick={signup} style={{backgroundColor:"#8707ff",padding:"10px 20px",border:"none",borderColor:"#8707ff", borderRadius:"10px"}} value={"Signup"}/>
        </div>
      </div>
    </>
  );
};

export default Level3;

