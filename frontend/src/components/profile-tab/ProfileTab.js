import React, { useState } from "react";

function ItemsActivity() {
  const [itemsDisplay, setItemsDisplay] = useState("flex");
  const [offersMadeDisplay, setOffersMadeDisplay] = useState("hidden");
  const [offersReceivedDisplay, setOffersReceivedDisplay] = useState("hidden");
  const [collectionsCreatedDisplay, setCollectionsCreatedDisplay] =
    useState("hidden");

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
          className={`${
            offersMadeDisplay === "flex" && "text-buttonSecondary"
          } font-semibold`}
          onClick={() => setOffersMadeDisplay("flex")}
        >
          Offers Made
        </button>
        <button
          className={`${
            offersReceivedDisplay === "flex" && "text-buttonSecondary"
          } font-semibold :text-xl`}
          onClick={() => setOffersReceivedDisplay("flex")}
        >
          Offers Received
        </button>
        <button
          className={`${
            collectionsCreatedDisplay === "flex" && "text-buttonSecondary"
          } font-semibold :text-xl`}
          onClick={() => setCollectionsCreatedDisplay("flex")}
        >
          Created
        </button>
      </div>
      <hr className="bg-onPrimary w-full border-1" />
      <div
        className={`${itemsDisplay} mt-12 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-12`}
      ></div>
      <div
        className={`${
          itemsDisplay === "flex" ? "hidden" : "flex"
        } flex-col my-6`}
      ></div>
    </div>
  );
}

export default ItemsActivity;
