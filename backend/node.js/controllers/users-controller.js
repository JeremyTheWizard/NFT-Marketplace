import axios from "axios";
import FormData from "form-data";
import User from "../models/User";

export const changeBannerImage = async (req, res) => {
  console.log("Changing banner image...");

  const newBannerImage = req.files.bannerImage;
  const { account } = req.body;

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
    console.log("Error uploading image!");
    console.log(err);
  }

  const userToUpdate = await User.findOne({ account: account });

  if (newBannerImageData) {
    try {
      if (userToUpdate) {
        console.log("User with this account exists. Updating...");
        userToUpdate.bannerImage = newBannerImageData.data.url;
        await userToUpdate.save();
      } else {
        console.log("User with this account not found. Creating new user...");
        const newUser = await new User({
          account: account,
          bannerImage: newBannerImageData.data.url,
        });
        await newUser.save();
      }
      console.log("Success!");
      console.log(`newBannerImage = ${newBannerImageData.data.url}`);
      return res.status(200).json({
        success: true,
        newBannerImageURL: newBannerImageData.data.url,
      });
    } catch (err) {
      console.log("ERROR!");
      console.log(err);
    }
  }

  return res.status(400).json({ success: false });
};

export const changeRoundedIconImage = async (req, res) => {
  console.log("Changing rounded icon image...");
  const newRoundedIconImage = req.files.roundedIconImage;
  const { account } = req.body;

  const base64EncodedImage = Buffer.from(newRoundedIconImage.data).toString(
    "base64"
  );

  const formData = new FormData();
  formData.append("image", base64EncodedImage);
  let newRoundedIconImageData = null;

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
    console.log("Error uploading image!");
    console.log(err);
  }

  const userToUpdate = await User.findOne({ account: account });

  if (newRoundedIconImageData) {
    try {
      if (userToUpdate) {
        console.log("User with this account exists. Updating...");
        userToUpdate.roundedIconImage = newRoundedIconImageData.data.url;
        await userToUpdate.save();
      } else {
        console.log("User with this account not found. Creating new user...");
        const newUser = await new User({
          account: account,
          roundedIconImage: newRoundedIconImageData.data.url,
        });
        await newUser.save();
      }
      console.log("Success!");
      console.log(`newRoundedIconImage = ${newRoundedIconImageData.data.url}`);
      return res.status(200).json({
        success: true,
        newRoundedIconImage: newRoundedIconImageData.data.url,
      });
    } catch (err) {
      console.log("ERROR!");
      console.log(err);
    }
  }
  return res.status(400).json({ success: false });
};

export const getUser = async (req, res) => {
  const account = req.params.account;

  const user = await User.findOne({ account: account });

  if (user) {
    return res.status(200).json({ success: true, user });
  } else {
    return res.status(404).json({ success: false, message: "User not found" });
  }
};

export const addTokenToCollection = async (req, res) => {
  console.log("Initializing adding token to collection....");
  const { account, collectionName, tokenName, tokenId } = req.body;

  try {
    await User.findOneAndUpdate(
      {
        account: account,
        collectionsCreated: { $elemMatch: { name: collectionName } },
      },
      {
        $push: {
          "collectionsCreated.$.tokens": { name: tokenName, tokenId: tokenId },
        },
      }
    );
    console.log("User updated!");
  } catch (error) {
    console.log("ERROR!");
    console.log(error);
    return res.status(400).json({ success: false, error });
  }

  return res.json({ success: true });
};
