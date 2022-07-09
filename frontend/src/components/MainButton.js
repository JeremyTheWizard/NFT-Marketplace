import React from "react";

function MainButton({ text, onClick, styles }) {
  return (
    <button
      className={`text-buttonPrimary bg-transparent border-2 border-buttonPrimary hover:bg-buttonPrimary hover:text-black font-medium rounded-lg  text-sm px-3 py-2 md:px-5 md:py-2.5 text-center md:mr-0 ${styles}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default MainButton;
