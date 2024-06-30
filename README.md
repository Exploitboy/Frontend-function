# Function Frontened Solidity Project :

The Assessment Solidity Smart Contract is a blockchain-based application written in Solidity, designed to provide a secure and transparent way for users to manage their balances, set user names, deposit Ether, and withdraw funds. In the same way index javascript file create a frontened for the users to interact with their smart contract.
This README FILE provides an overview of the contract's functionalities and instructions for setting up and using the contract.

## Description

The Assessment Solidity Smart Contract serves as the backbone of a decentralized application (dApp) that allows users to interact with Ethereum blockchain features.

It includes the following key functionalities:
* Balance Management: Users can check their current balances on the blockchain.
* User Name Setting: Users can set their names associated with their Ethereum addresses.
* Deposit Ether: Users can deposit Ether into their accounts, which gets recorded on the blockchain.
* Withdraw Funds: Users can withdraw funds from their accounts, ensuring proper balance checks and error handling.
* The contract utilizes Solidity's features such as events, error handling with require and revert statements, and access control through owner verification.
*  These features ensure the contract's reliability, security, and user-friendliness.

## Frontened interaction
The index.js file provided in this repository serves as the frontend component of the application, allowing users to interact with the deployed smart contract using a web interface. 
Here are the key functionalities of index.js:

* Connect Metamask Wallet: Users can connect their MetaMask wallets to the dApp.
* Set User Name: Users can set their names associated with their Ethereum addresses.
* Deposit Ether: Users can deposit Ether into their accounts via the frontend interface.
* Withdraw Funds: Users can initiate fund withdrawals directly from the frontend.
* The index.js file uses ethers.js library to interact with the Ethereum blockchain, providing a seamless user experience for managing balances and transactions.
## Getting Started

### Installing

To use this smart contract, you need to have a Solidity development environment set up. You can download the code directly or clone the repository:
```
git clone (https://github.com/Exploitboy/Frontend-function)
```
### Executing program

After cloning the github, you will want to do the following to get the code running on your computer.

1. Inside the project directory, in the terminal type: npm i
2. Open two additional terminals in your VS code
3. In the second terminal type: npx hardhat node
4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
5. Back in the first terminal, type npm run dev to launch the front-end.

After this, the project will be running on your localhost. 
Typically at http://localhost:3000/

## Help
If you encounter any issues or have questions about using the smart contract, please contact [aksv67890@gmail.com].

## Authors

* Ashish sv
* [aksv67890@gmail.com]
