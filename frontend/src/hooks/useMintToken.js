import { useContractFunction } from "@usedapp/core";
import useGetNFTMinterContract from "./useGetNFTMinterContract";

const useMintToken = () => {
  const NFTMinterContract = useGetNFTMinterContract();
  const { send: mintToken, state: mintState } = useContractFunction(
    NFTMinterContract,
    "mint",
    {
      transactionName: "Mint new erc721 token",
    }
  );
  const mintStatus = mintState.status;

  return { mintToken, mintStatus };
};

export default useMintToken;
