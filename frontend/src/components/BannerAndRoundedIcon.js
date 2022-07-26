import React from "react";
import Banner from "./Banner";
import RoundedIcon from "./RoundedIcon";

const BannerAndRoundedIcon = ({
  _bannerImage,
  _roundedIcon,
  _editable,
  _bannerAxiosOptions = null,
  _roundedIconAxiosOptions = null,
}) => {
  return (
    <div className="w-full">
      <Banner
        _bannerImage={_bannerImage}
        _editable={_editable}
        _axiosOptions={_bannerAxiosOptions}
      />
      <RoundedIcon
        _roundedIcon={_roundedIcon}
        _editable={_editable}
        _axiosOptions={_roundedIconAxiosOptions}
      />
    </div>
  );
};

export default BannerAndRoundedIcon;
