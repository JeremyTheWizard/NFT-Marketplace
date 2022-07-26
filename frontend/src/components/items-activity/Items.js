import { Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useSelector } from "react-redux";
import AssetCard from "../explore/AssetCard";
import ModifiedCircularProgress from "../ModifiedMuiComponents/ModifiedCircularProgress";

function Items({ assetContractAddress, collectionSlug = null, editable }) {
  const [assetCards, setAssetCards] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [cursor, setCursor] = useState(undefined);
  const [assetsOnSale, setAssetsOnSale] = useState();
  const account = useSelector((state) => state.account.account);
  const loading = useRef(false);

  useEffect(() => {
    if (assetContractAddress) {
      fetchNftsForSale();
    }
  }, [assetContractAddress]);

  const fetchNftsForSale = async () => {
    let assetsOnSale;
    try {
      assetsOnSale = await axios({
        method: "get",
        url: "http://localhost:8000/api/nfts/nftsforsale/getall",
        params: { tokenContractAddress: assetContractAddress, limit: 50 },
      }).then((res) => res.data.nftsForSale.docs);
    } catch (err) {
      console.log(err);
    }
    if (assetsOnSale) {
      setAssetsOnSale(assetsOnSale);
    } else {
      setAssetsOnSale(null);
    }
  };

  const createAssetCards = async () => {
    let collectionAssets = [];

    // First check if the collection was created in the website and grab
    // only the tokens that were created under that collection
    let collectionInfo;
    if (collectionSlug) {
      try {
        collectionInfo = await axios
          .get(
            `http://localhost:8000/api/collections/collection/${collectionSlug}`
          )
          .then((res) => res.data.collectionInfo);
      } catch (err) {
        console.log(err);
      }

      if (collectionInfo && collectionInfo.tokens.length) {
        let url = `https://testnets-api.opensea.io/api/v1/assets?asset_contract_address=${assetContractAddress}`;
        collectionInfo.tokens.forEach((token) => {
          url += `&token_ids=${token.tokenId}`;
        });

        collectionAssets = await axios.get(url).then((res) => res.data.assets);
      }
    }

    // If the collection wasn't created on the website grab the info directly
    // from opensea
    let next;
    if (!collectionInfo) {
      // bypass openSea api rate limit
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const data = cursor
        ? await axios
            .get(
              `https://testnets-api.opensea.io/api/v1/assets?asset_contract_address=${assetContractAddress}&cursor=${cursor}`
            )
            .then((res) => res.data)
        : await axios
            .get(
              `https://testnets-api.opensea.io/api/v1/assets?asset_contract_address=${assetContractAddress}`
            )
            .then((res) => res.data);
      collectionAssets = data.assets;
      next = data.next;
    }

    // Mutual code in any case

    // Get nfts for sale to check whether they should be shown on sale

    const assetCards = [];
    collectionAssets.map((nft, key) => {
      let price;
      assetsOnSale.forEach((asset) => {
        if (asset.tokenId === nft.token_id) {
          price = asset.price;
        }
      });
      const relevantInfo = {
        collectionName: nft.collection.name,
        assetContractAddress: nft.asset_contract.address,
        tokenId: nft.token_id,
        imageUrl: nft.image_url,
        name: nft.name,
        description: nft.description || nft.asset_contract.description,
        price: price,
        attributes: nft.traits,
        owner: nft.owner.address,
      };

      if (
        relevantInfo.assetContractAddress ===
          assetsOnSale.tokenContractAddress &&
        relevantInfo.tokenId === assetsOnSale.tokenId
      ) {
        relevantInfo.price = assetsOnSale.price;
      }

      assetCards.push(
        <AssetCard
          key={key}
          status={editable && "Sell"}
          asset={relevantInfo}
          originalAccount={account}
        />
      );
    });

    return [assetCards, next];
  };

  const fetchData = async () => {
    loading.current = true;

    const [newAssetCards, next] = await createAssetCards();
    setAssetCards([...assetCards, ...newAssetCards]);

    if (next) {
      setCursor(next);
    } else {
      setHasMore(false);
    }
    loading.current = false;
  };

  return (
    <>
      <InfiniteScroll
        style={{ overflow: "hidden" }}
        loadMore={!loading.current && fetchData}
        initialLoad={
          assetContractAddress && assetsOnSale !== undefined ? true : false
        }
        hasMore={hasMore}
        loader={
          <div className="flex flex-col items-center mt-6">
            <ModifiedCircularProgress />
          </div>
        }
      >
        <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-12">
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
    </>
  );
}

export default Items;
