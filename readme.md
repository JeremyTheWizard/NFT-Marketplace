# Preview

<!-- You can check the live website at: "" -->

[screen-recording.webm](https://user-images.githubusercontent.com/54403738/179410028-dbf01303-f8b8-49e1-9c37-df13b4a8e255.webm)

---

# About

NFT Marketplace that enables the creation, sale, and purchase of ERC721 tokens.

## Main features

- Create NFTs and entire collections easily. (Images and metadata is stored securely in IPFS)
- Put your NFTs on sale for free.
- Keep your NFT at all times during the sale. No need to transfer the NFT to the marketplace. The transaction will take place only when someone purchases your NFT.

# How it works

Sellers and buyers are matched in a database and then are forwarded to the marketplace smart-contract to safely finish the transaction.
Additionally, the website facilitates the view and activity track of your account and entire collections.

---

# How it was built

## Frontend

- React
- Ethers.js
- Tailwind
- Mui

## Blockchain and Smart Contracts

- Solidity
- Brownie
- Ganache

## Backend

- Express
- MongoDB

## Other

- Pinata
- Postman
- Opensea api
- Moralis

---

# How to use

## Requirements

- MongoDB atlas account
- Pinata account
- Moralis server
- Alchemy account
- Etherscan account
- Infura account
- Imgbb account
- Node
- Python
- Brownie
- Ganache
- Git
- Npm or Yarn

## Steps

- Clone this repository: `git clone https://github.com/Mijail-Piekarz/NFT-Marketplace.git`
- Complete the .env files with the corresponding app's api keys and api passwords
- ```
  $ cd backend/brownie

    # deploy de contracts on the blockchain

    $ brownie run deploy.py

    # run the backend

    $ cd ../node
    $ npm i
    $ npm start

    # run the client-side

    $ cd ../../frontend
    $ npm i
    $ npm start
  ```

# Contact me!

<p align="center">
  <a href="whatsapp://send?phone=5491165879953" target="_blank">
  <img alt="Whatsap - Mijail Piekarz" src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white"
  </a>
<p/>
