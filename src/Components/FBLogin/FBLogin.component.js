import { useState } from "react";
import FacebookLogin from "react-facebook-login";
import classes from "./FBLogin.module.css";

const FBLogin = () => {
  const initState = localStorage.getItem("fb_user");
  const [isLoggedIn, setIsLoggedIn] = useState(!!initState);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { FBButton, LogoutBtn } = classes;

  const logoutHandler = () => {
    setIsLoggingOut(true);
    localStorage.removeItem("fb_user");

    try {
      window.FB.logout(() => {
        setIsLoggedIn(false);
        setIsLoggingOut(false);
      });
    } catch (error) {
      setIsLoggedIn(false);
      setIsLoggingOut(false);
    }
  };

  const responseFacebook = (response) => {
    const { name } = response;

    localStorage.setItem("fb_user", name);
    setIsLoggedIn(true);
  };

  return !isLoggedIn ? (
    <FacebookLogin
      appId="453174556587648"
      cssClass={FBButton}
      icon="fa-facebook"
      textButton="Login with Facebook"
      scope="public_profile"
      callback={responseFacebook}
    />
  ) : (
    <button
      className={`btn btn-danger mt-2 ${LogoutBtn}`}
      onClick={logoutHandler}
      disabled={isLoggingOut}
    >
      Logout
    </button>
  );
};

export default FBLogin;
