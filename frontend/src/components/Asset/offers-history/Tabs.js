import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ActivityTab from "./ActivityTab";
import Attributes from "./Attributes";
import TabContent from "./TabContent";
import TabNavItem from "./TabNavItem";

function Tabs({ tokenInfo }) {
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
          <TabNavItem id="tab2" title="Activity" {...props} />
        </ul>
      </div>

      <hr className="bg-onPrimary w-full border-1" />

      <div className="w-full mt-6 mb-12">
        <TabContent id="tab1" activeTab={activeTab}>
          <Attributes attributes={tokenInfo.attributes} />
        </TabContent>
        <TabContent id="tab2" activeTab={activeTab}>
          <ActivityTab />
        </TabContent>
      </div>
    </>
  );
}

export default Tabs;
