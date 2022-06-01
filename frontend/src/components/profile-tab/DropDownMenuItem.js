import React from "react";

const DropDownMenuItem = ({
  id,
  title,
  activeTab,
  setActiveTab,
  displayDropDownMenuContent,
  setDisplayDropDownMenuContent,
}) => {
  return (
    <li
      onClick={() => {
        setActiveTab(id);
        setDisplayDropDownMenuContent(!displayDropDownMenuContent);
      }}
      className={`cursor-pointer text-white ${
        activeTab === id && "text-buttonSecondary"
      }`}
    >
      {title}
    </li>
  );
};

export default DropDownMenuItem;
