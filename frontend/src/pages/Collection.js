import React from "react";
import CollectionIntro from "../components/collection-intro/CollectionIntro";
import ItemsActivity from "../components/items-activity/ItemsActivity";

function Collection() {
  return (
    <div className="w-[90vw] max-w-[1200px] mx-auto mt-12 flex flex-col justify-center items-center">
      <CollectionIntro />
      <ItemsActivity />
    </div>
  );
}

export default Collection;
