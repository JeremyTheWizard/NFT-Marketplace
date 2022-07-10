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
  const page = useRef(0);

  const fetchNftsForSale = async () => {
    let nftsForSale = [];
    try {
      nftsForSale = await axios
        .get(
          `http://localhost:8000/api/nfts/nftsforsale/getall?page=${page.current}`
        )
        .then((res) => res.data.nftsForSale);
    } catch (err) {
      console.log(err);
    }

    let exploreCards = [];

    nftsForSale.map((nft) => {
      exploreCards.push(
        <AssetCard
          collectionName={nft.name}
          seller={nft.seller}
          status="Buy"
          assetInfo={{
            assetContractAddress: nft.tokenContractAddress,
            imageUrl: nft.imageUrl,
            tokenId: nft.tokenId,
            price: utils.formatEther(nft.price),
            attributes: nft.attributes,
          }}
        />
      );
    });

    return [exploreCards, page.current];
  };

  const fetchData = async () => {
    const [newExploreCards, next] = await fetchNftsForSale();
    setExploreCards((exploreCards) => [...exploreCards, ...newExploreCards]);

    if (page.current === next) {
      setHasMore(false);
    } else {
      page.current = next;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
