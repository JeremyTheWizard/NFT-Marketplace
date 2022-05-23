import React, { useState } from "react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

function TopCollectionsCollection(props) {
  const [display, setDisplay] = useState("hidden");

  return (
    <div className="relative flex cursor-pointer">
      <div
        className="h-60 w-60 pl-4 py-4"
        onMouseEnter={(e) => {
          setDisplay("flex");
        }}
      >
        <img
          src={props.imagePath}
          alt=""
          className="h-full w-full object-cover rounded-xl"
        />
      </div>
      <div
        className={`${display} w-[545px] h-60 rounded-xl bg-onPrimary absolute z-10`}
        onMouseLeave={(e) => {
          setDisplay("hidden");
        }}
      >
        <div className="h-60 w-60 shrink-0 pl-4 py-4">
          <img
            src={props.imagePath}
            alt=""
            className="h-full w-full object-cover rounded-xl"
          />
        </div>
        <div className="m-4 ml-6 flex flex-col">
          <h1 className="text-left text-xl font-semibold mb-2">
            NFT Collection Name
          </h1>
          <p className="text-left break-word">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic
            debitis aliquid sapiente tempore iusto delectus maxime quos
            perspiciatis eveniet nemo!
          </p>
          <BsFillArrowRightCircleFill
            className="mt-4 place-self-end"
            size="2.5em"
            color="primary"
          />
        </div>
      </div>
    </div>
  );
}

export default TopCollectionsCollection;
