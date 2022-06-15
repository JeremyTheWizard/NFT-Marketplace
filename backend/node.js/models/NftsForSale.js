import mongoose from "mongoose";

const nftsForSaleSchema = mongoose.Schema({
  tokenContractAddress: { type: String, required: true },
  tokenId: { type: String, required: true },
  price: { type: String, required: true },
  seller: { type: String, required: true },
  nonce: { type: Number, required: true, unique: true },
  marketplaceAddress: { type: String, required: true },
  saleParametersHash: { type: String, required: true },
  sellerSignature: { type: String, required: true },
});

export default mongoose.models.NftsForSale ||
  mongoose.model("NftsForSale", nftsForSaleSchema);
