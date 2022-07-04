import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  account: { type: String, required: true },
  bannerImage: { type: String },
  roundedIconImage: { type: String },
  collectionsCreated: [{ type: String }],
});

export default mongoose.models.User || mongoose.model("User", userSchema);
