import axios from "axios";

const GetSignatureForSale = async (
  library,
  tokenContractAddress,
  tokenId,
  price,
  seller,
  marketplaceAddress
) => {
  const nonce = await axios
    .get("http://localhost:8000/api/nfts/nftsforsale/getnonce/")
    .then((res) => {
      return res.data.nonce;
    })
    .catch((err) => {
      console.log(err);
    });
  console.log("🚀 ~ nonce", nonce);

  const message = JSON.stringify({
    types: {
      EIP712Domain: [
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "chainId", type: "uint256" },
        { name: "verifyingContract", type: "address" },
      ],
      Signature: [
        { name: "price", type: "uint64" },
        { name: "tokenContractAddress", type: "address" },
        { name: "tokenId", type: "uint64" },
        { name: "nonce", type: "uint64" },
      ],
    },
    primaryType: "Signature",
    domain: {
      name: "NFT Palace",
      version: "1",
      chainId: 4,
      verifyingContract: marketplaceAddress,
    },
    message: {
      price: price,
      tokenContractAddress: tokenContractAddress,
      tokenId: tokenId,
      nonce: nonce,
    },
  });

  const params = [seller, message];
  const method = "eth_signTypedData_v4";
  const signature = await library.send(method, params);
  if (signature) {
    await axios
      .post("http://localhost:8000/api/nfts/nftsforsale/incrementnonce")
      .catch((err) => {
        console.log(err);
      });
  }

  const sig = signature.substring(2);
  const r = "0x" + sig.substring(0, 64);
  const s = "0x" + sig.substring(64, 128);
  const v = parseInt(sig.substring(128, 130), 16);
  console.log("🚀 ~ signer", seller);
  console.log("🚀 ~ price", price);
  console.log("🚀 ~ tokenContractAddress", tokenContractAddress);
  console.log("🚀 ~ tokenId", tokenId);
  console.log("🚀 ~ x", 1);
  console.log("🚀 ~ v", v);
  console.log("🚀 ~ r", r);
  console.log("🚀 ~ s", s);
};

export default GetSignatureForSale;
