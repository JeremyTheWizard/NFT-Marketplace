import React, { useState } from "react";
import { IoCart } from "react-icons/io5";
import { FaEthereum } from "react-icons/fa";
import testImage from "../../photos/Collections/AlmostHuman/erick-butler-PShT83NPRFE-unsplash.jpeg";
<p></p>;

function ActivityTabItem() {
  const [isMoreInfo, setIsMoreInfo] = useState(true);
  const [isMore, setIsMore] = useState(true);

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-6 items-center md:place-items-center gap-6 text-onPrimary">
        <div className="hidden md:flex gap-3 items-center">
          <IoCart size="32px" />
          <p>Sale</p>
        </div>

        <div className="flex gap-3">
          <img
            src={testImage}
            alt=""
            className="w-16 h-16 object-cover shrink-0 rounded-xl"
          />
          <div className="flex flex-col gap-1">
            <h3 className="font-lg self-center flex-wrap">Nft Name</h3>
            <p
              className="md:hidden text-xs text-gray-300"
              onClick={() => {
                setIsMoreInfo(!isMoreInfo);
                setIsMore(!isMore);
              }}
            >
              {isMore ? "+ More" : "- Less"}
            </p>
          </div>
        </div>

        <div className="hidden md:flex flex-col items-end">
          <div className="flex gap-1">
            <FaEthereum className="self-center" />
            <p>0.03</p>
          </div>
          <p className="">$63.00</p>
        </div>

        <p className="hidden md:inline">0xb8...a93d</p>
        <p className="hidden md:inline">0xg1...a31s</p>
        <p className="hidden md:inline">8 days ago</p>

        <div className="justify-self-end md:hidden flex-col items-end gap-1 text-sm text-right">
          <p>Sale</p>
          <div className="flex justify-end">
            <FaEthereum className="self-center" />
            <p>0.003</p>
          </div>
          <p className="whitespace-nowrap">8 days ago</p>
        </div>
      </div>

      <div className={`${!isMoreInfo || "hidden"}`}>
        <hr className="mt-3 border-dashed scale-y-50" />
        <div className="flex justify-between mt-6 text-onPrimary text-sm">
          <div className="flex flex-col place-items-center">
            <p>USD Price</p>
            <p>$63.00</p>
          </div>
          <div className="flex flex-col place-items-center">
            <p>From</p>
            <p>0xb8...a93d</p>
          </div>
          <div className="div flex flex-col place-items-center">
            <p>To</p>
            <p>0xg1...a31s</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivityTabItem;
