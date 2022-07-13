import { useEthers } from "@usedapp/core";
import React from "react";

const NetworkWarningBanner = () => {
  const { chainId } = useEthers();

  const render = () => {
    if (chainId !== 4) {
      return (
        <div className="py-3 px-9 bg-red-800 text-white flex justify-center sticky top-0 z-[999]">
          This website only works on the Rinkeby test network. Please confirm
          that your are on the right network before continuing.
        </div>
      );
    }
  };

  return render();
};

export default NetworkWarningBanner;
