import { useEthers, useCall } from "@usedapp/core";
import useApproveCollection from "./useApproveCollection";
import useGetMarketplaceContract from "./useGetMarketplaceContract";
import getTokenContract from "../useful-scripts/getTokenContract";
import useSellToken from "./useSellToken";
import { useEffect, useState } from "react";

const useSellCoordinator = (tokenContractAddress) => {
  const marketplace = useGetMarketplaceContract();
  const { account } = useEthers();
  const tokenContract = getTokenContract(tokenContractAddress);
  const { value } =
    useCall({
      contract: tokenContract,
      method: "isApprovedForAll",
      args: [account, marketplace.address],
    }) ?? {};
  const { addNft } = useSellToken();
  const { approveCollection, approveCollectionStatus } =
    useApproveCollection(tokenContract);

  const [tokenId, setTokenId] = useState();
  const [price, setPrice] = useState();

  const sellCoordinator = (tokenContractAddress, _tokenId, _price) => {
    if (value[0] === true) {
      addNft(tokenContractAddress, _tokenId, _price);
    }
    if (value[0] === false) {
      approveCollection(marketplace.address);
      setTokenId(_tokenId);
      setPrice(_price);
    }
  };

  useEffect(() => {
    approveCollectionStatus === "Success" &&
      addNft(tokenContractAddress, tokenId, price);
  }, [approveCollectionStatus]);

  return { sellCoordinator };
};

export default useSellCoordinator;
