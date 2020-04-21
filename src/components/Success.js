import React from "react";
import { MdCheckCircle } from "react-icons/md";

const Success = () => {
  return (
    <>
      <div className="text-green-500 mx-auto h-32 mt-12">
        <MdCheckCircle size="5rem" />
      </div>
      <div className="text-lg font-bold w-full m-auto mb-6 text-center">
        Recovery link was succesfully send. Check you email.
      </div>
    </>
  );
};

export { Success };
