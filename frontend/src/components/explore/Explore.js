import axios from "axios";
import React, { useEffect, useState } from "react";
import ExploreCard from "./ExploreCard";

const NftsCards = () => {
  const [exploreCards, setExploreCards] = useState([]);

  const renderExploreCards = async () => {
    const nftsForSale = await axios
      .get("http://localhost:8000/api/nfts/nftsforsale/getall")
      .then((res) => res.data.nftsForSale);

    const exploreCards = [];
    nftsForSale.map((nft, key) => {
      exploreCards.push(
        <ExploreCard
          tokenContractAddress={nft.tokenContractAddress}
          tokenId={nft.tokenId}
          seller={nft.seller}
          key={key}
        />
      );
    });
    setExploreCards(exploreCards);
  };

  useEffect(() => {
    renderExploreCards();
  }, []);

  return (
    <div className="mt-12">
      <h1 className="mb-7 text-2xl font-bold md:text-3xl text-onPrimary">
        Explore
      </h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {exploreCards && exploreCards}
      </div>
    </div>
  );
};

export default NftsCards;
