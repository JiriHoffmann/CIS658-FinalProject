import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RequiredInput } from "../components/RequiredInput";
import { Button } from "../components/Button";
import firebase from "../firebase";

const LogIn = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [enableButton, setEnableButton] = useState(false);
  useEffect(() => {
    const validateForm = () => {
      if (email === "" || password === "") {
        return false;
      }

      if (!validateEmail(email)) {
        return false;
      }
      return true;
    };
    validateForm() ? setEnableButton(true) : setEnableButton(false);
  }, [email, password]);

  const handleClick = () => {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          history.push("/");
        })
        .catch((e) => alert(e.message));
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="w-full h-screen bg-gray-400 flex flex-col justify-center">
      <div className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-col max-w-lg max-h-64 mx-auto">
        <div className="font-bold text-2xl h-16 mx-auto">Log In</div>
        <form>
          <RequiredInput
            containerClass="mb-4 relative"
            value={email}
            label="Email"
            onChange={({ target }) => setEmail(target.value)}
            id="email"
            type="email"
            placeholder="Email"
          />
          <RequiredInput
            containerClass="mb-8 relative"
            value={password}
            label="Password"
            onChange={({ target }) => setPassword(target.value)}
            id="password"
            type="password"
            placeholder="******************"
          />

          <div className="flex items-center flex-col sm:flex-row">
            <Button
              disabled={!enableButton}
              onClick={handleClick}
              enClass="text-white font-bold py-2 px-4 rounded sm:w-48 bg-red-700 hover:bg-red-800 m-auto"
              disClass="text-white font-bold py-2 px-4 rounded sm:w-1/2 bg-gray-700 m-auto cursor-not-allowed"
            >
              Log In
            </Button>
            <Link
              to="/forgot_password"
              className="font-bold text-sm w-48 mt-6 sm:mt-0 text-center"
            >
              Forgot Password?
            </Link>
          </div>
        </form>
        <div className="flex flex-row mt-6 my-auto self-center">
          <div className="">Don't have and account?</div>{" "}
          <Link to="/signup" className="ml-4 text-blue-400">
            Sign Up
          </Link>
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="w-48"></div>
          <div className="w-48"></div>
        </div>
      </div>
    </div>
  );
};

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export { LogIn };
