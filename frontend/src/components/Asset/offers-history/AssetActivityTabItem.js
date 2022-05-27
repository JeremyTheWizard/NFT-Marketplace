import React, { useState } from "react";
import { IoCart } from "react-icons/io5";
import { FaEthereum } from "react-icons/fa";

function ActivityTabItem() {
  const [isMoreInfo, setIsMoreInfo] = useState(true);
  const [isMore, setIsMore] = useState(true);

  return (
    <div>
      <div className="flex md:grid md:grid-cols-5 justify-between items-center md:place-items-center gap-6 text-onPrimary">
        <div className="flex flex-col gap-1">
          <div className="flex gap-3 items-center">
            <IoCart size="32px" />
            <p>Sale</p>
          </div>
          <p
            className="md:hidden text-center text-xs text-gray-300"
            onClick={() => {
              setIsMoreInfo(!isMoreInfo);
              setIsMore(!isMore);
            }}
          >
            {isMore ? "+ More" : "- Less"}
          </p>
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

        <div className="flex flex-col gap-3 justify-self-end md:hidden text-sm text-right">
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
