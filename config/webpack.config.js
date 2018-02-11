const path = require("path");
module.exports = {
  entry: ["./react/app.jsx"],
  output: {
    path: path.resolve(__dirname, "static"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
