const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    background: "./src/background/background.js",
    content: "./src/content/content.js",
    popup: "./src/popup/popup.js",
    options: "./src/options/options.js",
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      // {
      //     test: /\.js$/,
      //     exclude: /node_modules/,
      //     use: 'babel-loader',
      // },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "src/popup/popup.html", to: "popup/popup.html" },
        { from: "src/options/options.html", to: "options/options.html" },
        { from: "_locales", to: "_locales" },
        { from: "src/icons", to: "icons" },
      ],
    }),
  ],
};
