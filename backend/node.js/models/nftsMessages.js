import mongoose from "mongoose";

const nftsForSaleSchema = mongoose.Schema({
  nftsForSale: [{ contract: String, tokensIds: [String] }],
});

const nftInformationSchema = mongoose.Schema({
  likeCount: {
    type: Number,
    default: 0,
  },
});

const nftsForSaleMessage = mongoose.model(
  "NftsForSaleMessages",
  nftsForSaleSchema
);
const nftInformationMessage = mongoose.model(
  "NftInformationMessage, nftInformationSchema"
);

export { nftsForSaleSchema, nftInformationSchema };
