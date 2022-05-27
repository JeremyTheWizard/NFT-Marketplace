import React from "react";
import AssetActivityTabItem from "./AssetActivityTabItem";

function AssetActivityTab() {
  return (
    <>
      <div className="hidden md:grid grid-cols-5 gap-6 text-center text-onPrimary font-bold">
        <p>Event</p>
        <p>Price</p>
        <p>From</p>
        <p>To</p>
        <p>Time</p>
      </div>
      <div className="flex flex-col gap-16 md:gap-12 mt-8">
        <AssetActivityTabItem />
        <AssetActivityTabItem />
        <AssetActivityTabItem />
      </div>
    </>
  );
}

export default AssetActivityTab;
