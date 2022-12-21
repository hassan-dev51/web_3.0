import React, { useState, useEffect, createContext } from "react";
import { ethers } from "ethers";

import { contractAbi, contractAddress } from "../utils/constant";
import { useContext } from "react";

export const context = createContext();

const { ethereum } = window;
//function to getethereumcontract
const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractAbi,
    signer
  );

  return transactionContract;
};

export const TransactionContext = ({ children }) => {
  const [currentAcount, setCurrentAcount] = useState("");
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCounter, setTransactionCounter] = useState(
    localStorage.getItem("transaction")
  );
  const handleChange = (e, name) => {
    setFormData((preState) => ({ ...preState, [name]: e.target.value }));
  };
  //!function to check the wallet is installed or not
  const checkIfWalletAvailable = async () => {
    try {
      if (!ethereum)
        return alert("Wallet not available Please install metamask wallet");
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAcount(accounts[0]);
      } else {
        console.log("No accounts checkifwallet available");
      }
    } catch (error) {
      console.log(error);
    }
  };
  //*function to connect wallet
  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAcount(accounts[0]);
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };
  //?function to send transaction
  const sendTransaction = async () => {
    try {
      if (!ethereum)
        return alert("Please install the meta mask before sending transaction");

      const { addressTo, amount, keyword, message } = formData;
      const ethereumContract = getEthereumContract();

      const parsedAmount = ethers.utils.parseEther(amount);

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAcount,
            to: addressTo,
            gas: "0x5208",
            value: parsedAmount._hex,
          },
        ],
      });
      const hashTransaction = await ethereumContract.addToBlockchain(
        addressTo,
        parsedAmount,
        message,
        keyword
      );
      setIsLoading(true);
      console.log(`loadTransaction: ${hashTransaction.hash}`);

      setIsLoading(false);
      console.log(`success: ${hashTransaction.hash}`);

      const transactionCount = await ethereumContract.countTransactions();
      setTransactionCounter(transactionCount.toNumber());
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    checkIfWalletAvailable();
  }, []);
  return (
    <context.Provider
      value={{
        connectWallet,
        currentAcount,
        sendTransaction,
        handleChange,
        formData,
      }}
    >
      {children}
    </context.Provider>
  );
};

export const useTransactionContext = () => {
  return useContext(context);
};
