const path = require("path");
const rootDir = path.resolve(__dirname, '../')
console.log(rootDir)

module.exports = {
    devtool: 'source-map',
    entry: [path.resolve(rootDir, "react/index.js")],
    output: {
        path: path.resolve(rootDir, "static/"),
        filename: "[name].bundle.js"
    },
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
    }
};
