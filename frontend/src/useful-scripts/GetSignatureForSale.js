import { utils } from "ethers";

const GetSignatureForSale = async (
  library,
  tokenContractAddress,
  tokenId,
  price
) => {
  const signer = library.getSigner();
  const saleParameters = {
    tokenContractAddress: tokenContractAddress,
    tokenId: tokenId,
    price: price,
  };
  const saleParametersHash = utils.id(JSON.stringify(saleParameters));
  const saleParametersHashBytes = utils.arrayify(saleParametersHash);
  const sellerSignature = await signer.signMessage(saleParametersHashBytes);
  return { saleParametersHash, sellerSignature };
};

export default GetSignatureForSale;
