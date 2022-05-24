import React, { useState } from "react";
import { BsSuitHeart } from "react-icons/bs";
import { BsSuitHeartFill } from "react-icons/bs";

function ExploreCard(props) {
  const [isLike, setIsLike] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 100));

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
    <div className="bg-onPrimary overflow-hidden rounded-xl flex flex-col cursor-pointer">
      <div className="w-full">
        <img
          src={props.imagePath}
          alt=""
          className="w-full h-full object-cover aspect-square"
        />
      </div>
      <div className="p-6 flex flex-col">
        <h3 className="text-xl font-semibold text-left mb-3">NFT Name</h3>
        <p className="text-left text-xl font-semibold mb-3">$337</p>
        <p className="text-left mb-12">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi eius
          inventore mollitia ipsum. Autem voluptatum ducimus quisquam cupiditate
          eius eum!
        </p>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <img
              src={props.owner}
              alt=""
              className="w-8 h-8 bg-gray-500 object-cover rounded-full"
            />
            <h4 className="text-base">Creator Name</h4>
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

export default ExploreCard;
