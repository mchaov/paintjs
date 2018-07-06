"use strict"

const releaseConfig = require("./webpack.release");
module.exports = Object.assign(releaseConfig, { externals: {} });