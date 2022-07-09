import mongoose from "mongoose";
import slug from "mongoose-slug-updater";

mongoose.plugin(slug);

const externalCollectionSchema = mongoose.Schema({
  name: { type: String, required: true },
  slug: {
    type: String,
    unique: true,
    required: true,
  },
  assetContractAddress: { type: String, required: true },
  description: { type: String },
  bannerImageUrl: { type: String },
  roundedIconImageUrl: { type: String },
});

export default mongoose.models.ExternalCollection ||
  mongoose.model("ExternalCollection", externalCollectionSchema);
