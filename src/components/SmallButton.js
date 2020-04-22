import React from "react";
import { Dots } from "react-activity";
import "react-activity/dist/react-activity.css";

const BUTTON_ENABLED =
  "text-white font-semibold py-2 px-4 rounded xs:w-10 bg-red-700 hover:bg-red-800 m-auto";
const BUTTON_DISABLED =
  "text-white font-semibold py-2 px-4 rounded xs:w-10 bg-gray-700 m-auto cursor-not-allowed";

const SmallButton = ({
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

SmallButton.defaultProps = {
  enClass: BUTTON_ENABLED,
  disClas: BUTTON_DISABLED,
  dotsColor: "#fff",
};

export { SmallButton };
