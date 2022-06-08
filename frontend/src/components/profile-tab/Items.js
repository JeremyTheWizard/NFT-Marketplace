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
  const [loading, setLoading] = useState(false);

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
      const metadata = await JSON.parse(nft.metadata);
      if (!nft.metadata) {
        const options = {
          chain: "rinkeby",
          address: nft.token_address,
          token_id: nft.token_id,
          flag: "uri",
        };
        // setTimeout is used to bypass moralis api limitations by second
        setTimeout(async () => {
          const response2 = await Web3Api.token.reSyncMetadata(options);
        }, 2000);
        setLoading(true);
        console.log("Uri syncing...");
        nft.token_uri &&
          setTimeout(async () => {
            const response3 = await Web3Api.token.reSyncMetadata({
              chain: "rinkeby",
              address: nft.token_address,
              token_id: nft.token_id,
              flag: "metadata",
            });
          }, 200);
        console.log("Metadata syncing...");
      }

      const image = metadata && metadata["image"];
      metadata &&
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
      {loading && (
        <p className="text-red-600 text-center">
          Recently acquired NFTs can take some time to load. If you don't see
          your NFT, please try again in a few minutes.
        </p>
      )}
      {nftsCardsHtml}
    </div>
  );
};

export default Items;
