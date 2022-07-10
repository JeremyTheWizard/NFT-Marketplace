import React, { useState } from "react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function TopCollectionsCollection({ collection }) {
  let navigate = useNavigate();
  const [display, setDisplay] = useState("hidden");

  const navigateToCollection = () => {
    navigate(`/collections/nft-palace-collections-${collection.slug}`, {
      state: {
        bannerImageUrl: collection.bannerImageUrl,
        roundedIconImageUrl: collection.roundedIconImageUrl,
        description: collection.description,
        name: collection.name,
      },
    });
  };

  return (
    <>
      <div className="relative flex cursor-pointer">
        <div
          className="h-60 w-60 pl-4 py-4"
          onMouseEnter={(e) => {
            setDisplay("flex");
          }}
        >
          <img
            src={collection.roundedIconImageUrl}
            alt=""
            className="h-full w-full object-cover rounded-xl"
          />
        </div>
        <div
          className={`${display} w-[545px] h-60 rounded-xl bg-onPrimary absolute z-10`}
          onMouseLeave={(e) => {
            setDisplay("hidden");
          }}
          onClick={navigateToCollection}
        >
          <div className="h-60 w-60 shrink-0 pl-4 py-4">
            <img
              src={collection.roundedIconImageUrl}
              alt=""
              className="h-full w-full object-cover rounded-xl"
            />
          </div>
          <div className="m-4 ml-6 flex flex-col">
            <h1 className="text-left text-xl font-semibold mb-2">
              {collection.name && collection.name}
            </h1>
            <p className="text-left break-word text-ellipsis line-clamp-4 max-height-[7.5rem]">
              {collection.description
                ? collection.description
                : "This collection has no description"}
            </p>
            <BsFillArrowRightCircleFill
              className="shrink-0 self-end mt-auto"
              size="24px"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default TopCollectionsCollection;
