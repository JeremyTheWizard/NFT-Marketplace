import mongoose from "mongoose";

const addressNonceSchema = mongoose.Schema({
  address: { type: String, required: true },
  nonce: { type: Number, default: 0, required: true },
});

export default mongoose.models.AddressNonce ||
  mongoose.model("AddressNonce", addressNonceSchema);
