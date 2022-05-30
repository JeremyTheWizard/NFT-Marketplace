import React from "react";
import BannerAndRoundedIcon from "../components/BannerAndRoundedIcon";
import defaultProfile from "../photos/default-profile.jpeg";

function profile() {
  return (
    <div className="w-[90vw] max-w-[1200px] mx-auto mt-12 flex flex-col justify-center items-center">
      <BannerAndRoundedIcon profileImage={defaultProfile} />
    </div>
  );
}

export default profile;
