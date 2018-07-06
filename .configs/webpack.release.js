"use strict"

const path = require("path");
const webpack = require("webpack");
const TypedocWebpackPlugin = require("typedoc-webpack-plugin");
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
            // new TypedocWebpackPlugin({
            //     jsx: "react",
            //     target: "es5",
            //     module: "commonjs",
            //     name: packageJson.name,
            //     excludeExternals: true,
            //     includeDeclarations: true,
            //     ignoreCompilerErrors: true,
            //     emitDecoratorMetadata: true,
            //     experimentalDecorators: true,
            //     externalPattern: "**/*+.d.ts",
            //     exclude: "**/*+(test|index).*",
            //     allowSyntheticDefaultImports: true,
            //     suppressImplicitAnyIndexErrors: true,
            //     forceConsistentCasingInFileNames: true,
            //     out: path.resolve(__dirname, "..", "docs"),
            // }, "./blocks"),
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