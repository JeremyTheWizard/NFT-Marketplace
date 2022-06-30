import { useContractFunction } from "@usedapp/core";
import useGetNFTMinterContract from "./useGetNFTMinterContract";

const useMintToken = () => {
  const NFTMinterContract = useGetNFTMinterContract();
  const {
    send: mintToken,
    state: mintState,
    resetState: resetMintState,
    events: mintEvents,
  } = useContractFunction(NFTMinterContract, "mint", {
    transactionName: "Mint new erc721 token",
  });
  const mintStatus = mintState.status;

  return { mintToken, mintStatus, resetMintState, mintEvents };
};

export default useMintToken;
