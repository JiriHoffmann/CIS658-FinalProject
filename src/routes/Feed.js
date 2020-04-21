import React, { useState, useEffect } from "react";
import { FoodTab } from "../components";
import Select from "react-select";
import foodTypes from "../datasets/foodTypes";
import cities from "../datasets/cities";


const Feed = () => {
  const [data, setData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [foodValue, setFoodValue] = useState({ value: 0, label: "Anything" });
  const [cityValue, setCityValue] = useState({ value: 0, label: "Anywhere" });

  return (
    <>
      <div className="flex bg-gray-200 justify-center content-center flex-col pt-24">
        <div className="bg-white mb-10 rounded-lg lg:rounded-full h-48 sm:h-32 lg:h-16 w-11/12 max-w-3xl shadow-lg px-2 font-bold text-lg flex flex-col sm:flex-row justify-center content-center m-auto">
          <div className=" lg:w-7/12 flex flex-col lg:flex-row justify-center content-center my-auto sm:m-auto">
            <div className="flex mr-6 my-auto">Looking for</div>
            <Select
              defaultValue={{ value: 0, label: "Anything" }}
              value={foodValue}
              onChange={setFoodValue}
              options={foodTypes}
              className="w-64 my-auto "
            />
          </div>
          <div className=" lg:w-5/12 flex flex-col lg:flex-row justify-center content-center my-auto sm:m-auto">
            <div className="flex mr-8 my-auto">in</div>
            <Select
              defaultValue={{ value: 0, label: "Anywhere" }}
              options={cities}
              value={cityValue}
              onChange={setCityValue}
              className="w-64 my-auto mr-8"
            />
          </div>
        </div>
        <div className="flex flex-wrap lg:w-4/5 sm:w-11/12 justify-center m-auto">
          {data.map((item, index) => {
            return <FoodTab key={index} />;
          })}
        </div>
      </div>
      <div className="flex h-screen w-screen bg-gray-200 fixed" />
    </>
  );
};

export { Feed };
