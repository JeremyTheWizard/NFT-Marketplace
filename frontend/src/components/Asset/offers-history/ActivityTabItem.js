import { useEthers } from "@usedapp/core";
import { constants, utils } from "ethers";
import React, { useEffect, useState } from "react";
import { BiTransfer } from "react-icons/bi";
import { BsArrowUpRightSquare } from "react-icons/bs";
import { FaBabyCarriage, FaEthereum } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import timeSinceCalculator from "../../../useful-scripts/TimeSinceCalculator";

function ActivityTabItem({ transfer, ethUsd }) {
  console.log("here+!");
  const [isMoreInfo, setIsMoreInfo] = useState(true);
  const [isMore, setIsMore] = useState(true);
  const [price, setPrice] = useState();
  const [usdPrice, setUsdPrice] = useState();
  const [fromAddress, setFromAddress] = useState();
  const [toAddress, setToAddress] = useState();
  const { account } = useEthers();

  useEffect(() => {
    setPrice(utils.formatEther(transfer.value));
    setFromAddress(
      transfer.from_address === constants.AddressZero
        ? "NullAddress"
        : transfer.from_address
    );
  }, []);

  useEffect(() => {
    account &&
      setToAddress(
        transfer.to_address.toUpperCase() === account.toUpperCase()
          ? "You"
          : transfer.to_address
      );
  }, [account]);

  useEffect(() => {
    price &&
      setUsdPrice(
        parseFloat(price * ethUsd)
          .toFixed()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      );
  }, [price]);

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-5 justify-items-between px-3 md:px-0 md:justify-items-center gap-6 text-onPrimary">
        {fromAddress === "NullAddress" ? (
          <>
            <div className="flex flex-col gap-1">
              <div className="grid grid-cols-4">
                <div className="flex gap-3 items-center col-span-4">
                  <FaBabyCarriage size="32px" />
                  <p>Minted</p>
                </div>
              </div>
              <p
                className="md:hidden text-xs text-gray-300"
                onClick={() => {
                  setIsMoreInfo(!isMoreInfo);
                  setIsMore(!isMore);
                }}
              >
                {isMore ? "+ More" : "- Less"}
              </p>
            </div>
            {price ? (
              <div className="hidden md:flex flex-col">
                <div className="flex gap-1 items-center">
                  <FaEthereum size="17px" />
                  <p>{parseFloat(price).toFixed(2)}</p>
                </div>
                <p>($ {usdPrice})</p>
              </div>
            ) : (
              <p className="hidden md:flex">---</p>
            )}
          </>
        ) : transfer.value !== "0" ? (
          <>
            <div className="flex flex-col gap-1">
              <div className="grid grid-cols-4">
                <div className="flex gap-3 items-center col-span-3">
                  <IoCart size="32px" />
                  <p>Sale</p>
                </div>
              </div>
              <p
                className="md:hidden text-xs text-gray-300"
                onClick={() => {
                  setIsMoreInfo(!isMoreInfo);
                  setIsMore(!isMore);
                }}
              >
                {isMore ? "+ More" : "- Less"}
              </p>
            </div>

            <div className="hidden md:flex flex-col">
              <div className="flex gap-1 items-center">
                <FaEthereum size="17px" />
                <p>{parseFloat(price).toFixed(2)}</p>
              </div>
              <p>($ {usdPrice})</p>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-1">
              <div className="grid grid-cols-4">
                <div className="flex gap-3 items-center col-span-4">
                  <BiTransfer size="32px" />
                  <p>Transfer</p>
                </div>
              </div>
              <p
                className="md:hidden text-xs text-gray-300"
                onClick={() => {
                  setIsMoreInfo(!isMoreInfo);
                  setIsMore(!isMore);
                }}
              >
                {isMore ? "+ More" : "- Less"}
              </p>
            </div>
            <p className="hidden md:flex">---</p>
          </>
        )}

        <p className="hidden md:inline">
          {fromAddress && fromAddress === "NullAddress"
            ? fromAddress
            : fromAddress
            ? `${fromAddress.slice(0, 2)}...${fromAddress.slice(-4)}`
            : ""}
        </p>
        <p className="hidden md:inline">
          {toAddress && toAddress === "You"
            ? toAddress
            : toAddress
            ? `${toAddress.slice(0, 2)}...${toAddress.slice(-4)}`
            : ""}
        </p>
        <a
          href={`https://rinkeby.etherscan.io/tx/${transfer.transaction_hash}`}
          target="_blank"
          className="hidden md:flex gap-3 items-center"
        >
          <p>{`${timeSinceCalculator(new Date(transfer.block_timestamp))}`}</p>
          <BsArrowUpRightSquare size="20px" />
        </a>

        <div className="flex flex-col gap-3 justify-self-end md:hidden text-sm">
          <div className="flex items-center ml-auto">
            <FaEthereum />
            {transfer.value !== "0" ? (
              <p>{parseFloat(utils.formatEther(transfer.value)).toFixed(2)}</p>
            ) : (
              "---"
            )}
          </div>
          <a
            className="flex gap-1 ml-auto"
            href={`https://rinkeby.etherscan.io/tx/${transfer.transaction_hash}`}
            target="_blank"
          >
            <p className="whitespace-nowrap">{`${timeSinceCalculator(
              new Date(transfer.block_timestamp)
            )}`}</p>
            <BsArrowUpRightSquare size="20px" />
          </a>
        </div>
      </div>
      <div className={`${!isMoreInfo || "hidden"} md:hidden`}>
        <hr className="mt-3 border-dashed scale-y-50" />
        <div className="flex justify-between mt-6 text-onPrimary text-sm">
          <div className="flex flex-col place-items-center">
            <p>USD Price</p>
            <p>
              {transfer.value !== "0"
                ? `$ ${
                    price &&
                    parseFloat(price * ethUsd)
                      .toFixed() // Adds thousand separator
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }`
                : "---"}
            </p>
          </div>
          <div className="flex flex-col place-items-center">
            <p>From</p>
            <p>
              {fromAddress && fromAddress === "NullAddress"
                ? fromAddress
                : fromAddress &&
                  `${transfer.from_address.slice(
                    0,
                    2
                  )}...${transfer.from_address.slice(-4)}`}
            </p>
          </div>
          <div className="div flex flex-col place-items-center">
            <p>To</p>
            <p>
              {toAddress && toAddress === "You"
                ? toAddress
                : toAddress &&
                  `${transfer.to_address.slice(
                    0,
                    2
                  )}...${transfer.to_address.slice(-4)}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivityTabItem;
