import React, { useContext } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { AlertContext } from "../Context/AlertContext/AlertContext";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function MessageAlert() {
  const { open, message, severity, closeAlert } = useContext(AlertContext);

  return (
    <Snackbar
      style={{ zIndex: 2000 }}
      open={open}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={2000}
      onClose={closeAlert}
    >
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  );
}
