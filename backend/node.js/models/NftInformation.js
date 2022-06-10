import mongoose from "mongoose";

const nftInformationSchema = mongoose.Schema({
  contract: { type: String, required: true },
  tokenId: { type: String, required: true },
  likeCount: {
    type: Number,
    default: 0,
  },
});

export default mongoose.models.NftInformation ||
  mongoose.model("NftInformation", nftInformationSchema);
