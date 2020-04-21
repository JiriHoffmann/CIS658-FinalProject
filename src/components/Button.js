import React, { useEffect } from "react";
import { Dots } from "react-activity";
import "react-activity/dist/react-activity.css";

const BUTTON_ENABLED =
  "text-white font-bold py-2 px-4 rounded sm:w-48 bg-red-700 hover:bg-red-800 m-auto";
const BUTTON_DISABLED =
  "text-white font-bold py-2 px-4 rounded sm:w-1/2 bg-gray-700 m-auto cursor-not-allowed";

const Button = ({ disabled, loading, onClick }) => {
  return (
    <button
      disabled={disabled || loading}
      onClick={onClick}
      className={disabled || loading ? BUTTON_DISABLED : BUTTON_ENABLED}
      type="button"
    >
      {loading ? <Dots color="#fff" size={15} /> : "Send Recovery Email"}
    </button>
  );
};

export { Button };
