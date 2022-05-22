import React, { useState } from "react";
import Logo from "../photos/Logo.jpeg";
import MainButton from "./MainButton";

function Navbar() {
  const [isMenuHidden, setIsMenuHidden] = useState("hidden");

  return (
    <nav class="px-2 md:px-0 py-4 bg-primary">
      <div class="w-full flex flex-wrap justify-between items-center">
        <div class="flex items-center">
          <img
            src={Logo}
            class="rounded-full h-8 w-8 mr-3 sm:h-9"
            alt="Marketplace Logo"
          />
          <span class="text-xl font-semibold text-white">NFT PALACE</span>
        </div>
        <div class="flex items-center md:order-2 md:hidden">
          <button
            onClick={() => {
              isMenuHidden ? setIsMenuHidden("") : setIsMenuHidden("hidden");
            }}
            class="p-2 text-sm rounded-lg text-white"
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
              <a
                href="#"
                class="block py-2 pr-4 pl-3 hover:text-button-primary transition duration-200 ease-in-out md:bg-transparent md:p-0"
              >
                Marketplace
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block py-2 pr-4 pl-3 hover:text-button-primary transition duration-200 ease-in-out md:bg-transparent md:p-0"
              >
                Collections
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block py-2 pr-4 pl-3 hover:text-button-primary transition duration-200 ease-in-out md:bg-transparent md:p-0"
              >
                Profile
              </a>
            </li>
          </ul>
        </div>
        <div class="hidden md:inline md:order-3 ">
          <MainButton text="Connect Wallet" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
