import React from "react";
import DropDownMenuItem from "./DropDownMenuItem";

const DropDownMenuContent = ({
  activeTab,
  setActiveTab,
  displayDropDownMenuContent,
  setDisplayDropDownMenuContent,
}) => {
  const props = {
    activeTab: activeTab,
    setActiveTab: setActiveTab,
    displayDropDownMenuContent: displayDropDownMenuContent,
    setDisplayDropDownMenuContent: setDisplayDropDownMenuContent,
  };
  return (
    <>
      {displayDropDownMenuContent && (
        <div
          className="sm:hidden bg-primary border-2 border-gray-400 w-48 p-6 
        absolute top-6 left-2/4 translate-x-[-50%] mt-3 rounded-lg"
        >
          <ul className="flex flex-col gap-3 md:hidden">
            <DropDownMenuItem id="tab1" title="Items" {...props} />
            <hr />
            <DropDownMenuItem id="tab2" title="Offers made" {...props} />
            <hr />
            <DropDownMenuItem id="tab3" title="Offers received" {...props} />
            <hr />
            <DropDownMenuItem id="tab4" title="Created" {...props} />
          </ul>
        </div>
      )}
    </>
  );
};

export default DropDownMenuContent;
