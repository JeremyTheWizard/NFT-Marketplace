import React from "react";
import DropDownMenu from "./DropDownMenu";

const TabNavItem = ({
  id,
  title,
  activeTab,
  setActiveTab,
  displayDropDownMenuContent,
  setDisplayDropDownMenuContent,
}) => {
  const props = {
    activeTab: activeTab,
    setActiveTab,
    displayDropDownMenuContent: displayDropDownMenuContent,
    setDisplayDropDownMenuContent: setDisplayDropDownMenuContent,
  };
  return (
    <>
      <li
        onClick={() => setActiveTab(id)}
        className={`hidden sm:flex items-center gap-3 cursor-pointer ${
          activeTab === id && "text-buttonSecondary"
        }`}
      >
        {title}
      </li>

      <li
        onClick={() =>
          setDisplayDropDownMenuContent(!displayDropDownMenuContent)
        }
        className={`sm:hidden flex items-center gap-3 cursor-pointer ${
          id !== activeTab && "hidden sm:inline"
        } ${activeTab === id && "text-buttonSecondary"}`}
      >
        {title}
        <div className="sm:hidden">
          <DropDownMenu {...props} />
        </div>
      </li>
    </>
  );
};

export default TabNavItem;
