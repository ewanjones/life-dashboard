const webpack = require('webpack')
const path = require("path");
const rootDir = path.resolve(__dirname, '../')


let config = {
    devtool: 'source-map',
    entry: [path.resolve(rootDir, "react/index.jsx")],
    output: {
        path: path.resolve(rootDir, "static/"),
        filename: "[name].bundle.js"
    },
    plugins: [
        new webpack.IgnorePlugin(new RegExp("^(fs|ipc)$"))
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["env", "stage-0", "react"]
                    }
                }
            }
        ]
    },
    target: "electron"
};

module.exports = config
