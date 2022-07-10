import { useEthers } from "@usedapp/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AssetCard from "../explore/AssetCard";

const Items = () => {
  const { account } = useEthers();
  const [userAssets, setUserAssets] = useState();
  const [nftsCardsHtml, setNftsCardsHtml] = useState();
  const [loading, setLoading] = useState(false);

  const fetchNFTs = async () => {
    // bypass opensea's api rate limit
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
    let userAssets;
    try {
      userAssets = await axios({
        method: "get",
        url: "https://testnets-api.opensea.io/api/v1/assets",
        params: { owner: account },
      }).then((res) => res.data.assets);
    } catch (err) {
      console.log(err);
    }
    setUserAssets(userAssets);
  };

  async function renderAssetCards() {
    console.log("rendering assetCards...");
    const nftsCardsHtml = [];
    const requests = userAssets.map(async (asset) => {
      nftsCardsHtml.push(
        <AssetCard
          status="Sell"
          asset={{
            collectionName: asset.asset_contract.name,
            seller: account,
            imageUrl: asset.image_url,
            tokenId: asset.token_id,
            assetContractAddress: asset.asset_contract.address,
            attributes: asset.attributes,
            collection: { imageUrl: asset.collection.image_url },
          }}
        />
      );
    });
    await Promise.all(requests);
    setNftsCardsHtml(nftsCardsHtml);
  }

  const fixUrl = (url) => {
    return "https://ipfs.io/ipfs/" + url.split("ipfs://")[1];
  };

  useEffect(() => {
    account && fetchNFTs();
  }, [account]);

  useEffect(() => {
    userAssets && renderAssetCards();
  }, [userAssets]);

  return (
    <div className="my-12 grid justify-center sm:grid-cols-2 lg:grid-cols-3 gap-12">
      {loading && (
        <p className="text-red-600 text-center">
          Recently acquired NFTs can take some time to load. If you don't see
          your NFT, please try again in a few minutes.
        </p>
      )}
      {nftsCardsHtml}
    </div>
  );
};

export default Items;
