import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import CollectionIntro from "../components/collection-intro/CollectionIntro";
import ItemsActivity from "../components/items-activity/ItemsActivity";

function Collection() {
  const { collectionslug } = useParams();
  const [collectionRelevantInfo, setCollectionRelevantInfo] = useState();
  const location = useLocation();

  const fetchCollectionInfo = async () => {
    let collectionRelevantInfo = [];

    // use location params to increase loading speed
    if (location.state.collectionInfo.bannerImageUrl) {
      collectionRelevantInfo.bannerImageUrl =
        location.state.collectionInfo.bannerImageUrl;
    }
    if (location.state.collectionInfo.roundedIconImageUrl) {
      collectionRelevantInfo.profileImageUrl =
        location.state.collectionInfo.roundedIconImageUrl;
    }
    if (location.state.collectionInfo.description) {
      collectionRelevantInfo.description =
        location.state.collectionInfo.description;
    }
    if (location.state.collectionInfo.name) {
      collectionRelevantInfo.name = location.state.collectionInfo.name;
    }
    if (collectionRelevantInfo) {
      setCollectionRelevantInfo(collectionRelevantInfo);
    }

    // First check if there is a collection in the db if not check opensea's api
    let response;
    try {
      response = await axios.get(
        `http://localhost:8000/api/collections/collection/${collectionslug}`
      );
    } catch {}

    if (response) {
      const collectionInfo = response.data.collectionInfo;
      collectionRelevantInfo = {
        collectionSlug: collectionInfo.slug,
        assetContractAddress: collectionInfo.assetContractAddress,
        name: collectionInfo.name,
        bannerImageUrl: collectionRelevantInfo.bannerImageUrl
          ? collectionRelevantInfo.bannerImageUrl
          : collectionInfo.bannerImageUrl,
        profileImageUrl: collectionRelevantInfo.profileImageUrl
          ? collectionRelevantInfo.profileImageUrl
          : collectionInfo.roundedIconImageUrl,
        description: collectionRelevantInfo.description
          ? collectionRelevantInfo.description
          : collectionInfo.description,
        creator: collectionInfo.createdBy,
        tokens: collectionInfo.tokens,
      };
    } else {
      // Override important params with db params on external collections
      let collectionInfo = [];
      if (
        !collectionRelevantInfo.bannerImageUrl ||
        !collectionRelevantInfo.roundedIconImageUrl ||
        !collectionRelevantInfo.description
      ) {
        // The idea is that all urls will have the same structure prepending
        // "nft-palace-collections" to all of them. However to use opensea's api
        // we need to split the url.
        try {
          collectionInfo = await axios.get(
            `http://localhost/8000/api/collections/collection${
              collectionslug.split("nft-palace-collections-")[1]
            }`
          );
        } catch (err) {
          console.log(err);
        }

        if (collectionInfo.bannerImageUrl) {
          collectionRelevantInfo.bannerImageUrl = collectionInfo.bannerImageUrl;
        }
        if (collectionInfo.roundedIconImageUrl) {
          collectionRelevantInfo.bannerImageUrl =
            collectionInfo.roundedIconImageUrl;
        }
        if (collectionInfo.description) {
          collectionRelevantInfo.bannerImageUrl = collectionInfo.description;
        }
      }

      // get rest of info from opensea
      try {
        collectionInfo = await axios
          .get(
            `https://testnets-api.opensea.io/api/v1/collection/${
              collectionslug.split("nft-palace-collections-")[1]
            }`
          )
          .then((res) => res.data.collection);
      } catch (err) {
        console.log(err);
      }

      collectionRelevantInfo = {
        assetContractAddress: collectionInfo.primary_asset_contracts[0].address,
        name: collectionInfo.name,
        stats: collectionInfo.stats,
        bannerImageUrl: collectionRelevantInfo.bannerImageUrl
          ? collectionRelevantInfo.bannerImageUrl
          : collectionInfo.bannerImageUrl,
        profileImageUrl: collectionRelevantInfo.profileImageUrl
          ? collectionRelevantInfo.profileImageUrl
          : collectionInfo.roundedIconImageUrl,
        description: collectionRelevantInfo.description
          ? collectionRelevantInfo.description
          : collectionInfo.description,
      };
    }

    console.log("🚀 ~ collectionRelevantInfo", collectionRelevantInfo);
    setCollectionRelevantInfo(collectionRelevantInfo);
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
