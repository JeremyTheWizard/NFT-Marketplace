import React, { useEffect, useState } from "react";
import { useMoralisWeb3Api } from "react-moralis";
import ActivityTabItem from "./ActivityTabItem";

function ActivityTab({ assetContractAddress, tokenId }) {
  const [ethUsd, setEthUsd] = useState();
  const [transfers, setTransfers] = useState();
  const Web3Api = useMoralisWeb3Api();

  const fetchContractNFTTransfers = async () => {
    const options = {
      address: assetContractAddress,
      chain: "rinkeby",
    };
    const nftTransfers = await Web3Api.token.getContractNFTTransfers(options);
    setTransfers(nftTransfers.result);
  };

  const fetchEthPrice = async () => {
    const response = await fetch(
      "https://api.etherscan.io/api?module=stats&action=ethprice&apikey=2TK8NI1JT3WXC7WCCFQP8V3Q22J347ZC5F"
    );
    const ethUsd = (await response.json()).result.ethusd;
    setEthUsd(ethUsd);
  };

  useEffect(() => {
    fetchEthPrice();
    fetchContractNFTTransfers();
  }, []);

  return (
    <>
      <div className="hidden md:grid md:grid-cols-5 gap-6 justify-items-center mb-12 text-onPrimary">
        <p>Event</p>
        <p>Price</p>
        <p>From</p>
        <p>To</p>
        <p>Time</p>
      </div>
      <div className="flex flex-col gap-16 md:gap-12">
        {transfers &&
          ethUsd &&
          transfers.map((transfer) => {
            return <ActivityTabItem transfer={transfer} ethUsd={ethUsd} />;
          })}
      </div>
    </>
  );
}

export default ActivityTab;
