import { useEthers } from "@usedapp/core";
import React from "react";
import Banner from "./Banner";
import RoundedIcon from "./RoundedIcon";

const BannerAndRoundedIcon = ({ _bannerImage, _roundedIconImage }) => {
  const { account } = useEthers();

  return (
    <div className="w-full">
      <Banner _bannerImage={_bannerImage} _account={account} />
      <RoundedIcon _roundedIconImage={_roundedIconImage} _account={account} />
    </div>
  );
};

export default BannerAndRoundedIcon;
