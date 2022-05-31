import React, { useState, useEffect, useRef } from "react";
import { useMoralisWeb3Api } from "react-moralis";
import { useEthers } from "@usedapp/core";
import CollectionCard from "../items-activity/CollectionCard";
import randomPerson from "../../photos/random-person.jpeg";

function ProfileTab() {
  const [itemsDisplay, setItemsDisplay] = useState("flex");
  const [offersMadeDisplay, setOffersMadeDisplay] = useState("hidden");
  const [offersReceivedDisplay, setOffersReceivedDisplay] = useState("hidden");
  const [collectionsCreatedDisplay, setCollectionsCreatedDisplay] =
    useState("hidden");
  const [userNFTs, setUserNFTs] = useState();
  const [nftsCardsHtml, setNftsCardsHtml] = useState();
  const Web3Api = useMoralisWeb3Api();
  const { account } = useEthers();

  const fetchNFTs = async () => {
    const userNFTss = await Web3Api.Web3API.account.getNFTs({
      chain: "rinkeby",
      address: account,
    });
    setUserNFTs(userNFTss);
  };

  useEffect(() => {
    account && fetchNFTs();
  }, [account]);

  useEffect(() => {
    userNFTs && renderExploreCards();
  }, [userNFTs]);

  const fixMoralisUrl = (url) => {
    if (url.startsWith("ipfs")) {
      return "https://ipfs:moralis.io:2053/ipfs/" + url.split("ipfs://ipfs/");
    } else {
      return url + "?format=json";
    }
  };

  const fixUrl = (url) => {
    return "https://ipfs.io/ipfs/" + url.split("ipfs://")[1];
  };

  async function renderExploreCards() {
    const nftsCardsHtml = [];
    const requests = userNFTs.result.map(async (nft) => {
      let response = await fetch(fixMoralisUrl(nft.token_uri));
      response = await response.json();
      const image = response.image;
      nftsCardsHtml.push(
        <CollectionCard
          imagePath={image.startsWith("ipfs") ? fixUrl(image) : image}
          owner={""}
        />
      );
    });
    await Promise.all(requests);
    setNftsCardsHtml(nftsCardsHtml);
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
      >
        {nftsCardsHtml}
      </div>
      <div
        className={`${
          itemsDisplay === "flex" ? "hidden" : "flex"
        } flex-col my-6`}
      ></div>
    </div>
  );
}

export default ProfileTab;
