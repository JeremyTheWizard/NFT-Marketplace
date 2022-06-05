import React from "react";

function SecondaryButton({ text, onClick }) {
  return (
    <button
      class={`w-full text-white text-base font-semibold bg-[#1676BA] hover:bg-buttonSecondary rounded-xl px-3 py-2 md:px-5 md:py-2.5 md:mr-0`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default SecondaryButton;
