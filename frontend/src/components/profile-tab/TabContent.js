import React from "react";

const TabContent = ({ id, activeTab, children, classNames }) => {
  return activeTab === id ? (
    <div className={`${classNames}`}>{children}</div>
  ) : null;
};

export default TabContent;
