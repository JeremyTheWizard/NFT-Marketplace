import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CollectionIntro from "../components/collection-intro/CollectionIntro";
import capitalizeWordsOnArray from "../useful-scripts/capitalizeWordsOnArray";

function Collection() {
  const { collectionname } = useParams();
  const [stats, setStats] = useState();
  const collectionName = capitalizeWordsOnArray(collectionname.split("-")).join(
    " "
  );

  const getCollectionStats = async () => {
    const collectionInfo = await axios
      .get(
        `https://testnets-api.opensea.io/api/v1/collection/${collectionname}`
      )
      .then((res) => res.data.collection);
    setStats(collectionInfo.stats);
  };

  useEffect(() => {
    getCollectionStats();
  }, []);

  return (
    <div className="w-[90vw] max-w-[1200px] mx-auto mt-12 flex flex-col justify-center items-center">
      {stats && (
        <CollectionIntro stats={stats} collectionName={collectionName} />
      )}
    </div>
  );
}

export default Collection;
