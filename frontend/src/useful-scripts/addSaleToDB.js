import axios from "axios";
import GetSignatureForSale from "./GetSignatureForSale";

const addSaleToDb = async (
  _library,
  _tokenContractAddress,
  _tokenId,
  _price,
  _account,
  _marketplaceAddress,
  _name,
  _imageUrl,
  _attributes,
  _collectionName,
  _description
) => {
  const nonce = await axios
    .get("http://localhost:8000/api/nfts/nftsforsale/getnonce/")
    .then((res) => {
      return res.data.nonce;
    })
    .catch((err) => {
      console.log(err);
    });

  let sellerSignature;
  try {
    sellerSignature = await GetSignatureForSale(
      _library,
      _tokenContractAddress,
      _tokenId,
      _price,
      _account,
      nonce,
      _marketplaceAddress
    );
  } catch (err) {
    console.log(err);
  }

  if (sellerSignature) {
    await axios
      .post("http://localhost:8000/api/nfts/nftsforsale/incrementnonce")
      .catch((err) => {
        console.log(err);
      });

    const formData = new FormData();
    formData.append("imageUrl", _imageUrl);
    formData.append("tokenContractAddress", _tokenContractAddress);
    formData.append("price", _price);
    formData.append("seller", _account);
    formData.append("nonce", nonce);
    formData.append("marketplace", _marketplaceAddress);
    formData.append("sellerSignature", sellerSignature);
    formData.append("collectionName", _collectionName);
    _description && formData.append("description", _description);
    formData.append("marketplaceAddress", _marketplaceAddress);
    formData.append("tokenId", _tokenId);
    formData.append("attributes", JSON.stringify(_attributes));
    _name && formData.append("name", _name);

    axios({
      method: "post",
      url: "http://localhost:8000/api/nfts/nftsforsale/add",
      data: formData,
    });

    return "Success";
  }

  return "Exception";
};

export default addSaleToDb;
