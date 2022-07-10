import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useMoralisWeb3Api } from "react-moralis";
import ModifiedCircularProgress from "../../ModifiedMuiComponents/ModifiedCircularProgress";
import ActivityTabItem from "./ActivityTabItem";

function ActivityTab({ contractAddress, tokenId }) {
  const [ethUsd, setEthUsd] = useState();
  const [transfers, setTransfers] = useState();
  const [activity, setActivity] = useState(
    <div className="flex flex-col items-center">
      {" "}
      <ModifiedCircularProgress />
    </div>
  );
  const Web3Api = useMoralisWeb3Api();

  useEffect(() => {
    fetchEthPrice();
    fetchContractNFTTransfers();
  }, []);

  useEffect(() => {
    if (transfers && ethUsd) {
      const activity = transfers.map((transfer, key) => {
        if (tokenId === transfer.token_id) {
          return (
            <ActivityTabItem key={key} transfer={transfer} ethUsd={ethUsd} />
          );
        }
      });
      if (!activity.every((activity) => activity === "undefined")) {
        setActivity(activity);
      } else {
        setActivity(
          <Typography
            variant="h6"
            component="paragraph"
            color="onPrimary"
            style={{ textAlign: "center" }}
          >
            This item has no recent activity.
          </Typography>
        );
      }
    }
  }, [transfers]);

  const fetchContractNFTTransfers = async () => {
    const options = {
      address: contractAddress,
      chain: "rinkeby",
    };
    let nftTransfers = [];
    try {
      nftTransfers = await Web3Api.token.getContractNFTTransfers(options);
    } catch (err) {
      console.log(err);
    }
    setTransfers(nftTransfers.result);
  };

  const fetchEthPrice = async () => {
    let response = "";
    try {
      response = await fetch(
        "https://api.etherscan.io/api?module=stats&action=ethprice&apikey=2TK8NI1JT3WXC7WCCFQP8V3Q22J347ZC5F"
      );
    } catch (err) {
      console.log(err);
    }
    const ethUsd = (await response.json()).result.ethusd;
    setEthUsd(ethUsd);
  };

  return (
    <>
      <div className="hidden md:grid md:grid-cols-5 gap-6 justify-items-center mb-6 text-onPrimary">
        <p>Event</p>
        <p>Price</p>
        <p>From</p>
        <p>To</p>
        <p>Time</p>
      </div>
      <div className="flex flex-col gap-16 md:gap-12">
        {activity && activity}
      </div>
    </>
  );
}

export default ActivityTab;
