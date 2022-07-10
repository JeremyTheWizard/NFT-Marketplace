import TopCollections from "../models/TopCollections";

export const getTopCollections = async (req, res) => {
  console.log("Fetching top collections...");
  let topCollections;
  try {
    const collections = await TopCollections.findOne()
      .populate("topCollections")
      .exec();
    topCollections = collections.topCollections;
    console.log("Success!");
    console.log(`top collection = ${topCollections}`);
    return res
      .status(200)
      .json({ success: true, topCollections: topCollections });
  } catch (err) {
    console.log("ERROR!");
    console.log(err);
  }
  console.log("🚀 ~ topCollections", topCollections);
  return res.status(400).json({ success: false });
};
