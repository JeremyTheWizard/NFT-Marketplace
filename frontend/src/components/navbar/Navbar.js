import { useEthers } from "@usedapp/core";
import React, { useState } from "react";
import { FaWallet } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Logo from "../../photos/Logo.jpeg";
import MainButton from "../MainButton";

function Navbar() {
  const [isMenuHidden, setIsMenuHidden] = useState("hidden");
  const { account } = useEthers();

  return (
    <nav className="w-[90vw] max-w-[1200px] mx-auto py-4 bg-primary">
      <div className="w-full flex flex-wrap justify-between items-center">
        <div className="flex items-center">
          <img
            src={Logo}
            className="rounded-full h-8 w-8 mr-3 sm:h-9"
            alt="Marketplace Logo"
          />
          <span className="text-xl font-semibold text-white">NFT PALACE</span>
        </div>
        <div className="flex md:order-2 md:hidden">
          <button
            onClick={() => {
              isMenuHidden === "hidden"
                ? setIsMenuHidden("flex")
                : setIsMenuHidden("hidden");
            }}
            className="text-sm rounded-lg text-white"
          >
            <svg
              className="w-9 h-9"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className={`${isMenuHidden} flex-col md:flex mt-6 md:mt-0 items-center w-full md:w-auto `}
        >
          <div className="">
            {account ? (
              <div className="flex md:hidden gap-3 items-center">
                <FaWallet color="#F5F6EE" />
                <p className="text-onPrimary">{`${account.slice(
                  0,
                  2
                )}...${account.slice(-4)}`}</p>
              </div>
            ) : (
              <div className="md:hidden mt-3">
                <MainButton text="Connect Wallet" />
              </div>
            )}
            <ul className="flex flex-col mt-3 text-white md:flex-row gap-3 md:space-x-8 md:mt-0 md:text-md md:font-medium">
              <li>
                <NavLink
                  to="/marketplace"
                  className={({ isActive }) => {
                    return isActive && "text-buttonSecondary";
                  }}
                >
                  Marketplace
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/collections"
                  className={({ isActive }) => {
                    return isActive && "text-buttonSecondary";
                  }}
                >
                  Collections
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive }) => {
                    return isActive && "text-buttonSecondary";
                  }}
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/create"
                  className={({ isActive }) => {
                    return isActive && "text-buttonSecondary";
                  }}
                >
                  Create!
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        {account ? (
          <div className="hidden md:flex gap-3 items-center md:order-3">
            <FaWallet color="#F5F6EE" />
            <p className="text-onPrimary">{`${account.slice(
              0,
              2
            )}...${account.slice(-4)}`}</p>
          </div>
        ) : (
          <div className="hidden md:inline md:order-3 text-onPrimary">
            <MainButton text="Connect Wallet" />
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
