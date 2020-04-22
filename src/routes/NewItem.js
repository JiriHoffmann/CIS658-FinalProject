import React, { useState, useContext, useEffect, useRef } from "react";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";
import AuthContext from "../context/AuthContext";
import { Button, Success, RequiredInput } from "../components/";
import foodTypes from "../datasets/foodTypes";
import cities from "../datasets/cities";
import firebase from "../firebase";

const NewItem = ({ history }) => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [foodType, setFoodType] = useState({});
  const [location, setLocation] = useState({});
  const [store, setStore] = useState("");
  const [picture, setPicture] = useState({});
  const [picturePrev, setPicturePrev] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [submittting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const picInpRef = useRef(null);

  const PRICE_RE = /^\d+([,.]\d{1,2})?$/;

  useEffect(() => {
    const validateForm = () => {
      if (
        name === "" ||
        originalPrice === "" ||
        newPrice === "" ||
        foodType.value === undefined ||
        location.value === undefined ||
        store === "" ||
        picture.name === undefined
      ) {
        return false;
      }
      return true;
    };

    setFormValid(validateForm());
  }, [name, originalPrice, newPrice, foodType, location, store, picture]);

  const handlePictureChange = ({ target }) => {
    let picture = target.files[0];
    if (picture) {
      setPicture(picture);
      setPicturePrev(URL.createObjectURL(picture));
    }
  };

  const handleSubmit = () => {
    if (!PRICE_RE.test(originalPrice) || !PRICE_RE.test(newPrice)) {
      alert("Invalid price");
    }
    setSubmitting(true);
    let picUUID = uuidv4();
    uploadPicture(picture, picUUID);
  };

  const uploadPicture = (picture, picUUID) => {
    firebase
      .storage()
      .ref(`ItemPictures/${picUUID}`)
      .put(picture)
      .then(({ ref }) => getPictureURL(ref.fullPath))
      .catch(() => {
        alert(
          "There was an issue with uploading the item. Please try again later."
        );
        setSubmitting(false);
      });
  };

  const getPictureURL = (picPath) => {
    firebase
      .storage()
      .ref(picPath)
      .getDownloadURL()
      .then((url) => {
        uploadItem(url);
      })
      .catch(() => {
        alert(
          "There was an issue with uploading the item. Please try again later."
        );
        setSubmitting(false);
      });
  };

  const uploadItem = (picURL) => {
    firebase
      .firestore()
      .collection("items")
      .add({
        name: name,
        type: foodType.label,
        originalPrice: originalPrice,
        discountedPrice: newPrice,
        location: location.label,
        store: store,
        pictureURL: picURL,
        likes: 0,
        dislikes: 0,
        user: user.displayName,
        userPictureURL: user.photoURL,
        userUID: user.uid,
        timestamp: new Date(),
        likedBy: ["0"],
        dislikedBy: ["0"],
      })
      .then(() => {
        setSubmitting(false);
        setSubmitted(true);
      })
      .catch(() => {
        alert(
          "There was an issue with uploading the item. Please try again later."
        );
        setSubmitting(false);
      });
  };

  return (
    <div className="flex bg-gray-200 h-screen w-full items-start pt-24">
      <div className="flex h-screen w-screen bg-gray-200 fixed" />
      <div className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-col relative mx-auto">
        {submitted ? (
          <Success>
            <>
              You food was successfully submitted! Thanks for sharing!
              <div className="mt-8">You can view all your added foods here</div>
              <Button
                enClass="text-red-700 font-bold py-2 px-4 rounded sm:w-48 bg-white border border-red-700 hover:bg-gray-200 hover:border-red-900 m-auto"
                onClick={() => history.push("/my_items")}
              >
                My Food
              </Button>
            </>
          </Success>
        ) : (
          <>
            <button
              onClick={() => picInpRef.current.click()}
              className="text-black font-bold rounded-lg border border-gray-400 shadow w-64 h-48 m-auto mt-8 mb-4"
            >
              {picturePrev ? (
                <img
                  src={picturePrev}
                  className="w-64 h-48 object-cover rounded-lg"
                  alt="Item"
                />
              ) : (
                <span>Upload Picture</span>
              )}
            </button>
            <div className="flex flex-col sm:flex-row w-full">
              <RequiredInput
                containerClass="mb-4 relative w-full sm:w-1/2 mx-0 sm:mx-6 my-4 sm:my-2"
                label="Name"
                value={name}
                onChange={({ target }) => setName(target.value)}
                id="name"
                type="text"
                placeholder="Wholewheat Bread"
              />
              <div className="mb-4 relative w-full sm:w-1/2 mx-0 sm:mx-6 my-4 sm:my-2 flex flex-col">
                <label className="block text-grey-darker text-sm font-bold mb-2">
                  Type
                </label>
                <Select
                  options={foodTypes.slice(1)}
                  value={foodType}
                  onChange={setFoodType}
                  className="w-full"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row w-full">
              <RequiredInput
                containerClass="mb-4 relative w-full sm:w-1/2 mx-0 sm:mx-6 my-4 sm:my-2"
                label="Old Price in $"
                value={originalPrice}
                onChange={({ target }) => setOriginalPrice(target.value)}
                id="ogPrice"
                type="text"
                placeholder="19.99"
              />
              <RequiredInput
                containerClass="mb-4 relative w-full sm:w-1/2 mx-0 sm:mx-6 my-4 sm:my-2"
                label="New Price in $"
                value={newPrice}
                onChange={({ target }) => setNewPrice(target.value)}
                id="newPrice"
                type="text"
                placeholder="8.99"
              />
            </div>
            <div className="flex flex-col sm:flex-row w-full">
              <div className="mb-4 relative w-full sm:w-1/2 mx-0 sm:mx-6 my-4 sm:my-2 flex flex-col">
                <label className="block text-grey-darker text-sm font-bold mb-2">
                  City
                </label>
                <Select
                  options={cities.slice(1)}
                  value={location}
                  onChange={setLocation}
                  className="w-full"
                />
              </div>
              <RequiredInput
                containerClass="mb-4 relative w-full sm:w-1/2 mx-0 sm:mx-6 my-4 sm:my-2"
                label="Store"
                value={store}
                onChange={({ target }) => setStore(target.value)}
                id="store"
                type="text"
                placeholder="Walmart"
              />
            </div>
            <Button
              loading={submittting}
              onClick={() => handleSubmit()}
              disabled={!formValid}
              enClass="text-white font-bold py-2 px-4 rounded sm:w-48 bg-red-700 hover:bg-red-800 m-auto mt-8 mb-4"
              disClass="text-white font-bold py-2 px-4 rounded sm:w-48 bg-gray-700 m-auto mt-8 mb-4 cursor-not-allowed"
            >
              Save
            </Button>
          </>
        )}
        <input
          style={{ display: "none" }}
          type="file"
          accept="image/png, image/jpeg"
          ref={picInpRef}
          onChange={(e) => handlePictureChange(e)}
        />
        <div className="flex flex-col md:flex-row">
          <div className="w-48"></div>
          <div className="w-64"></div>
          <div className="w-48"></div>
        </div>
      </div>
    </div>
  );
};

export { NewItem };
