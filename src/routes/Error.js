import React from "react";


const Error = () => {
  return (
    <div className="w-screen h-screen bg-gray-400 relative">
      <div className="absolute inset-0 flex items-center justify-center flex flex-col">
      <div className='text-6xl font-bold text-red-700'>404</div>
        <div className='text-2xl font-bold text-red-700'>Page not found. Sorry :(</div>
      </div>
    </div>
  );
};

export { Error };
