import React, { useEffect, useState } from "react";
import TabNavItem from "./TabNavItem";
import TabContent from "./TabContent";
import Offers from "./Offers";
import AssetActivityTab from "./AssetActivityTab";
import Attributes from "./Attributes";
import { useLocation } from "react-router-dom";

function Tabs() {
  const [activeTab, setActiveTab] = useState("tab1");

  const props = {
    activeTab: activeTab,
    setActiveTab: setActiveTab,
  };

  const location = useLocation();

  return (
    <>
      <div className="flex mb-3 mt-12 relative">
        <ul className="flex justify-center gap-12 text-onPrimary text-lg">
          <TabNavItem id="tab1" title="Attributes" {...props} />
          <TabNavItem id="tab2" title="Offers" {...props} />
          <TabNavItem id="tab3" title="Activity" {...props} />
        </ul>
      </div>

      <hr className="bg-onPrimary w-full border-1" />

      <div className="w-full mt-6 mb-12">
        <TabContent id="tab1" activeTab={activeTab}>
          <Attributes attributes={location.state.attributes} />
        </TabContent>
        <TabContent id="tab2" activeTab={activeTab}>
          <Offers />
        </TabContent>
        <TabContent id="tab3" activeTab={activeTab}>
          <AssetActivityTab />
        </TabContent>
      </div>
    </>
  );
}

export default Tabs;
