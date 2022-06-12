import { useContractFunction } from "@usedapp/core";
import getMarketplaceContract from "./useGetMarketplaceContract";

const useSellToken = () => {
  const marketplaceContract = getMarketplaceContract();

  const { send: addNftSend, state: addNftState } = useContractFunction(
    marketplaceContract,
    "addNft",
    { transactionName: "Add NFT to marketplace" }
  );
  const { status: addNftStatus } = addNftState;

  const addNft = (_tokenContractAddress, _tokenId, _price) => {
    addNftSend(_tokenContractAddress, _tokenId, _price);
  };

  return { addNft, addNftStatus };
};

export default useSellToken;
