import { Typography } from "@mui/material";
import { useEthers } from "@usedapp/core";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import AssetCard from "../explore/AssetCard";
import ModifiedCircularProgress from "../ModifiedMuiComponents/ModifiedCircularProgress";

const Items = () => {
  const { account } = useEthers();
  const [assetCards, setAssetCards] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const cursor = useRef();

  useEffect(() => {
    account && fetchData();
  }, [account]);

  const fetchNFTs = async () => {
    // bypass opensea's api rate limit
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });

    let data;
    try {
      data = await axios({
        method: "get",
        url: "https://testnets-api.opensea.io/api/v1/assets",
        params: { owner: account, cursor: cursor.current },
      }).then((res) => res.data);
    } catch (err) {
      console.log(err);
    }

    const assetCards = [];
    const requests = data.assets.map(async (asset) => {
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
          }}
          originalAccount={account}
        />
      );
    });
    await Promise.all(requests);

    return [assetCards, data.next];
  };

  const fetchData = async () => {
    const [newAssetCards, next] = await fetchNFTs();
    setAssetCards([...assetCards, ...newAssetCards]);

    if (cursor.current === next) {
      setHasMore(false);
    } else {
      cursor.current = next;
    }
  };

  const fixUrl = (url) => {
    return "https://ipfs.io/ipfs/" + url.split("ipfs://")[1];
  };

  return (
    <InfiniteScroll
      style={{ overflow: "hidden" }}
      dataLength={assetCards.length}
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
          You have no more items.
        </Typography>
      }
    >
      <div className="my-12 grid justify-center sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {assetCards}
      </div>
    </InfiniteScroll>
  );
};

export default Items;
