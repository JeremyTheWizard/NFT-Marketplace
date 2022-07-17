import { Typography } from "@mui/material";
import { useEthers } from "@usedapp/core";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import AssetCard from "../explore/AssetCard";
import ModifiedCircularProgress from "../ModifiedMuiComponents/ModifiedCircularProgress";

const Items = () => {
  const { account } = useEthers();
  const [assetCards, setAssetCards] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [tokensOnSale, setTokensOnSale] = useState();
  const loading = useRef(false);
  const cursor = useRef();

  useEffect(() => {
    fetchTokensOnSale();
  }, []);

  const fetchTokensOnSale = async () => {
    let tokensOnSale;
    try {
      tokensOnSale = await axios({
        method: "get",
        url: "http://localhost:8000/api/nfts/nftsforsale/getall",
      }).then((res) => res.data.nftsForSale.docs);
    } catch (err) {
      console.log(err);
    }
    if (tokensOnSale) {
      setTokensOnSale(tokensOnSale);
    } else {
      setTokensOnSale([]);
    }
  };

  const fetchNFTs = async () => {
    // bypass opensea's api rate limit
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });

    let data;
    try {
      data = await fetch(
        `https://testnets-api.opensea.io/api/v1/assets?owner=${account}&cursor=${
          cursor.current || ""
        }`
      ).then((res) => res.json());
    } catch (err) {
      console.log(err);
    }

    const assetCards = [];
    const requests = data.assets.map((asset) => {
      let price;
      tokensOnSale.forEach((token) => {
        if (token.tokenId === asset.token_id) {
          price = token.price;
        }
      });
      assetCards.push(
        <AssetCard
          status="Sell"
          asset={{
            collectionName: asset.asset_contract.name,
            imageUrl: asset.image_url,
            tokenId: asset.token_id,
            assetContractAddress: asset.asset_contract.address,
            attributes: asset.traits,
            collection: { imageUrl: asset.collection.image_url },
            name: asset.name,
            description: asset.description,
            owner: account,
            price: price,
          }}
          originalAccount={account}
        />
      );
    });
    await Promise.all(requests);

    return [assetCards, data.next];
  };

  const fetchData = async () => {
    loading.current = true;
    const [newAssetCards, next] = await fetchNFTs();
    setAssetCards([...assetCards, ...newAssetCards]);

    if (next) {
      cursor.current = next;
    } else {
      setHasMore(false);
    }
    loading.current = false;
  };

  const fixUrl = (url) => {
    return "https://ipfs.io/ipfs/" + url.split("ipfs://")[1];
  };

  return (
    <div className="my-12">
      <InfiniteScroll
        style={{ overflow: "hidden" }}
        hasMore={hasMore}
        loadMore={!loading.current && fetchData}
        initialLoad={account && tokensOnSale !== undefined ? true : false}
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
            You have no more items.
          </Typography>
        }
      >
        <div className="grid justify-center sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {assetCards}
        </div>
      </InfiniteScroll>
      {!hasMore && (
        <Typography
          variant="h6"
          component="p"
          color="onPrimary"
          style={{ textAlign: "center", marginTop: "3rem" }}
        >
          This collection has no more items
        </Typography>
      )}
    </div>
  );
};

export default Items;
