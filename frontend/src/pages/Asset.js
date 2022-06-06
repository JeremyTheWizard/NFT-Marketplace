import React from "react";
import AssetCard from "../components/Asset/AssetCard";
import Tabs from "../components/Asset/offers-history/Tabs";

function Asset() {
  return (
    <div className="w-[90vw] max-w-[1200px] mx-auto mt-12 flex flex-col justify-center items-center">
      <AssetCard />
      <Tabs />
    </div>
  );
}

export default Asset;
