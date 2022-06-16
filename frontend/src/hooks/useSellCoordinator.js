import { useCall, useEthers } from "@usedapp/core";
import axios from "axios";
import { useEffect, useState } from "react";
import GetSignatureForSale from "../useful-scripts/GetSignatureForSale";
import getTokenContract from "../useful-scripts/getTokenContract";
import useApproveCollection from "./useApproveCollection";
import useGetMarketplaceContract from "./useGetMarketplaceContract";
import useSellToken from "./useSellToken";

const useSellCoordinator = (tokenContractAddress) => {
  const marketplace = useGetMarketplaceContract();
  const { library, account } = useEthers();
  const tokenContract = getTokenContract(tokenContractAddress);
  const { value } =
    useCall({
      contract: tokenContract,
      method: "isApprovedForAll",
      args: [account, marketplace.address],
    }) ?? {};
  const { addNft, addNftStatus: sellStatus } = useSellToken();
  const { approveCollection, approveCollectionStatus } =
    useApproveCollection(tokenContract);

  const [tokenId, setTokenId] = useState();
  const [price, setPrice] = useState();

  const sellCoordinator = async (tokenContractAddress, _tokenId, _price) => {
    if (value) {
      if (value[0] === true) {
        const nonce = await axios
          .get("http://localhost:8000/api/nfts/nftsforsale/getnonce/")
          .then((res) => {
            return res.data.nonce;
          })
          .catch((err) => {
            console.log(err);
          });

        const sellerSignature = await GetSignatureForSale(
          library,
          tokenContractAddress,
          _tokenId,
          _price,
          account,
          nonce,
          marketplace.address
        );

        if (sellerSignature) {
          await axios
            .post("http://localhost:8000/api/nfts/nftsforsale/incrementnonce")
            .catch((err) => {
              console.log(err);
            });
        }
        axios.post("http://localhost:8000/api/nfts/nftsforsale/add", {
          tokenContractAddress,
          tokenId: _tokenId,
          price: _price,
          seller: account,
          nonce: nonce,
          marketplaceAddress: marketplace.address,
          sellerSignature: sellerSignature,
        });
      }
      if (value[0] === false) {
        approveCollection(marketplace.address);
        setTokenId(_tokenId);
        setPrice(_price);
      }
    }
  };

  useEffect(() => {
    approveCollectionStatus === "Success" &&
      addNft(tokenContractAddress, tokenId, price);
  }, [approveCollectionStatus]);

  return { sellCoordinator, sellStatus };
};

export default useSellCoordinator;
