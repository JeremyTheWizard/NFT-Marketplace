import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";

const RoundedIcon = ({ _roundedIcon, _editable, _axiosOptions }) => {
  const [editRoundedIconImage, setEditRoundedIconImage] = useState(false);
  const [roundedIcon, setRoundedIcon] = useState();

  useEffect(() => {
    setRoundedIcon(_roundedIcon);
  }, [_roundedIcon]);

  const handleChangeRoundedIconImage = (e) => {
    if (e.target.files[0]) {
      setRoundedIcon(URL.createObjectURL(e.target.files[0]));
    }

    const formData = new FormData();
    formData.append("account", _axiosOptions.data.account);
    formData.append("roundedIconImage", e.target.files[0]);
    if (_axiosOptions.data.collectionSlug) {
      formData.append("collectionSlug", _axiosOptions.data.collectionSlug);
    }
    axios({
      method: _axiosOptions.method,
      url: _axiosOptions.url,
      data: formData,
      headers: _axiosOptions.headers,
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
      className={`inline-block relative w-24 h-24 md:w-36 md:h-36 rounded-full -top-12 bg-gray-500 hover:cursor-pointer ${
        !_editable && "pointer-events-none"
      }`}
    >
      {roundedIcon && (
        <img
          src={roundedIcon}
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
