import AddressNonce from "../models/AddressNonce";

export const getNonce = async (req, res) => {
  const address = req.params.address;
  console.log("🚀 ~ address", address);
  try {
    const addressNonce = await AddressNonce.findOne({ address });
    return res.status(200).json({ addressNonce });
  } catch (error) {
    return res.status(404).json({ message: "address not found" });
  }
};

export const incrementNonce = async (req, res) => {
  const address = req.params.address;
  try {
    await AddressNonce.findOneAndUpdate({ address }, { $inc: { nonce: 1 } });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(400).json({ message: "address not found" });
  }
};
