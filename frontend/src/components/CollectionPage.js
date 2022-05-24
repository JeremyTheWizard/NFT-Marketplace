import React, { useState } from "react";
import testImage from "../photos/TopCollecionts/nft1.jpeg";

function CollectionPage() {
  return (
    <div>
      <div className="w-[100vw] max-h-80">
        <img src={testImage} alt="" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}

export default CollectionPage;
