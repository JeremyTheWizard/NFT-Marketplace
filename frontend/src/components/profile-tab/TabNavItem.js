import React from "react";

const TabNavItem = ({ id, title, activeTab, setActiveTab }) => {
  const handleClick = () => {
    setActiveTab(id);
  };

  return (
    <li
      onClick={handleClick}
      className={`cursor-pointer ${activeTab === id && "text-buttonSecondary"}`}
    >
      {title}
    </li>
  );
};

export default TabNavItem;
