import React, { useState, useEffect, useContext } from "react";
import { FoodTab } from "../components";
import firebase from "../firebase";
import AuthContext from "../context/AuthContext";
import { Dots } from "react-activity";

const MyItems = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (user) {
      firebase.firestore().collection("items").onSnapshot(getData);
      return firebase
        .firestore()
        .collection("items")
        .where("userUID", "==", user.uid)
        .orderBy("timestamp", "desc")
        .onSnapshot(() => {});
    }
  }, [user]);

  const getData = (qs) => {
    console.log(qs);
    let newData = [];
    for (let item in qs.docs) {
      newData.push({ id: qs.docs[item].id, ...qs.docs[item].data() });
    }
    setData(newData);
    setLoading(false);
  };

  return (
    <>
      <div className="w-screen h-screen bg-gray-400 fixed top-0 z-0" />
      <div className="relative content-center flex-col pt-24 pb-12 z-5">
        <div className="bg-white mb-10 relative rounded-full h-16 w-11/12 max-w-3xl align-middle shadow-lg mt-8 px-2 font-bold text-lg justify-center content-center m-auto">
          <div className=" absolute inset-0 flex items-center justify-center text-2xl">
            {data && data.length === 0 && !loading ? (
              <>Looks like you don't have any items yet</>
            ) : (
              <>Here are items added by you</>
            )}
          </div>
        </div>
        <div className="flex flex-wrap lg:w-4/5 sm:w-11/12 justify-center m-auto">
          {data && data.length > 0 ? (
            data.map((item, index) => {
              return <FoodTab key={index} item={item} allowDelete={true} />;
            })
          ) : loading ? (
            <Dots size={48} />
          ) : null}
        </div>
      </div>
    </>
  );
};

export { MyItems };
