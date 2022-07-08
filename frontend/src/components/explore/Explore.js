import { Typography } from "@mui/material";
import axios from "axios";
import { utils } from "ethers";
import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ModifiedCircularProgress from "../ModifiedMuiComponents/ModifiedCircularProgress";
import AssetCard from "./AssetCard";

const NftsCards = () => {
  const [exploreCards, setExploreCards] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [nftsForSale, setNftsForSale] = useState([]);
  const cursor = useRef(0);
  const nftsDisplayed = useRef(0);

  const updateNftsForSale = async () => {
    const nftsForSale = await axios
      .get("http://localhost:8000/api/nfts/nftsforsale/getall")
      .then((res) => res.data.nftsForSale);
    setNftsForSale(nftsForSale);
  };

  const createExploreCards = async () => {
    nftsDisplayed.current = 0;
    let exploreCards = [];

    for (let i = 0; i < 3; i++) {
      if (nftsForSale[cursor.current + i]) {
        // bypass opensea's api rate limit
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const nftForSale = nftsForSale[cursor.current + i];
        let data;
        try {
          data = await axios
            .get(
              `https://testnets-api.opensea.io/api/v1/asset/${nftForSale.tokenContractAddress}/${nftForSale.tokenId}/`
            )
            .then((res) => res.data);
        } catch {}

        if (data) {
          nftsDisplayed.current += 1;

          exploreCards.push(
            <AssetCard
              collectionName={data.collection.name}
              seller={nftForSale.seller}
              status="Buy"
              assetInfo={{
                assetContractAddress: nftForSale.tokenContractAddress,
                imageUrl: data.image_url,
                tokenId: nftForSale.tokenId,
                price: utils.formatEther(nftForSale.price),
                attributes: data.traits,
              }}
            />
          );
        }
      }
    }

    return [exploreCards, cursor.current + nftsDisplayed.current];
  };

  const fetchData = async () => {
    const [newExploreCards, next] = await createExploreCards();
    setExploreCards((exploreCards) => [...exploreCards, ...newExploreCards]);

    cursor.current = next;
    if (!nftsForSale[next]) {
      setHasMore(false);
    }

    return;
  };

  useEffect(() => {
    updateNftsForSale();
  }, []);

  useEffect(() => {
    nftsForSale.length && fetchData();
  }, [nftsForSale]);

  return (
    <>
      <div className="mt-12 overflow-hidden">
        <h1 className="text-2xl font-bold md:text-3xl text-onPrimary">
          Explore
        </h1>
      </div>
      <InfiniteScroll
        style={{ overflow: "hidden" }}
        dataLength={exploreCards.length}
        next={fetchData}
        hasMore={hasMore}
        loader={
          <div className="flex flex-col items-center mt-6">
            <ModifiedCircularProgress />
          </div>
        }
        endMessage={
          <Typography
            variant="h6"
            component="p"
            color="onPrimary"
            style={{ textAlign: "center", marginTop: "3rem" }}
          >
            There are no more items on sale.
          </Typography>
        }
      >
        <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {exploreCards}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default NftsCards;
