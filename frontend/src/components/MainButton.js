import React from "react";

function MainButton(props) {
  return (
    <button class="text-button-primary bg-transparent border-2 border-button-primary hover:bg-button-primary hover:text-black font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 ">
      {props.text}
    </button>
  );
}

export default MainButton;
