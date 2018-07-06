const fs = require("fs-extra");
const path = require("path");
fs.removeSync(path.resolve("./dist"));
const blocks = require("./blocks");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const packageJson = require("../package.json");

if (blocks && blocks.length === 0) {
    console.error(`
#######################################################################################
#                                                                                     #
#   You are not able to BUILD/PUSH initialized repository without any added blocks!   #
#                                                                                     #
#######################################################################################

1. If this is a new repository you've just created, please refer to sb-resp-scripts documentation:
https://bitbucket.sbtech.com/users/martin.c/repos/sb-resp-scripts/browse
    - Adding a block by executing "sb-resp-scripts add-block" should fix this issue.

2. If this is existing repository you've just cloned, please contact it's administrator.
`);
    process.exit(1);
}

module.exports = {
    target: "web",
    entry: Object.assign({}, ...blocks),
    output: {
        path: path.resolve(__dirname, "..", "dist"),
        filename: "[name].js",
        libraryTarget: "umd",
        library: `${packageJson.name}`,
        umdNamedDefine: true
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: packageJson.name,
                    chunks: "initial",
                    minChunks: packageJson.webpack && packageJson.webpack.minChunks || 3
                }
            }
        }
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "mobx": "mobx",
        "mobx-utils": "mobxUtils",
        "mobx-react": "mobxReact",
        "velocity-animate": "Velocity",
        "signalr-no-jquery": "signalR",
        "sbtech-general-api-client": "SBTech",
        "sbtech-sports-api": "SBTech",
        "react-container-query": "ReactContainerQuery",
        "sb-msg-bus": "sbMsgBus",
        "sb-resp-lib": "sbRespLib",
        "sb-resp-ui": "sbRespUI"
    },
    resolve: {
        extensions: [".js", ".ts", ".tsx", ".jsx", "json"],
    },
    module: {
        rules: [{
                test: /\.tsx?$/,
                enforce: "pre",
                exclude: [/node_modules/],
                loader: "tslint-loader",
                options: {
                    fileOutput: {
                        dir: "./linter/",
                        ext: "xml",
                        clean: true,
                        header: '<?xml version="1.0" encoding="utf-8"?>\n<checkstyle version="5.7">',
                        footer: '</checkstyle>'
                    },
                    fix: true,
                    typeCheck: true,
                    emitErrors: true,
                    failOnHint: true,
                    configFile: "./.configs/tslint.json"
                },
            },
            {
                test: /\.(less)$/,

                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            root: '/static',
                            url: false
                        }
                    },
                    {
                        loader: "less-loader"
                    }
                    // "css-loader?sourceMap!less-loader?sourceMap"
                ]
            },
            {
                test: /\.tsx?$/,
                use: [{
                        loader: 'cache-loader'
                    },
                    {
                        loader: 'thread-loader',
                        options: {
                            // there should be 1 cpu for the fork-ts-checker-webpack-plugin
                            workers: require('os').cpus().length - 1,
                        },
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            happyPackMode: true // IMPORTANT! use happyPackMode mode to speed-up compilation and reduce errors reported to webpack
                        }
                    }
                ],
                exclude: [/node_modules/]
            },
            {
                test: /\.(gif|png|jpe?g|svg|ico)$/i,
                loaders: [
                    "file-loader?name=[name].[ext]&outputPath=img/",
                    {
                        loader: "image-webpack-loader",
                    },
                ],
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf|otf)$/,
                loader: "url",
                query: {
                    name: "[path][name].[ext]",
                },
            },
            {
                test: /\.(txt|md)/,
                loader: "raw-loader"
            }
        ],
    },
}