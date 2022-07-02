import axios from "axios";
import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";

const RoundedIcon = ({ _roundedIconImage, _account }) => {
  const [editRoundedIconImage, setEditRoundedIconImage] = useState(false);
  const [roundedIconImage, setRoundedIconImage] = useState(_roundedIconImage);

  const handleChangeRoundedIconImage = (e) => {
    if (e.target.files[0]) setRoundedIconImage(e.target.files[0]);

    const formData = new FormData();
    formData.append("account", _account);
    formData.append("roundedIconImage", e.target.files[0]);
    axios.post("http://localhost:8000/api/users/roundedIcon", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  return (
    <label
      onMouseEnter={() => {
        setEditRoundedIconImage(true);
      }}
      onMouseLeave={() => {
        setEditRoundedIconImage(false);
      }}
      className="inline-block relative w-24 h-24 md:w-36 md:h-36 rounded-full -top-12 bg-gray-500 hover:cursor-pointer"
    >
      {roundedIconImage && (
        <img
          src={
            typeof roundedIconImage === "string"
              ? roundedIconImage
              : URL.createObjectURL(roundedIconImage)
          }
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
        accept="image/png, image/gif, image/jpeg"
        hidden
        onChange={handleChangeRoundedIconImage}
      ></input>
    </label>
  );
};

export default RoundedIcon;
