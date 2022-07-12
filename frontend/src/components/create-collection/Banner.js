import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";

const Banner = ({ bannerImage, setBannerImage }) => {
  const [editBannerImage, setEditBannerImage] = useState(true);

  useEffect(() => {
    if (bannerImage) {
      setEditBannerImage(false);
    } else {
      setEditBannerImage(true);
    }
  }, [bannerImage]);

  const handleChangeBannerImage = (e) => {
    if (e.target.files[0])
      setBannerImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <label className="flex justify-center items-center relative w-full h-32 md:h-48 lg:h-64 bg-gray-700 hover:bg-gray-600 hover:cursor-pointer">
      {bannerImage && (
        <img
          src={bannerImage}
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
        required
        id="bannerImage"
        name="bannerImage"
        type="file"
        accept="image/png, image/gif, image/jpeg"
        onChange={handleChangeBannerImage}
        className="opacity-0 pointer-events-none cursor-pointer absolute w-1"
      />
    </label>
  );
};

export default Banner;
