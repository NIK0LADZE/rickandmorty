export const LOG_IN = "LOG_IN";
export const LOGGING_OUT = "LOGGING_OUT";
export const LOG_OUT = "LOG_OUT";

export const handleLoginAction = () => ({
  type: LOG_IN,
});

export const handleLogoutRequestAction = () => ({
  type: LOGGING_OUT,
});

export const handleLogoutAction = () => ({
  type: LOG_OUT,
});
