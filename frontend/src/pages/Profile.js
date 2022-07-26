import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BannerAndRoundedIcon from "../components/BannerAndRoundedIcon";
import Tabs from "../components/profile-tab/Tabs";
import defaultProfile from "../photos/default-profile.jpeg";

const Profile = () => {
  const [bannerImage, setBannerImage] = useState();
  const [roundedIcon, setRoundedIcon] = useState();
  const [bannerAxiosOptions, setBannerAxiosOptions] = useState();
  const [roundedIconAxiosOptions, setRoundedIconAxiosOptions] = useState();
  const account = useSelector((state) => state.account.account);

  const updateUserData = async () => {
    const userData = await axios
      .get(`http://localhost:8000/api/users/user/${account}`)
      .then((res) => res.data.user);

    setBannerImage(userData.bannerImage);
    setRoundedIcon(userData.roundedIconImage);
  };

  useEffect(() => {
    if (account) {
      updateUserData();
      setBannerAxiosOptions({
        method: "post",
        url: "http://localhost:8000/api/users/banner",
        data: { account: account },
        headers: { "Content-Type": "multipart/form-data" },
      });
      setRoundedIconAxiosOptions({
        method: "post",
        url: "http://localhost:8000/api/users/roundedIcon",
        data: { account: account },
        headers: { "Content-Type": "multipart/form-data" },
      });
    }
  }, [account]);

  return (
    <div className="w-[90vw] max-w-[1200px] mx-auto mt-12 flex flex-col justify-center items-center">
      <BannerAndRoundedIcon
        _bannerImage={bannerImage && bannerImage}
        _roundedIcon={roundedIcon ? roundedIcon : defaultProfile}
        _editable={true}
        _bannerAxiosOptions={bannerAxiosOptions}
        _roundedIconAxiosOptions={roundedIconAxiosOptions}
      />
      <Tabs />
    </div>
  );
};

export default Profile;
