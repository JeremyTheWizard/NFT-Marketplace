import React from "react";

const TabNavItem = ({ id, title, activeTab, setActiveTab }) => {
  return (
    <li
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-3 cursor-pointer ${
        activeTab === id && "text-buttonSecondary"
      }`}
    >
      {title}
    </li>
  );
};

export default TabNavItem;
