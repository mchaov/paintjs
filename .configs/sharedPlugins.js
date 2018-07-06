const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CopyWebpackPlugin = require("copy-webpack-plugin");
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const packageJson = require("../package.json");

module.exports = [
    // new ExtractTextPlugin("[name].bundle.css"),
    new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "[name].css",
        // chunkFilename: "[id].css"
    }),
    // new CopyWebpackPlugin([{ from: "_client/assets" }]),
    new ForkTsCheckerWebpackPlugin({
        checkSyntacticErrors: true
    }),
];