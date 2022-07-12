import React from "react";

function SecondaryButton({ text, onClick, children, loading }) {
  return (
    <button
      disabled={loading ? true : false}
      class={`w-full text-white text-base font-semibold bg-[#1676BA] hover:bg-buttonSecondary disabled:bg-gray-700 rounded-xl px-3 py-2 md:px-5 md:py-2.5 md:mr-0`}
      onClick={onClick}
    >
      {text}
      {children}
    </button>
  );
}

export default SecondaryButton;
