import React, { useEffect, useState } from "react";
import TabNavItem from "./TabNavItem";
import TabContent from "./TabContent";
import Items from "./Items";
import DropDownMenuContent from "./DropDownMenuContent";

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
          <TabNavItem id="tab1" title="Items" {...props} />
          <TabNavItem id="tab2" title="Offers made" {...props} />
          <TabNavItem id="tab3" title="Offers received" {...props} />
          <TabNavItem id="tab4" title="Created" {...props} />
        </ul>
        <DropDownMenuContent {...props} />
      </div>

      <hr className="bg-onPrimary w-full border-1" />

      <div>
        <TabContent id="tab1" activeTab={activeTab}>
          <Items />
        </TabContent>
        <TabContent id="tab2" activeTab={activeTab}></TabContent>
        <TabContent id="tab3" activeTab={activeTab}></TabContent>
        <TabContent id="tab4" activeTab={activeTab}></TabContent>
      </div>
    </>
  );
}

export default Tabs;
