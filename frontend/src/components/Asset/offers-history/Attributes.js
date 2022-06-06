import React from "react";

const Attributes = ({ attributes }) => {
  return (
    <ul className="flex flex-wrap gap-6 justify-center">
      {attributes.map((attribute) => {
        return (
          <li className="border-2 border-onPrimary w-40 shrink-0 p-3 text-center text-onPrimary rounded">
            <p className="font-semibold text-lg">{attribute.trait_type}</p>
            <p className="italic">{attribute.value}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default Attributes;
