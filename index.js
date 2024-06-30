import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [userName, setUserName] = useState("");
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [newUserName, setNewUserName] = useState("");

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const name = prompt("Please enter your name:");
    setNewUserName(name);

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    // once wallet is set we can get a reference to our deployed contract
    getATMContract(name);
  };

  const getATMContract = async (name) => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);

    if (name) {
      await atmContract.setName(name);
      setUserName(name);
    }

    getBalance();
  };

  const getBalance = async () => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  };

  const deposit = async () => {
    if (atm) {
      let tx = await atm.deposit(depositAmount);
      await tx.wait();
      getBalance();
    }
  };

  const withdraw = async () => {
    if (atm) {
      let tx = await atm.withdraw(withdrawAmount);
      await tx.wait();
      getBalance();
    }
  };

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>;
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return (
        <button
          onClick={connectAccount}
          style={styles.button}
        >
          Please connect your Metamask wallet
        </button>
      );
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div style={styles.container}>
        <div style={styles.accountInfo}>
          <p><b>Your Name: </b>{userName}</p>
          <p><b>Your Account: </b>{account}</p>
          <p><b>Your Balance:</b> {balance} ETH</p>
        </div>
        <div style={styles.section}>
          <h3>Deposit</h3>
          <input
            type="number"
            placeholder="Amount to Deposit"
            value={depositAmount}
            onChange={(e) => setDepositAmount(Number(e.target.value))}
            style={styles.input}
          />
          <button onClick={deposit} style={styles.button}>Deposit</button>
        </div>
        <div style={styles.section}>
          <h3>Withdraw</h3>
          <input
            type="number"
            placeholder="Amount to Withdraw"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(Number(e.target.value))}
            style={styles.input}
          />
          <button onClick={withdraw} style={styles.button}>Withdraw</button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  const styles = {
    container: {
      backgroundColor: 'aqua',
      borderRadius: '15px',
      padding: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      textAlign: 'center',
      width: '50%',
      margin: 'auto', // Center the container horizontally
      marginTop: '4%', // Center the container vertically (adjust as needed)
    },
    accountInfo: {
      backgroundColor: '#f0f0f0',
      borderRadius: '10px',
      padding: '10px',
      margin: '10px 0',
    },
    section: {
      margin: '20px 0',
    },
    input: {
      padding: '10px',
      margin: '10px 0',
      borderRadius: '5px',
      border: '1px solid #ccc',
      width: '80%',
    },
    button: {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#007bff',
      color: 'white',
      cursor: 'pointer',
    },
    header: {
      textAlign: 'center',
      margin: '20px 0',
      borderRadius: '15px',
      backgroundColor: 'aqua',
      width: '30%',
      margin: 'auto', // Center the container horizontally
      marginTop: '10%', // Center the container vertically (adjust as needed)
    }
  };

  return (
    <main style={styles.main}>
      <header style={styles.header}><h1>Welcome to the Metacrafters ATM!</h1></header>
        
      {initUser()}
    </main>
  );
}
