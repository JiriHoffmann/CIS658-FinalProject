import React, { useState, useContext, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import AuthContext from "../context/AuthContext";
import { SmallButton, EditButton, Success } from "../components/";
import { FaUserCircle } from "react-icons/fa";
import firebase from "../firebase";

const User = () => {
  const { user } = useContext(AuthContext);
  const picInpRef = useRef(null);
  const [pictureLoading, setPictureLoading] = useState(false);
  const [editName, setEditName] = useState(false);
  const [nameLoading, setNameLoading] = useState(false);
  const [newName, setNewName] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);

  useEffect(() => {
    getuser();
  }, []);

  const getuser = async () => {
    setNewName(user.displayName);
    setEditName(false);
    setPictureLoading(false);
    setNameLoading(false);
  };

  const handleSignOut = async () => {
    firebase
      .auth()
      .signOut()
      .then((res) => console.log(res, "signed out"))
      .catch((e) => console.log(e));
  };

  const handleUpdateName = () => {
    if (newName.length < 3) {
      alert("Username must be at least 3 characters long.");
      return;
    }
    setNameLoading(true);
    firebase
      .auth()
      .currentUser.updateProfile({
        displayName: newName,
      })
      .then(() => getuser())
      .catch((e) => alert(e));
  };

  const handleChangePassword = () => {
    setPasswordLoading(true);
    firebase
      .auth()
      .sendPasswordResetEmail(user.email)
      .then(function () {
        setPasswordChanged(true);
        setPasswordLoading(false);
      })
      .catch(function (error) {
        alert(error);
        setPasswordLoading(false);
      });
  };

  const handlePictureChange = ({ target }) => {
    let picture = target.files[0];
    if (picture) {
      // 1Mb
      if (picture.size > 2048576) {
        alert("File is too big");
        return;
      }
      setPictureLoading(true);
      let name = uuidv4();
      try {
        firebase
          .storage()
          .ref(`ProfilePictures/${name}`)
          .put(picture)
          .then(() => {
            firebase
              .storage()
              .ref("ProfilePictures")
              .child(name)
              .getDownloadURL()
              .then((url) => {
                firebase
                  .auth()
                  .currentUser.updateProfile({
                    photoURL: url,
                  })
                  .then(() => {
                    getuser();
                  })
                  .catch((e) => {
                    throw e;
                  });
              })
              .catch((e) => {
                throw e;
              });
          })
          .catch((e) => {
            throw e;
          });
      } catch (error) {
        setPictureLoading(false);
        alert(error);
      }
    }
  };

  return (
    <div className="flex bg-gray-400 h-screen w-full items-start pt-24">
      <div className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-col relative mx-auto">
        {passwordChanged ? (
          <>
            <Success>Check your email to change your password. </Success>{" "}
            <button
              onClick={() => setPasswordChanged(false)}
              className="border border-gray-500 rounded-md w-1/3 mx-auto mt-8 mb-4"
            >
              Okay
            </button>
          </>
        ) : (
          <>
            <div className="my-auto relative items-center">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt=""
                  className="w-32 h-32 mx-auto rounded-full object-cover "
                />
              ) : (
                <FaUserCircle className="mx-auto text-gray-400" size="8rem" />
              )}

              <div className="absolute inset-x-0 flex items-center justify-center mx-auto h-12 w-16 bottom-0">
                <EditButton
                  loading={pictureLoading}
                  onClick={() => picInpRef.current.click()}
                  className=" flex items-center rounded-full text-white hover:bg-black m-auto bg-gray-700 h-8 w-full ml-24 mt-6 px-1"
                />
              </div>
            </div>
            <table>
              <tbody>
                <tr>
                  <td className="border-gray-600 border-b w-1/3 text-right pt-12 pb-4 font-bold">
                    Username:
                  </td>
                  {editName ? (
                    <td className="relative border-gray-600 border-b w-2/3 text-center justify-start pt-12 pb-4">
                      <input
                        type="string"
                        name="name"
                        id="name"
                        value={newName}
                        onChange={({ target }) => setNewName(target.value)}
                        className="border border-gray-500 rounded text-start pl-2 sm:text-start md:text-center lg:text-center xl:text-center sm:pl-0 md:pl-0 lg:pl-0 xl:pl-0"
                      />
                      <SmallButton
                        enClass={
                          "absolute right-0 text-white font-semibold px-2 rounded xs:w-3 bg-green-500 hover:bg-green-700 m-auto"
                        }
                        disClass={
                          "absolute right-0 text-white font-semibold px-2 rounded xs:w-3 bg-green-500 m-auto cursor-not-allowed"
                        }
                        onClick={handleUpdateName}
                        loading={nameLoading}
                      >
                        Done
                      </SmallButton>
                    </td>
                  ) : (
                    <td className="relative border-gray-600 border-b w-2/3 text-center pt-12 pb-4">
                      <span className="py-2">{user.displayName}</span>
                      <EditButton onClick={() => setEditName(true)} />
                    </td>
                  )}
                </tr>
                <tr>
                  <td className="border-gray-600 border-b w-1/3 text-right pt-4 pb-4 font-bold">
                    Email:
                  </td>
                  <td className="relative border-gray-600 border-b w-2/3 text-center pt-4 pb-4">
                    {user.email}
                  </td>
                </tr>
                <tr>
                  <td className="border-gray-600 border-b w-1/3 text-right pt-4 pb-4 font-bold">
                    Password:
                  </td>
                  <td className="border-gray-600 border-b w-2/3 text-center pt-4 pb-4">
                    <SmallButton
                      enClass={
                        "rounded border shadow border-gray-400 py-1 px-4 w-1/2 mx-2 w-full md:w-1/2"
                      }
                      disClass={
                        "rounded border shadow border-gray-400 py-1 px-4 cursor-not-allowed w-full md:w-1/2"
                      }
                      onClick={handleChangePassword}
                      loading={passwordLoading}
                      dotsColor="#5D6D7E"
                    >
                      Change Password
                    </SmallButton>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="absolute top-0 right-0 mr-2 mt-2 ">
              <SmallButton onClick={handleSignOut} loading={passwordLoading}>
                Log Out
              </SmallButton>
            </div>
            <input
              style={{ display: "none" }}
              type="file"
              accept="image/png, image/jpeg"
              ref={picInpRef}
              onChange={(e) => handlePictureChange(e)}
            />
          </>
        )}

        <div className="flex flex-col md:flex-row">
          <div className="w-48"></div>
          <div className="w-64"></div>
          <div className="w-48"></div>
        </div>
      </div>
    </div>
  );
};

export { User };
