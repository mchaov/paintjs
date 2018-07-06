const path = require("path");
const fs = require("fs-extra");
const blocksFolderName = "blocks";
const blocksFolderPath = "./" + blocksFolderName;
const blocks =
    fs
        .readdirSync(path.resolve(blocksFolderPath))
        .filter(x => x.match(/\./gim) === null)
        .map(x => {
            let y = {};
            y[x.toLowerCase()] = `${blocksFolderPath}/${x}`;
            return y;
        });

module.exports = blocks;