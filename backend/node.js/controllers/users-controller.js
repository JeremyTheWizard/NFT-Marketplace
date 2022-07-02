import User from "../models/User";

export const changeBannerImage = async (req, res) => {
  const bannerImage = req.files.bannerImage;
  const { account } = req.body;

  const userToUpdate = await User.findOne({ account: account });
  const newBannerImage = {
    data: bannerImage.data,
    contentType: bannerImage.mimetype,
  };

  try {
    if (userToUpdate) {
      await userToUpdate.updateOne(userToUpdate, {
        bannerImage: newBannerImage,
      });
    } else {
      const newUser = await new User({
        account: account,
        bannerImage: newBannerImage,
      });
      await newUser.save(newUser);
    }
    return res.status(200).json({ success: true, newBannerImage });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false });
  }
};

export const changeRoundedIconImage = async (req, res) => {
  const roundedIconImage = req.files.roundedIconImage;
  const { account } = req.body;

  const userToUpdate = await User.findOne({ account: account });
  const newRoundedIconImage = {
    data: roundedIconImage.data,
    contentType: roundedIconImage.mimetype,
  };

  try {
    if (userToUpdate) {
      await userToUpdate.updateOne(userToUpdate, {
        roundedIconImage: newRoundedIconImage,
      });
    } else {
      const newUser = await new User({
        account: account,
        roundedIconImage: newRoundedIconImage,
      });
      await newUser.save(newUser);
    }
    return res.status(200).json({ success: true, newRoundedIconImage });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ success: false });
  }
};
