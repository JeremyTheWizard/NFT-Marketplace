import React, { useState } from "react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function TopCollectionsCollection({
  collectionSlug,
  collectionName,
  imageUrl,
  description,
}) {
  let navigate = useNavigate();
  function routeChange(path) {
    navigate(path, { state: { imagePath: imageUrl } });
  }
  const [display, setDisplay] = useState("hidden");

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
            src={imageUrl}
            alt=""
            className="h-full w-full object-cover rounded-xl"
          />
        </div>
        <div
          className={`${display} w-[545px] h-60 rounded-xl bg-onPrimary absolute z-10`}
          onMouseLeave={(e) => {
            setDisplay("hidden");
          }}
          onClick={() => routeChange(`/collections/${collectionSlug}`)}
        >
          <div className="h-60 w-60 shrink-0 pl-4 py-4">
            <img
              src={imageUrl}
              alt=""
              className="h-full w-full object-cover rounded-xl"
            />
          </div>
          <div className="m-4 ml-6 flex flex-col">
            <h1 className="text-left text-xl font-semibold mb-2">
              {collectionName && collectionName}
            </h1>
            <p className="text-left break-word text-ellipsis line-clamp-4 max-height-[7.5rem]">
              {description ? description : "This collection has no description"}
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
