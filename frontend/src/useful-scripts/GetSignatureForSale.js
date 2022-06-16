const GetSignatureForSale = async (
  library,
  tokenContractAddress,
  tokenId,
  price,
  seller,
  nonce,
  marketplaceAddress
) => {
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

  return signature;
};

export default GetSignatureForSale;
