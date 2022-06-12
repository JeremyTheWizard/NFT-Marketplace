import { useContractFunction } from "@usedapp/core";
import getTokenContract from "../useful-scripts/getTokenContract";

const useApproveCollection = (
  tokenContract = null,
  tokenContractAddress = null
) => {
  if (tokenContractAddress) {
    tokenContract = getTokenContract(tokenContractAddress);
  }

  const { send: approveCollectionSend, state: approveCollectionState } =
    useContractFunction(tokenContract, "setApprovalForAll", {
      transactionName: "Approve ERC721 Collection",
    });
  const { status: approveCollectionStatus } = approveCollectionState;

  const approveCollection = (_operator) => {
    approveCollectionSend(_operator, true);
  };

  return { approveCollection, approveCollectionStatus };
};

export default useApproveCollection;
