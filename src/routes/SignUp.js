import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { RequiredInput } from "../components/RequiredInput";
import { Button } from "../components/Button";
import AuthContext from "../context/AuthContext";
import firebase from "../firebase";

const SignUp = ({ history }) => {
  const { user } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [enableButton, setEnableButton] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const validateForm = () => {
      if (
        username === "" ||
        email === "" ||
        password === "" ||
        repeatPassword === ""
      ) {
        return false;
      }
      if (password !== repeatPassword) {
        return false;
      }
      if (!validateEmail(email)) {
        return false;
      }
      return true;
    };
    validateForm() ? setEnableButton(true) : setEnableButton(false);
  }, [username, email, password, repeatPassword]);

  const handleClick = () => {
    if (!validateEmail(email)) {
      return;
    }
    setLoading(true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase
          .auth()
          .currentUser.updateProfile({
            displayName: username,
          })
          .then(() => setTimeout(() => history.push("/user"), 1000))
          .catch((e) => alert(e));
      })
      .catch((e) => alert(e));
    setLoading(false);
  };

  if (user) {
    return <Redirect to="/user" />;
  }

  return (
    <div className="w-full h-screen bg-gray-400 flex flex-col justify-center">
      <div className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-col max-w-lg max-h-64 mx-auto">
        <div className="font-bold text-2xl h-16 mx-auto">
          Create New Account
        </div>
        <form>
          <RequiredInput
            containerClass="mb-4 relative"
            label="Username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            id="username"
            type="text"
            placeholder="Username"
          />
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
            containerClass="mb-4 relative"
            value={password}
            label="Password"
            onChange={({ target }) => setPassword(target.value)}
            id="password"
            type="password"
            placeholder="******************"
          />
          <RequiredInput
            containerClass="mb-10 relative"
            value={repeatPassword}
            label="Confirm Password"
            onChange={({ target }) => setRepeatPassword(target.value)}
            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker"
            id="reppassword"
            type="password"
            placeholder="******************"
          />

          <div className="flex items-center flex-col md:flex-row justify-between">
            <Button
              disabled={!enableButton}
              onClick={handleClick}
              loading={loading}
            >
              Sign In
            </Button>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="sm:w-64 md:w-48"></div>
            <div className="sm:w-64 md:w-48"></div>
          </div>
        </form>
      </div>
    </div>
  );
};

const validateEmail = (em) => {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(em).toLowerCase());
};

export { SignUp };
