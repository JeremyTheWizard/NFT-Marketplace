import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CollectionCard from "./CollectionCard";
import randomPerson from "../../photos/random-person.jpeg";
import ActivityTab from "./ActivityTab";

function ItemsActivity() {
  const [itemsDisplay, setItemsDisplay] = useState("flex");
  const { collectionname } = useParams();

  const allNfts =
    require(`../../photos/Collections/${collectionname}/ImageList`).allNfts;

  function renderExploreCards() {
    const nftsCardsHtml = [];
    for (let i = 0; i < allNfts.length; i++) {
      nftsCardsHtml.push(
        <CollectionCard imagePath={allNfts[i]} owner={randomPerson} />
      );
    }
    return nftsCardsHtml;
  }

  return (
    <div className="w-full my-12">
      <div className="flex justify-center gap-12 text-onPrimary text-lg mb-3">
        <button
          className={`${
            itemsDisplay === "flex" && "text-buttonSecondary"
          } font-semibold md:text-xl`}
          onClick={() => setItemsDisplay("flex")}
        >
          Items
        </button>
        <button
          className={`${itemsDisplay === "hidden" && "text-buttonSecondary"}`}
          onClick={() => setItemsDisplay("hidden")}
        >
          Activity
        </button>
      </div>
      <hr className="bg-onPrimary w-full border-1" />
      <div
        className={`${itemsDisplay} mt-12 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-12`}
      >
        {renderExploreCards()}
      </div>
      <div
        className={`${
          itemsDisplay === "flex" ? "hidden" : "flex"
        } flex-col my-6`}
      >
        <ActivityTab />
      </div>
    </div>
  );
}

export default ItemsActivity;
