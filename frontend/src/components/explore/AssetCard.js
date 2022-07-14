import { Typography } from "@mui/material";
import { utils } from "ethers";
import React, { useEffect, useState } from "react";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { FaEthereum } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import fixUrl from "../../useful-scripts/fixUrl";

function AssetCard({ asset, status, originalAccount }) {
  const [isLike, setIsLike] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 25));
  const [ethUsd, setEthUsd] = useState();

  const fetchEthPrice = async () => {
    const response = await fetch(
      "https://api.etherscan.io/api?module=stats&action=ethprice&apikey=2TK8NI1JT3WXC7WCCFQP8V3Q22J347ZC5F"
    );
    const ethUsd = (await response.json()).result.ethusd;
    setEthUsd(ethUsd);
  };

  useEffect(() => {
    fetchEthPrice();
  }, []);

  let navigate = useNavigate();

  function routeChange(path) {
    navigate(path, {
      state: {
        imageUrl: asset.imageUrl.startsWith("ipfs")
          ? fixUrl(asset.imageUrl)
          : asset.imageUrl,
        collectionName: asset.collectionName,
        tokenId: asset.tokenId,
        price: asset.price && asset.price,
        seller: asset.seller,
        status: status,
        contractAddress:
          asset.assetContractAddress || asset.tokenContractAddress,
        attributes: asset.attributes,
        name: asset.name,
        description: asset.description,
        ethUsd: ethUsd,
        originalAccount: originalAccount,
        owner: originalAccount,
      },
    });
  }

  const render = () => {
    return (
      <div
        className="bg-onPrimary overflow-hidden rounded-xl flex flex-col cursor-pointer"
        onClick={() =>
          routeChange(
            `/assets/${
              asset.assetContractAddress || asset.tokenContractAddress
            }/${asset.tokenId}`
          )
        }
      >
        <div className="w-full h-full">
          {asset.imageUrl ? (
            <img
              src={
                asset.imageUrl.startsWith("ipfs")
                  ? fixUrl(asset.imageUrl)
                  : asset.imageUrl
              }
              alt="NFT"
              className="w-full h-full object-cover aspect-square"
            />
          ) : (
            <div className="flex flex-col justify-center items-center w-full h-full">
              <div className="w-full h-full bg-gray-700 blur-md"></div>
              {asset.collection.imageUrl ? (
                <img
                  src={asset.collection.imageUrl}
                  className="rounded-full w-60 h-60 absolute z-10"
                />
              ) : (
                <Typography
                  variant="h6"
                  component="body1"
                  style={{ position: "absolute" }}
                  color="onPrimary"
                >
                  {asset.collectionName}
                </Typography>
              )}
            </div>
          )}
        </div>
        <div className="p-6 flex flex-col gap-3">
          <h4>{asset.collectionName}</h4>
          <h3 className="text-xl font-semibold">
            {asset.name ? asset.name : `#${asset.tokenId}`}
          </h3>
          {asset.price ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                <FaEthereum />
                <p className="text-lg font-semibold">
                  {utils.formatEther(asset.price)}
                </p>
              </div>
              <p>
                {ethUsd &&
                  `($${parseFloat(utils.formatEther(asset.price) * ethUsd)
                    .toFixed()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")})`}
              </p>
            </div>
          ) : (
            <p className="text-sm text-gray-500">Not for sale</p>
          )}
          <div className="flex justify-end gap-2 items-center">
            {likeIcon()}
            <p className="text-base">{likeCount}</p>
          </div>
        </div>
      </div>
    );
  };

  const likeIcon = () => {
    if (isLike) {
      return (
        <BsSuitHeartFill
          size="32px"
          onClick={(e) => {
            e.stopPropagation();
            setIsLike(false);
            setLikeCount(likeCount - 1);
          }}
        />
      );
    } else {
      return (
        <BsSuitHeart
          size="32px"
          onClick={(e) => {
            e.stopPropagation();
            setIsLike(true);
            setLikeCount(likeCount + 1);
          }}
        />
      );
    }
  };

  return render();
}

export default AssetCard;
