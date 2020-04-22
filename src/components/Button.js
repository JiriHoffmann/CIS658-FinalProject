import React from "react";
import { Dots } from "react-activity";
import "react-activity/dist/react-activity.css";

const Button = ({
  disabled,
  loading,
  onClick,
  children,
  enClass,
  disClass,
  dotsColor,
}) => {
  return (
    <button
      disabled={disabled || loading}
      onClick={onClick}
      className={disabled || loading ? disClass : enClass}
      type="button"
    >
      {loading ? <Dots color={dotsColor} size={15} /> : children}
    </button>
  );
};

Button.defaultProps = {
  enClass:
    "text-white font-bold py-2 px-4 rounded sm:w-48 bg-red-700 hover:bg-red-800 m-auto",
  disClass:
    "text-white font-bold py-2 px-4 rounded sm:w-1/2 bg-gray-700 m-auto cursor-not-allowed",
  dotsColor: "#fff",
};

export { Button };
