import { LOGGING_OUT, LOG_IN, LOG_OUT } from "./FBLogin.action";

const getInitialLoginState = () => ({
  isLoggedIn: !!localStorage.getItem("fb_user"),
  currentUser: localStorage.getItem("fb_user"),
  isLoggingOut: false,
});

const handleLogin = (state, currentUser) => {
  return { ...state, isLoggedIn: true, currentUser };
};

const handleLogoutRequest = (state) => {
  return { ...state, isLoggingOut: true };
};

const handleLogout = () => {
  return { isLoggedIn: false, isLoggingOut: false, currentUser: "" };
};

export const LoginReducer = (state = getInitialLoginState(), action) => {
  const { type, name: currentUser } = action;

  switch (type) {
    case LOG_IN:
      return handleLogin(state, currentUser);
    case LOGGING_OUT:
      return handleLogoutRequest(state);
    case LOG_OUT:
      return handleLogout();
    default:
      return state;
  }
};
