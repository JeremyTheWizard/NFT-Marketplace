import { utils } from "ethers";

const GetSignatureForSale = async (library, contract, tokenId, price) => {
  const signer = library.getSigner();
  const saleParameters = { contract: contract, tokenId: tokenId, price: price };
  const saleParametersHash = utils.id(JSON.stringify(saleParameters));
  const saleParametersBytes = utils.arrayify(saleParametersHash);
  const signature = await signer.signMessage(saleParametersBytes);
  console.log("🚀 ~ signature", signature);
};

export default GetSignatureForSale;
