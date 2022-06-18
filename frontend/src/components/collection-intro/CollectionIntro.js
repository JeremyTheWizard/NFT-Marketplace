import React from "react";
import BannerAndRoundedIcon from "../BannerAndRoundedIcon";

const CollectionIntro = ({
  collectionName,
  bannerImageUrl,
  profileImage,
  description,
  stats,
}) => {
  return (
    <div className="w-full">
      <BannerAndRoundedIcon
        bannerImage={bannerImageUrl ? bannerImageUrl : ""}
        profileImage={profileImage ? profileImage : ""}
      />

      <div className="grid lg:grid-cols-2 gap-12 items-center ">
        <div className="flex flex-col gap-8">
          <h2 className="text-onPrimary text-2xl md:text-3xl font-bold">
            {collectionName.charAt(0).toUpperCase() + collectionName.slice(1)}
          </h2>
          <p className="text-onPrimary">
            {description
              ? description
              : `Welcome to the home of {collectionName} on NFT Palace. Discover the
            best items in this collection.`}
          </p>
        </div>

        <div className="flex justify-around p-3 text-onPrimary border-2 border-buttonSecondary rounded-xl">
          <div className="div flex flex-col gap-3 items-center">
            <p className="md:text-xl font-semibold">Items</p>
            <p className="md:text-xl">
              {stats.total_supply ? stats.total_supply : "---"}
            </p>
          </div>
          <div className="div flex flex-col gap-3 items-center">
            <p className="md:text-xl font-semibold">Owners</p>
            <p className="md:text-xl">
              {stats.total_owners ? stats.total_owners : "---"}
            </p>
          </div>
          <div className="div flex flex-col gap-3 items-center">
            <p className="md:text-xl font-semibold">Floor Price</p>
            <p className="md:text-xl">
              {stats.floor_price ? stats.floor_price : "---"}
            </p>
          </div>
          <div className="div flex flex-col gap-3 items-center">
            <p className="md:text-xl font-semibold">Total Volume</p>
            <p className="md:text-xl">
              {stats.total_volume ? stats.total_volume.toFixed(2) : "---"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionIntro;
