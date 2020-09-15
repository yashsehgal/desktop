/*
 * Copyright European Organization for Nuclear Research (CERN)
 * Licensed under the Apache License, Version 2.0 (the "License");
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Authors:
 * - Vivek Nigam, <viveknigam.nigam3@gmail.com>, 2020
 */

/**
 * Validates the current user from the list of stored credentials
 * @param {Object} currentUser
 * @param {Object} credentials
 */
function validateAccount(currentUser, credentials, authtype) {
  for (let i = 0; i < credentials.length; i++) {
    if (currentUser.account === credentials[i].account && authtype === credentials[i].auth_type) return true;
    // else if (currentUser.account === credentials[i].account) return true;
  }

  return false;
}

/**
 * Checks if the current user passed the authentication
 * @param {{account: String, username: String, password: String}} currentUser
 * @param {[...{}, {account: String, server: String, status: number}]} attemptStatus
 */
function currentUserAuthenticated(currentUser, attemptStatus) {
  for (let i = 0; i < attemptStatus.length; i++) {
    if (
      currentUser.account === attemptStatus[i].account &&
      attemptStatus[i].status === 200
    )
      return true;
  }

  return false;
}

module.exports = {
  validateAccount,
  currentUserAuthenticated,
};
