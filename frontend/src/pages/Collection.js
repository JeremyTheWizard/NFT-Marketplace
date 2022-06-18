import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CollectionIntro from "../components/collection-intro/CollectionIntro";

function Collection() {
  const { collectionname } = useParams();
  const [collectionRelevantInfo, setCollectionRelevantInfo] = useState({
    name: "",
    bannerImageUrl: "",
    profileImageUrl: "",
    description: "",
    stats: {},
  });

  const getCollectionStats = async () => {
    const collectionInfo = await axios
      .get(
        `https://testnets-api.opensea.io/api/v1/collection/${collectionname}`
      )
      .then((res) => res.data.collection);
    setCollectionRelevantInfo({
      name: collectionInfo.name,
      bannerImageUrl: collectionInfo.banner_image_url,
      profileImageUrl: collectionInfo.image_url,
      description: collectionInfo.description,
      stats: collectionInfo.stats,
    });
  };

  useEffect(() => {
    getCollectionStats();
  }, []);

  return (
    <div className="w-[90vw] max-w-[1200px] mx-auto mt-12 flex flex-col justify-center items-center">
      <CollectionIntro
        collectionName={collectionRelevantInfo.name}
        bannerImageUrl={collectionRelevantInfo.bannerImageUrl}
        profileImage={collectionRelevantInfo.profileImageUrl}
        description={collectionRelevantInfo.description}
        stats={collectionRelevantInfo.stats}
      />
    </div>
  );
}

export default Collection;
