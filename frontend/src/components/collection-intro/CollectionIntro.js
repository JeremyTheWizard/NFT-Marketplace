import { useEthers } from "@usedapp/core";
import React from "react";
import { useParams } from "react-router-dom";
import BannerAndRoundedIcon from "../BannerAndRoundedIcon";
import Description from "./Description";

const CollectionIntro = ({
  collectionName,
  bannerImageUrl,
  profileImage,
  description,
  stats,
  creator,
}) => {
  const { account } = useEthers();
  const { collectionslug } = useParams();

  const bannerAxiosOptions = {
    method: "post",
    url: "http://localhost:8000/api/collections/collection/banner",
    data: { collectionSlug: collectionslug, account: account },
  };
  const roundedIconAxiosOptions = {
    method: "post",
    url: "http://localhost:8000/api/collections/collection/roundedicon",
    data: { collectionSlug: collectionslug, account: account },
  };

  return (
    <div className="w-full">
      <BannerAndRoundedIcon
        _bannerImage={bannerImageUrl ? bannerImageUrl : null}
        _roundedIcon={profileImage ? profileImage : null}
        _editable={creator ? (creator === account ? true : false) : false}
        _bannerAxiosOptions={bannerAxiosOptions}
        _roundedIconAxiosOptions={roundedIconAxiosOptions}
      />

      <div className="grid lg:grid-cols-2 gap-12 items-center ">
        <div className="flex flex-col gap-8">
          <h2 className="text-onPrimary text-2xl md:text-3xl font-bold">
            {collectionName &&
              collectionName.charAt(0).toUpperCase() + collectionName.slice(1)}
          </h2>
          <Description
            description={
              description
                ? description
                : `Welcome to the home of ${collectionName} on NFT Palace. Discover the best items in this collection.`
            }
            collectionSlug={collectionslug}
            editable={creator === account}
          />
        </div>

        <div className="grid grid-cols-2 grid-rows-2 gap-y-6 md:flex justify-around p-3 text-onPrimary border-2 border-buttonSecondary rounded-xl">
          <div className="div flex flex-col gap-3 items-center">
            <p className="md:text-xl font-semibold">Items</p>
            <p className="md:text-xl">
              {stats && stats.total_supply ? stats.total_supply : "---"}
            </p>
          </div>
          <div className="div flex flex-col gap-3 items-center">
            <p className="md:text-xl font-semibold">Owners</p>
            <p className="md:text-xl">
              {stats && stats.total_owners ? stats.total_owners : "---"}
            </p>
          </div>
          <div className="div flex flex-col gap-3 items-center">
            <p className="md:text-xl font-semibold">Floor Price</p>
            <p className="md:text-xl">
              {stats && stats.floor_price ? stats.floor_price : "---"}
            </p>
          </div>
          <div className="div flex flex-col gap-3 items-center">
            <p className="md:text-xl font-semibold">Total Volume</p>
            <p className="md:text-xl">
              {stats && stats.total_volume
                ? stats.total_volume.toFixed(2)
                : "---"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionIntro;
