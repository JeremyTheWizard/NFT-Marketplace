import axios from "axios";
import GetSignatureForSale from "./GetSignatureForSale";

const addSaleToDb = async (
  _library,
  _tokenContractAddress,
  _tokenId,
  _price,
  _account,
  _marketplaceAddress
) => {
  const nonce = await axios
    .get("http://localhost:8000/api/nfts/nftsforsale/getnonce/")
    .then((res) => {
      return res.data.nonce;
    })
    .catch((err) => {
      console.log(err);
    });

  const sellerSignature = await GetSignatureForSale(
    _library,
    _tokenContractAddress,
    _tokenId,
    _price,
    _account,
    nonce,
    _marketplaceAddress
  );

  if (sellerSignature) {
    await axios
      .post("http://localhost:8000/api/nfts/nftsforsale/incrementnonce")
      .catch((err) => {
        console.log(err);
      });
  }
  axios.post("http://localhost:8000/api/nfts/nftsforsale/add", {
    tokenContractAddress: _tokenContractAddress,
    tokenId: _tokenId,
    price: _price,
    seller: _account,
    nonce: nonce,
    marketplaceAddress: _marketplaceAddress,
    sellerSignature: sellerSignature,
  });
};

export default addSaleToDb;
