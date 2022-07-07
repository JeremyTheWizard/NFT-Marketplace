import TopCollections from "../models/TopCollections";

export const getTopCollections = async (req, res) => {
  console.log("Fetching top collections...");
  try {
    const collections = await TopCollections.findOne();
    const topCollections = collections.topCollections;
    console.log("Success!");
    console.log(`top collection = ${topCollections}`);
    return res
      .status(200)
      .json({ success: true, topCollections: topCollections });
  } catch (err) {
    console.log("ERROR!");
    console.log(err);
  }
  return res.status(400).json({ success: false });
};