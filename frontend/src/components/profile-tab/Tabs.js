import React, { useState } from "react";
import TabNavItem from "./TabNavItem";
import TabContent from "./TabContent";
import Items from "./Items";

function Tabs() {
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <>
      <ul className="flex flex-wrap justify-center gap-12 text-onPrimary text-lg mb-3">
        <TabNavItem
          id="tab1"
          title="Items"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <TabNavItem
          id="tab2"
          title="Offers made"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <TabNavItem
          id="tab3"
          title="Offers received"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <TabNavItem
          id="tab4"
          title="Created"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </ul>
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
