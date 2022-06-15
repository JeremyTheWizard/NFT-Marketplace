import NftsForSale from "../models/NftsForSale";
import NftsForSaleNonce from "../models/NftsForSaleNonce";

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
    saleParametersHash,
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
      saleParametersHash,
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

export const getNewNonce = async (req, res, nex) => {
  try {
    const findNonceByIdAndIncrementOne =
      await NftsForSaleNonce.findByIdAndUpdate("62a9d582678306d97373b637", {
        $inc: { nonce: 1 },
      });
    return res
      .status(200)
      .json({ newNonce: findNonceByIdAndIncrementOne.nonce });
  } catch (error) {
    return res.status(400).json({ error });
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
