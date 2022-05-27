import React from "react";
import { FaEthereum } from "react-icons/fa";

function Offer() {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-3 text-onPrimary justify-items-center items-center">
      <div className="md:hidden">
        <div className="flex items-center gap-1">
          <FaEthereum />
          <p>0.2</p>
        </div>
        <p>$50.00</p>
      </div>
      <div className="hidden md:flex items-center gap-1">
        <FaEthereum />
        <p>0.2</p>
      </div>
      <p className="hidden md:inline">$50.00</p>
      <p>25 days ago</p>
      <p>0xb8...a93d</p>
    </div>
  );
}

export default Offer;
