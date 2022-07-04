import { useEthers } from "@usedapp/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BannerAndRoundedIcon from "../components/BannerAndRoundedIcon";
import Tabs from "../components/profile-tab/Tabs";
import defaultProfile from "../photos/default-profile.jpeg";

const Profile = () => {
  const [bannerImage, setBannerImage] = useState();
  const [roundedIcon, setRoundedIcon] = useState();

  const { account } = useEthers();

  const updateUserData = async () => {
    const userData = await axios
      .get(`http://localhost:8000/api/users/user/${account}`)
      .then((res) => res.data.user);

    setBannerImage(userData.bannerImage);
    setRoundedIcon(userData.roundedIconImage);
  };

  useEffect(() => {
    account && updateUserData();
  }, [account]);

  return (
    <div className="w-[90vw] max-w-[1200px] mx-auto mt-12 flex flex-col justify-center items-center">
      <BannerAndRoundedIcon
        _bannerImage={bannerImage && bannerImage}
        _roundedIcon={roundedIcon ? roundedIcon : defaultProfile}
        _editable={true}
      />
      <Tabs />
    </div>
  );
};

export default Profile;
