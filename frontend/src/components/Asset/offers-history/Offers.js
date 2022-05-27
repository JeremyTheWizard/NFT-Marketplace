import React from "react";
import Offer from "./Offer";

function Offers() {
  return (
    <>
      <div className="flex justify-around md:grid md:grid-cols-4 gap-3 text-onPrimary text-center font-bold">
        <p className="hidden md:inline">WETH Price</p>
        <p className="md:hidden">Price</p>
        <p className="hidden md:inline">USD Price</p>
        <p>Time</p>
        <p>From</p>
      </div>
      <div className="flex flex-col gap-6 mt-8">
        <Offer />
        <Offer />
      </div>
    </>
  );
}

export default Offers;
