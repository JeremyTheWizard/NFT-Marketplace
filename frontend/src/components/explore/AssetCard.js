import React, { useEffect, useState } from "react";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { FaEthereum } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import fixUrl from "../../useful-scripts/fixUrl";

function AssetCard({ collectionName, seller, status, assetInfo }) {
  const [isLike, setIsLike] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 100));
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
        imagePath: assetInfo.imageUrl.startsWith("ipfs")
          ? fixUrl(assetInfo.imageUrl)
          : assetInfo.imageUrl,
        collectionName: collectionName,
        tokenId: assetInfo.tokenId,
        price: assetInfo.price && assetInfo.price,
        seller: seller,
        status: status,
        contractAddress: assetInfo.assetContractAddress,
        attributes: assetInfo.attributes,
      },
    });
  }

  const render = () => {
    return (
      <div
        className="bg-onPrimary overflow-hidden rounded-xl flex flex-col cursor-pointer"
        onClick={() => routeChange(`/collections/${collectionName}/nft`)}
      >
        <div className="w-full">
          {assetInfo.imageUrl && (
            <img
              src={
                assetInfo.imageUrl.startsWith("ipfs")
                  ? fixUrl(assetInfo.imageUrl)
                  : assetInfo.imageUrl
              }
              alt="NFT"
              className="w-full h-full object-cover aspect-square"
            />
          )}
        </div>
        <div className="p-6 flex flex-col gap-3">
          <h4>{collectionName}</h4>
          <h3 className="text-xl font-semibold">
            {assetInfo.name ? assetInfo.name : assetInfo.tokenId}
          </h3>
          {assetInfo.price ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                <FaEthereum />
                <p className="text-lg font-semibold">{assetInfo.price}</p>
              </div>
              <p>
                {ethUsd &&
                  `($${parseFloat(assetInfo.price * ethUsd)
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
          onClick={() => {
            setIsLike(false);
            setLikeCount(likeCount - 1);
          }}
        />
      );
    } else {
      return (
        <BsSuitHeart
          size="32px"
          onClick={() => {
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
