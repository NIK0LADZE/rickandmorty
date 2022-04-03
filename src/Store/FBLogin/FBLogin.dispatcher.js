import {
  handleLoginAction,
  handleLogoutAction,
  handleLogoutRequestAction,
} from "./FBLogin.action";

export const LoginDispatcher = (response) => (dispatch) => {
  const { name } = response;

  localStorage.setItem("fb_user", name);
  dispatch(handleLoginAction());
};

export const LogoutDispatcher = () => (dispatch) => {
  dispatch(handleLogoutRequestAction());
  localStorage.removeItem("fb_user");

  try {
    window.FB.logout(() => {
      dispatch(handleLogoutAction());
    });
  } catch (error) {
    dispatch(handleLogoutAction());
  }
};
