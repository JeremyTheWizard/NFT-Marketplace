import axios from "axios";
import FormData from "form-data";
import Collection from "../models/Collection";
import User from "../models/User";

export const addCollection = async (req, res) => {
  console.log("Initializing addCollection");
  const {
    account,
    collectionName,
    assetContractAddress,
    updateUser = true,
  } = req.body;

  const collectionExists = await Collection.findOne({
    name: collectionName,
  });

  if (collectionExists) {
    console.log("ERROR! Collection already exists!");
    return res.status(409).json({
      success: false,
      message: "Collection already exists",
    });
  }

  console.log("Creating collection");
  let collection = null;
  try {
    collection = await new Collection({
      name: collectionName,
      createdBy: account,
      assetContractAddress: assetContractAddress,
    });
    await collection.save();
    console.log("Collection created!");
    console.log("collection = ", collection);
  } catch (err) {
    console.log("ERROR!");
    console.log(err);
    return res.status(400).json({ success: false, message: err });
  }

  if (updateUser) {
    console.log("Updating user...");

    const userExists = await User.findOne({ account: account });
    if (!userExists) {
      console.log("User doesn't exists");

      try {
        const newUser = await axios.post(
          "http://localhost:8000/api/users/user",
          { account: account }
        );
      } catch (err) {
        console.log("ERROR in axios request: user creation!");
        console.log(err);
        return res.status(400).json({ success: false, message: err.message });
      }
    }

    try {
      await axios.post("http://localhost:8000/api/users/user/collection", {
        account: account,
        collectionId: collection._id,
      });
    } catch (err) {
      console.log("Error in axios request: add collection to user");
      return res.status(400).json({ success: false, message: err.message });
    }

    console.log("User updated!");
    return res
      .status(200)
      .json({ success: true, userUpdated: true, collection });
  }
  return res
    .status(200)
    .json({ success: true, userUpdated: false, collection });
};

export const getCollectionInfo = async (req, res) => {
  console.log("Initializing getCollectionInfo");
  const collectionSlug = req.params.collectionSlug;

  console.log(`Searching for ${collectionSlug}`);
  const collectionInfo = await Collection.findOne({ slug: collectionSlug });
  console.log("🚀 ~ collectionInfo", collectionInfo);

  if (!collectionInfo) {
    return res
      .status(404)
      .json({ success: false, message: "Collection not found" });
  }

  return res.status(200).json({ success: true, collectionInfo });
};

export const changeBannerImage = async (req, res) => {
  console.log("Changing banner image...");

  const newBannerImage = req.files.bannerImage;
  const { collectionSlug, account } = req.body;

  console.log("Checking if account === createdBy");
  const collectionToUpdate = await Collection.findOne({ slug: collectionSlug });
  if (collectionToUpdate.createdBy !== account) {
    console.log("ERROR!");
    console.log("Your are not the creator of this account.");
    return res.status(403).json({
      success: false,
      message: "Your are not the creator of this collection.",
    });
  }
  console.log("account is allowed");

  const base64EncodedImage = Buffer.from(newBannerImage.data).toString(
    "base64"
  );

  const formData = new FormData();
  formData.append("image", base64EncodedImage);

  let newBannerImageData = null;
  try {
    console.log("Uploading image data to hosting service...");
    newBannerImageData = await axios
      .post("https://api.imgbb.com/1/upload", formData, {
        params: {
          //'expiration': '600',
          key: process.env.IMGBB_API_KEY,
        },
        headers: {
          ...formData.getHeaders(),
        },
      })
      .then((res) => res.data);
    console.log("Image uploaded!");
  } catch (err) {
    console.log("Error uploading image to hosting service!");
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "Error uploading image to hosting service!",
    });
  }

  if (collectionToUpdate) {
    console.log("Updating collection...");
    try {
      collectionToUpdate.bannerImageUrl = newBannerImageData.data.url;
      await collectionToUpdate.save();
      console.log("Collection banner updated!");
      res.status(200).json({ success: true });
    } catch (err) {
      console.log("ERROR!");
      console.log(err);
      return res.status(400).json({ success: false, message: err.message });
    }
  } else {
    console.log("ERROR!");
    console.log("Collection doesn't exists...");
    return res
      .status(404)
      .json({ success: false, message: "Collection doesn't exists'" });
  }
};

export const changeRoundedIconImage = async (req, res) => {
  console.log("Changing banner image...");

  const newRoundedIconImage = req.files.roundedIconImage;
  const { collectionSlug, account } = req.body;

  console.log("Checking if account === createdBy");
  const collectionToUpdate = await Collection.findOne({ slug: collectionSlug });
  if (collectionToUpdate.createdBy !== account) {
    console.log("ERROR!");
    console.log("Your are not the creator of this account.");
    return res.status(403).json({
      success: false,
      message: "Your are not the creator of this collection.",
    });
  }
  console.log("account is allowed");

  const base64EncodedImage = Buffer.from(newRoundedIconImage.data).toString(
    "base64"
  );

  const formData = new FormData();
  formData.append("image", base64EncodedImage);

  let newRoundedIconImageData;
  try {
    console.log("Uploading image data to hosting service...");
    newRoundedIconImageData = await axios
      .post("https://api.imgbb.com/1/upload", formData, {
        params: {
          //'expiration': '600',
          key: process.env.IMGBB_API_KEY,
        },
        headers: {
          ...formData.getHeaders(),
        },
      })
      .then((res) => res.data);
    console.log("Image uploaded!");
  } catch (err) {
    console.log("Error uploading image to hosting service!");
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "Error uploading image to hosting service!",
    });
  }

  if (collectionToUpdate) {
    console.log("Updating collection...");
    try {
      collectionToUpdate.roundedIconImageUrl = newRoundedIconImageData.data.url;
      await collectionToUpdate.save();
      console.log("Collection banner updated!");
      res.status(200).json({ success: true });
    } catch (err) {
      console.log("ERROR!");
      console.log(err);
      return res.status(400).json({ success: false, message: err.message });
    }
  } else {
    console.log("ERROR!");
    console.log("Collection doesn't exists...");
    return res
      .status(404)
      .json({ success: false, message: "Collection doesn't exists'" });
  }
};

export const changeDescription = async (req, res) => {
  console.log("Initializing changeDescription...");
  const { collectionSlug, newDescription } = req.body;

  try {
    console.log("Updating collection description...");
    await Collection.updateOne(
      { slug: collectionSlug },
      { description: newDescription }
    );
    console.log("Collection description updated!");
    return res.status(400).json({ success: true });
  } catch (error) {
    console.log("ERROR!");
    console.log("err");
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const addTokenToCollection = async (req, res) => {
  console.log("Initializing adding token to collection....");
  const { collectionSlug, tokenName, tokenId } = req.body;

  const tokenExists = await Collection.findOne({
    slug: collectionSlug,
    "tokens.tokenId": tokenId,
  });

  if (tokenExists) {
    console.log("ERROR!");
    console.log("Token already exists");
    return res
      .status(409)
      .json({ success: false, message: "Token already exists" });
  }

  try {
    console.log("Updating collection's tokens...");
    await Collection.updateOne(
      { slug: collectionSlug },
      { $addToSet: { tokens: { name: tokenName, tokenId: tokenId } } }
    );
    console.log("Token added to collection!");
    return res.status(200).json({ success: true });
  } catch (err) {
    console.log("ERROR!");
    console.log(err);
    return res.status(400).json({ success: false, message: err.message });
  }
};
