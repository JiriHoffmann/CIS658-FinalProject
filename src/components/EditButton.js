import React, { useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { Dots } from "react-activity";
import "react-activity/dist/react-activity.css";

const EditButton = ({ onClick, className, loading }) => {
  return (
    <button
      disabled={loading}
      onClick={onClick}
      className={className}
      type="button"
    >
      {loading ? <Dots color="#fff" size={15} /> : <MdEdit size="1.7rem" />}
    </button>
  );
};

EditButton.defaultProps = {
  onClick: () => {
    return;
  },
  className: "rounded text-gray-700 hover:text-black m-auto absolute right-0",
};

export { EditButton };
