import React from "react";
import { useLocation, useParams } from "react-router-dom";
import BannerAndRoundedIcon from "../BannerAndRoundedIcon";

const CollectionIntro = () => {
  const { collectionname } = useParams();
  const location = useLocation();

  return (
    <div className="w-full">
      <BannerAndRoundedIcon bannerImage="" profileImage="" />

      <div className="grid lg:grid-cols-2 gap-12 items-center ">
        <div className="flex flex-col gap-8">
          <h2 className="text-onPrimary text-2xl md:text-3xl font-bold">
            {collectionname.charAt(0).toUpperCase() + collectionname.slice(1)}
          </h2>
          <p className="text-onPrimary">
            Welcome to the home of {collectionname} on NFT Palace. Discover the
            best items in this collection.
          </p>
        </div>

        <div className="flex justify-around p-3 text-onPrimary border-2 border-buttonSecondary rounded-xl">
          <div className="div flex flex-col gap-3 items-center">
            <p className="md:text-xl font-semibold">Items</p>
            <p className="md:text-xl">8</p>
          </div>
          <div className="div flex flex-col gap-3 items-center">
            <p className="md:text-xl font-semibold">Owners</p>
            <p className="md:text-xl">3</p>
          </div>
          <div className="div flex flex-col gap-3 items-center">
            <p className="md:text-xl font-semibold">Floor Price</p>
            <p className="md:text-xl">0.03</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionIntro;
