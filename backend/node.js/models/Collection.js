import mongoose from "mongoose";
import slug from "mongoose-slug-updater";

mongoose.plugin(slug);

const collectionSchema = mongoose.Schema({
  name: { type: String, required: true },
  slug: {
    type: String,
    slug: "name",
    transform: (v) => {
      // if statement to solve duplication bug
      if (v.startsWith("nft-palace-collections")) {
        return v;
      } else {
        let newSlug = `nft-palace-collections-${v}`;
        return newSlug;
      }
    },
    unique: true,
  },
  assetContractAddress: { type: String, required: true },
  description: { type: String },
  bannerImageUrl: { type: String },
  roundedIconImageUrl: { type: String },
  tokens: [
    {
      name: { type: String, required: true },
      tokenId: { type: String, required: true },
    },
  ],
  createdBy: { type: String, required: true },
});

export default mongoose.models.Collection ||
  mongoose.model("Collection", collectionSchema);
