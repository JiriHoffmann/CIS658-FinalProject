import React, { useState, useContext, useEffect } from "react";
import firebase from "../firebase";
import fbapp from "firebase/app";
import AuthContext from "../context/AuthContext";
import LazyLoad from "react-lazyload";
import {
  MdStore,
  MdLocationOn,
  MdPerson,
  MdAttachMoney,
  MdMoneyOff,
  MdAccessTime,
  MdDelete,
} from "react-icons/md";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
import { Dots } from "react-activity";
import { Button } from "./Button";

const ICON_SIZE = "1.5rem";
const LIKE_SIZE = "2rem";

const FoodTab = ({ item, allowDelete }) => {
  const { user } = useContext(AuthContext);
  const [disableRating, setDisableRating] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  useEffect(() => {
    user ? setDisableRating(false) : setDisableRating(true);
    if (user && item.likedBy.includes(user.uid)) {
      setLiked(true);
    }
    if (user && item.dislikedBy.includes(user.uid)) {
      setDisliked(true);
    }
  }, [user, item.likedBy, item.dislikedBy]);

  const addLike = () => {
    firebase
      .firestore()
      .collection("items")
      .doc(item.id)
      .update({
        likes: item.likes + 1,
        likedBy: fbapp.firestore.FieldValue.arrayUnion(user.uid),
      });
  };

  const removeLike = () => {
    firebase
      .firestore()
      .collection("items")
      .doc(item.id)
      .update({
        likes: item.likes - 1,
        likedBy: fbapp.firestore.FieldValue.arrayRemove(user.uid),
      });
  };

  const addDislike = () => {
    firebase
      .firestore()
      .collection("items")
      .doc(item.id)
      .update({
        dislikes: item.dislikes + 1,
        dislikedBy: fbapp.firestore.FieldValue.arrayUnion(user.uid),
      });
  };

  const removeDislike = () => {
    firebase
      .firestore()
      .collection("items")
      .doc(item.id)
      .update({
        dislikes: item.dislikes - 1,
        dislikedBy: fbapp.firestore.FieldValue.arrayRemove(user.uid),
      });
  };

  const handleLike = () => {
    if (disableRating) {
      alert("Please sign in to rate ");
      return;
    }
    if (disliked) {
      setDisliked(false);
      removeDislike();
      setLiked(true);
      addLike();
    } else if (liked) {
      setLiked(false);
      removeLike();
    } else {
      setLiked(true);
      addLike();
    }
  };

  const handleDislike = () => {
    if (disableRating) {
      alert("Please sign in to rate ");
      return;
    }
    if (liked) {
      setLiked(false);
      removeLike();
      setDisliked(true);
      addDislike();
    } else if (disliked) {
      setDisliked(false);
      removeDislike();
    } else {
      setDisliked(true);
      addDislike();
    }
  };

  const handleDelete = () => {
    let check = window.confirm(`Are you sure you want to delete ${item.name}?`);
    if (check === true) {
      console.log(item.id);
      setDeleteLoading(true);
      firebase
        .firestore()
        .collection("items")
        .doc(item.id)
        .delete()
        .catch((e) => {
          alert("There was an issue deleting the item");
          console.log(e);
          setDeleteLoading(false);
        });
    } else {
      console.log("canceled");
    }
  };

  const getTimeDifference = () => {
    if (item.timestamp) {
      let difference = Math.round(new Date() / 1000) - item.timestamp;
      if (difference < 60 * 60) {
        return `${Math.ceil(difference / 60)} minutes ago`;
      } else if (difference < 60 * 60 * 24) {
        return `${Math.ceil(difference / (60 * 60))} hours ago`;
      } else return `${Math.ceil(difference / (60 * 60 * 24))} days ago`;
    }
  };

  return (
    <div className=" w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4  max-w-64 rounded-lg owerflow-hidden bg-white shadow-lg mx-4 my-2 mt-2 xs:mx-8 relative">
      {allowDelete ? (
        <Button
          loading={deleteLoading}
          enClass="absolute top-0 right-0 mr-2 mt-2"
          onClick={() => handleDelete()}
        >
          <MdDelete size="2rem" />
        </Button>
      ) : null}
      <LazyLoad
        once
        debounce={2000}
        placeholder={<Dots size={30} className="flex m-auto" />}
        className="w-full h-48"
      >
        <img
          src={item.pictureURL}
          alt=""
          className="rounded-lg rounded-bl-none rounded-br-none object-cover w-full h-48"
        />
      </LazyLoad>
      <div className="px-4 pt-4">
        <div className="font-bold text-red-700 text-lg">{item.name}</div>
        <ul>
          <li className="flex flex-row my-1">
            <div className="w-1/2 flex flex-row text-gray-700">
              <MdMoneyOff size={ICON_SIZE} className="mr-3 " />
              {item.originalPrice}
            </div>
            <div className="w-1/2 flex flex-row  text-red-700 font-bold">
              <MdAttachMoney size={ICON_SIZE} className="mr-3 " />
              {item.discountedPrice}
            </div>
          </li>
          <li className="flex flex-row my-1 text-gray-700">
            <MdAccessTime size={ICON_SIZE} className="mr-3" />
            {getTimeDifference()}
          </li>
          <li className="flex flex-row my-1 text-gray-700">
            <MdLocationOn size={ICON_SIZE} className="mr-3" />
            {item.location}
          </li>
          <li className="flex flex-row my-1 text-gray-700">
            <MdStore size={ICON_SIZE} className="mr-3" />
            {item.store}
          </li>
          <li className="flex flex-row my-1 text-gray-700">
            <MdPerson size={ICON_SIZE} className="mr-3" />
            {item.user}
          </li>
        </ul>
      </div>
      <div className="flex flex-row w-full mt-2">
        <button
          className="h-16 flex w-1/2 focus:outline-none"
          onClick={() => handleLike()}
        >
          <div className="flex flex-col w-full h-full">
            {liked ? (
              <AiFillLike className="mx-auto text-green-600" size={LIKE_SIZE} />
            ) : (
              <AiOutlineLike
                className="mx-auto text-green-600"
                size={LIKE_SIZE}
              />
            )}
            <span className="mx-auto font-bold">{item.likes}</span>
          </div>
        </button>
        <button
          className="h-16 flex w-1/2 focus:outline-none"
          onClick={() => handleDislike()}
        >
          <div className="flex flex-col w-full h-full">
            {disliked ? (
              <AiFillDislike
                className="mx-auto text-red-600"
                size={LIKE_SIZE}
              />
            ) : (
              <AiOutlineDislike
                className="mx-auto text-red-600"
                size={LIKE_SIZE}
              />
            )}

            <span className="mx-auto font-bold">{item.dislikes}</span>
          </div>
        </button>
      </div>
    </div>
  );
};

FoodTab.defaultProps = {
  item: {
    name: null,
    type: { value: null, label: null },
    originalPrice: null,
    discountedPrice: null,
    location: { value: null, label: null },
    store: null,
    pictureURL: null,
    likes: 0,
    dislikes: 0,
    user: null,
    userPictureURL: null,
    userUID: null,
    timestamp: { seconds: null, nanoseconds: null },
    likedBy: null,
  },
  allowDelete: false,
};
export { FoodTab };
