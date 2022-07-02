import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  account: { type: String, required: true },
  bannerImage: { data: Buffer, contentType: String },
  roundedIconImage: { data: Buffer, contentType: String },
  collectionsCreated: [{ type: String }],
});

export default mongoose.models.User || mongoose.model("User", userSchema);
