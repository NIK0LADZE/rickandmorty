import FacebookLogin from "react-facebook-login";
import { useDispatch, useSelector } from "react-redux";
import {
  LoginDispatcher,
  LogoutDispatcher,
} from "../../Store/FBLogin/FBLogin.dispatcher";
import classes from "./FBLogin.module.css";

const FBLogin = () => {
  const isLoggedIn = useSelector((state) => state.LoginReducer.isLoggedIn);
  const isLoggingOut = useSelector((state) => state.LoginReducer.isLoggingOut);
  const dispatch = useDispatch();
  const { FBButton, LogoutBtn } = classes;

  return !isLoggedIn ? (
    <FacebookLogin
      appId="453174556587648"
      cssClass={FBButton}
      icon="fa-facebook"
      textButton="Login with Facebook"
      scope="public_profile"
      callback={(response) => dispatch(LoginDispatcher(response))}
    />
  ) : (
    <button
      className={`btn btn-danger mt-2 ${LogoutBtn}`}
      onClick={() => dispatch(LogoutDispatcher())}
      disabled={isLoggingOut}
    >
      Logout
    </button>
  );
};

export default FBLogin;
