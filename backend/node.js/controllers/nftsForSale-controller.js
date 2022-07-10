import axios from "axios";
import dotenv from "dotenv";
import FormData from "form-data";
import NftsForSale from "../models/NftsForSale";
import NftsForSaleNonce from "../models/NftsForSaleNonce";

dotenv.config();

export const getNftsForSale = async (req, res, next) => {
  console.log("Initializing getNftsForSale...");
  const { limit, page } = req.query;

  let nftsForSale = [];
  try {
    console.log("Fetching nfts for sale...");
    nftsForSale = await NftsForSale.paginate(
      {},
      { limit: limit || 20, page: page || 0 }
    ).then((res) => res.docs);
    console.log("🚀 ~ NftsForSale", NftsForSale);
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
  const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
  const data = new FormData();
  data.append("file", file.file.data, req.body.name);

  let response = null;
  try {
    response = await axios.post(url, data, {
      maxContentLength: -1,
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: process.env.PINATA_API_KEY,
        pinata_secret_api_key: process.env.PINATA_API_SECRET,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false });
  }

  const metadata = {
    name: req.body.name,
    collection: req.body.collection,
    description: req.body.description,
    image: "ipfs://" + response.data.IpfsHash,
    attributes: JSON.parse(req.body.attributes),
  };
  const jsonUrl = "https://api.pinata.cloud/pinning/pinJSONToIPFS";
  try {
    const jsonResponse = await axios.post(jsonUrl, metadata, {
      headers: {
        "Content-Type": "application/json",
        pinata_api_key: process.env.PINATA_API_KEY,
        pinata_secret_api_key: process.env.PINATA_API_SECRET,
      },
    });
    return res.status(200).json({
      imageCID: response.data.IpfsHash,
      tokenURICID: jsonResponse.data.IpfsHash,
      tokenURI: "ipfs://" + jsonResponse.data.IpfsHash,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false });
  }
};

export const removeTokenURI = async (req, res) => {
  console.log("🚀 ~ req.body", req.body);
  const { imageCID, tokenURICID } = req.body;
  console.log("🚀 ~ tokenURICID2", tokenURICID);
  console.log("🚀 ~ imageCID2", imageCID);

  const removeFileFromPinata = async (CID) => {
    console.log("🚀 ~ CID!", CID);
    var config = {
      method: "delete",
      url: "https://api.pinata.cloud/pinning/unpin/" + CID,
      headers: {
        pinata_api_key: process.env.PINATA_API_KEY,
        pinata_secret_api_key: process.env.PINATA_API_SECRET,
      },
    };

    try {
      const response = await axios(config);
      console.log("🚀 ~ response", response);
    } catch (error) {
      console.log(error);
    }
  };

  const response = {
    removeImage: { success: true },
    removeTokenURI: { success: true },
  };

  try {
    removeFileFromPinata(imageCID);
  } catch (error) {
    console.log(error);
    response.removeImage.success = false;
  }

  try {
    removeFileFromPinata(tokenURICID);
  } catch (error) {
    console.log(error);
    response.removeTokenURI.success = false;
  }

  if (
    response.removeImage.success === true &&
    response.removeTokenURI.success === true
  ) {
    return res.status(200).json({ success: true, response });
  } else if (
    response.removeImage.success === false &&
    response.removeTokenURI.false === false
  ) {
    return res.status(400).json({ success: failed, response });
  }
  return res.status(200).json({ success: false, response });
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
