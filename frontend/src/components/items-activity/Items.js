import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import AssetCard from "../explore/AssetCard";

function Items({ assetContractAddress, collectionName }) {
  const [assetCards, setAssetCards] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [cursor, setCursor] = useState(undefined);

  const nftsForSale = [];
  const getNftsForSale = async () => {
    nftsForSale = await axios
      .get("http://localhost:8000/api/nfts/nftsforsale/getall")
      .then((res) => res.data.nftsForSale);
  };

  const createAssetCards = async () => {
    const data = await axios
      .get(
        `https://testnets-api.opensea.io/api/v1/assets?asset_contract_address=${assetContractAddress}&cursor=${
          cursor ? cursor : ""
        }`
      )
      .then((res) => res.data);
    const collectionAssets = data.assets;
    const next = data.next;

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
        traits: nft.traits,
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
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {assetCards}
      </div>
    </InfiniteScroll>
  );
}

export default Items;
