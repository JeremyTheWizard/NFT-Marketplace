import mongoose from "mongoose";
import ExternalCollection from "./ExternalCollection";

const topCollectionsSchema = mongoose.Schema({
  topCollections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: ExternalCollection || Collection,
    },
  ],
});

export default mongoose.models.TopCollections ||
  mongoose.model("TopCollections", topCollectionsSchema);
