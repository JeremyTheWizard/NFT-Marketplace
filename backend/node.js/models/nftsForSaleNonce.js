import mongoose from "mongoose";

const nonceSchema = mongoose.Schema({
  nonce: { type: Number, required: true },
});

export default mongoose.models.NftsForSaleNonce ||
  mongoose.model("NftsForSaleNonce", nonceSchema);
