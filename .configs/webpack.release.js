"use strict"

const webpack = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const sharedConfig = require("./webpack.shared");
const sharedPlugins = require("./sharedPlugins");
const packageJson = require("../package.json");

const envConfig = {};

if (packageJson.envConfig) {
    Object.keys(packageJson.envConfig).forEach(x => {
        envConfig[x.toUpperCase()] = JSON.stringify(packageJson.envConfig[x]);
    })
}

module.exports = Object.assign(
    sharedConfig, {
        mode: "production",
        devtool: "source-map",
        plugins: [
            ...sharedPlugins,
            new webpack.IgnorePlugin(/mocks/),
            new BundleAnalyzerPlugin({
                openAnalyzer: false,
                analyzerMode: "static"
            }),
            new webpack.DefinePlugin({
                "process.env": {
                    NODE_ENV: JSON.stringify("production"),
                    ...envConfig
                }
            }),
            new CompressionPlugin({
                asset: "[path][query]",
                filename: (asset) => {
                    if (asset.match(".js")) {
                        return asset.replace(".js", ".gz.js")
                    }
                    if (asset.match(".css")) {
                        return asset.replace(".css", ".gz.css")
                    }
                },
                algorithm: "gzip",
                test: /\.(js|css)$/,
                minRatio: 0
            })
        ]
    });