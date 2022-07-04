import mongoose from "mongoose";

const collectionsSchema = mongoose.Schema({
  topCollections: [
    {
      slug: { type: "string", required: true },
      name: { type: String, required: true },
      imageUrl: { type: String, required: true },
      description: { type: String, required: true },
    },
  ],
});

export default mongoose.models.Collections ||
  mongoose.model("Collections", collectionsSchema);
