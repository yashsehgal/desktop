/*
 * Copyright European Organization for Nuclear Research (CERN)
 * Licensed under the Apache License, Version 2.0 (the "License");
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Authors:
 * - Vivek Nigam, <viveknigam.nigam3@gmail.com>, 2020
 */

import React from "react";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useSelector, useDispatch } from "react-redux";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} action={null} />;
}

/**
 * React Component to Display Alert Messages depending on severity.
 *
 * @param {*} props From Parent Component
 * @property {String} severity can be selected from {"success", "error", "info", "warning"}
 * @property {String} message Message to be displayed
 * @property {func} onExited Function to perform when the snackbar has exited
 */
export default function AlertSnackbar(props) {
  const storeState = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch({ type: "HIDE_SNACKBAR" });
  };

  return (
    <React.Fragment>
      <Snackbar
        open={storeState.snackbar}
        autoHideDuration={2000}
        onClose={handleClose}
        onExited={props.onExited}
      >
        <Alert onClose={handleClose} severity={props.severity}>
          {props.message}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}

AlertSnackbar.propTypes = {
  severity: PropTypes.string,
  message: PropTypes.string,
  onExited: PropTypes.func,
};
