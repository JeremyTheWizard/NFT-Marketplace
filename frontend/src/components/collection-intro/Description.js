import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const Description = ({ description, collectionSlug, editable }) => {
  const [edit, setEdit] = useState();
  const [value, setValue] = useState();
  const updatedDescription = useRef();

  useEffect(() => {
    setValue(description);
  }, []);

  const handleValueChange = (e) => {
    if (e.target.value) {
      setValue(e.target.value);
    } else {
      setValue("");
    }
  };

  const updateDescription = () => {
    if (value === updatedDescription.current) {
      return;
    }
    axios({
      method: "post",
      url: "http://localhost:8000/api/collections/collection/description",
      data: { collectionSlug: collectionSlug, newDescription: value },
    });
    updatedDescription.current = value;
  };

  return (
    <label
      className="flex gap-3 cursor-pointer text-onPrimary"
      onMouseEnter={() => {
        setEdit(editable);
      }}
      onMouseLeave={() => {
        setEdit(false);
        updateDescription();
      }}
    >
      {edit ? (
        <textarea
          value={value}
          onChange={handleValueChange}
          rows="4"
          className="bg-transparent border-buttonSecondary w-full resize-none whitespace-pre-wrap cursor-pointer"
        />
      ) : (
        <p className="whitespace-pre-wrap line-clamp-4">{value}</p>
      )}
    </label>
  );
};

export default Description;
