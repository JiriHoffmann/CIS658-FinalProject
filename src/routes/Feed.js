import React, { useState, useEffect } from "react";
import { FoodTab } from "../components";
import Select from "react-select";
import foodTypes from "../datasets/foodTypes";
import cities from "../datasets/cities";
import firebase from "../firebase";
import { Dots } from "react-activity";

const Feed = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [foodValue, setFoodValue] = useState({ value: 0, label: "Anything" });
  const [cityValue, setCityValue] = useState({ value: 0, label: "Anywhere" });

  useEffect(() => {
    setLoading(true);
    firebase
      .firestore()
      .collection("items")
      .orderBy("timestamp", "desc")
      .onSnapshot(getData);

    return firebase
      .firestore()
      .collection("items")
      .onSnapshot(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    if (foodValue.value !== 0 && cityValue.value !== 0) {
      firebase
        .firestore()
        .collection("items")
        .orderBy("timestamp", "desc")
        .where("location", "==", cityValue.label)
        .where("type", "==", foodValue.label)
        .onSnapshot(getData);
    } else if (foodValue.value !== 0) {
      firebase
        .firestore()
        .collection("items")
        .orderBy("timestamp", "desc")
        .where("type", "==", foodValue.label)
        .onSnapshot(getData);
    } else if (cityValue.value !== 0) {
      firebase
        .firestore()
        .collection("items")
        .orderBy("timestamp", "desc")
        .where("location", "==", cityValue.label)
        .onSnapshot(getData);
    } else {
      firebase
        .firestore()
        .collection("items")
        .orderBy("timestamp", "desc")
        .onSnapshot(getData);
    }

    return firebase
      .firestore()
      .collection("items")
      .onSnapshot(() => {});
  }, [foodValue, cityValue]);

  const getData = (qs) => {
    let newData = [];
    for (let item in qs.docs) {
      newData.push({ id: qs.docs[item].id, ...qs.docs[item].data() });
    }
    setLoading(false);
    setData(newData);
  };

  return (
    <>
      <div className="w-screen h-screen bg-gray-400 fixed top-0 z-0" />
      <div className="relative content-center flex-col pt-24 pb-12 z-5">
        <div className="bg-white mb-10 rounded-lg lg:rounded-full h-48 sm:h-32 lg:h-16 w-11/12 max-w-3xl shadow-lg mt-8 px-2 font-bold text-lg flex flex-col sm:flex-row justify-center content-center mx-auto z-8">
          <div className=" lg:w-7/12 flex flex-col lg:flex-row justify-center content-center my-auto sm:m-auto lg:pl-8 xl:pl-8">
            <div className="flex xs:mx-auto sm:mx-auto md:mx-auto mx-auto lg:mr-2 lg:ml-0 xl:ml-0 xl:mr-2 md:mb-2 sm:mb-2 mb-2 lg:mb-auto my-auto">
              Looking for
            </div>
            <Select
              defaultValue={{ value: 0, label: "Anything" }}
              value={foodValue}
              onChange={setFoodValue}
              options={foodTypes}
              className="w-64 my-auto mx-auto"
            />
          </div>
          <div className=" lg:w-5/12 flex flex-col lg:flex-row justify-center content-center my-auto sm:m-auto">
            <div className="flex xs:mx-auto sm:mx-auto md:mx-auto mx-auto lg:mr-6 lg:ml-0 xl:ml-0 xl:mr-6 md:mb-2 sm:mb-2 mb-2 lg:mb-auto my-auto">
              in
            </div>
            <Select
              defaultValue={{ value: 0, label: "Anywhere" }}
              options={cities}
              value={cityValue}
              onChange={setCityValue}
              className="w-64 my-auto lg:mr-8 xl:mr-8 mx-auto"
            />
          </div>
        </div>
        <div className="flex flex-wrap lg:w-4/5 sm:w-11/12 justify-center m-auto">
          {data && data.length > 0 ? (
            data.map((item, index) => {
              return <FoodTab key={index} item={item} />;
            })
          ) : loading ? (
            <Dots size={48} />
          ) : (
            <div className="text-3xl">
              Sorry there is no data matching your requirements.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export { Feed };
