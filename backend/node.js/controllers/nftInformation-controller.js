import NftInformation from "../models/NftInformation";

export const getNftsInformation = async (req, res, next) => {
  try {
    const nfts = await NftInformation.find();
    res.status(200).json({ nfts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getNftInformation = async (req, res, next) => {
  const contract = req.params.contract;
  const tokenId = req.params.tokenid;

  let nftInformation = [];

  try {
    nftInformation = await NftInformation.find({
      contract: contract,
      tokenId: tokenId,
    });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
  return res.status(200).json({ nftInformation });
};

export const addNftInformation = async (req, res, next) => {
  const { contract, tokenId } = req.body;
  const nftInformation = new NftInformation({
    contract,
    tokenId,
    likeCount: 1,
    required: true,
  });

  try {
    await nftInformation.save();
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: error.message });
  }
  return res.status(201).json({ nftInformation });
};

export const updateNftInformation = async (req, res, next) => {
  const contract = req.params.contract;
  const tokenId = req.params.tokenid;
  const { likeCount } = req.body;

  let nft;
  try {
    nft = await NftInformation.findOneAndUpdate(
      {
        contract: contract,
        tokenId: tokenId,
      },
      { likeCount: likeCount }
    );
  } catch (error) {
    console.log(error);
  }
  if (!nft) {
    res.status(500).json({ message: "Unable to update" });
  }
  return res.status(200).json({ message: "Successfully updated" });
};

export const increaseLikeCountByOne = async (req, res) => {
  const contract = req.params.contract;
  const tokenId = req.params.tokenid;

  let nft;
  try {
    nft = await NftInformation.findOneAndUpdate(
      {
        contract: contract,
        tokenId: tokenId,
      },
      { $inc: { likeCount: 1 } }
    );
  } catch (error) {
    console.log(error);
  }
  if (!nft) {
    res.status(500).json({ message: "Unable to update" });
  }
  return res.status(200).json({ message: "Successfully increased like count" });
};

export const decreaseLikeCountByOne = async (req, res) => {
  const contract = req.params.contract;
  const tokenId = req.params.tokenid;

  let nft;
  try {
    nft = await NftInformation.findOneAndUpdate(
      {
        contract: contract,
        tokenId: tokenId,
      },
      { $inc: { likeCount: -1 } }
    );
  } catch (error) {
    console.log(error);
  }
  if (!nft) {
    res.status(500).json({ message: "Unable to update" });
  }
  return res.status(200).json({ message: "Successfully decreased like count" });
};

export const deleteNftInformation = async (req, res, next) => {
  const contract = req.params.contract;
  const tokenId = req.params.tokenid;
  let nft;
  try {
    nft = await NftInformation.findOneAndRemove({
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
