import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ethers } from "ethers";
import Firstpage from "./components/Firstpage";
import Secondpage from "./components/Secondpage";

import "./App.css";
import contract_data from "./components/artifacts/contracts/Upload.sol/Upload.json"

import { contract_address } from "./CONSTANT";
import SignupLevel1 from "./components/auth/signup/Level1";
import SignupLevel2 from "./components/auth/signup/Level2";
import SignupLevel3 from "./components/auth/signup/Level3";

import SigninLevel1 from "./components/auth/signin/Level1";
import SigninLevel2 from "./components/auth/signin/Level2";
import SigninLevel3 from "./components/auth/signin/Level3";

const App = () => {
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const connectToContract = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractAddress = contract_address; // replace with your contract address
        const abi = contract_data.abi
        const contractInstance = new ethers.Contract(
          contractAddress,
          abi,
          signer
        );
        setContract(contractInstance);
      } catch (error) {
        console.error(error);
      }
    };

    connectToContract();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Firstpage />} />
        <Route path="/auth/signup/level1" element={<SignupLevel1 />} />
        <Route path="/auth/signup/level2" element={<SignupLevel2 />} />
        <Route path="/auth/signup/level3" element={<SignupLevel3 />} />
        <Route path="/auth/signin/level1" element={<SigninLevel1 />} />
        <Route path="/auth/signin/level2" element={<SigninLevel2 />} />
        <Route path="/auth/signin/level3" element={<SigninLevel3 />} />
        <Route path="/Secondpage" element={<Secondpage />} />
      </Routes>
    </>
  );
};

export default App;
