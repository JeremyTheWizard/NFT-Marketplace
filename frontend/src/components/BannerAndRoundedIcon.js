import React from "react";

function BannerAndRoundedIcon({ bannerImage, profileImage }) {
  return (
    <div className="w-full">
      <div className="w-full h-32 md:h-48 lg:h-64 bg-gray-500">
        <img src={bannerImage} alt="" className="object-cover" />
      </div>
      <div className="w-24 h-24 md:w-36 md:h-36 rounded-full border-[1px] bg-gray-500 relative -top-12 mb-[-10px]">
        {profileImage && (
          <img src={profileImage} alt="" className="object-cover" />
        )}
      </div>
    </div>
  );
}

export default BannerAndRoundedIcon;
