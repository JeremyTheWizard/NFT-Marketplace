import React from "react";
import Banner from "./Banner";
import RoundedIcon from "./RoundedIcon";

const BannerAndRoundedIcon = ({
  bannerImage,
  roundedIconImage,
  setBannerImage,
  setRoundedIconImage,
}) => {
  return (
    <div className="w-full">
      <Banner bannerImage={bannerImage} setBannerImage={setBannerImage} />
      <RoundedIcon
        roundedIconImage={roundedIconImage}
        setRoundedIconImage={setRoundedIconImage}
      />
    </div>
  );
};

export default BannerAndRoundedIcon;
