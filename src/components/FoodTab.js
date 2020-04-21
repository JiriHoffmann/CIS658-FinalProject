import React, { useState } from "react";
import { MdStore, MdLocationOn, MdPerson, MdAttachMoney } from "react-icons/md";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";

const ICON_SIZE = "1.5rem";
const LIKE_SIZE = "2rem";

const FoodTab = () => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleLike = () => {
    if (disliked) {
      setDisliked(false);
    }
    setLiked(!liked);
  };

  const handleDislike = () => {
    if (liked) {
      setLiked(false);
    }
    setDisliked(!disliked);
  };

  return (
    <div className=" w-full sm:w-1/3 md:w-1/3 lg:w-1/4 xl:w-1/5  max-w-sm rounded-lg owerflow-hidden bg-white shadow-lg mx-4 my-2 mt-2">
      <img
        src="https://source.unsplash.com/random"
        alt=""
        className="rounded-lg rounded-bl-none rounded-br-none w-full h-32"
      />
      <div className="px-4 pt-4">
        <div className="font-bold text-red-700 text-lg">Wholegrain bread</div>
        <ul>
          <li className="flex flex-row my-1 text-red-700">
            <MdAttachMoney size={ICON_SIZE} className="mr-3 " />
            2.50
          </li>
          <li className="flex flex-row my-1 text-gray-700">
            <MdLocationOn size={ICON_SIZE} className="mr-3" />
            Detroit
          </li>
          <li className="flex flex-row my-1 text-gray-700">
            <MdStore size={ICON_SIZE} className="mr-3" />
            Walmart
          </li>
          <li className="flex flex-row my-1 text-gray-700">
            <MdPerson size={ICON_SIZE} className="mr-3" />
            User
          </li>
        </ul>
      </div>
      <div className="flex flex-row w-full mt-2">
        <button className="h-16 flex w-1/2 focus:outline-none" onClick={() => handleLike()}>
          <div className="flex flex-col w-full h-full">
            {liked ? (
              <AiFillLike className="mx-auto text-green-600" size={LIKE_SIZE} />
            ) : (
              <AiOutlineLike
                className="mx-auto text-green-600"
                size={LIKE_SIZE}
              />
            )}
            <span className="mx-auto font-bold">0</span>
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

            <span className="mx-auto font-bold">0</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export { FoodTab };
