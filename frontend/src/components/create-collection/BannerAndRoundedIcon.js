import { useEthers } from "@usedapp/core";
import React from "react";
import Banner from "./Banner";
import RoundedIcon from "./RoundedIcon";

const BannerAndRoundedIcon = ({
  bannerImage,
  roundedIconImage,
  setBannerImage,
  setRoundedIconImage,
}) => {
  const { account } = useEthers();

  return (
    <div className="w-full">
      <Banner
        account={account}
        bannerImage={bannerImage}
        setBannerImage={setBannerImage}
      />
      <RoundedIcon
        account={account}
        roundedIconImage={roundedIconImage}
        setRoundedIconImage={setRoundedIconImage}
      />
    </div>
  );
};

export default BannerAndRoundedIcon;
