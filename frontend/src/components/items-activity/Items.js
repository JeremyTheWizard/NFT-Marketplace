import { Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useGetNFTMinterContract from "../../hooks/useGetNFTMinterContract";
import AssetCard from "../explore/AssetCard";

function Items({
  assetContractAddress,
  collectionName,
  collectionSlug = null,
}) {
  const [assetCards, setAssetCards] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [cursor, setCursor] = useState(undefined);

  const nftsForSale = [];
  const getNftsForSale = async () => {
    nftsForSale = await axios
      .get("http://localhost:8000/api/nfts/nftsforsale/getall")
      .then((res) => res.data.nftsForSale);
  };

  const tokenMinterContractAddress = useGetNFTMinterContract().address;

  const createAssetCards = async () => {
    let collectionAssets = [];

    // First check if the collection was created in the website and grab the
    //  useful information
    let collectionInfo;
    if (collectionSlug) {
      try {
        collectionInfo = await axios
          .get(
            `http://localhost:8000/api/collections/collection/${collectionSlug}`
          )
          .then((res) => res.data.collectionInfo);
      } catch {}

      if (collectionInfo) {
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
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const data = await axios
        .get(
          `https://testnets-api.opensea.io/api/v1/assets?asset_contract_address=${assetContractAddress}&cursor=${
            cursor ? cursor : ""
          }`
        )
        .then((res) => res.data);
      collectionAssets = data.assets;
      next = data.next;
    }

    // Mutual code in any case
    const assetCards = [];
    collectionAssets.map((nft, key) => {
      const relevantInfo = {
        assetContactAddress: nft.asset_contract.address,
        tokenId: nft.token_id,
        imageUrl: nft.image_url,
        name: nft.name,
        description: nft.description,
        price: undefined,
        owner: nft.owner.address,
        attributes: nft.traits,
      };

      if (
        relevantInfo.assetContactAddress === nftsForSale.tokenContractAddress &&
        relevantInfo.tokenId === nftsForSale.tokenId
      ) {
        relevantInfo.price = nftsForSale.price;
      }

      relevantInfo.imageUrl &&
        assetCards.push(
          <AssetCard
            collectionName={collectionName}
            seller={nftsForSale.seller}
            assetInfo={relevantInfo}
          />
        );
    });

    return [assetCards, next];
  };

  const fetchData = async () => {
    const [newAssetCards, next] = await createAssetCards();
    setAssetCards([...assetCards, ...newAssetCards]);

    if (cursor === next) {
      setHasMore(false);
    }
    setCursor(next);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <InfiniteScroll
      dataLength={assetCards.length}
      next={fetchData}
      hasMore={hasMore}
      loader={<p className="text-onPrimary text-center">Loading...</p>}
      endMessage={
        <Typography
          variant="h6"
          component="p"
          color="onPrimary"
          style={{ textAlign: "center", marginTop: "3rem" }}
        >
          This collection has no more items
        </Typography>
      }
    >
      <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {assetCards}
      </div>
    </InfiniteScroll>
  );
}

export default Items;
