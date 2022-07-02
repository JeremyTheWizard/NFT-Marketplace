import React from "react";
import Banner from "./Banner";
import RoundedIcon from "./RoundedIcon";

const BannerAndRoundedIcon = ({ _bannerImage, _roundedIconImage }) => {
  return (
    <div className="w-full">
      <Banner _bannerImage={_bannerImage} />
      <RoundedIcon _roundedIconImage={_roundedIconImage} />
    </div>
  );
};

export default BannerAndRoundedIcon;
