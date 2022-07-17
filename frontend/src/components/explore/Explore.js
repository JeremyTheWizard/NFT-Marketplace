import { Typography } from "@mui/material";
import axios from "axios";
import React, { useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import ModifiedCircularProgress from "../ModifiedMuiComponents/ModifiedCircularProgress";
import AssetCard from "./AssetCard";

const NftsCards = () => {
  const [exploreCards, setExploreCards] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const page = useRef(0);
  const loading = useRef(false);

  const fetchNftsForSale = async () => {
    let nftsForSale = [];
    let next;
    let data;
    try {
      data = await axios
        .get(
          `http://localhost:8000/api/nfts/nftsforsale/getall?page=${page.current}`
        )
        .then((res) => res.data.nftsForSale);
      nftsForSale = data.docs;
      next = data.nextPage;
    } catch (err) {
      console.log(err);
    }

    let exploreCards = [];

    nftsForSale.map((nft) => {
      exploreCards.push(<AssetCard status="Buy" asset={nft} />);
    });

    return [exploreCards, next];
  };

  const fetchData = async () => {
    loading.current = true;

    const [newExploreCards, next] = await fetchNftsForSale();
    setExploreCards((exploreCards) => [...exploreCards, ...newExploreCards]);

    if (next) {
      page.current = next;
    } else {
      setHasMore(false);
    }
    loading.current = false;
  };

  return (
    <>
      <div className="mt-12 overflow-hidden">
        <h1 className="text-2xl font-bold md:text-3xl text-onPrimary">
          Explore
        </h1>
      </div>
      <InfiniteScroll
        style={{ overflow: "hidden" }}
        loadMore={!loading.current && fetchData}
        hasMore={hasMore}
        loader={
          <div className="flex flex-col items-center mt-6">
            <ModifiedCircularProgress />
          </div>
        }
      >
        <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {exploreCards}
        </div>
      </InfiniteScroll>
      {!hasMore && (
        <Typography
          variant="h6"
          component="p"
          color="onPrimary"
          style={{ textAlign: "center", marginTop: "3rem" }}
        >
          There are no more items on sale.
        </Typography>
      )}
    </>
  );
};

export default NftsCards;
