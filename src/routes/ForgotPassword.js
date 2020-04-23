import React, { useState, useEffect } from "react";
import { RequiredInput, Button, Success } from "../components";
import firebase from "../firebase";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [enableButton, setEnableButton] = useState(false);
  const [sending, setSending] = useState(false);
  const [showSent, setShowSent] = useState(false);

  useEffect(() => {
    validateForm() ? setEnableButton(true) : setEnableButton(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  const validateForm = () => {
    if (email === "") {
      return false;
    }

    if (!validateEmail(email)) {
      return false;
    }
    return true;
  };

  const handleClick = () => {
    if (!validateEmail(email)) {
      return;
    }
    setSending(true);
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => setShowSent(true), 2000)
      .catch((e) => alert(e.message));
  };

  return (
    <div className="w-full h-screen bg-gray-400 flex flex-col justify-center">
      <div className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-col max-w-lg max-h-64 mx-6 sm:mx-auto">
        {showSent ? (
          <Success>
            Recovery link was succesfully send. Check you email.
          </Success>
        ) : (
          <>
            <div className="font-bold m-auto mb-6 text-center">
              Forgot your account’s password or having trouble logging in? Enter
              your email address and we’ll send you a recovery link.
            </div>
            <form>
              <RequiredInput
                containerClass="mb-8 relative"
                value={email}
                label="Email"
                onChange={({ target }) => setEmail(target.value)}
                id="email"
                type="email"
                placeholder=""
              />

              <div className="flex items-center flex-col sm:flex-row">
                <Button
                  disabled={!enableButton}
                  onClick={handleClick}
                  loading={sending}
                >
                  Send Recovery Email
                </Button>
              </div>
            </form>
          </>
        )}
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

export { ForgotPassword };
