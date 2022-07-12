import { useCall, useEthers } from "@usedapp/core";
import { useEffect, useState } from "react";
import addSaleToDb from "../useful-scripts/addSaleToDB";
import getTokenContract from "../useful-scripts/getTokenContract";
import useApproveCollection from "./useApproveCollection";
import useGetMarketplaceContract from "./useGetMarketplaceContract";

const useSellCoordinator = (_tokenContractAddress) => {
  const marketplace = useGetMarketplaceContract();
  const { library, account } = useEthers();
  const tokenContract = getTokenContract(_tokenContractAddress);
  const { value } =
    useCall({
      contract: tokenContract,
      method: "isApprovedForAll",
      args: [account, marketplace.address],
    }) ?? {};
  const { approveCollection, approveCollectionStatus } =
    useApproveCollection(tokenContract);

  const [tokenId, setTokenId] = useState();
  const [price, setPrice] = useState();
  const [name, setName] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [attributes, setAttributes] = useState();
  const [collectionName, setCollectionName] = useState();
  const [description, setDescription] = useState();

  const sellCoordinator = async (
    _tokenContractAddress,
    _tokenId,
    _price,
    _name,
    _imageUrl,
    _attributes = null,
    _collectionName,
    _description = null
  ) => {
    if (value) {
      if (value[0] === true) {
        addSaleToDb(
          library,
          _tokenContractAddress,
          _tokenId,
          _price,
          account,
          marketplace.address,
          _name,
          _imageUrl,
          _attributes,
          _collectionName,
          _description
        );
      }
      if (value[0] === false) {
        approveCollection(marketplace.address);
        setTokenId(_tokenId);
        setPrice(_price);
        setName(_name);
        setImageUrl(_imageUrl);
        setAttributes(_attributes);
        setCollectionName(_collectionName);
        setDescription(_description);
      }
    }
  };

  useEffect(() => {
    approveCollectionStatus === "Success" &&
      addSaleToDb(
        library,
        _tokenContractAddress,
        tokenId,
        price,
        account,
        marketplace.address,
        name,
        imageUrl,
        attributes,
        collectionName,
        description
      );
  }, [approveCollectionStatus]);

  return sellCoordinator;
};

export default useSellCoordinator;
