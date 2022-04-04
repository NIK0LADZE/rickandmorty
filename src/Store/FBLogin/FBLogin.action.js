export const LOG_IN = "LOG_IN";
export const LOGGING_OUT = "LOGGING_OUT";
export const LOG_OUT = "LOG_OUT";

export const handleLoginAction = (name) => ({
  type: LOG_IN,
  name,
});

export const handleLogoutRequestAction = () => ({
  type: LOGGING_OUT,
});

export const handleLogoutAction = () => ({
  type: LOG_OUT,
});
