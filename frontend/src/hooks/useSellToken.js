import React, { useEffect, useState } from "react";
import { useEthers, useContractFunction } from "@usedapp/core";
import Marketplace from "../build/contracts/Marketplace.json";
import ERC721 from "../build/contracts/MockERC721.json";
import networkMapping from "../build/deployments/map.json";
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

  const [tokenContractAddress, setTokenContractAddress] = useState(null);
  const [tokenId, setTokenId] = useState(null);
  const [price, setPrice] = useState(null);

  const erc721ABI = ERC721.abi;
  const erc721Interface = new utils.Interface(erc721ABI);
  const erc721Contract = tokenContractAddress
    ? new Contract(tokenContractAddress, erc721Interface)
    : null;
  const { send: approveCollection, state: approveCollectionStatus } =
    useContractFunction(erc721Contract, "setApprovalForAll", {
      transactionName: "Approve ERC721 Collection",
    });

  const { send: addNftSend, state: addNftState } = useContractFunction(
    marketplaceContract,
    "addNft",
    {
      transactionName: "Add NFT to marketplace",
    }
  );

  const addNft = async (_tokenContractAddress, _tokenId, _price) => {
    setTokenContractAddress(_tokenContractAddress);
    setTokenId(_tokenId);
    setPrice(_price);
  };

  useEffect(() => {
    tokenId &&
      marketplaceAddress &&
      approveCollection(marketplaceAddress, tokenId);
  }, [tokenId]);

  useEffect(() => {
    if (
      tokenId &&
      tokenContractAddress &&
      price &&
      approveCollectionStatus.status === "Success"
    ) {
      addNftSend(tokenContractAddress, tokenId, price);
    }
  }, [approveCollectionStatus]);

  return { addNft, addNftState };
};

export default useSellToken;
