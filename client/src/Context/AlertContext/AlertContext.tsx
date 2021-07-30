import React, { FC, useState } from "react";
import {
  message_login_error,
  message_signup_error,
  // message_forgot_password_failure,
  // message_forgot_password_succes,
  error_severity,
  // info_severity,
  message_server_error,
  // message_change_password_succes,
  // message_change_password_failure,
} from "./constant";

export const AlertContext = React.createContext({
  open: false,
  message: message_server_error,
  severity: error_severity,
  showServerError: () => {},
  showLoginError: () => {},
  showSignupError: () => {},
  closeAlert: () => {},
});

export const AlertProvider: FC = (props): JSX.Element => {
  const { children } = props;
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>(message_server_error);
  const [severity, setSeverity] = useState<string>(error_severity);

  const showServerError = () => {
    setMessage(message_server_error);
    setOpen(true);
    setSeverity(error_severity);
  };

  const showLoginError = () => {
    setMessage(message_login_error);
    setOpen(true);
    setSeverity(error_severity);
  };

  const showSignupError = () => {
    setOpen(true);
    setMessage(message_signup_error);
    setSeverity(error_severity);
  };

  const closeAlert = () => {
    setOpen(false);
  };
  return (
    <AlertContext.Provider
      value={{
        open,
        message,
        severity,
        showServerError,
        showLoginError,
        showSignupError,
        closeAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};
