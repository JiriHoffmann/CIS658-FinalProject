import React from "react";

const Home = ({ history }) => {
  return (
    <>
      <div
        className="w-screen h-screen fixed top-0 z-0"
        style={{
          background:
            "linear-gradient(171deg, rgba(197,48,48,1) 70.5%, rgba(16,31,48,1) 71%)",
        }}
      />
      <div className="w-screen h-full relative pt-40 px-16">
        <div className="text-4xl font-bold text-white font-mono w-full sm:w-4/5 md:w-3/5">
          Found a crazy deal for groceries?
        </div>
        <div className="text-xl font-bold text-white pt-12 font-mono w-full sm:w-4/5 md:w-3/5">
          Don't be lame and share it with others!
        </div>
        <div className="text-xl font-bold text-white pt-8 font-mono w-full sm:w-4/5 md:w-3/5">
          Stop posting them on Facebook! Here you can share your local grocery
          deals with your neightbors in just a few single steps!
        </div>
        <button
          onClick={() => history.push("/login")}
          className="text-xl text-white mt-10 py-3 font-mono w-4/6 sm:w-2/6 md:w-2/6 lg:w-1/6 border border-white rounded-lg mb-32"
        >
          Let's start
        </button>
      </div>
    </>
  );
};

export { Home };
