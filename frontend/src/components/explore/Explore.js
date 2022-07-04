import Backdrop from "@mui/material/Backdrop";
import axios from "axios";
import { utils } from "ethers";
import React, { useEffect, useRef, useState } from "react";
import ModifiedCircularProgress from "../ModifiedMuiComponents/ModifiedCircularProgress";
import AssetCard from "./AssetCard";

const NftsCards = () => {
  const [exploreCards, setExploreCards] = useState();
  const loadingBackdrop = useRef(true);

  const renderExploreCards = async () => {
    const nftsForSale = await axios
      .get("http://localhost:8000/api/nfts/nftsforsale/getall")
      .then((res) => res.data.nftsForSale);

    const exploreCards = [];
    nftsForSale &&
      (await Promise.all(
        nftsForSale.map(async (nft, key) => {
          // bypass opensea's api rate limit
          await new Promise((resolve) => setTimeout(resolve, 1000 * key));
          const data = await axios
            .get(
              `https://testnets-api.opensea.io/api/v1/asset/${nft.tokenContractAddress}/${nft.tokenId}/`
            )
            .then((res) => res.data);
          exploreCards.push(
            <AssetCard
              collectionName={data.collection.name}
              seller={nft.seller}
              status="Buy"
              assetInfo={{
                assetContractAddress: nft.tokenContractAddress,
                imageUrl: data.image_url,
                tokenId: nft.tokenId,
                price: utils.formatEther(nft.price),
                attributes: data.traits,
              }}
              key={key}
            />
          );
        })
      ));

    loadingBackdrop.current = false;
    if (exploreCards.length) {
      setExploreCards(exploreCards);
    } else {
      setExploreCards(
        <p className="text-lg text-onPrimary">There are no NFTs on sale :(</p>
      );
    }
  };

  useEffect(() => {
    renderExploreCards();
  }, []);

  return (
    <>
      <div className="mt-12">
        <h1 className="mb-7 text-2xl font-bold md:text-3xl text-onPrimary">
          Explore
        </h1>
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {exploreCards && exploreCards}
        </div>
      </div>
      <Backdrop
        open={loadingBackdrop.current}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <ModifiedCircularProgress />
      </Backdrop>
    </>
  );
};

export default NftsCards;
