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
  const [activeTab, setActiveTab] = useState(0);
  const { account } = useEthers();

  return (
    <div className="w-full my-12">
      <div className="flex justify-center gap-12 text-onPrimary text-lg mb-3">
        <button
          className={`${
            activeTab === 0 && "text-buttonSecondary"
          } font-semibold :text-xl`}
          onClick={() => setActiveTab(0)}
        >
          Items
        </button>
        <button
          className={`${
            activeTab === 1 && "text-buttonSecondary"
          } font-semibold`}
          onClick={() => setActiveTab(1)}
        >
          Activity
        </button>
      </div>
      <hr className="bg-onPrimary w-full border-1" />

      {activeTab === 0 && (
        <Items
          collectionSlug={collectionSlug}
          assetContractAddress={assetContractAddress}
          collectionName={collectionName}
          editable={creator === account}
        />
      )}
      {activeTab === 1 && (
        <div className="flex flex-col my-6">
          <ActivityTab
            assetContractAddress={assetContractAddress}
            tokens={tokens}
          />
        </div>
      )}
    </div>
  );
}

export default ItemsActivity;
