import React from "react";

function BannerAndRoundedIcon(props) {
  return (
    <div className="w-full">
      <img
        src={props.bannerImage}
        alt=""
        className="w-full h-32 md:h-48 lg:h-64 object-cover bg-gray-500"
      />
      <img
        src={props.profileImage}
        alt=""
        className="w-24 h-24 md:w-36 md:h-36 rounded-full object-cover relative -top-12 mb-[-10px]"
      />
    </div>
  );
}

export default BannerAndRoundedIcon;
