import React, { useState } from "react";
import Offers from "./Offers";
import AssetActivityTab from "./AssetActivityTab";

function AssetOffersActivity() {
  const [itemsDisplay, setItemsDisplay] = useState("flex");

  return (
    <div className="w-full my-12">
      <div className="flex justify-center gap-12 text-onPrimary text-lg mb-3 font-semibold">
        <button
          className={`${
            itemsDisplay === "flex" && "text-buttonSecondary"
          } font-semibold md:text-xl`}
          onClick={() => setItemsDisplay("flex")}
        >
          Offers
        </button>
        <button
          className={`${
            itemsDisplay === "hidden" && "text-buttonSecondary"
          } font-semibold`}
          onClick={() => setItemsDisplay("hidden")}
        >
          Activity
        </button>
      </div>
      <hr className="bg-onPrimary w-full border-1" />
      <div className={`${itemsDisplay} flex-col my-6 text-center`}>
        <Offers />
      </div>
      <div
        className={`${
          itemsDisplay === "flex" ? "hidden" : "flex"
        } flex-col my-6`}
      >
        <AssetActivityTab />
      </div>
    </div>
  );
}

export default AssetOffersActivity;
