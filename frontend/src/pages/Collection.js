import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CollectionIntro from "../components/collection-intro/CollectionIntro";
import ItemsActivity from "../components/items-activity/ItemsActivity";

function Collection() {
  const { collectionslug } = useParams();
  const [collectionRelevantInfo, setCollectionRelevantInfo] = useState();

  const fetchCollectionInfo = async () => {
    // First check if there is a collection in the db if not check opensea's api

    let response;
    try {
      response = await axios.get(
        `http://localhost:8000/api/collections/collection/${collectionslug}`
      );
    } catch {}

    if (response) {
      const collectionInfo = response.data.collectionInfo;
      setCollectionRelevantInfo({
        collectionSlug: collectionInfo.slug,
        assetContractAddress: collectionInfo.assetContractAddress,
        name: collectionInfo.name,
        bannerImageUrl: collectionInfo.bannerImageUrl,
        profileImageUrl: collectionInfo.roundedIconImageUrl,
        description: collectionInfo.description,
        creator: collectionInfo.createdBy,
        tokens: collectionInfo.tokens,
      });
    } else {
      // The idea is that all urls will have the same structure prepending
      // "nft-palace-collections" to all of them. However to use opensea's api
      // we need to split the url.
      const collectionInfo = await axios
        .get(
          `https://testnets-api.opensea.io/api/v1/collection/${
            collectionslug.split("nft-palace-collections-")[1]
          }`
        )
        .then((res) => res.data.collection);
      console.log("whats happening");

      setCollectionRelevantInfo({
        assetContractAddress: collectionInfo.primary_asset_contracts[0].address,
        name: collectionInfo.name,
        bannerImageUrl: collectionInfo.banner_image_url,
        profileImageUrl: collectionInfo.image_url,
        description: collectionInfo.description,
        stats: collectionInfo.stats,
      });
    }
  };

  useEffect(() => {
    fetchCollectionInfo();
  }, []);

  return (
    <div className="w-[90vw] max-w-[1200px] mx-auto mt-12 flex flex-col justify-center items-center">
      {collectionRelevantInfo && (
        <CollectionIntro
          collectionName={collectionRelevantInfo.name}
          bannerImageUrl={collectionRelevantInfo.bannerImageUrl}
          profileImage={collectionRelevantInfo.profileImageUrl}
          description={collectionRelevantInfo.description}
          stats={collectionRelevantInfo.stats}
          creator={collectionRelevantInfo.creator}
        />
      )}
      {collectionRelevantInfo && (
        <ItemsActivity
          collectionSlug={collectionRelevantInfo.collectionSlug}
          assetContractAddress={collectionRelevantInfo.assetContractAddress}
          collectionName={collectionRelevantInfo.name}
          creator={collectionRelevantInfo.creator}
          tokens={collectionRelevantInfo.tokens}
        />
      )}
    </div>
  );
}

export default Collection;
