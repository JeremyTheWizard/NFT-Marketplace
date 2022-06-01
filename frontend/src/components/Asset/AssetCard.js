import React, { useState } from "react";
import { BsSuitHeart } from "react-icons/bs";
import { BsSuitHeartFill } from "react-icons/bs";
import SecondaryButton from "../SecondaryButton";
import { useLocation } from "react-router-dom";
import { FaEthereum } from "react-icons/fa";

function AssetCard(props) {
  const [isLike, setIsLike] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 100));
  const location = useLocation();

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
    <div className="overflow-hidden rounded-xl flex flex-col md:grid md:grid-cols-2 cursor-pointer">
      <div className="w-full">
        <img
          src={location.state.imagePath}
          alt=""
          className="w-full h-full object-cover aspect-square"
        />
      </div>
      <div className="bg-onPrimary p-6 flex flex-col gap-6">
        <h4>{location.state.collectionName}</h4>
        <h3 className="text-2xl font-bold text-left">
          {location.state.nftName}
        </h3>
        {location.state.price && (
          <div className="flex gap-3">
            <div className="flex items-center">
              <FaEthereum />
              <p className="text-left text-xl font-semibold">
                {location.state.price}
              </p>
            </div>
            <p>($555)</p>
          </div>
        )}
        <p className="text-left">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi eius
          inventore mollitia ipsum. Autem voluptatum ducimus quisquam cupiditate
          eius eum!
        </p>
        <div className="w-full md:w-56 mt-4 mb-6 md:mb-0">
          {location.state.sell ? (
            <SecondaryButton text="Buy" />
          ) : (
            <SecondaryButton text="Sell" />
          )}
        </div>
        <div className="flex justify-between mt-auto">
          <div className="flex items-center gap-2 ">
            {location.state.creatorImagePath && (
              <img
                src={location.state.creatorImagePath}
                alt=""
                className="w-8 h-8 bg-gray-500 object-cover rounded-full"
              />
            )}
            {location.state.creatorName && (
              <h4 className="text-base">{location.state.creatorName}</h4>
            )}
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

export default AssetCard;
