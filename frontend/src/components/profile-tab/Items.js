import { useEthers } from "@usedapp/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AssetCard from "../explore/AssetCard";
import ModifiedCircularProgress from "../ModifiedMuiComponents/ModifiedCircularProgress";

const Items = () => {
  const { account } = useEthers();
  const [userAssets, setUserAssets] = useState();
  const [nftsCardsHtml, setNftsCardsHtml] = useState();

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
            attributes: asset.traits,
            collection: { imageUrl: asset.collection.image_url },
            name: asset.name,
            description: asset.description,
          }}
          originalAccount={account}
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
    <>
      {!nftsCardsHtml && (
        <div className="flex flex-col items-center my-12">
          <ModifiedCircularProgress />
        </div>
      )}
      <div className="my-12 grid justify-center sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {nftsCardsHtml && nftsCardsHtml}
      </div>
    </>
  );
};

export default Items;
