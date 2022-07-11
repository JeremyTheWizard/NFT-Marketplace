import React from "react";

const Attributes = ({ attributes }) => {
  return (
    <ul className="flex flex-wrap gap-6 justify-center">
      {attributes ? (
        attributes.map((attribute) => {
          return (
            <li className="break-all border-2 border-onPrimary w-40 shrink-0 p-3 text-center text-onPrimary rounded">
              <p className="font-semibold text-lg">
                {typeof attribute.trait_type === "string"
                  ? attribute.trait_type.charAt(0).toUpperCase() +
                    attribute.trait_type.slice(1).toLowerCase()
                  : attribute.trait_type}
              </p>
              <p className="italic">
                {typeof attribute.value === "string"
                  ? attribute.value.toLowerCase()
                  : attribute.value}
              </p>
            </li>
          );
        })
      ) : (
        <li className="italic text-onPrimary">This NFT has no attributes</li>
      )}
    </ul>
  );
};

export default Attributes;
