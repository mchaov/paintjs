const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = [
    new MiniCssExtractPlugin({
        filename: "[name].css",
    }),
    new ForkTsCheckerWebpackPlugin({
        checkSyntacticErrors: true,
        tslint: path.join(__dirname, "tslint.json"),
        watch: ["src"],
        memoryLimit: 4096
    }),
];