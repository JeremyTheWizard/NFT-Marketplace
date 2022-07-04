import { useEthers } from "@usedapp/core";
import React from "react";
import Banner from "./Banner";
import RoundedIcon from "./RoundedIcon";

const BannerAndRoundedIcon = ({ _bannerImage, _roundedIcon }) => {
  const { account } = useEthers();

  return (
    <div className="w-full">
      <Banner _bannerImage={_bannerImage} _account={account} />
      <RoundedIcon _roundedIcon={_roundedIcon} _account={account} />
    </div>
  );
};

export default BannerAndRoundedIcon;
