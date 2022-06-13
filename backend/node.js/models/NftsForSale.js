import mongoose from "mongoose";

const nftsForSaleSchema = mongoose.Schema({
  contract: { type: String, required: true },
  tokenId: { type: String, required: true },
  owner: { type: String, required: true },
});

export default mongoose.models.NftsForSale ||
  mongoose.model("NftsForSale", nftsForSaleSchema);
