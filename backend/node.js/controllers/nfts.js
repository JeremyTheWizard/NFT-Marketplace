export const getNfts = async (req, res) => {
  try {
    const nftsForSaleMessage = await PostMessage.find();
    res.status(200).json(nftsForSaleMessage);
  } catch (error) {
    res.status(404).send(error.message);
  }
  res.send("This works!");
};
