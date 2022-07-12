import { useEthers } from "@usedapp/core";
import axios from "axios";
import FormData from "form-data";
import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import useGetNFTMinterContract from "../../hooks/useGetNFTMinterContract";
import SecondaryButton from "../SecondaryButton";
import BannerAndRoundedIcon from "./BannerAndRoundedIcon";

const FormIntro = ({ setShowSuccessDialog }) => {
  const [bannerImage, setBannerImage] = useState();
  const [roundedIconImage, setRoundedIconImage] = useState();
  const tokenMinterAddress = useGetNFTMinterContract().address;
  const { account } = useEthers();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    formData.append("bannerImage", bannerImage);
    formData.append("roundedIconImage", roundedIconImage);
    formData.append("assetContractAddress", tokenMinterAddress);
    formData.append("account", account);
    const response = await axios({
      method: "post",
      url: "http://localhost:8000/api/collections/collection",
      data: formData,
    });
    if (response) {
      setLoading(false);
      setShowSuccessDialog(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <BannerAndRoundedIcon
        bannerImage={bannerImage}
        setBannerImage={setBannerImage}
        roundedIconImage={roundedIconImage}
        setRoundedIconImage={setRoundedIconImage}
      />
      <div className="grid lg:grid-cols-2 gap-12 items-center ">
        <div className="flex flex-col gap-8">
          <label className="border-0 flex items-center gap-1 relative">
            <div className="absolute left-1 cursor-pointer">
              <AiFillEdit size="32px" color="#fff" />
            </div>
            <input
              required
              placeholder="Collection name"
              id="collectionName"
              name="collectionName"
              className="bg-transparent border-0 outline-0 ring-0 w-full cursor-pointer text-onPrimary placeholder:text-onPrimary pl-12 text-2xl md:text-3xl"
              type="text"
            />
          </label>
          <label className="border-0 flex gap-1 relative">
            <div className="absolute left-1 top-2 cursor-pointer">
              <AiFillEdit size="24px" color="#fff" />
            </div>
            <textarea
              placeholder="Description"
              id="description"
              name="description"
              rows="3"
              className="bg-transparent border-0 w-full resize-none whitespace-pre-wrap cursor-pointer text-onPrimary placeholder:text-onPrimary pl-12"
            />
          </label>
        </div>
        <div className="opacity-30 grid grid-cols-2 grid-rows-2 gap-y-6 md:flex justify-around p-3 text-onPrimary border-2 border-buttonSecondary rounded-xl order-2 lg:order-1">
          <div className="div flex flex-col gap-3 items-center">
            <p className="md:text-xl font-semibold">Items</p>
            <p className="md:text-xl">---</p>
          </div>
          <div className="div flex flex-col gap-3 items-center">
            <p className="md:text-xl font-semibold">Owners</p>
            <p className="md:text-xl">---</p>
          </div>
          <div className="div flex flex-col gap-3 items-center">
            <p className="md:text-xl font-semibold">Floor Price</p>
            <p className="md:text-xl">---</p>
          </div>
          <div className="div flex flex-col gap-3 items-center">
            <p className="md:text-xl font-semibold">Total Volume</p>
            <p className="md:text-xl">---</p>
          </div>
        </div>
        <div className="w-40 ml-1 order-1 lg:order-2 -mt-9">
          <SecondaryButton loading={loading} />
        </div>
      </div>
    </form>
  );
};

export default FormIntro;
