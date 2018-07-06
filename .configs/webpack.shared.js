const fs = require("fs-extra");
const path = require("path");
fs.removeSync(path.resolve("./dist"));

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const packageJson = require("../package.json");

module.exports = {
    target: "web",
    entry: {
        index: path.resolve(__dirname, "..", "src", "index.tsx")
    },
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
                }
            }
        }
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
                        root: '/assets',
                        url: false
                    }
                },
                {
                    loader: "less-loader"
                }
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
                    workers: require('os').cpus().length - 1,
                },
            },
            {
                loader: 'ts-loader',
                options: {
                    happyPackMode: true
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