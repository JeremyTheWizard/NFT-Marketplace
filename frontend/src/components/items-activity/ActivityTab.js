import React from "react";
import ActivityTabItem from "./ActivityTabItem";

function ActivityTab() {
  return (
    <>
      <div className="hidden md:grid grid-cols-6 gap-6 text-center text-onPrimary font-bold">
        <p>Event</p>
        <p>Item</p>
        <p>Price</p>
        <p>From</p>
        <p>To</p>
        <p>Time</p>
      </div>
      <div className="flex flex-col gap-16 mt-10">
        <ActivityTabItem />
        <ActivityTabItem />
        <ActivityTabItem />
      </div>
    </>
  );
}

export default ActivityTab;
