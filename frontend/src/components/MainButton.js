import React from "react";

function MainButton(props) {
  return (
    <button class="text-buttonPrimary bg-transparent border-2 border-buttonPrimary hover:bg-buttonPrimary hover:text-black font-medium rounded-lg  text-sm px-3 py-2 md:px-5 md:py-2.5 text-center md:mr-0">
      {props.text}
    </button>
  );
}

export default MainButton;
