import mongoose from "mongoose";
import Collection from "./Collection";

const userSchema = mongoose.Schema({
  account: { type: String, required: true },
  bannerImage: { type: String },
  roundedIconImage: { type: String },
  collectionsCreated: [
    { type: mongoose.Schema.Types.ObjectId, ref: Collection },
  ],
});

export default mongoose.models.User || mongoose.model("User", userSchema);
