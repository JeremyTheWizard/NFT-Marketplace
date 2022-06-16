import { useContractFunction } from "@usedapp/core";
import axios from "axios";
import { useEffect } from "react";
import useGetMarketplaceContract from "./useGetMarketplaceContract";

const useBuyCoordinator = (tokenContractAddress, tokenId) => {
  const marketPlaceContract = useGetMarketplaceContract();

  const { send: buyNft, state: buyNftState } = useContractFunction(
    marketPlaceContract,
    "buyNft",
    {
      transactionName: "buyNft",
    }
  );
  const buyStatus = buyNftState.status;

  const buyCoordinator = async () => {
    const tokenToBuy = await axios
      .get(
        `http://localhost:8000/api/nfts/nftsforsale/getnft/${tokenContractAddress}/${tokenId}`
      )
      .then((res) => {
        return res.data.nftForSale[0];
      });

    const sellerSignature = tokenToBuy.sellerSignature;
    const seller = tokenToBuy.seller;
    const price = tokenToBuy.price;
    const nonce = tokenToBuy.nonce;

    const sig = sellerSignature.substring(2);
    const r = "0x" + sig.substring(0, 64);
    const s = "0x" + sig.substring(64, 128);
    const v = parseInt(sig.substring(128, 130), 16);

    buyNft(seller, v, r, s, price, tokenContractAddress, tokenId, nonce, {
      value: price,
    });
  };

  useEffect(() => {
    if (buyStatus === "Success") {
      console.log("Deleting sale from db...");
      axios.delete(
        `http://localhost:8000/api/nfts/nftsforsale/delete/${tokenContractAddress}/${tokenId}`
      );
    }
  }, [buyStatus]);
  return { buyCoordinator, buyStatus };
};

export default useBuyCoordinator;
