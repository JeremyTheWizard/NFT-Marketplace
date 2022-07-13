import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";

const CreatedCollectionsBox = ({ _roundedIcon, _account }) => {
  const [editRoundedIconImage, setEditRoundedIconImage] = useState(false);

  return (
    <li
      onMouseEnter={() => {
        setEditRoundedIconImage(true);
      }}
      onMouseLeave={() => {
        setEditRoundedIconImage(false);
      }}
      className="inline-block relative w-24 h-24 md:w-36 md:h-36 bg-gray-500 text-center rounded-full"
    >
      {_roundedIcon && (
        <img
          src={_roundedIcon}
          alt="profile"
          className="w-24 h-24 md:w-36 md:h-36 rounded-full object-cover hover:opacity-80"
        />
      )}
      {editRoundedIconImage && (
        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] pointer-events-none">
          <AiFillEdit size="32px" color="black" />
        </div>
      )}
    </li>
  );
};

export default CreatedCollectionsBox;
