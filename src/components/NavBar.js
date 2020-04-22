import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Icon from "../assets/images/icon";
import { useLocation, withRouter } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const selected =
  "block mt-4 sm:inline-block sm:mt-0 text-white hover:bg-red-600 hover:border-white border rounded mr-2 px-3 py-1";
const notSelected =
  "block mt-4 sm:inline-block sm:mt-0 text-white hover:bg-red-600 border border-red-700 rounded mr-2 px-3 py-1";

const NavBarWithoutRouter = ({ history }) => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  let loc = useLocation().pathname;

  const handleLink = (link) => {
    setOpen(false);
    history.push(link);
  };

  return (
    <nav className="flex items-center justify-between flex-wrap shadow-lg bg-red-700 p-3 fixed top-0 w-full z-50">
      <Link to="/" className="flex items-center flex-shrink-0 text-white mr-6">
        <Icon />
        <div className="block mt-4 sm:inline-block sm:mt-0 text-white font-semibold text-lg mr-2 px-3 py-1">
          DiscountFoods
        </div>
      </Link>
      <div className="block xs:block sm:block md:hidden lg:hidden xl:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center px-3 py-2 border rounded text-white border-gray-400 hover:bg-red-600 rounded focus:outline-none"
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
      <div className="w-full hidden sm:hidden md:block lg:block xl:block sm:flex-grow sm:flex sm:items-center sm:w-auto absolute right-0">
        <div className="text-sm sm:flex-grow" />
        <Link to="/" className={loc === "/" ? selected : notSelected}>
          Home
        </Link>
        <Link to="/about" className={loc === "/about" ? selected : notSelected}>
          About
        </Link>
        <Link to="/feed" className={loc === "/feed" ? selected : notSelected}>
          Feed
        </Link>
        {user ? (
          <Link
            to="/new_item"
            className={loc === "/new_item" ? selected : notSelected}
          >
            Add
          </Link>
        ) : null}
        {user ? (
          <Link
            to="/my_items"
            className={loc === "/my_items" ? selected : notSelected}
          >
            My Groceries
          </Link>
        ) : null}
        {user ? (
          <Link to="/user" className={loc === "/user" ? selected : notSelected}>
            My Profile
          </Link>
        ) : (
          <Link
            to="/login"
            className={loc === "/login" ? selected : notSelected}
          >
            Log In
          </Link>
        )}
      </div>
      {open ? (
        <div className="w-full block xs:block sm:block md:hidden lg:hidden xl:hidden sm:flex-grow sm:flex sm:items-center sm:w-auto">
          <div className="text-sm sm:flex-grow" />
          <button
            to="/"
            onClick={() => handleLink("/")}
            className={loc === "/" ? selected : notSelected}
          >
            Home
          </button>
          <button
            onClick={() => handleLink("/about")}
            className={loc === "/about" ? selected : notSelected}
          >
            About
          </button>
          <button
            to="/feed"
            onClick={() => handleLink("/feed")}
            className={loc === "/feed" ? selected : notSelected}
          >
            Feed
          </button>
          {user ? (
            <button
              onClick={() => handleLink("/new_item")}
              className={loc === "/map" ? selected : notSelected}
            >
              Add
            </button>
          ) : null}
          {user ? (
            <button
              onClick={() => handleLink("/my_items")}
              className={loc === "/my_items" ? selected : notSelected}
            >
              My Groceries
            </button>
          ) : null}
          {user ? (
            <button
              onClick={() => handleLink("/user")}
              className={loc === "/user" ? selected : notSelected}
            >
              My Profile
            </button>
          ) : (
            <button
              onClick={() => handleLink("/login")}
              className={loc === "/login" ? selected : notSelected}
            >
              Log In
            </button>
          )}
        </div>
      ) : null}
    </nav>
  );
};

const NavBar = withRouter(NavBarWithoutRouter);

export { NavBar };
