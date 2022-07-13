import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import CollectionIntro from "../components/collection-intro/CollectionIntro";
import ItemsActivity from "../components/items-activity/ItemsActivity";
import ModifiedCircularProgress from "../components/ModifiedMuiComponents/ModifiedCircularProgress";

function Collection() {
  const { collectionslug } = useParams();
  const [collectionRelevantInfo, setCollectionRelevantInfo] = useState();
  const location = useLocation();

  const fetchCollectionInfo = async () => {
    // Fetches the collection info following the below system:
    // first use the location params to increase speed
    // Check if the collection is internal and call the db for info
    // If the collection is external call opensea's api

    let collectionRelevantInfo = [];
    let collectionInfo = [];

    // location params
    if (location.state.collectionInfo) {
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
    }

    // Internal collection
    let response;
    try {
      response = await axios.get(
        `http://localhost:8000/api/collections/collection/${collectionslug}`
      );
    } catch {}

    if (response) {
      collectionInfo = response.data.collectionInfo;
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
    }
    // External collection
    else {
      // We still want to check our db for external collections
      // to check for overrides
      if (
        !collectionRelevantInfo.bannerImageUrl ||
        !collectionRelevantInfo.roundedIconImageUrl ||
        !collectionRelevantInfo.description
      ) {
        try {
          collectionInfo = await axios
            .get(
              `http://localhost:8000/api/collections/collection/${
                collectionslug.split("nft-palace-collections-")[1]
              }`
            )
            .then((res) => res.data.collectionInfo);
        } catch (err) {
          console.log(err);
        }

        if (collectionInfo.bannerImageUrl) {
          collectionRelevantInfo.bannerImageUrl = collectionInfo.bannerImageUrl;
        }
        if (collectionInfo.roundedIconImageUrl) {
          collectionRelevantInfo.profileImageUrl =
            collectionInfo.roundedIconImageUrl;
        }
        if (collectionInfo.description) {
          collectionRelevantInfo.description = collectionInfo.description;
        }
      }

      // Now we call opensea's api
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
        assetContractAddress:
          collectionInfo.primary_asset_contracts[0] &&
          collectionInfo.primary_asset_contracts[0].address,
        name: collectionRelevantInfo.name
          ? collectionRelevantInfo.name
          : collectionInfo.name.split("-").join(" "),
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
    setCollectionRelevantInfo(collectionRelevantInfo);
  };

  useEffect(() => {
    fetchCollectionInfo();
  }, []);

  return (
    <div className="w-[90vw] max-w-[1200px] h-full mx-auto mt-12 flex flex-col justify-center items-center">
      {collectionRelevantInfo ? (
        <CollectionIntro
          collectionName={collectionRelevantInfo.name}
          bannerImageUrl={collectionRelevantInfo.bannerImageUrl}
          profileImage={collectionRelevantInfo.profileImageUrl}
          description={collectionRelevantInfo.description}
          stats={collectionRelevantInfo.stats}
          creator={collectionRelevantInfo.creator}
        />
      ) : (
        <ModifiedCircularProgress />
      )}
      {collectionRelevantInfo && (
        <ItemsActivity
          assetContractAddress={collectionRelevantInfo.assetContractAddress}
          collectionName={collectionRelevantInfo.name}
          creator={collectionRelevantInfo.creator}
          tokens={collectionRelevantInfo.tokens}
          collectionSlug={collectionRelevantInfo.collectionSlug}
        />
      )}
    </div>
  );
}

export default Collection;
