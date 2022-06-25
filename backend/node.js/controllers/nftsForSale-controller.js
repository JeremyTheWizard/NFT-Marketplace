import axios from "axios";
import dotenv from "dotenv";
import FormData from "form-data";
import NftsForSale from "../models/NftsForSale";
import NftsForSaleNonce from "../models/NftsForSaleNonce";

dotenv.config();

export const getNftsForSale = async (req, res, next) => {
  let nftsForSale = [];
  try {
    nftsForSale = await NftsForSale.find();
  } catch (error) {
    return res.status(404).send(error.message);
  }
  return res.status(200).json({ nftsForSale });
};

export const getNftForSale = async (req, res, next) => {
  const contract = req.params.contract;
  const tokenId = req.params.tokenid;
  let nftForSale;
  try {
    nftForSale = await NftsForSale.find({
      contract: contract,
      tokenId: tokenId,
    });
  } catch (error) {
    return res.status(404).send(error.message);
  }
  return res.status(200).json({ nftForSale });
};

export const addNftForSale = async (req, res, next) => {
  const {
    tokenContractAddress,
    tokenId,
    price,
    seller,
    nonce,
    marketplaceAddress,
    sellerSignature,
  } = req.body;

  let nftForSale;
  const exists = await NftsForSale.findOne({
    tokenContractAddress,
    tokenId,
    seller,
  });

  if (!exists) {
    nftForSale = new NftsForSale({
      tokenContractAddress,
      tokenId,
      price,
      seller,
      nonce,
      marketplaceAddress,
      sellerSignature,
    });
  } else {
    return res.status(400).send("NFT already exists");
  }

  try {
    await nftForSale.save();
    return res.status(201).json({ nftForSale });
  } catch (error) {
    console.log(error);
    return res.status(404).send(error.message);
  }
};

export const getNonce = async (req, res, nex) => {
  try {
    const nonce = await NftsForSaleNonce.findOne();
    return res.status(200).json({ nonce: nonce.nonce });
  } catch (error) {
    return res.status(400).json({ success: false });
  }
};

export const createTokenURI = async (req, res, next) => {
  const file = req.files;
  console.log(req.body);
  const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
  const data = new FormData();
  data.append("file", file.file.data, { filepath: "anyname" });
  const result = await axios.post(url, data, {
    maxContentLength: -1,
    headers: {
      "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
      pinata_api_key: process.env.PINATA_API_KEY,
      pinata_secret_api_key: process.env.PINATA_API_SECRET,
      path: "somename",
    },
  });

  //const metadata = {"name": , "collection": , "description": ,image: response.data.IpfsHash }
};

export const incrementNonce = async (req, res, nex) => {
  try {
    await NftsForSaleNonce.findOneAndUpdate(
      {},
      {
        $inc: { nonce: 1 },
      }
    );
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false });
  }
};

export const updateNftsForSale = async (req, res, next) => {
  const id = req.params.id;
  const { contract, tokenId } = req.body;
  let nft;
  try {
    nft = await NftsForSale.findByIdAndUpdate(id, {
      contract,
      tokenId,
    });
    console.log(`contract = ${contract}`);
    return res.status(200).json({ nft });
  } catch (error) {
    console.log(error);
  }
  if (!nft) {
    res.status(500).json({ message: "Unable to update" });
  }
  return res.status(200).json({ nft });
};

export const deleteNftForSale = async (req, res, next) => {
  const contract = req.params.contract;
  const tokenId = req.params.tokenid;
  let nft;
  try {
    nft = await NftsForSale.findOneAndRemove({
      contract: contract,
      tokenId: tokenId,
    });
  } catch (error) {
    console.log(error);
  }
  if (!nft) {
    return res.status(500).json({ message: "Unable to delete" });
  }
  return res.status(200).json({ message: "Successfully deleted" });
};
