import React from "react";
import ModifiedCircularProgress from "./ModifiedMuiComponents/ModifiedCircularProgress";

function SecondaryButton({ text, onClick, children, loading, props }) {
  return (
    <button
      {...props}
      disabled={loading ? true : false}
      class={`w-full text-white text-base font-semibold bg-[#1676BA] hover:bg-buttonSecondary disabled:bg-gray-700 rounded-xl px-3 py-3  md:px-5 md:py-2.5 md:mr-0 ${
        loading && "py-1 md:py-1"
      }`}
      onClick={onClick}
    >
      {!loading && text}
      {!loading && children}
      {loading && <ModifiedCircularProgress size="28px" />}
    </button>
  );
}

export default SecondaryButton;
