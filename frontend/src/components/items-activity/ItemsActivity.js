import { useEthers } from "@usedapp/core";
import React, { useState } from "react";
import ActivityTab from "./ActivityTab";
import Items from "./Items";

function ItemsActivity({
  collectionSlug,
  assetContractAddress,
  collectionName,
  creator,
  tokens,
}) {
  const [itemsDisplay, setItemsDisplay] = useState("flex");
  const { account } = useEthers();

  return (
    <div className="w-full my-12">
      <div className="flex justify-center gap-12 text-onPrimary text-lg mb-3">
        <button
          className={`${
            itemsDisplay === "flex" && "text-buttonSecondary"
          } font-semibold :text-xl`}
          onClick={() => setItemsDisplay("flex")}
        >
          Items
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

      <div className={`${itemsDisplay} flex flex-col`}>
        <Items
          collectionSlug={collectionSlug}
          assetContractAddress={assetContractAddress}
          collectionName={collectionName}
          editable={creator === account}
        />
      </div>
      <div
        className={`${
          itemsDisplay === "flex" ? "hidden" : "flex"
        } flex-col my-6`}
      >
        <ActivityTab
          assetContractAddress={assetContractAddress}
          tokens={tokens}
        />
      </div>
    </div>
  );
}

export default ItemsActivity;
