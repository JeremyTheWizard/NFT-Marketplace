import React, { useState, useEffect, useRef } from "react";
import { useMoralisWeb3Api } from "react-moralis";
import { useEthers } from "@usedapp/core";
import CollectionCard from "../items-activity/CollectionCard";
import randomPerson from "../../photos/random-person.jpeg";

const Items = () => {
  const Web3Api = useMoralisWeb3Api();
  const { account } = useEthers();
  const [userNFTs, setUserNFTs] = useState();
  const [nftsCardsHtml, setNftsCardsHtml] = useState();

  const fetchNFTs = async () => {
    const userNFTss = await Web3Api.Web3API.account.getNFTs({
      chain: "rinkeby",
      address: account,
    });
    setUserNFTs(userNFTss);
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

  useEffect(() => {
    account && fetchNFTs();
  }, [account]);

  useEffect(() => {
    userNFTs && renderExploreCards();
  }, [userNFTs]);

  return (
    <div className="mt-12 grid justify-center sm:grid-cols-2 lg:grid-cols-3 gap-12">
      {nftsCardsHtml}
    </div>
  );
};

export default Items;
