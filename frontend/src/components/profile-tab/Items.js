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
      //console.log(nft);
      const metadata = JSON.parse(nft.metadata);

      const image = metadata["image"];
      nftsCardsHtml.push(
        <CollectionCard
          imagePath={image.startsWith("ipfs") ? fixUrl(image) : image}
          collectionName={nft.name}
          tokenId={nft.token_id}
          owner={""}
          contractAddress={nft.token_address}
          sell={true}
          attributes={metadata.attributes}
        />
      );
    });
    await Promise.all(requests);
    setNftsCardsHtml(nftsCardsHtml);
  }

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
    <div className="my-12 grid justify-center sm:grid-cols-2 lg:grid-cols-3 gap-12">
      {nftsCardsHtml}
    </div>
  );
};

export default Items;
