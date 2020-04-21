import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../assets/images/icon";
import { useLocation } from "react-router-dom";

const selected =
  "block mt-4 sm:inline-block sm:mt-0 text-white hover:bg-red-600 hover:border-white border rounded mr-2 px-3 py-1";
const notSelected =
  "block mt-4 sm:inline-block sm:mt-0 text-white hover:bg-red-600 border border-red-700 rounded mr-2 px-3 py-1";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  let loc = useLocation().pathname;

  return (
    <nav className="flex items-center justify-between flex-wrap shadow-lg bg-red-700 p-3 fixed top-0 w-full z-50">
      <Link to="/" className="flex items-center flex-shrink-0 text-white mr-6">
        <Icon />
        <div className="block mt-4 sm:inline-block sm:mt-0 text-white font-semibold text-lg mr-2 px-3 py-1">
          Discounted Food
        </div>
      </Link>
      <div className="block sm:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center px-3 py-2 border rounded text-white border-teal-400 hover:bg-red-600 rounded "
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="w-full hidden lg:block sm:flex-grow sm:flex sm:items-center sm:w-auto absolute right-0">
        <div className="text-sm sm:flex-grow" />
        <Link to="/" className={loc === "/" ? selected : notSelected}>
          Home
        </Link>
        <Link to="/feed" className={loc === "/feed" ? selected : notSelected}>
          Feed
        </Link>
        <Link to="/map" className={loc === "/map" ? selected : notSelected}>
          Map
        </Link>
        <Link
          to="/my_items"
          className={loc === "/my_items" ? selected : notSelected}
        >
          My Items
        </Link>
        <Link to="/user" className={loc === "/user" ? selected : notSelected}>
          User
        </Link>
      </div>
      {open ? (
        <div className="w-full block lg:hidden sm:flex-grow sm:flex sm:items-center sm:w-auto">
          <div className="text-sm sm:flex-grow" />
          <Link to="/" className={loc === "/" ? selected : notSelected}>
            Home
          </Link>
          <Link to="/feed" className={loc === "/feed" ? selected : notSelected}>
            Feed
          </Link>
          <Link to="/map" className={loc === "/map" ? selected : notSelected}>
            Map
          </Link>
          <Link
            to="/my_items"
            className={loc === "/my_items" ? selected : notSelected}
          >
            My Items
          </Link>
          <Link to="/user" className={loc === "/user" ? selected : notSelected}>
            User
          </Link>
        </div>
      ) : null}
    </nav>
  );
};

export { NavBar };
