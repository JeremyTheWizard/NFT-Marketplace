import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import FormData from "form-data";
import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Attributes from "../components/Asset/offers-history/Attributes";
import AttributesModal from "../components/Create/AttributesModal";
import CollectionComboBox from "../components/Create/CollectionComboBox";
import ModifiedTextField from "../components/ModifiedTextField";
import useMintTokenCoordinator from "../hooks/useMintTokenCoordinator";

const Create = () => {
  const [attributes, setAttributes] = useState();
  const [file, setFile] = useState();
  const { mintTokenCoordinator, mintState } = useMintTokenCoordinator();
  const theme = useTheme();

  const changeImage = (e) => {
    e.persist();
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var formData = new FormData(e.target);
    formData.append("file", file);
    mintTokenCoordinator(formData);
  };

  return (
    <div className="w-[90vw] max-w-[1200px] mx-auto">
      <form
        id="form"
        onSubmit={handleSubmit}
        className="bg-onPrimary overflow-hidden flex flex-col lg:grid md:grid-cols-2 rounded-lg mt-12"
      >
        <label
          for="dropzone-file"
          className="flex flex-col self-center justify-center items-center w-full lg:m-3 xl:m-0 aspect-square border-2 border-dashed cursor-pointer  bg-gray-700  border-gray-500 hover:border-gray-400 hover:bg-gray-600"
        >
          <div className="w-full flex flex-col justify-center items-center p-3">
            {file ? (
              <div className="w-full relative">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();

                    setFile(null);
                  }}
                  className="z-10 absolute top-3 right-3"
                >
                  <AiOutlineCloseCircle size="32px" />
                </div>
                <img
                  src={URL.createObjectURL(file)}
                  className="w-full object-cover aspect-square"
                ></img>
              </div>
            ) : (
              <>
                <svg
                  className="mb-3 w-10 h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-400">SVG, PNG, JPG or GIF</p>
              </>
            )}
          </div>
          <input
            id="dropzone-file"
            name="dropzone-file"
            type="file"
            className="hidden"
            onChange={changeImage}
          />
        </label>
        <div className="bg-onPrimary p-6 lg:p-12 flex flex-col gap-6">
          <ModifiedTextField
            required="Name"
            name="name"
            id="name"
            label="Name"
          />

          <div className="flex flex-col gap-1">
            <CollectionComboBox />
          </div>

          {useMediaQuery(theme.breakpoints.down("xl")) && (
            <ModifiedTextField
              multiline
              label="Description"
              rows="2"
              name="description"
              id="description"
              sx={{ "& textarea": { boxShadow: "none" } }}
            ></ModifiedTextField>
          )}

          {useMediaQuery(theme.breakpoints.up("xl")) && (
            <ModifiedTextField
              multiline
              label="Description"
              minRows="3"
              maxRows="8"
              name="description"
              id="description"
              sx={{ "& textarea": { boxShadow: "none" } }}
            ></ModifiedTextField>
          )}

          <div>
            <AttributesModal
              createAttributes={attributes}
              setCreateAttributes={setAttributes}
            />
          </div>

          <div className="mt-auto">
            <button
              type="submit"
              className=" inline-flex items-center justify-center w-full px-5 py-3 text-white bg-[#1676BA] hover:bg-buttonSecondary  rounded-lg sm:w-auto"
            >
              <span className="font-medium"> CREATE! </span>
            </button>
          </div>
        </div>
      </form>
      <div className="mb-3 mt-12">
        <div className="flex justify-center gap-12 text-onPrimary text-lg">
          <h5 className="flex items-center gap-3 cursor-pointer text-buttonSecondary font-bold">
            Attributes
          </h5>
        </div>
      </div>
      <hr className="bg-onPrimary w-full border-1" />
      <div className="w-full mt-6 mb-12">
        {<Attributes attributes={attributes} />}
      </div>
    </div>
  );
};

export default Create;
