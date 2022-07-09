import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainButton from "../MainButton";
import TopCollectionsCollection from "./TopCollectionsCollection";

const TopCollections = () => {
  const [topCollections, setTopCollections] = useState();
  const [topCollectionsImages, setTopCollectionsImages] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    getTopCollections();
  }, []);

  useEffect(() => {
    if (topCollections) {
      renderTopCollectionsImages();
    }
  }, [topCollections]);

  const getTopCollections = async () => {
    const response = await axios.get(
      "http://localhost:8000/api/collections/topcollections"
    );
    setTopCollections(response.data.topCollections);
  };

  const renderTopCollectionsImages = async () => {
    const imagesHtml = [];

    /* We loop through the images twice because if not there would be an empty
    space while the slide animation repeats.
    */
    await Promise.all(
      topCollections.map((collection, key) => {
        // due to opensea's api rate limit, the top collections info is stored
        // in a private db so there is no need to call the api
        imagesHtml.push(
          <TopCollectionsCollection
            key={key}
            collectionSlug={collection.slug}
            collectionName={collection.name}
            imageUrl={collection.imageUrl}
            description={collection.description}
          />
        );
      })
    );

    setTopCollectionsImages([...imagesHtml, ...imagesHtml]);
  };

  return (
    <>
      <h1 className="mx-auto mt-12 mb-3 text-onPrimary text-2xl md:text-3xl font-bold">
        Top Collections
      </h1>
      {/* Since the app.js has a with of 90vw, when we give this component
      100vw it will set a negative margin just on the right side. This the need
      to set the left margin with the calc function.*/}
      <div className="overflow-hidden mx-auto flex w-[100vw] md:w-full relative md:static left-[calc(-50vw+50%)]">
        <div className="flex animate-auto-slide hover:pause overflow-visible relative">
          {topCollectionsImages && topCollectionsImages}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <MainButton
          onClick={() => {
            navigate("/collections");
          }}
          text="DISCOVER ALL COLLECTIONS"
          styles="mt-6"
        />
      </div>
    </>
  );
};

export default TopCollections;
