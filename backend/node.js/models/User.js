import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  account: { type: String, required: true },
  bannerImage: { type: String },
  roundedIconImage: { type: String },
  collectionsCreated: [
    {
      name: { type: String },
      bannerImageUrl: { type: String },
      roundedIconImageUrl: { type: String },
      slug: { type: String },
      tokens: [{ name: { type: String }, tokenId: { type: String } }],
    },
  ],
});

export default mongoose.models.User || mongoose.model("User", userSchema);
