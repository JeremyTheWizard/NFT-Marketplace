import axios from "axios";
import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";

const Banner = ({ _bannerImage, _editable, _axiosOptions }) => {
  const [editBannerImage, setEditBannerImage] = useState(false);
  const [bannerImage, setBannerImage] = useState();

  const handleChangeBannerImage = (e) => {
    if (e.target.files[0])
      setBannerImage(URL.createObjectURL(e.target.files[0]));

    const formData = new FormData();
    formData.append("bannerImage", e.target.files[0]);
    formData.append("account", _axiosOptions.data.account);
    if (_axiosOptions.data.collectionSlug) {
      formData.append("collectionSlug", _axiosOptions.data.collectionSlug);
    }
    axios({
      method: _axiosOptions.method,
      url: _axiosOptions.url,
      data: formData,
    });
  };

  return (
    <label
      onMouseEnter={() => {
        setEditBannerImage(true);
      }}
      onMouseLeave={() => {
        setEditBannerImage(false);
      }}
      className={`inline-block relative w-full h-32 md:h-48 lg:h-64 bg-gray-700 hover:bg-gray-600 hover:cursor-pointer ${
        !_editable && "pointer-events-none"
      }`}
    >
      {(_bannerImage || bannerImage) && (
        <img
          src={bannerImage ? bannerImage : _bannerImage}
          alt="banner"
          className="w-full h-32 md:h-48 lg:h-64 object-cover hover:opacity-90"
        />
      )}
      {editBannerImage && (
        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] pointer-events-none">
          <AiFillEdit size="32px" />
        </div>
      )}
      <input
        type="file"
        accept="image/png, image/gif, image/jpeg"
        hidden
        onChange={handleChangeBannerImage}
      ></input>
    </label>
  );
};

export default Banner;
