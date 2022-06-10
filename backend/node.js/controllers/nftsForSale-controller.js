import NftsForSale from "../models/NftsForSale";

export const getNftsForSale = async (req, res, next) => {
  let nftsForSale = [];
  try {
    nftsForSale = await NftsForSale.find();
  } catch (error) {
    return res.status(404).send(error.message);
  }
  return res.status(200).json({ nftsForSale });
};

export const addNftForSale = async (req, res, next) => {
  const { contract, tokenId } = req.body;
  console.log("done");
  const nftForSale = new NftsForSale({
    contract,
    tokenId,
  });

  try {
    await nftForSale.save();
  } catch (error) {
    console.log(error);
    return res.status(404).send(error.message);
  }
  return res.status(201).json({ nftForSale });
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
  const id = req.params.id;
  let nft;
  try {
    nft = await NftsForSale.findByIdAndRemove(id);
  } catch (error) {
    console.log(error);
  }
  if (!nft) {
    res.status(500).json({ message: "Unable to delete" });
  }
  return res.status(200).json({ message: "Successfully deleted" });
};
