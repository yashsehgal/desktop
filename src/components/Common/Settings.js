/*
 * Copyright European Organization for Nuclear Research (CERN)
 * Licensed under the Apache License, Version 2.0 (the "License");
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Authors:
 * - Vivek Nigam, <viveknigam.nigam3@gmail.com>, 2020
 */

/* eslint-disable react/no-unescaped-entities */
import React from "react";
import AdminSettings from "../AdminViews/Settings/AdminSettings";
import UserSettings from "../UserViews/UserSettings";
import { makeStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import packageJSON from "../../../package.json";

const useStyles = makeStyles(theme => ({
  root: {
    width: "inherit",
    textAlign: "left",
    fontFamily: "Inter",
    overflow: "auto",
  },
  title: {
    fontSize: theme.typography.pxToRem(32),
    fontWeight: 500,
    color: grey[800],
    paddingTop: theme.typography.pxToRem(20),
  },
  hint: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: 500,
    color: "#000000",
    opacity: 0.5,
    paddingTop: theme.typography.pxToRem(20)
  },
  info: {
    fontSize: theme.typography.pxToRem(14),
    color: "#000000",
    opacity: 0.8,
    paddingRight: theme.typography.pxToRem(10),
    paddingTop: theme.typography.pxToRem(10),
  },
}));

function Settings() {
  const classes = useStyles();
  const view = localStorage.getItem("viewContext");
  const account = localStorage.getItem("CURR_ACCOUNT");

  return (
    <div id="settings-root" className={classes.root}>
      <div id="account-name" className={classes.title}>
        <div className={classes.hint}>Managing settings as</div>
        <div style={{ paddingTop: "0.3125rem", paddingBottom: "0.625rem" }}>{account}</div>
      </div>
      {view === "admin" ? <AdminSettings /> : <UserSettings />}
      <div className={classes.hint}>
        Version
        <div className={classes.info}>
          You're currently using Rucio Desktop v{packageJSON.version}
        </div>
      </div>
    </div>
  );
}

export default Settings;
