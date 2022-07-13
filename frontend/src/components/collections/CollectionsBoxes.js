import axios from "axios";
import React, { useEffect, useState } from "react";
import ModifiedCircularProgress from "../ModifiedMuiComponents/ModifiedCircularProgress";
import Collection from "./Collection";

const CollectionsBoxes = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    const collections = await axios({
      method: "get",
      url: "http://localhost:8000/api/collections",
    }).then((res) => res.data.collections);

    setCollections(collections);
    setLoading(false);
  };

  return (
    <>
      <div className="flex flex-col items-center">
        {loading && <ModifiedCircularProgress />}
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24 justify-items-center">
        {collections.map((collection) => {
          return <Collection collectionInfo={collection} />;
        })}
      </div>
    </>
  );
};

export default CollectionsBoxes;
