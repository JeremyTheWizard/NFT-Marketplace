import React, { useState } from "react";
import { useEthers, useContractFunction } from "@usedapp/core";
import Marketplace from "../build/contracts/Marketplace.json";
import { networkMapping } from "../src/build/deployments/map.json";
import { constants, utils } from "ethers";
import { Contract } from "@ethersproject/contracts";

const useSellToken = () => {
  const { chainId } = useEthers();
  const { abi } = Marketplace;
  const marketplaceAddress = chainId
    ? networkMapping[String(chainId)]["Marketplace"][0]
    : constants.AddressZero;
  const marketplaceInterface = new utils.Interface(abi);
  const marketplaceContract = new Contract(
    marketplaceAddress,
    marketplaceInterface
  );

  const { state: addNftSend, send: addNftState } = useContractFunction(
    marketplaceContract,
    "addNft",
    {
      transactionName: "Add NFT to marketplace",
    }
  );

  const [state, setState] = useState(addNftState);
  const addNft = () => {
    return addNftSend(nft, tokenId, price);
  };

  return addNft, addNftState;
};

export default useSellToken;
