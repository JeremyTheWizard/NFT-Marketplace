import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../photos/Logo.jpeg";
import MainButton from "../MainButton";

function Navbar() {
  const [isMenuHidden, setIsMenuHidden] = useState("hidden");

  return (
    <nav class="w-[90vw] max-w-[1200px] mx-auto py-4 bg-primary">
      <div class="w-full flex flex-wrap justify-between items-center">
        <div class="flex items-center">
          <img
            src={Logo}
            class="rounded-full h-8 w-8 mr-3 sm:h-9"
            alt="Marketplace Logo"
          />
          <span class="text-xl font-semibold text-white">NFT PALACE</span>
        </div>
        <div class="flex md:order-2 md:hidden">
          <button
            onClick={() => {
              isMenuHidden ? setIsMenuHidden("") : setIsMenuHidden("hidden");
            }}
            class="text-sm rounded-lg text-white"
          >
            <svg
              class="w-9 h-9"
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
          class={`${isMenuHidden} justify-between items-center w-full md:flex md:w-auto md:order-1`}
          id="mobile-menu-4"
        >
          <div class="md:hidden mt-3 ">
            <MainButton text="Connect Wallet" />
          </div>
          <ul class="flex flex-col mt-3 text-white md:flex-row md:space-x-8 md:mt-0 md:text-md md:font-medium">
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
          </ul>
        </div>
        <div className="hidden md:inline md:order-3 ">
          <MainButton text="Connect Wallet" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
