import { useEthers } from "@usedapp/core";
import React from "react";
import Banner from "./Banner";
import RoundedIcon from "./RoundedIcon";

const BannerAndRoundedIcon = ({ _bannerImage, _roundedIcon, _editable }) => {
  const { account } = useEthers();

  return (
    <div className="w-full">
      <Banner
        _bannerImage={_bannerImage}
        _account={account}
        _editable={_editable}
      />
      <RoundedIcon
        _roundedIcon={_roundedIcon}
        _account={account}
        _editable={_editable}
      />
    </div>
  );
};

export default BannerAndRoundedIcon;
