import { LOGGING_OUT, LOG_IN, LOG_OUT } from "./FBLogin.action";

export const getInitialLoginState = () => ({
  isLoggedIn: !!localStorage.getItem("fb_user"),
  isLoggingOut: false,
});

export const handleLogin = (state) => {
  return { ...state, isLoggedIn: true };
};

export const handleLogoutRequest = (state) => {
  return { ...state, isLoggingOut: true };
};

export const handleLogout = (state) => {
  return { isLoggedIn: false, isLoggingOut: false };
};

export const LoginReducer = (state = getInitialLoginState(), action) => {
  const { type } = action;

  switch (type) {
    case LOG_IN:
      return handleLogin(state);
    case LOGGING_OUT:
      return handleLogoutRequest(state);
    case LOG_OUT:
      return handleLogout(state);
    default:
      return state;
  }
};
