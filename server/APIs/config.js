/*
 * Copyright European Organization for Nuclear Research (CERN)
 * Licensed under the Apache License, Version 2.0 (the "License");
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Authors:
 * - Vivek Nigam, <viveknigam.nigam3@gmail.com>, 2020
 */

const axios = require("axios");
const https = require("https");
const fs = require("fs");
const superagent = require("superagent");
const packageJSON = require("../../package.json");

/**
 * Gets all the Server Config sections object from the Rucio Server.
 * @param {String} certlocation
 * @param {{name: String, host: String, auth: String}} server
 * @param {String} token
 */
async function getAllConfig(certlocation, server, token) {
  const httpsAgent = new https.Agent({ ca: fs.readFileSync(certlocation) });
  return axios
    .get(`https://${server.host}/config`, {
      httpsAgent,
      headers: {
        "User-Agent": `rucio-desktop/${packageJSON.version}`,
        "X-Rucio-Auth-Token": token,
      },
    })
    .then(console.log(`[INFO] Config received for ${server.name}`));
}

/**
 * Attempts to add an `option` with a `value` in a `section` on Rucio Server
 * @param {String} certlocation
 * @param {{name: String, host: String, auth: String}} server
 * @param {String} token
 * @param {{section: String, option: String, value: any}} payload
 */
async function addConfig(certlocation, server, token, payload) {
  const section = payload.section;
  const option = payload.option;
  const value = payload.value;

  return superagent
    .put(`https://${server.host}/config/${section}/${option}/${value}`)
    .set("X-Rucio-Auth-Token", token)
    .set("User-Agent", `rucio-desktop/${packageJSON.version}`)
    .ca(fs.readFileSync(certlocation))
    .ok((res) => {
      console.log(`[INFO] Added ${section}.${option} on ${server.name}`);
      return res.status === 201;
    })
    .on("error", (res) =>
      res.status === 401
        ? console.log("[ERROR] Invalid Credentials")
        : console.log("[ERROR] Internal Server Error")
    );
}

/**
 *  Attempts to DELETE an `option` in a `section` on Rucio Server
 * @param {String} certlocation
 * @param {{name: String, host: String, auth: String}} server
 * @param {String} token
 * @param {{section: String, option: String, value: any}} payload
 */
async function delConfig(certlocation, server, token, payload) {
  const httpsAgent = new https.Agent({ ca: fs.readFileSync(certlocation) });
  const section = payload.section;
  const option = payload.option;

  return axios
    .delete(`https://${server.host}/config/${section}/${option}`, {
      headers: {
        "User-Agent": `rucio-desktop/${packageJSON.version}`,
        "X-Rucio-Auth-Token": token,
      },
      httpsAgent,
    })
    .then(() => {
      console.log(`[INFO] Deleted ${section}.${option} on ${server.name}`);
    });
}

module.exports = { getAllConfig, addConfig, delConfig };
