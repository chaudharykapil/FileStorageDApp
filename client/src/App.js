import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ethers } from "ethers";
import Firstpage from "./components/Firstpage";
import Secondpage from "./components/Secondpage";

import "./App.css";
import contract_data from "./components/artifacts/contracts/Upload.sol/Upload.json"

import { contract_address } from "./CONSTANT";

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
        <Route path="/Secondpage" element={<Secondpage />} />
      </Routes>
    </>
  );
};

export default App;
