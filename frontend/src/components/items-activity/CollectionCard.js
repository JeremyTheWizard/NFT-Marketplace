import React, { useState } from "react";
import { BsSuitHeart } from "react-icons/bs";
import { BsSuitHeartFill } from "react-icons/bs";
import { FaEthereum } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function CollectionCard({
  imagePath,
  collectionName,
  tokenId,
  price,
  creatorImagePath,
  creatorName,
  contractAddress,
  sell,
  attributes,
}) {
  const [isLike, setIsLike] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 100));
  let navigate = useNavigate();

  function routeChange(path) {
    navigate(path, {
      state: {
        imagePath: imagePath,
        collectionName: collectionName,
        tokenId: tokenId,
        price: price,
        creatorImagePath: creatorImagePath,
        creatorName: creatorName,
        sell: sell,
        contractAddress,
        attributes,
      },
    });
  }

  function likeIcon() {
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
  }

  return (
    <div
      className="bg-onPrimary overflow-hidden rounded-xl flex flex-col cursor-pointer"
      onClick={() =>
        routeChange(
          `/collections/${collectionName ? collectionName : "test"}/nft`
        )
      }
    >
      <div className="w-full">
        <img
          src={imagePath}
          alt=""
          className="w-full h-full object-cover aspect-square"
        />
      </div>
      <div className="p-6 flex flex-col gap-3">
        <h4>{collectionName}</h4>
        <h3 className="text-xl font-semibold">{tokenId}</h3>
        {price && (
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <FaEthereum />
              <p className="text-lg font-semibold">{price}</p>
            </div>
            <p>($63.00)</p>
          </div>
        )}
        <div className="flex justify-between mt-8">
          <div className="flex items-center gap-2">
            {creatorName && (
              <img
                src={creatorImagePath}
                alt=""
                className="w-8 h-8 bg-gray-400 object-cover rounded-full"
              />
            )}
            {creatorName && <h4 className="text-base">{creatorName}</h4>}
          </div>
          <div className="flex gap-2 items-center">
            {likeIcon()}
            <p className="text-base">{likeCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollectionCard;
