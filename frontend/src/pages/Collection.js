import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CollectionIntro from "../components/collection-intro/CollectionIntro";
import ItemsActivity from "../components/items-activity/ItemsActivity";

function Collection() {
  const { collectionname } = useParams();
  const [collectionRelevantInfo, setCollectionRelevantInfo] = useState();

  const getCollectionInfo = async () => {
    const collectionInfo = await axios
      .get(
        `https://testnets-api.opensea.io/api/v1/collection/${collectionname}`
      )
      .then((res) => res.data.collection);

    setCollectionRelevantInfo({
      assetContractAddress: collectionInfo.primary_asset_contracts[0].address,
      name: collectionInfo.name,
      bannerImageUrl: collectionInfo.banner_image_url,
      profileImageUrl: collectionInfo.image_url,
      description: collectionInfo.description,
      stats: collectionInfo.stats,
    });
  };

  useEffect(() => {
    getCollectionInfo();
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
        />
      )}
      {collectionRelevantInfo && (
        <ItemsActivity
          assetContractAddress={collectionRelevantInfo.assetContractAddress}
          collectionName={collectionRelevantInfo.name}
          i
        />
      )}
    </div>
  );
}

export default Collection;
