import { Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useMoralisWeb3Api } from "react-moralis";
import { useParams } from "react-router-dom";
import ModifiedCircularProgress from "../../ModifiedMuiComponents/ModifiedCircularProgress";
import ActivityTabItem from "./ActivityTabItem";

function ActivityTab({ contractAddress }) {
  const [ethUsd, setEthUsd] = useState();
  const [transfers, setTransfers] = useState();
  const { tokenContractAddress, tokenId } = useParams();
  const [activity, setActivity] = useState();
  const Web3Api = useMoralisWeb3Api();

  useEffect(() => {
    fetchEthPrice();
    fetchContractNFTTransfers();
  }, []);

  useEffect(() => {
    if (transfers && ethUsd) {
      loadTokenTransfers();
    }
  }, [transfers, ethUsd]);

  const loadTokenTransfers = async () => {
    const activity = transfers.map((transfer, key) => {
      if (
        !["created", "bid_entered", "bid_withdrawn", "approve"].includes(
          transfer.event_type
        )
      ) {
        return (
          <ActivityTabItem key={key} transfer={transfer} ethUsd={ethUsd} />
        );
      }
    });
    await Promise.all(activity);

    setActivity(activity);
  };

  const fetchContractNFTTransfers = async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    const options = {
      address: contractAddress,
      chain: "rinkeby",
    };
    let nftTransfers = [];
    try {
      nftTransfers = await axios({
        method: "get",
        url: "https://testnets-api.opensea.io/api/v1/events",
        params: {
          asset_contract_address: tokenContractAddress,
          token_id: tokenId,
        },
      }).then((res) => res.data.asset_events);
    } catch (err) {
      console.log(err);
    }
    setTransfers(nftTransfers);
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
        {activity && (
          <Typography
            variant="h6"
            component="paragraph"
            color="onPrimary"
            style={{ textAlign: "center" }}
          >
            This item has no more recent activity.
          </Typography>
        )}
        {!activity && (
          <div className="flex flex-col items-center">
            <ModifiedCircularProgress />
          </div>
        )}
      </div>
    </>
  );
}

export default ActivityTab;
