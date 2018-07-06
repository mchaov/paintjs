"use strict"

const path = require("path");
const releaseConfig = require("./webpack.release");
module.exports = Object.assign(releaseConfig, { externals: {} });