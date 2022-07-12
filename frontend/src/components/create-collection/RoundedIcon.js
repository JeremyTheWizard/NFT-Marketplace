import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";

const RoundedIcon = ({ roundedIconImage, setRoundedIconImage }) => {
  const [editRoundedIconImage, setEditRoundedIconImage] = useState(false);

  useEffect(() => {
    if (roundedIconImage) {
      setEditRoundedIconImage(false);
    } else {
      setEditRoundedIconImage(true);
    }
  }, [roundedIconImage]);

  const handleChangeRoundedIconImage = (e) => {
    if (e.target.files[0]) {
      setRoundedIconImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <label className="flex items-center justify-center relative w-24 h-24 md:w-36 md:h-36 rounded-full -top-12 bg-gray-500 hover:bg-gray-400 hover:cursor-pointer">
      {roundedIconImage && (
        <img
          src={roundedIconImage}
          alt="profile"
          className="w-24 h-24 md:w-36 md:h-36 rounded-full object-cover hover:opacity-90"
        />
      )}
      {editRoundedIconImage && (
        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] pointer-events-none">
          <AiFillEdit size="32px" />
        </div>
      )}
      <input
        type="file"
        required
        accept="image/png, image/gif, image/jpeg"
        id="roundedIconImage"
        name="roundedIconImage"
        className="opacity-0 pointer-events-none cursor-pointer absolute w-1"
        onChange={handleChangeRoundedIconImage}
      ></input>
    </label>
  );
};

export default RoundedIcon;
