import React, { useEffect, useState } from "react";
import Created from "./Created";
import DropDownMenuContent from "./DropDownMenuContent";
import Items from "./Items";
import TabContent from "./TabContent";
import TabNavItem from "./TabNavItem";

function Tabs() {
  const [activeTab, setActiveTab] = useState("tab1");
  const [displayDropDownMenuContent, setDisplayDropDownMenuContent] =
    useState(false);

  const props = {
    activeTab: activeTab,
    setActiveTab: setActiveTab,
    displayDropDownMenuContent: displayDropDownMenuContent,
    setDisplayDropDownMenuContent: setDisplayDropDownMenuContent,
  };

  useEffect(() => {
    const closeDropDownMenu = (e) => {
      if (!["LI", , "path", "svg"].includes(e.path[0].tagName)) {
        setDisplayDropDownMenuContent(false);
      }
    };

    document.body.addEventListener("click", closeDropDownMenu);

    return () => document.body.removeEventListener("click", closeDropDownMenu);
  }, []);

  return (
    <>
      <div className="flex mb-3 relative">
        <ul className="flex justify-center gap-12 text-onPrimary text-lg">
          <TabNavItem id="tab1" title="Owned" {...props} />
          <TabNavItem id="tab2" title="Collections" {...props} />
        </ul>
        <DropDownMenuContent {...props} />
      </div>

      <hr className="bg-onPrimary w-full border-1" />

      <div className="w-full mb-12">
        <TabContent id="tab1" activeTab={activeTab}>
          <Items />
        </TabContent>
        <TabContent id="tab2" activeTab={activeTab} classNames="mt-12">
          <Created />
        </TabContent>
      </div>
    </>
  );
}

export default Tabs;
